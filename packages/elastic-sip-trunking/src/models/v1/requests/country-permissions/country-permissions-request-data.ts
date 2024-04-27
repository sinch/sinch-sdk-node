import { CountryPermission } from '../../country-permission';

export interface GetCountryPermissionRequestData {
    /** The ISO code of the country. */
    'isoCode': string;
}
export interface ListCountryPermissionsRequestData {
}
export interface UpdateCountryPermissionRequestData {
    /** The ISO code of the country. */
    'isoCode': string;
    /** The body containing the Country Permission details to update */
    'updateCountryPermissionRequestBody': CountryPermission;
}
