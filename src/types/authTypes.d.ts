export interface loginV2InitResponse {
    poll:{
        token:string;
        endpoint:string;
    }
    login:string;
}

export interface loginV2PollResponse{
    server:string;
    loginName:string;
    appPassword:string;
}

export interface oAuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  user_id: string;
};