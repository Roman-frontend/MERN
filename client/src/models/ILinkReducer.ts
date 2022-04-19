export interface ILink {
  from: string;
  to: string;
  code: string;
  date: Date;
  clicks: number;
  owner: string;
  readonly _id: string;
}

export interface ICreatePayload {
  link: ILink;
}

export type IInitialState = {
  status?: "loading" | "succeeded" | "failed";
  error?: string;
  links: ILink[];
};
