type ProductType = {
  id: number;
  name: string;
  description: string;
  stock: number;
  price: number;
  status: number;
  category_id: number;
  category_name: string;
  created_by: string;
  updated_by: string;
  created_at: string;
  updated_at: string;
};

interface PayloadProductType {
  name: string;
  description?: string;
  category_id: number;
  stock: number;
  price: number;
  status: number;
}

type MetaProductType = {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
};

interface HttpDataProductResponse {
  data: ProductType[];
  meta: MetaProductType;
}

interface HttpItemProductResponse {
  data: ProductType;
}

type FrontProductDataType = {
  error: { status: number; message: string };
  data: ProductType[];
};

export type {
  ProductType,
  PayloadProductType,
  HttpDataProductResponse,
  HttpItemProductResponse,
  FrontProductDataType,
};
