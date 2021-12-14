import { FileRepositoryResponse } from '@/types/byServices/fileRepository/fileRepository';
import { AxiosResponse } from 'axios';

export type FileRequest = {
  file: File,
  // eslint-disable-next-line camelcase
  user_id?: string,
  path?: string
};

export type FileResponseData = FileRepositoryResponse;

export type MultipleFileRequest = {
  files: File[],
  // eslint-disable-next-line camelcase
  user_id?: string,
  path?: string
};

export interface MultipleFileResponseData {
  [index: number]: FileRepositoryResponse;
}

export type FileDeleteResponseData = string;

export type FileResponse = AxiosResponse<FileResponseData>;
export type MultipleFileResponse = AxiosResponse<MultipleFileResponseData>;
export type FileDownloadResponse = AxiosResponse<Blob>;
export type FileDeleteResponse = AxiosResponse<FileDeleteResponseData>;
