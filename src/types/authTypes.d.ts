export interface AnonymousLoginResponse {
    poll:{
        token:string;
        endpoint:string;
    }
    login:string;
}

export interface AnonymousLoginPollResults{
    server:string;
    loginName:string;
    appPassword:string;
}