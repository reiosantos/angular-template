export class RouteType {
  name?: string;
  icon?: any;
  iconType?: 'fa' | 'svg' | 'png';
  link?: string;
  id?: string;
  section?: string;
  permissions?: Array<string>;
  venueSetting?: string;
  show?: string;
  onlyIf?: string;
  userRole?: Array<string>;
  companyRole?: Array<string>;
  pages?: Array<RouteType>;
}
