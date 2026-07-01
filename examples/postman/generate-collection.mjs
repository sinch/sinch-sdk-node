/**
 * Generates Postman collection and environment from Sinch Node SDK *-api.ts sources.
 * Run from repo root: node examples/postman/generate-collection.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.join(__dirname, '..', '..');
const packagesDir = path.join(repoRoot, 'packages');

const HOST_BY_PACKAGE = {
  fax: 'faxHost',
  sms: 'smsHost',
  numbers: 'numbersHost',
  verification: 'verificationHost',
  'number-lookup': 'numberLookupHost',
  'elastic-sip-trunking': 'elasticSipTrunkingHost',
};

const APPLICATION_SIGNING_PACKAGES = new Set(['voice', 'verification']);

function listApiFiles(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      listApiFiles(fullPath, files);
    } else if (entry.name.endsWith('-api.ts') && !entry.name.includes('domain')) {
      files.push(fullPath);
    }
  }
  return files;
}

function getPackageInfo(filePath) {
  const rel = path.relative(packagesDir, filePath);
  const [pkg] = rel.split(path.sep);
  const isVoiceApps = rel.includes(`${path.sep}applications${path.sep}`);
  const isTemplates = rel.includes('templates-v1') || rel.includes('templates-v2');

  let hostVar = HOST_BY_PACKAGE[pkg];
  if (pkg === 'voice' && isVoiceApps) {
    hostVar = 'voiceAppsHost';
  } else if (pkg === 'voice') {
    hostVar = 'voiceHost';
  } else if (pkg === 'conversation' && isTemplates) {
    hostVar = 'conversationTemplatesHost';
  } else if (pkg === 'conversation') {
    hostVar = 'conversationHost';
  }

  const apiClass = path.basename(filePath, '-api.ts')
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  return { pkg, hostVar, apiClass, auth: APPLICATION_SIGNING_PACKAGES.has(pkg) ? 'application' : 'oauth2' };
}

function normalizePathExpression(expr) {
  let value = expr.trim();
  value = value.replace(/^`|`$/g, '');
  value = value.replace(/\$\{this\.client\.apiClientOptions\.hostname\}/g, '');
  value = value.replace(/this\.client\.apiClientOptions\.hostname\s*\+\s*/g, '');
  value = value.replace(/\$\{this\.client\.apiClientOptions\.projectId\}/g, '{{projectId}}');
  value = value.replace(/\$\{data\['([^']+)'\]\}/g, '{{$1}}');
  value = value.replace(/data\['([^']+)'\]/g, '{{$1}}');
  value = value.replace(/\$\{filePath\}/g, '{{filePath}}');
  value = value.replace(/\$\{filePath\}\.\$\{data\['([^']+)'\]\}/g, '{{filePath}}.{{$1}}');
  value = value.replace(/\$\{data\['([^']+)'\]\.split\([^)]+\)\.join\([^)]+\)\}/g, '{{$1}}');
  value = value.replace(/\$\{[^}]+\}/g, '{{param}}');
  if (!value.startsWith('/')) {
    value = `/${value}`;
  }
  return value;
}

function extractHeaders(block) {
  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
  const acceptMatch = block.match(/'Accept':\s*'([^']+)'/);
  const contentTypeMatch = block.match(/'Content-Type':\s*'([^']+)'/);
  if (acceptMatch) {
    headers.Accept = acceptMatch[1];
  }
  if (contentTypeMatch) {
    headers['Content-Type'] = contentTypeMatch[1];
  }
  return headers;
}

function parseApiFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { pkg, hostVar, apiClass, auth } = getPackageInfo(filePath);
  const endpoints = [];

  const methodBlocks = content.split(/\n  \/\*\*/).slice(1);
  for (const block of methodBlocks) {
    const nameMatch = block.match(/\n  public(?: async)? (\w+)\(/);
    if (!nameMatch || nameMatch[1] === 'constructor') {
      continue;
    }
    const methodName = nameMatch[1];

    const prepareMatch = block.match(/prepareOptions\(\s*([^,]+),\s*'([A-Z]+)'/);
    if (!prepareMatch) {
      continue;
    }

    let pathExpr = '';
    const basePathMatch = block.match(/(?:const|let)\s+basePathUrl\s*=\s*([^;]+);/);
    const basePathAssignMatches = [...block.matchAll(/\n\s+basePathUrl\s*=\s*([^;]+);/g)];
    const filePathMatch = block.match(/(?:const|let)\s+filePath\s*=\s*([^;]+);/);
    const pathOnlyMatch = block.match(/const\s+path\s*=\s*([^;]+);/);
    if (basePathMatch) {
      pathExpr = basePathMatch[1];
    } else if (basePathAssignMatches.length > 0) {
      pathExpr = basePathAssignMatches[basePathAssignMatches.length - 1][1];
      if (pathExpr.trim() === 'filePath' && filePathMatch) {
        pathExpr = filePathMatch[1];
      }
    } else if (filePathMatch) {
      pathExpr = filePathMatch[1];
    } else if (pathOnlyMatch) {
      pathExpr = pathOnlyMatch[1];
    } else {
      continue;
    }

    const httpMethod = prepareMatch[2];
    const routePath = normalizePathExpression(pathExpr);
    const headers = extractHeaders(block);

    endpoints.push({
      pkg,
      hostVar,
      apiClass,
      auth,
      methodName,
      httpMethod,
      routePath,
      headers,
      key: `${httpMethod} ${routePath} (${methodName})`,
    });
  }

  return endpoints;
}

function dedupeEndpoints(endpoints) {
  const seen = new Set();
  return endpoints.filter((endpoint) => {
    const dedupeKey = `${endpoint.pkg}|${endpoint.httpMethod}|${endpoint.routePath}|${endpoint.headers.Accept}`;
    if (seen.has(dedupeKey)) {
      return false;
    }
    seen.add(dedupeKey);
    return true;
  });
}

function makeRequestItem(endpoint) {
  const url = `{{${endpoint.hostVar}}}${endpoint.routePath}`;
  const headerList = Object.entries(endpoint.headers).map(([key, value]) => ({
    key,
    value,
    type: 'text',
  }));

  return {
    name: `${endpoint.methodName} — ${endpoint.httpMethod} ${endpoint.routePath}`,
    request: {
      method: endpoint.httpMethod,
      header: headerList,
      body: ['POST', 'PUT', 'PATCH'].includes(endpoint.httpMethod)
        ? {
            mode: 'raw',
            raw: '{}',
            options: { raw: { language: 'json' } },
          }
        : undefined,
      url,
      description: `SDK: \`${endpoint.apiClass}.${endpoint.methodName}()\`\nPackage: \`@sinch/${endpoint.pkg}\``,
    },
    response: [],
  };
}

function buildCollection(endpoints) {
  const byPackage = new Map();
  for (const endpoint of endpoints) {
    if (!byPackage.has(endpoint.pkg)) {
      byPackage.set(endpoint.pkg, new Map());
    }
    const pkgMap = byPackage.get(endpoint.pkg);
    if (!pkgMap.has(endpoint.apiClass)) {
      pkgMap.set(endpoint.apiClass, []);
    }
    pkgMap.get(endpoint.apiClass).push(endpoint);
  }

  const packageFolders = [...byPackage.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([pkg, apiMap]) => {
      const auth = APPLICATION_SIGNING_PACKAGES.has(pkg) ? 'application' : 'oauth2';
      return {
        name: pkg,
        description: `@sinch/${pkg} — Auth: ${auth === 'application' ? 'Application signing (set collection authMode=application)' : 'OAuth2 project credentials'}`,
        event: [
          {
            listen: 'prerequest',
            script: {
              type: 'text/javascript',
              exec: [
                `pm.collectionVariables.set('authMode', '${auth}');`,
              ],
            },
          },
        ],
        item: [...apiMap.entries()]
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([apiClass, apiEndpoints]) => ({
          name: apiClass,
          item: apiEndpoints
            .sort((a, b) => a.methodName.localeCompare(b.methodName))
            .map(makeRequestItem),
        })),
      };
    });

  return {
    info: {
      _postman_id: 'sinch-node-sdk-collection',
      name: 'Sinch Node SDK — All REST Endpoints',
      description:
        'Auto-generated from sinch-sdk-node API sources. Matches public SDK methods in packages/fax, sms, voice, conversation, numbers, verification, number-lookup, elastic-sip-trunking.\n\nDocs: https://developers.sinch.com/\n\nRegenerate: `node examples/postman/generate-collection.mjs`',
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    event: [
      {
        listen: 'prerequest',
        script: {
          type: 'text/javascript',
          exec: [
            "const authMode = pm.collectionVariables.get('authMode') || 'oauth2';",
            "if (authMode === 'oauth2' && !pm.request.url.toString().includes('/oauth2/token')) {",
            "  const token = pm.collectionVariables.get('accessToken');",
            "  if (token) {",
            "    pm.request.headers.upsert({ key: 'Authorization', value: `Bearer ${token}` });",
            "  }",
            "}",
            "if (authMode === 'application') {",
            "  const appKey = pm.collectionVariables.get('applicationKey');",
            "  const appSecret = pm.collectionVariables.get('applicationSecret');",
            "  const timestamp = new Date().toISOString();",
            "  pm.request.headers.upsert({ key: 'x-timestamp', value: timestamp });",
            "  const method = pm.request.method;",
            "  const body = pm.request.body?.raw || '';",
            "  const contentType = pm.request.headers.get('Content-Type') || '';",
            "  const resource = pm.request.url.getPath();",
            "  const md5 = body ? CryptoJS.MD5(body).toString(CryptoJS.enc.Base64) : '';",
            "  const stringToSign = [method, md5, contentType, `x-timestamp:${timestamp}`, resource].join('\\n');",
            "  const signature = CryptoJS.HmacSHA256(stringToSign, appSecret).toString(CryptoJS.enc.Base64);",
            "  pm.request.headers.upsert({ key: 'Authorization', value: `Application ${appKey}:${signature}` });",
            "}",
          ],
        },
      },
    ],
    variable: [
      { key: 'authMode', value: 'oauth2' },
      { key: 'authHost', value: 'https://auth.sinch.com' },
      { key: 'projectId', value: 'YOUR_PROJECT_ID' },
      { key: 'keyId', value: 'YOUR_KEY_ID' },
      { key: 'keySecret', value: 'YOUR_KEY_SECRET' },
      { key: 'accessToken', value: '' },
      { key: 'accessTokenExpiresAt', value: '0' },
      { key: 'applicationKey', value: 'YOUR_APPLICATION_KEY' },
      { key: 'applicationSecret', value: 'YOUR_APPLICATION_SECRET' },
      { key: 'faxHost', value: 'https://fax.api.sinch.com' },
      { key: 'smsHost', value: 'https://zt.us.sms.api.sinch.com' },
      { key: 'voiceHost', value: 'https://calling.api.sinch.com' },
      { key: 'voiceAppsHost', value: 'https://callingapi.sinch.com' },
      { key: 'conversationHost', value: 'https://us.conversation.api.sinch.com' },
      { key: 'conversationTemplatesHost', value: 'https://us.template.api.sinch.com' },
      { key: 'numbersHost', value: 'https://numbers.api.sinch.com' },
      { key: 'verificationHost', value: 'https://verification.api.sinch.com' },
      { key: 'numberLookupHost', value: 'https://lookup.api.sinch.com' },
      { key: 'elasticSipTrunkingHost', value: 'https://elastic-trunking.api.sinch.com' },
    ],
    item: [
      {
        name: 'Auth — OAuth2 token',
        event: [
          {
            listen: 'test',
            script: {
              type: 'text/javascript',
              exec: [
                "const json = pm.response.json();",
                "pm.collectionVariables.set('accessToken', json.access_token);",
                "pm.environment.set('accessToken', json.access_token);",
                "pm.collectionVariables.set('accessTokenExpiresAt', String(Date.now() + (json.expires_in - 60) * 1000));",
              ],
            },
          },
        ],
        request: {
          auth: {
            type: 'basic',
            basic: [
              { key: 'username', value: '{{keyId}}', type: 'string' },
              { key: 'password', value: '{{keySecret}}', type: 'string' },
            ],
          },
          method: 'POST',
          header: [
            { key: 'Content-Type', value: 'application/x-www-form-urlencoded', type: 'text' },
          ],
          body: {
            mode: 'urlencoded',
            urlencoded: [{ key: 'grant_type', value: 'client_credentials' }],
          },
          url: '{{authHost}}/oauth2/token',
          description:
            'Fetch OAuth2 access token. Set keyId + keySecret in your environment (same as SINCH_KEY_ID / SINCH_KEY_SECRET in examples/snippets/.env). Uses HTTP Basic auth: Base64(keyId:keySecret).',
        },
        response: [],
      },
      ...packageFolders,
    ],
  };
}

function buildEnvironment() {
  return {
    id: 'sinch-node-sdk-environment',
    name: 'Sinch Node SDK — Production',
    values: [
      { key: 'authHost', value: 'https://auth.sinch.com', type: 'default', enabled: true },
      { key: 'projectId', value: 'YOUR_PROJECT_ID', type: 'default', enabled: true },
      { key: 'keyId', value: 'YOUR_KEY_ID', type: 'secret', enabled: true },
      { key: 'keySecret', value: 'YOUR_KEY_SECRET', type: 'secret', enabled: true },
      { key: 'accessToken', value: '', type: 'secret', enabled: true },
      { key: 'applicationKey', value: 'YOUR_APPLICATION_KEY', type: 'default', enabled: true },
      { key: 'applicationSecret', value: 'YOUR_APPLICATION_SECRET', type: 'secret', enabled: true },
      { key: 'faxHost', value: 'https://fax.api.sinch.com', type: 'default', enabled: true },
      { key: 'smsHost', value: 'https://zt.us.sms.api.sinch.com', type: 'default', enabled: true },
      { key: 'voiceHost', value: 'https://calling.api.sinch.com', type: 'default', enabled: true },
      { key: 'voiceAppsHost', value: 'https://callingapi.sinch.com', type: 'default', enabled: true },
      { key: 'conversationHost', value: 'https://us.conversation.api.sinch.com', type: 'default', enabled: true },
      { key: 'conversationTemplatesHost', value: 'https://us.template.api.sinch.com', type: 'default', enabled: true },
      { key: 'numbersHost', value: 'https://numbers.api.sinch.com', type: 'default', enabled: true },
      { key: 'verificationHost', value: 'https://verification.api.sinch.com', type: 'default', enabled: true },
      { key: 'numberLookupHost', value: 'https://lookup.api.sinch.com', type: 'default', enabled: true },
      { key: 'elasticSipTrunkingHost', value: 'https://elastic-trunking.api.sinch.com', type: 'default', enabled: true },
    ],
    _postman_variable_scope: 'environment',
  };
}

const apiFiles = listApiFiles(packagesDir);
const allEndpoints = dedupeEndpoints(apiFiles.flatMap(parseApiFile)).sort((a, b) => {
  if (a.pkg !== b.pkg) return a.pkg.localeCompare(b.pkg);
  if (a.apiClass !== b.apiClass) return a.apiClass.localeCompare(b.apiClass);
  return a.methodName.localeCompare(b.methodName);
});

const collection = buildCollection(allEndpoints);
const environment = buildEnvironment();
const generatedDir = path.join(__dirname, 'generated');
fs.mkdirSync(generatedDir, { recursive: true });

const collectionPath = path.join(generatedDir, 'sinch-node-sdk.postman_collection.json');
const environmentPath = path.join(generatedDir, 'sinch-node-sdk.postman_environment.json');
fs.writeFileSync(collectionPath, `${JSON.stringify(collection, null, 2)}\n`);
fs.writeFileSync(environmentPath, `${JSON.stringify(environment, null, 2)}\n`);

console.log(`Wrote ${allEndpoints.length} endpoints to ${collectionPath}`);
console.log(`Wrote environment to ${environmentPath}`);
