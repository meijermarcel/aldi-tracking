import { createFeature, createReducer, on } from '@ngrx/store';
import { DashboardState } from './state';
import * as dashboardActions from './actions';

export const initialState: DashboardState = {
    items: [],
    isLoading: false
};

const dashboardFeature = createFeature({
    name: 'dashboard',
    reducer: createReducer(
        initialState,
        on(dashboardActions.loadItemsSuccess, (state, { items }) => ({ ...state, isLoading: false, items })),
        on(dashboardActions.loadItems, (state) => ({ ...state, isLoading: true }))
    )
});

export const { name: dashboardFeatureKey, reducer: dashboardReducer, selectItems, selectIsLoading } = dashboardFeature;
