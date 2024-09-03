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
import { ItemsTableComponent } from './pages/dashboard/components/items-table/items-table.component';
@NgModule({
    declarations: [AppComponent, DashboardComponent, ItemsTableComponent],
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
