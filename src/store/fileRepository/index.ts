import { AxiosError } from 'axios';
import { Mutation, Action, State } from 'vuex-simple';

import { FileRepositoryResponse } from '@/types/byServices/fileRepository/fileRepository';
import { FileRepositoryStore } from '@/store/fileRepository/types';

import {
  FileRequest,
  MultipleFileResponseData,
} from '@/data/services/fileRepository/types';
import {
  uploadFile,
  downloadFile,
  deleteFile,
} from '@/data/services/fileRepository/fileRepository';

import eventBus from '@/utils/bus/event-bus';

export default class FileRepositoryModule {
  @State()
  state: FileRepositoryStore = {
    data: null,
    error: null,
    isLoading: false,
  }

  @Mutation()
  setFileRepositoryIsLoading(isLoading: boolean): void {
    this.state.isLoading = isLoading;
  }

  @Mutation()
  setFileRepositoryError(error: AxiosError | null): void {
    this.state.error = error;
  }

  @Mutation()
  setFileRepositoryData(data: FileRepositoryResponse | MultipleFileResponseData): void {
    this.state.data = data;
  }

  @Action()
  async uploadFileAction(params: FileRequest): Promise<void> {
    this.setFileRepositoryIsLoading(true);
    this.setFileRepositoryError(null);
    try {
      const data: FileRepositoryResponse = await uploadFile(params);

      this.setFileRepositoryData(data);
    } catch (error) {
      this.setFileRepositoryError(error as AxiosError);
      eventBus.$emit(
        'notification:message',
        {
          text: 'Возникла ошибка при сохранении файла',
          title: 'Ошибка',
          type: 'error',
        }
      );
    } finally {
      this.setFileRepositoryIsLoading(false);
    }
  }

  @Action()
  downloadFileAction(uuid: string): void {
    this.setFileRepositoryIsLoading(true);
    this.setFileRepositoryError(null);
    try {
      downloadFile(uuid);
    } catch (error) {
      this.setFileRepositoryError(error as AxiosError);
      eventBus.$emit(
        'notification:message',
        {
          text: 'Возникла ошибка при загрузке файла',
          title: 'Ошибка',
          type: 'error',
        }
      );
    } finally {
      this.setFileRepositoryIsLoading(false);
    }
  }

  @Action()
  async deleteFileAction(uuid: string): Promise<void> {
    this.setFileRepositoryIsLoading(true);
    this.setFileRepositoryError(null);
    try {
      await deleteFile(uuid);
    } catch (error) {
      this.setFileRepositoryError(error as AxiosError);
      eventBus.$emit(
        'notification:message',
        {
          text: 'Возникла ошибка при удалении файла',
          title: 'Ошибка',
          type: 'error',
        }
      );
    } finally {
      this.setFileRepositoryIsLoading(false);
    }
  }
}
