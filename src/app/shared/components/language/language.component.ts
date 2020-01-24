import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SanConfig } from '@san/shared/interfaces/san-config';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'san-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageComponent implements OnInit {
  selected = '';
  langs: {val: string, label: string}[] = [];

  constructor(
    private translate: TranslateService,
    private sanConfig: SanConfig
  ) {
  }

  ngOnInit() {
    this.langs = this.sanConfig.availableLanguages;
    this.selected = this.translate.currentLang;
  }

  onSelection(event: MatSelectChange) {
    if (event.value && event.value !== this.translate.currentLang) {
      this.translate.use(event.value);
    }
  }
}
