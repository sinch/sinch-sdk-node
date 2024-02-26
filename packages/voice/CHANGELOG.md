# Version 0.0.2

- [Feat.] [Helpers](./src/models/v1/helper.ts) for SVAML actions and instructions building for ICE, ACE and PIE
- [Feat.] `call()` function is also available under the `conferences` service.

**Breaking changes**
- Callbacks management: implementation of the `CallbackProcessor` interface
  - Rename `parseVoiceEventNotification` into `parseEvent`
  - Move the header validation to the domain with the method `validateAuthenticationHeader`

# Version 0.0.1

 - Initial version
