import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.css'],
    standalone: false
})
export class AlertComponent {
  @Input() message!: string;
  @Output() close = new EventEmitter<void>();
  constructor() { }

  onClose() {
    this.close.emit();
  }
}
