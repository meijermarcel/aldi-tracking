import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadItems } from '../../store/actions';
import { Item } from '../../store/state';
import { Observable } from 'rxjs';
import { selectItems } from '../../store/reducers';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    items$: Observable<Item[]> = new Observable<Item[]>();

    constructor(private store: Store) {}

    ngOnInit() {
        this.store.dispatch(loadItems());
        this.items$ = this.store.select(selectItems);
    }
}
