import { IUser } from "./type";

export enum AuthReducerActionType {
  LOGIN_USER = "AUTH_LOGIN_USER"
}

export interface IAuthReducerState {
  isAuth: boolean;
  user: IUser | null;
}

const getInitialAuthState = (): IAuthReducerState => {
    const storedUser = JSON.parse(localStorage.getItem("authData") || "null");
    return {
      isAuth: !!storedUser,
      user: storedUser
    };
  };
  
  const initState: IAuthReducerState = getInitialAuthState();
  
  const AuthReducer = (state: IAuthReducerState = initState, action: any): IAuthReducerState => {
    switch (action.type) {
      case AuthReducerActionType.LOGIN_USER: {
        const newState = {
          isAuth: true,
          user: action.payload as IUser
        };
        localStorage.setItem("authData", JSON.stringify(newState.user));
        return newState;
      }
      default: {
        return state;
      }
    }
  };
  

export default AuthReducer;
