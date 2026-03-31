import { CoverPageFile } from '../cover-page-file';

/**
 * A cover page creation model
 */
export interface CoverPageRequest {
  /** The friendly name of the cover page. */
  name: string;
  /** @see CoverPageFile */
  file: CoverPageFile;
}

/**
 * A cover page resource
 */
export interface CoverPage extends CoverPageRequest {
  /** ID of the cover page */
  id?: string;
  /** The `Id` of the project associated with the call. */
  projectId?: string;
  /** ID of the fax service used. */
  serviceId?: string;
  /** The date and time the cover page was created. */
  createdTime?: Date;
  /** The date and time the cover page was updated. */
  updatedTime?: Date;
}
