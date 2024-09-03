import { Component, Input } from '@angular/core';
import { Item } from '../../../../store/state';

@Component({
    selector: 'items-table',
    templateUrl: './items-table.component.html',
    styleUrl: './items-table.component.scss'
})
export class ItemsTableComponent {
    @Input() items: Item[] = [];

    ngOnChanges() {
        console.log(this.items);
    }
}
