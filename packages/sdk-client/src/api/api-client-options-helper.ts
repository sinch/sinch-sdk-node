// import { ApiTokenRequest, Oauth2TokenRequest, SigningRequest, XTimestampRequest } from '../plugins';
// // import { ApiClientOptions } from './api-client-options';
//
// export const buildApiClientOptionsForProjectId = (
//   projectId: string,
//   keyId: string,
//   keySecret: string,
// ) => {
//   return {
//     projectId,
//     requestPlugins: [new Oauth2TokenRequest(keyId, keySecret)],
//     useServicePlanId: false,
//   };
// };
//
// export const  buildApiClientOptionForServicePlanId = (
//   servicePlanId: string,
//   apiToken: string,
// ) => {
//   return {
//     projectId: servicePlanId,
//     requestPlugins: [new ApiTokenRequest(apiToken)],
//     useServicePlanId: true,
//   };
// };
//
// export const buildApiClientOptionForApplication = (
//   applicationKey: string,
//   applicationSecret: string,
// ) => {
//   return {
//     requestPlugins: [
//       new XTimestampRequest(),
//       new SigningRequest(applicationKey, applicationSecret),
//     ],
//   };
// };
