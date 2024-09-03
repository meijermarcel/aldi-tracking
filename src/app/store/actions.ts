import { createAction, props } from '@ngrx/store';
import { Item } from './state';

export const loadItems = createAction('[Dashboard] Load Items');
export const loadItemsSuccess = createAction('[Dashboard] Load Items Success', props<{ items: Item[] }>());
export const loadItemsFailure = createAction('[Dashboard] Load Items Failure', props<{ error: any }>());
