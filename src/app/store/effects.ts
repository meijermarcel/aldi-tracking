import { DashboardService } from '../services/dashboard.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { inject } from '@angular/core';
import * as dashboardActions from './actions';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { Item } from './state';
import { of } from 'rxjs';
import { ItemResponse } from '../types/api-types';

export const loadItemsEffect = createEffect(
    (actions$ = inject(Actions), dashboardService = inject(DashboardService)) => {
        return actions$.pipe(
            ofType(dashboardActions.loadItems),
            mergeMap(() => {
                return dashboardService.getItems().pipe(
                    map((items: ItemResponse[]) => {
                        const mappedItems: Item[] = items.map((item) => {
                            // sort storeItemPrices by dateTime
                            item.storeItemPrices.sort((a, b) => {
                                return new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime();
                            });
                            return {
                                id: item.id,
                                description: item.description,
                                units: item.units,
                                amount: item.amount,
                                imageLink: item.imageLink,
                                currentPrice: item.storeItemPrices.length > 0 ? item.storeItemPrices[0].price : null,
                                storeItemPrices: item.storeItemPrices.map((price) => {
                                    return {
                                        id: price.id,
                                        price: price.price,
                                        dateTime: price.dateTime
                                    };
                                })
                            };
                        });

                        return dashboardActions.loadItemsSuccess({ items: mappedItems });
                    }),
                    catchError((error: any) => of(dashboardActions.loadItemsFailure({ error })))
                );
            })
        );
    },
    { functional: true }
);
