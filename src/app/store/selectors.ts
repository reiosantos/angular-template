import { isLoadingSpinnerActive } from '@san/store/shared/loader/selectors';
import { selectAuthError, selectAuthUser } from '@san/store/auth-store/selectors';
import { getNotificationState } from '@san/store/shared/notification/selectors';

export const selectors = {
  isLoadingSpinnerActive,
  selectAuthError,
  selectAuthUser,
  getNotificationState
};
