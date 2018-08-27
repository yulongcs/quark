export interface IRequestOptions {
  headers?: { [key: string]: string | any };
  params?: { [key: string]: string | any };
  data?: any;
  method?: string;
}

export interface IFetchOptions {
  headers?: { [key: string]: string | any };
  body?: any;
  method?: string;
}
