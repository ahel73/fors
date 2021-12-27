/* eslint-disable @typescript-eslint/ban-types */
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import config from '@/config';

export class HttpClient {
  client: AxiosInstance

  constructor(baseUrl?: string) {
    this.client = axios.create({
      baseURL: baseUrl || config.apiUrl,
    });
  }

  async get<T>(url: string, params?: AxiosRequestConfig): Promise<T> {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.client.get(url, { ...params });
    } catch (error) {
      throw error;
    }
  }

  async post<T>(url: string, data?: object, params?: AxiosRequestConfig): Promise<T> {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.client.post(url, data, params);
    } catch (error) {
      throw error;
    }
  }

  async postEmpty<T>(url: string, data?: object, params?: AxiosRequestConfig): Promise<T> {
    return await this.client.post(url, data, params);
  }

  async put<T>(url: string, data?: object, params?: AxiosRequestConfig): Promise<T> {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.client.put(url, data, params);
    } catch (error) {
      throw error;
    }
  }

  async putEmpty<T>(url: string, data?: object, params?: AxiosRequestConfig): Promise<T> {
    return await axios.put(url, data, params);
  }

  async patch<T>(url: string, data?: object, params?: AxiosRequestConfig): Promise<T> {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.client.patch(url, data, params);
    } catch (error) {
      throw error;
    }
  }

  async delete<T>(url: string, params?: AxiosRequestConfig): Promise<T> {
    // eslint-disable-next-line no-useless-catch
    try {
      return await this.client.delete(url, params);
    } catch (error) {
      throw error;
    }
  }
}

export default new HttpClient();
