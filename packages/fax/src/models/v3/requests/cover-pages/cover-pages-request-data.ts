import { CoverPageRequest } from '../../cover-page';

export interface AddCoverPageRequestData {
    /** the serviceId */
    serviceId: string;
    /**  */
    addCoverPageRequestBody?: CoverPageRequest;
}

export interface DeleteCoverPageRequestData {
    /** The serviceId containing the cover page you want to work with. */
    serviceId: string;
    /**  */
    coverPageId: string;
}

export interface GetCoverPageRequestData {
    /** The serviceId containing the cover page you want to work with. */
    serviceId: string;
    /**  */
    coverPageId: string;
}

export interface ListCoverPagesRequestData {
    /** the serviceId */
    serviceId: string;
    /** Number of cover pages to return on each request. */
    pageSize?: number;
    /** Optional. The page to fetch. If not specified, the first page will be returned. */
    page?: string;
}
