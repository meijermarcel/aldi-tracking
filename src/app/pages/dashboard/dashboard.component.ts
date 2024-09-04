import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadItems } from '../../store/actions';
import { Item } from '../../store/state';
import { Observable, Subscription } from 'rxjs';
import { selectIsLoading, selectItems } from '../../store/reducers';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
    items$: Observable<Item[]> = new Observable<Item[]>();
    isLoading$: Observable<boolean> = new Observable<boolean>();
    isLoading = false;
    isLoadingSubscription: Subscription;
    selectedItem: Item | null = null;

    constructor(private store: Store, private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.store.dispatch(loadItems());
        this.items$ = this.store.select(selectItems);
        // this.isLoading$ = this.store.select(selectIsLoading);
        this.isLoadingSubscription = this.store.select(selectIsLoading).subscribe((data) => {
            this.isLoading = data;
            this.cd.markForCheck();
        });
    }

    ngOnDestroy() {
        this.isLoadingSubscription.unsubscribe();
    }

    selectItem(event: Item) {
        this.selectedItem = event;
        this.cd.markForCheck();
    }
}
