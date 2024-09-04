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
                            // sort storeItemPrices by dateTime ascending
                            item.storeItemPrices.sort((a, b) => {
                                return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
                            });

                            // current price is last price in sorted array
                            const currentPrice =
                                item.storeItemPrices.length > 0
                                    ? item.storeItemPrices[item.storeItemPrices.length - 1].price
                                    : null;

                            // calculate average price
                            const averagePrice =
                                item.storeItemPrices.length > 0
                                    ? getAverage(item.storeItemPrices.map((price) => price.price))
                                    : null;

                            // calculate difference from average price
                            let currentDiffFromAvgPrice = null;
                            if (currentPrice !== null && averagePrice !== null) {
                                currentDiffFromAvgPrice = currentPrice - averagePrice;
                            }

                            return {
                                id: item.id,
                                description: item.description,
                                units: item.units,
                                amount: item.amount,
                                imageLink: item.imageLink,
                                currentPrice,
                                averagePrice,
                                currentDiffFromAvgPrice,
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

function getAverage(arr: number[]): number {
    return twoDecimals(arr.reduce((acc, val) => acc + val, 0) / arr.length);
}

function twoDecimals(num: number): number {
    return Math.round(num * 100) / 100;
}
