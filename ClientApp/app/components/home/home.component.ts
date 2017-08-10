import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

import { AppState } from './../../app-store';
import { AuthState } from '../../auth-store/auth.store';
import { AccountService } from '../../services/account.service';

@Component({
    selector: 'home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy{
	public isCollapsed: boolean = true;
	public languages = [
		{ locale: 'en', description: 'English' },
		{ locale: 'fr', description: 'French' }
	];
	public currentLanguage = this.languages[0];

	public authState$: Observable<AuthState>;

	constructor(
		public store: Store<AppState>,
		public translation: TranslateService,
		public accountService: AccountService
	) {
		translation.getTranslation(this.currentLanguage.locale);
	}


	public ngOnInit(): void {
		console.log('home');
		this.authState$ = this.store.select(state => state.auth);
		console.log(this.authState$);
	}

	public toggleNav() {
		this.isCollapsed = !this.isCollapsed;
	}

	public setLang(lang: any) {
		this.currentLanguage = lang;
		this.translation.use(lang.locale);
	}

	onButtonClick(lang?: any) {
		console.log(this.currentLanguage);
		this.translation.use(lang.locale);
	}

	public ngOnDestroy(): void {
		
	}
}
