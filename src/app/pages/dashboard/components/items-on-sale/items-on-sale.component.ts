import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core';
import { Item } from '../../../../store/state';
import { PageEvent } from '@angular/material/paginator';

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
    pageSize = 5;

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

        // sort by currentDiffFromAvgPrice ascending
        this.itemsFiltered.sort((a, b) => {
            return a.currentDiffFromAvgPrice! - b.currentDiffFromAvgPrice!;
        });
        console.log(this.itemsFiltered);
        this.itemsForPage = this.itemsFiltered.slice(0, this.pageSize);

        this.cd.markForCheck();
    }

    handlePageEvent(event: PageEvent) {
        const startIndex = event.pageIndex * event.pageSize;
        const endIndex = startIndex + event.pageSize;
        this.itemsForPage = this.itemsFiltered.slice(startIndex, endIndex);
        this.cd.markForCheck();
    }
}
