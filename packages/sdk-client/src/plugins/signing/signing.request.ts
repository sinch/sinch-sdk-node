import { PluginRunner } from '../core';
import { RequestOptions, RequestPlugin } from '../core/request-plugin';
import * as crypto from 'crypto';

export const calculateMD5 = (body: string): string => {
  // Content-MD5 = Base64 ( MD5 ( UTF8 ( [BODY] ) ) )
  return crypto.createHash('md5').update(Buffer.from(body, 'utf-8')).digest('base64');
};

export const calculateHMACSHA256 = (secret: string, stringToSign: string): string => {
  // Signature = Base64 ( HMAC-SHA256 ( Base64-Decode ( ApplicationSecret ), UTF8 ( StringToSign ) ) );
  return crypto.createHmac('sha256', Buffer.from(secret, 'base64'))
    .update(Buffer.from(stringToSign, 'utf-8'))
    .digest('base64');
};

export const generateAuthorizationHeader = (
  httpVerb: string,
  contentMD5: string,
  contentType: string,
  canonicalizedHeaders: string,
  canonicalizedResource: string,
  applicationKey: string,
  applicationSecret: string,
): string => {
  const stringToSign
    = `${httpVerb}\n${contentMD5}\n${contentType}\n${canonicalizedHeaders}\n${canonicalizedResource}`;

  const signature = calculateHMACSHA256(applicationSecret, stringToSign);
  return `Application ${applicationKey}:${signature}`;
};

export class SigningRequest implements RequestPlugin {
  private readonly applicationId: string;
  private readonly applicationSecret: string;

  constructor(applicationId: string, applicationSecret: string) {
    this.applicationId = applicationId;
    this.applicationSecret = applicationSecret;
  }

  getName(): string {
    return 'SigningRequest';
  }

  public load(): PluginRunner<RequestOptions, RequestOptions> {
    return {
      transform: (data: RequestOptions) => {
        if (!data.method) {
          throw new Error('The HTTP method must be defined.');
        }
        if (!data.path) {
          throw new Error('The URL path must be defined.');
        }
        const hasBody = !!data.body;
        const contentMD5 = hasBody ? calculateMD5(data.body as string) : '';
        const authorizationHeader = generateAuthorizationHeader(
          data.method.toUpperCase(),
          contentMD5,
          data.headers.get('Content-Type')!,
          `x-timestamp:${data.headers.get('x-timestamp')}`,
          data.path,
          this.applicationId,
          this.applicationSecret,
        );
        data.headers.append('Authorization', authorizationHeader);
        return data;
      },
    };
  }
}
