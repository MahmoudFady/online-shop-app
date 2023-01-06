import { Subject, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class ModalService {
  private modal = new BehaviorSubject({ hide: true, message: '' });
  private modalResult = new Subject<boolean>();
  displayModal(message: string) {
    this.modal.next({ hide: false, message });
  }
  private hideModal() {
    this.modal.next({ hide: true, message: '' });
  }
  setModalResult(result: boolean) {
    this.hideModal();
    this.modalResult.next(result);
  }
  getModalResult() {
    return this.modalResult.asObservable();
  }
  getModal() {
    return this.modal.asObservable();
  }
}
