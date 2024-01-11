import { jwtDecode } from "jwt-decode";

export const isUserAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
  };

export const removeToken = () => {
  localStorage.removeItem('token');
};

export interface JwtPayload {
  email: string;
  name: string;
  image: string;
}

export const getUserInfo = (): JwtPayload | null => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedToken = jwtDecode(token) as JwtPayload;
    return decodedToken;
  }
  return null;
};