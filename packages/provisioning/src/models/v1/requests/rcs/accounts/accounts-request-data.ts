import { RcsCommentCreateRequest } from '../../../rcs-comment-create-request';

export interface CreateCommentRequestData {
  /** Comment data */
  rcsCommentCreateRequestBody: RcsCommentCreateRequest;
}

export interface ListActivitiesRequestData {
  /** The page token if retrieving the next page from a previous query. */
  pageToken?: string;
  /** The page size requested (1-100). */
  pageSize?: number;
}
