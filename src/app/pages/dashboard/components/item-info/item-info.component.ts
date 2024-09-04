import { Component, Input } from '@angular/core';
import { Item } from '../../../../store/state';

@Component({
    selector: 'item-info',
    templateUrl: './item-info.component.html',
    styleUrl: './item-info.component.scss'
})
export class ItemInfoComponent {
    @Input() item: Item | undefined;

    getImageLink(width: number) {
        if (!this.item) {
            return '';
        }

        return this.item.imageLink.replace('{width}', width.toString());
    }
}
