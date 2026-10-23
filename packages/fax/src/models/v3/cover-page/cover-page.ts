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
 * Information regarding a cover page, as returned when listing the cover pages of a service.
 * To retrieve the cover page file, use the `get` operation.
 */
export interface CoverPageInfo {
  /** ID of the cover page */
  id?: string;
  /** The friendly name of the cover page. */
  name?: string;
  /** The `Id` of the project associated with the call. */
  projectId?: string;
  /** ID of the fax service used. */
  serviceId?: string;
  /** The date and time the cover page was created. */
  createdTime?: Date;
  /** The date and time the cover page was updated. */
  updatedTime?: Date;
  /** The timestamp on which the cover page was created. */
  createdAt?: Date;
  /** The timestamp on which the cover page was updated. */
  updatedAt?: Date;
}

/**
 * A cover page resource
 */
export interface CoverPage extends CoverPageInfo {
  /** The friendly name of the cover page. */
  name: string;
  /** @see CoverPageFile */
  file: CoverPageFile;
}
