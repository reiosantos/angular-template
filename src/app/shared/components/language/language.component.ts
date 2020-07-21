import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Config } from '@san/shared/interfaces/config';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'san-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageComponent implements OnInit {
  selected = '';
  langs: { val: string; label: string }[] = [];

  constructor(private translate: TranslateService, private vcConfig: Config) {}

  ngOnInit() {
    this.langs = this.vcConfig.availableLanguages;
    console.log(this.vcConfig);
    this.selected = this.translate.currentLang;
  }

  onSelection(event: MatSelectChange) {
    if (event.value && event.value !== this.translate.currentLang) {
      this.translate.use(event.value);
    }
  }
}
