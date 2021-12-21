import { FileRepositoryResponse } from '@/types/byServices/fileRepository/fileRepository';
import { MultipleFileResponseData } from '@/data/services/fileRepository/types';
import { AxiosError } from 'axios';

export interface FileRepositoryStore {
  data: FileRepositoryResponse | MultipleFileResponseData | null;
  error: AxiosError | null;
  isLoading: boolean;
}
