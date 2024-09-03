import { createFeature, createReducer, on } from '@ngrx/store';
import { DashboardState } from './state';
import * as dashboardActions from './actions';

export const initialState: DashboardState = {
    items: []
};

const dashboardFeature = createFeature({
    name: 'dashboard',
    reducer: createReducer(
        initialState,
        on(dashboardActions.loadItemsSuccess, (state, { items }) => ({ ...state, items }))
    )
});

export const { name: dashboardFeatureKey, reducer: dashboardReducer, selectItems } = dashboardFeature;
