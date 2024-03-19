import { IProduct } from "../../interfaces";

export namespace GetProducts {
  export interface Payload {
    limit?: number;
    page?: number;
    category?: string;
    q?: string;
  }

  export interface Response {
    hasMore: boolean;
    products: IProduct[];
  }
}
