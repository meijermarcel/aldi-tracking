import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { provideEffects } from '@ngrx/effects';
import { provideStore, provideState } from '@ngrx/store';
import { routerReducer, provideRouterStore } from '@ngrx/router-store';
import * as dashboardEffects from './store/effects';
import { dashboardFeatureKey, dashboardReducer } from './store/reducers';
import { provideHttpClient } from '@angular/common/http';
import { ItemsOnSaleComponent } from './pages/dashboard/components/items-on-sale/items-on-sale.component';
import { ItemInfoComponent } from './pages/dashboard/components/item-info/item-info.component';
@NgModule({
    declarations: [AppComponent, DashboardComponent, ItemsOnSaleComponent, ItemInfoComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [
        provideHttpClient(),
        provideStore({
            router: routerReducer
        }),
        provideRouterStore(),
        provideState(dashboardFeatureKey, dashboardReducer),
        provideEffects(dashboardEffects)
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
