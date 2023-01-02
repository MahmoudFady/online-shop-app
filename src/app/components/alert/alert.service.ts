import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AlertService {
  private alert = new BehaviorSubject<{
    hide: boolean;
    message: string;
    bgColor: string;
  }>({ hide: true, message: '', bgColor: '' });

  constructor() {}
  displayAlert(message: string, bgColor: string) {
    this.alert.next({ hide: false, message, bgColor });
    setTimeout(() => {
      this.hideAlert();
    }, 900);
  }
  hideAlert() {
    this.alert.next({ hide: true, message: '', bgColor: '' });
  }
  getAlert() {
    return this.alert.asObservable();
  }
}
