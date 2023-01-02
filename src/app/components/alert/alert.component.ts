import { AlertService } from './alert.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  alert = { hide: true, message: '', bgColor: '' };

  constructor(private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.getAlert().subscribe({
      next: (alert) => {
        this.alert = alert;
      },
    });
  }
}
