import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../store/state';
import { Observable } from 'rxjs';
import { ItemResponse } from '../types/api-types';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    constructor(private http: HttpClient) {}

    getItems(): Observable<ItemResponse[]> {
        const url = 'https://twelveminusfive-shopping-e161e385765b.herokuapp.com/api/aldi/items';

        return this.http.get<ItemResponse[]>(url);
    }
}
