import { Strings } from '@san/shared/interfaces/strings';
import jwtDecode from 'jwt-decode';

export const getAuthData = (): any => {
  try {
    let authUser: any = localStorage.getItem(Strings.AUTH_USER_KEY);
    authUser = JSON.parse(authUser);
    jwtDecode(authUser.token);
    return authUser;
  } catch (e) {
    localStorage.clear();
    return null;
  }
};

export const isAuthenticated = (): boolean => {
  try {
    const tokenX: string = localStorage.getItem(Strings.TOKEN_KEY);
    const user = JSON.parse(localStorage.getItem(Strings.AUTH_USER_KEY));

    const token: any = jwtDecode(tokenX);
    return !!token && !!token.user_id && !!token.email && !!user;
  } catch (e) {
    localStorage.clear();
    return false;
  }
};
