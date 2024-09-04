import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Item } from '../../../../store/state';

@Component({
    selector: 'items-on-sale',
    templateUrl: './items-on-sale.component.html',
    styleUrl: './items-on-sale.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemsOnSaleComponent {
    @Input() items: Item[] = [];

    itemsFiltered: Item[] = [];
    itemsForPage: Item[] = [];
    itemsPerPage = 5;

    constructor(private cd: ChangeDetectorRef) {}

    ngOnChanges() {
        this.getItemsOnSale();
    }

    getItemsOnSale() {
        this.itemsFiltered = this.items.filter(
            (item: Item) =>
                item.currentDiffFromAvgPrice !== null &&
                item.currentPrice !== item.averagePrice &&
                item.currentDiffFromAvgPrice < 0
        );
        console.log(this.itemsFiltered);
        this.itemsForPage = this.itemsFiltered.slice(0, this.itemsPerPage);

        this.cd.markForCheck();
    }
}
