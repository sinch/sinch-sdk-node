export type EmailAttachment =
  string
  | AttachedFile
  | AttachedFileData
  | Array<string | AttachedFile | AttachedFileData>;

export interface AttachedFile {
  data: AttachedFileData;
  filename?: string;
  contentType? : string;
  knownLength?: number;
}

export type AttachedFileData = string | Buffer | NodeJS.ReadableStream;
