import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { StoreSelectors, StoreState } from '@san/store';
import { Observable } from 'rxjs';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'san-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  isLoading: Observable<boolean>;

  mode: ProgressSpinnerMode = 'indeterminate';
  strokeWidth = 2;

  constructor(private store: Store<StoreState>) {}

  ngOnInit() {
    this.isLoading = this.store.pipe(select(StoreSelectors.isLoadingSpinnerActive));
  }
}
