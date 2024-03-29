interface HttpErrorResponse {
  response: {
    data: ErrorResponse;
  };
}

interface ErrorResponse {
  data: {
    errors: string[];
  };
}

interface HttpLoginResponse {
  user: UserType;
  token: TokenType;
}

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

export type { HttpLoginResponse, ErrorResponse, HttpErrorResponse };
