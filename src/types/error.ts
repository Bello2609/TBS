import { AxiosError, AxiosResponse } from 'axios';

export interface ApiError extends AxiosError {
  response?: AxiosResponse<{
    message: string;
  }>;
}