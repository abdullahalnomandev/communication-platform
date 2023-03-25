export interface IUser {
  id?: number;
  email: string;
  name: string;
  image_url?: string;
  role?: string;
  mobile: string;
}

export interface IAccount {
  id: number;
  name: string;
  website_url: string;
  created_at: string;
  updated_at: string;
}
