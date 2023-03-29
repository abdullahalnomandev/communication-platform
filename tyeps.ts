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

export interface IMessage {
  id: number;
  text: string;
  sender_id: number;
  team_id: number;
  created_at: string;
  updated_at: string;
  attachment: string;
  POC_user: IUser;
}
export interface ITeam {
  id: number;
  name: string;
  creator_id: number;
  created_at: string;
  account_id: number;
  updated_at: string;
  POC_messages: IMessage[];
}

export interface ITeamMembers {
  id: number;
  team_id: number;
  user_id: number;
  updated_at: string;
  created_at: string;
  POC_user: IUser;
}
