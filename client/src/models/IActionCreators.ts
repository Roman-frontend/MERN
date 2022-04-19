interface IToken {
  readonly token: string | null;
}

interface IFrom {
  from: string | null;
}

export interface ICreateArgs extends IToken, IFrom {}

export interface IDeleteArgs extends IToken {
  readonly id: string;
}

export interface IUpdateArgs extends IDeleteArgs, IFrom {}
