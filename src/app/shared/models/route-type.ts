export class RouteType {
  name?: string;
  icon?: any;
  iconType?: 'fa' | 'svg' | 'png';
  link?: string;
  id?: string;
  section?: string;
  permissions?: string[];
  venueSetting?: string;
  show?: string;
  onlyIf?: string;
  pages?: RouteType[];
}
