import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  showLoader: boolean;
  loaderText: string;

  constructor() {
    this.showLoader = false;
    this.loaderText = '';
  }

  startLoader(text = 'Loading') {
    this.showLoader = true;
    this.loaderText = text;
  }

  stopLoader() {
    this.showLoader = false;
    this.loaderText = '';
  }
}
