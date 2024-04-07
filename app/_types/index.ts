import {
  ProductType,
  HttpDataProductResponse,
  HttpItemPoductResponse,
  FrontProductDataType,
} from "@/app/_types/product";

interface HttpErrorResponse {
  response: {
    data: ErrorResponse;
    status: number;
  };
}

interface ErrorResponse {
  data: {
    errors: ErrorMessageType[];
  };
}

type ErrorMessageType = {
  message: string;
};

interface HttpLoginResponse {
  user: UserType;
  token: TokenType;
}

interface HttpDataCategoryResponse {
  data: CategoryType[];
}

interface HttpItemCategoryResponse {
  data: CategoryType;
}

type CategoryType = {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

type FrontCategoryDataType = {
  error: { status: number; message: string };
  data: CategoryType[];
};

type UserType = {
  name: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
};

type TokenType = {
  access_token: string;
  expires_in: number;
  token_type: string;
};

enum UserRole {
  ADMIN,
  USER,
}

export type {
  HttpLoginResponse,
  HttpDataCategoryResponse,
  HttpItemCategoryResponse,
  CategoryType,
  FrontCategoryDataType,
  ErrorResponse,
  HttpErrorResponse,
  ProductType,
  HttpDataProductResponse,
  HttpItemPoductResponse,
  FrontProductDataType,
};
