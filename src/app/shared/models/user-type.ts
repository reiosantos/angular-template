export class UserType {
  id?: string | number;
  company?: String;
  firstName?: string;
  lastName?: string;
  phone?: string | number;
  mobile?: string;
  showTips?: string | boolean;
  address1?: string;
  address2?: string;
  city?: string;
  country?: string;
  postcode?: string;
  email?: string;
  sections?: Array<String>;
  permissions?: Array<String>;
  userRole?: string;
  companyRole?: string;
  companyId?: string | number;

  get name() {
    return `${this.firstName} ${this.lastName}`;
  }

  constructor(user?: UserType) {
    if (user) {
      Object.assign(this, user);
    }
  }

  get isSuperAdmin() {
    return this.userRole === 'SuperAdmin';
  }
}
