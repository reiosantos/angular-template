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
