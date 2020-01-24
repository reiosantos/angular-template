import { Component, Input } from '@angular/core';
import { Styles, Icon } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'san-icon',
  templateUrl: './san-icon.component.html',
  styleUrls: ['./san-icon.component.scss']
})
export class SanIconComponent {
  @Input() type: 'fa'|'svg'|'png' = 'fa';
  @Input() icon: any;
  @Input() faIconStyles: Styles = { color: 'white' };
  @Input() faSpin = false;

  get faIcon(): Icon|null {
    if (this.type === 'fa') {
      return this.icon;
    }
    return null;
  }

  get svgIcon(): string|null {
    if (this.type === 'svg') {
      return this.icon;
    }
    return null;
  }

  get pngIcon(): string|null {
    if (this.type === 'png') {
      return this.icon;
    }
    return null;
  }

  constructor() { }

}
