import { isLoadingSpinnerActive } from '@san/store/shared/loader/selectors';
import { selectAuthError, selectAuthUser } from '@san/store/auth-store/selectors';

export const selectors = {
  isLoadingSpinnerActive,
  selectAuthError,
  selectAuthUser
};
