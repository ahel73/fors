import config from '@/config';
import { HttpClient } from '@/data/http';

import {
  FileRequest,
  FileResponseData,
  FileResponse,
  FileDownloadResponse,
  FileDeleteResponseData,
  FileDeleteResponse,
} from './types';

import { invokeFileDownloadFromBlob } from '@/utils/file';

const httpClient = new HttpClient(config.filesApiUrl);

export const uploadFile = async (params: FileRequest): Promise<FileResponseData> => {
  /* eslint-disable camelcase */
  /* eslint-disable @typescript-eslint/naming-convention */
  const { user_id = '1', path = Date.now().toString(), file } = params;
  const fileFormData = new FormData();
  fileFormData.append('user_id', `${user_id}`);
  fileFormData.append('path', `${path}`);
  fileFormData.append('file', file);
  const { data } = await httpClient.post<FileResponse>('/uploadFile', fileFormData);

  return data;
};

export const downloadFile = async (uuid: string): Promise<void> => {
  await httpClient.get<FileDownloadResponse>(`/downloadFileByUUID/${uuid}`, { responseType: 'blob' })
    .then(response => {
      const fileNameHeader = 'content-disposition';
      const fileName = decodeURI(response.headers[fileNameHeader]).split('filename=').pop()?.slice(1, -1);
      invokeFileDownloadFromBlob(response.data, fileName as string);
    });
};

export const deleteFile = async (uuid: string): Promise<FileDeleteResponseData> => {
  const { data } = await httpClient.delete<FileDeleteResponse>(`/${uuid}`);

  return data;
};
