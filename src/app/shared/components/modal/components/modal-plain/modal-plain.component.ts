import { Component } from '@angular/core';
import { BaseModal } from '../../base.component';

@Component({
  selector: 'bad-modal-plain',
  templateUrl: './modal-plain.component.html',
  styleUrls: ['./modal-plain.component.scss'],
  exportAs: 'modal'
})
export class ModalPlainComponent extends BaseModal {}
