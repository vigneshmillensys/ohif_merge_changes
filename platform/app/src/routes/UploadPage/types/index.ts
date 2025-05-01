export type UploadingStatus = 'InQueue' | 'InProgress' | 'Success' | 'Fail';

export interface FileData {
  id: string;
  file: File;
  status: UploadingStatus;
}
