export interface TokenDto {
  foo: string;
  exp: number;
  iat: number;
}

export interface TokenHeaderDto {
  typ: string;
  alg: string;
}
