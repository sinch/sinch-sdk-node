# Sinch Provisioning SDK for Node.js

This package contains the Sinch Provisioning SDK for Node.js for use with [Sinch APIs](https://developers.sinch.com/). To use it, you will need a Sinch account. Please [sign up](https://dashboard.sinch.com/signup) or [log in](https://dashboard.sinch.com/login) if you already have one.

## Installation

We recommend to use this SDK as part of the [`@sinch/sdk-core`](../../packages/sdk-core) package in order to make the most out of all the Sinch products.

However, it's still possible to use this SDK standalone is you need to access the Provisioning API only.

### With NPM

```bash
npm install @sinch/provisioning
```

### With Yarn

```bash
yarn add @sinch/provisioning
```

## Usage

### Credentials

The `Provisioning` API uses the Sinch unified authentication with OAuth2. You will need to provide the following credentials:
 - projectId: can be found in the [Account Dashboard](https://dashboard.sinch.com/settings/access-keys)
 - keyId:: can be found in your Access key list in the [Account Dashboard](https://dashboard.sinch.com/settings/access-keys)
 - keySecret: can be found **ONLY** when generating a new access key: keep it safe!

### As part of the Sinch SDK

If you are using this SDK as part of the Sinch SDK (`@sinch/sdk-core`) you can access it as the `provisioning` property of the client that you would have instantiated.

```typescript
// TODO: add snippet
```

### Standalone

The SDK can be used standalone if you need to use only the Provisioning APIs.

```typescript
// TODO: add snippet
```

## Promises

All the methods that interact with the Sinch APIs use Promises. You can use `await` in an `async` method to wait for the response, or you can resolve them yourself with `then()` / `catch()`.

```typescript
// TODO: add snippet
```

## Contact
Developer Experience team: [devexp@sinch.com](mailto:devexp@sinch.com)
