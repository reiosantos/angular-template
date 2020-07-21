import { AfterViewChecked, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Config } from '@san/shared/interfaces/config';
import { MatToolbar } from '@angular/material/toolbar';

@Component({
  selector: 'san-auth-wrapper',
  templateUrl: './auth-wrapper.component.html',
  styleUrls: ['./auth-wrapper.component.scss']
})
export class AuthWrapperComponent implements OnInit, AfterViewChecked {
  title = 'Application_Name';

  @ViewChild('toolbar', { static: true }) toolbar: MatToolbar;
  @ViewChild('content', { static: true }) content: ElementRef;

  constructor(private sanConfig: Config, private renderer: Renderer2) {
    this.title = sanConfig.venueSettings.venueName;
  }

  ngOnInit() {}

  ngAfterViewChecked() {
    // eslint-disable-next-line no-underscore-dangle
    const toolbarRef = this.toolbar._elementRef.nativeElement;
    this.renderer.setStyle(this.content.nativeElement, 'marginTop', `${toolbarRef.offsetHeight}px`);
  }
}
