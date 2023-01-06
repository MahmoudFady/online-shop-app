import { ModalService } from './modal.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  modal!: { hide: boolean; message: string };
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.getModal().subscribe({
      next: (modal) => {
        this.modal = modal;
      },
    });
  }
  onClose(resualt: boolean) {
    this.modalService.setModalResult(resualt);
  }
}
