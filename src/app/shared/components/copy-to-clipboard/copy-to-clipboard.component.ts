import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'san-copy-to-clipboard',
  templateUrl: './copy-to-clipboard.component.html',
  styleUrls: ['./copy-to-clipboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CopyToClipboardComponent implements OnInit {
  copyToClipboard: boolean;

  @Input() value: any;

  constructor() {}

  ngOnInit(): void {}
}
