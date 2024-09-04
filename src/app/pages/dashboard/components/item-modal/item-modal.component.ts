import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../../../store/state';

@Component({
    selector: 'item-modal',
    templateUrl: './item-modal.component.html',
    styleUrl: './item-modal.component.scss'
})
export class ItemModalComponent {
    @Input() item: Item | undefined;
    @Output() close = new EventEmitter<void>();
}
