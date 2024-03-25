const ACCESS_TOKEN_KEY = "token";

export default class UserSessionRepository {
    constructor(localStorage){
        this.localStorage = localStorage;
    }

    save(userSession){
        let { token } = userSession;
        this.localStorage.setItem(ACCESS_TOKEN_KEY, token);
    }

    getAccessToken(){
        let access_token = this.localStorage.getItem(ACCESS_TOKEN_KEY);
        if(access_token){
            return access_token;
        }
        return null;
    }
};