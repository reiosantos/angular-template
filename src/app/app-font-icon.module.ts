import { NgModule } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fab, faFirstOrder } from '@fortawesome/free-brands-svg-icons';
import {
  faBraille,
  faCheckCircle,
  faCogs,
  faHome,
  faHourglassHalf,
  faPlusCircle,
  fas,
  faSignInAlt,
  faSlidersH,
  faUserCircle,
  faUsersCog
} from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { MatIconRegistry } from '@angular/material/icon';

@NgModule({
  imports: [FontAwesomeModule],
  exports: [FontAwesomeModule]
})
export class AppFontIconModule {
  private logos = [{ name: 'logo', url: 'assets/images/svg/logo.svg' }];

  constructor(private iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer, private library: FaIconLibrary) {
    this.registerFontAwesomeIcons();
    this.registerSvgIcons();
  }

  private registerSvgIcons = () => {
    this.logos.forEach(item => {
      this.iconRegistry.addSvgIcon(item.name, this.sanitizer.bypassSecurityTrustResourceUrl(item.url));
    });
  };

  private registerFontAwesomeIcons = () => {
    this.library.addIconPacks(fas, far, fab);
    this.library.addIcons(
      faHome,
      faPlusCircle,
      faBraille,
      faCogs,
      faUserCircle,
      faSlidersH,
      faCheckCircle,
      faFirstOrder,
      faHourglassHalf,
      faUsersCog,
      faSignInAlt
    );
  };
}
