import { CreateGroupResponse } from '../create-group-response';

export interface ListGroupsResponse {

  /** The requested page. */
  page?: number;
  /** The number of groups returned in this request */
  page_size?: number;
  /** The total number of groups. */
  count?: number;
  /** List of GroupObjects */
  groups?: CreateGroupResponse[];
}


