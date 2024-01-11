import { IUser } from "./type";

export enum AuthReducerActionType {
    LOGIN_USER = "AUTH_LOGIN_USER",
    LOGOUT_USER = "AUTH_LOGOUT_USER" // Додайте новий тип для видалення токену
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
      case AuthReducerActionType.LOGOUT_USER: { 
        localStorage.removeItem('token');
        localStorage.removeItem('authData');
        return {
          isAuth: false,
          user: null
        };
      }
      default: {
        return state;
      }
    }
  };
  

export default AuthReducer;
