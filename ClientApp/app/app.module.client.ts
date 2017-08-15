import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { sharedConfig } from './app.module.shared';
import { StoreModule } from '@ngrx/store';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
//import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ApiTranslationLoader } from './services/api-translation-loader.service';

// Import the Animations module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Import the ButtonsModule
import { ButtonsModule } from '@progress/kendo-angular-buttons';

import { BsDropdownModule } from 'ngx-bootstrap';

// Services
import { ContentService } from './services/content.service';
import { DataService } from './services/data.service';
import { UtilityService } from './services/utility.service';

import { HomeComponent } from './components/home/home.component';
import { appReducer } from './app-store';
import { FormControlService } from './shared/forms/form-control.service';
import { ValidationService } from './shared/forms/validation.service';
import { AccountService } from './services/account.service';
import { AuthTokenService } from './auth-token/auth-token.service';
import { ProductService } from './services/shop/product.service';



import { LoggedInActions } from './auth-store/logged-in.actions';
import { AuthTokenActions } from './auth-token/auth-token.actions';
import { AuthReadyActions } from './auth-store/auth-ready.actions';
import { ProfileActions } from './profile/profile.actions';



@NgModule({
    bootstrap: sharedConfig.bootstrap,
	declarations: [
		HomeComponent, sharedConfig.declarations
		],
    imports: [
        BrowserModule,
		FormsModule,
		ReactiveFormsModule,
        HttpModule,
        BrowserAnimationsModule,
		ButtonsModule,
		...sharedConfig.imports,
		TranslateModule.forRoot({ loader: { provide: TranslateLoader, useClass: ApiTranslationLoader } }),
		BsDropdownModule.forRoot(),
		StoreModule.provideStore(appReducer),

	],
    providers: [
		{ provide: 'ORIGIN_URL', useValue: location.origin }
		, ContentService
		, DataService
		, UtilityService
		, FormControlService
		, ValidationService
		, AccountService
		, AuthTokenService
		, LoggedInActions
		, AuthTokenActions
		, AuthReadyActions
		, ProfileActions
		, ProductService

		
    ]
})
export class AppModule {
}
