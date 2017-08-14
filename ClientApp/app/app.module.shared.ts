import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { RegisterComponent } from './components/register/register.component';
import { RegisterConfirmationComponent } from './components/register/register-confirmation.component';
import { LoginComponent } from './components/login/login.component';

import { DynamicFormComponent } from './shared/forms/dynamic-form.component';
import { DynamicFormControlComponent } from './shared/forms/dynamic-form-control.component';
import { ErrorMessageComponent } from './shared/forms/error-message.component';
import { ErrorSummaryComponent } from './shared/forms/error-summary.component';
import { FormControlService } from './shared/forms/form-control.service';
import { ProductListComponent } from './components/shop/product.list.component';
import { ProductFilterPipe } from './filter/shop/product.filter.pipe';
import { StarComponent } from './components/shop/star.component'
import { ProductDetailComponent } from './components/shop/product.detail.component'

export const sharedConfig: NgModule = {
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
		FetchDataComponent,
		RegisterComponent,
		RegisterConfirmationComponent,
		LoginComponent,
		DynamicFormComponent,
		DynamicFormControlComponent,
		ErrorMessageComponent,
		ErrorSummaryComponent,
		ProductListComponent,
		ProductFilterPipe,
        StarComponent,
        ProductDetailComponent
    ],
	imports: [
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
			{ path: 'fetch-data', component: FetchDataComponent },
			{ path: 'register', component: RegisterComponent },
			{ path: 'registerconfirmation', component: RegisterConfirmationComponent },
			{ path: 'login', component: LoginComponent },
            { path: 'productlist', component: ProductListComponent },
            { path: 'productlist/product/:_id', component: ProductDetailComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
};
