export interface IToken {
  token: string | null;
}

interface IId {
  id: string;
}

export interface IDeleteArgs extends IToken, IId {}

export interface IQueryParams extends IToken {
  limit: string | number | null;
}

export interface IUpdateArgs extends IToken, IId {
  from: string | null;
}

export interface ICreateArgs extends IToken {
  from: string | null;
}
