import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { ObjectId } from 'mongodb';

export interface Options {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType: 'json';
  withCredentials?: boolean;
  transferCache?:
    | {
        includeHeaders?: string[];
      }
    | boolean;
}

// export interface Developers {
//   items: Product[];
//   total: number;
//   page: number;
//   perPage: number;
//   totalPages: number;
// }

export interface Developer {
  _id?: string;
  idAsString?: string;
  firstname: string;
  lastname: string;
  field: string;
  ContactID: string;
}

export interface Project {
  _id?: string;
  idAsString?: string;
  name: string;
  start: Date;
  end: Date;
  ProjektmitarbeiterID: string;
  status: string;
}

export interface Technologie {
  _id?: string;
  idAsString?: string;
  name: string;
  description : string;
  usage: string;
}
