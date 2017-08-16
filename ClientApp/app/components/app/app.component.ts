import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

import { AuthTokenService } from '../../auth-token/auth-token.service';
import { AppState } from './../../app-store';
import { AuthState } from '../../auth-store/auth.store';
import { AccountService } from '../../services/account.service';
import * as $ from 'jquery';





@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
    public isCollapsed: boolean = true;
    public languages = [
        { locale: 'en', description: 'English' },
        { locale: 'fr', description: 'French' }
    ];
    public currentLanguage = this.languages[0];

    public authState$: Observable<AuthState>;

	constructor(
		public tokens: AuthTokenService,
        public store: Store<AppState>,
        public translation: TranslateService,
        public accountService: AccountService
    ) {
        translation.getTranslation(this.currentLanguage.locale);
    }


    public ngOnInit(): void {
        this.initNav();
        this.authState$ = this.store.select(state => state.auth);
        
    }

    public toggleNav() {
        this.isCollapsed = !this.isCollapsed;
    }

    public setLang(lang: any) {
        this.currentLanguage = lang;
        this.translation.use(lang.locale);
    }

    public onLangSelect(lang?: any) {
        this.translation.use(lang.locale);
    }

    public ngOnDestroy(): void {
		this.tokens.unsubscribeRefresh();
    }
   


    private initNav():void{
        $.navigation = $('nav > ul.nav');

        $.panelIconOpened = 'icon-arrow-up';
        $.panelIconClosed = 'icon-arrow-down';

        //Default colours
        $.brandPrimary = '#20a8d8';
        $.brandSuccess = '#4dbd74';
        $.brandInfo = '#63c2de';
        $.brandWarning = '#f8cb00';
        $.brandDanger = '#f86c6b';

        $.grayDark = '#2a2c36';
        $.gray = '#55595c';
        $.grayLight = '#818a91';
        $.grayLighter = '#d1d4d7';
        $.grayLightest = '#f8f9fa';

        // Add class .active to current link
        $.navigation.find('a').each(function () {

            var cUrl = String(window.location).split('?')[0];

            if (cUrl.substr(cUrl.length - 1) == '#') {
                cUrl = cUrl.slice(0, -1);
            }

            if ($($(this))[0].href == cUrl) {
                $(this).addClass('active');

                $(this).parents('ul').add(this).each(function () {
                    $(this).parent().addClass('open');
                });
            }
        });

        // Dropdown Menu
        $.navigation.on('click', 'a', function (e) {

            if ($.ajaxLoad) {
                e.preventDefault();
            }

            if ($(this).hasClass('nav-dropdown-toggle')) {
                $(this).parent().toggleClass('open');
                resizeBroadcast();
            }

        });

        function resizeBroadcast() {

            var timesRun = 0;
            var interval = setInterval(function () {
                timesRun += 1;
                if (timesRun === 5) {
                    clearInterval(interval);
                }
                window.dispatchEvent(new Event('resize'));
            }, 62.5);
        }

        /* ---------- Main Menu Open/Close, Min/Full ---------- */
        $('.navbar-toggler').click(function () {


            if ($(this).hasClass('sidebar-toggler')) {
                $('#body').toggleClass('sidebar-hidden');
                resizeBroadcast();
            }

            if ($(this).hasClass('sidebar-minimizer')) {
                $('#body').toggleClass('sidebar-minimized');
                resizeBroadcast();
            }

            if ($(this).hasClass('aside-menu-toggler')) {
                $('#body').toggleClass('aside-menu-hidden');
                resizeBroadcast();
            }

            if ($(this).hasClass('mobile-sidebar-toggler')) {
                $('#body').toggleClass('sidebar-mobile-show');
                resizeBroadcast();
            }

        });

        $('.sidebar-close').click(function () {
            $('#body').toggleClass('sidebar-opened').parent().toggleClass('sidebar-opened');
        });

        /* ---------- Disable moving to top ---------- */
        $('a[href="#"][data-top!=true]').click(function (e) {
            e.preventDefault();
        });

        /****
* CARDS ACTIONS
*/

        $(document).on('click', '.card-actions a', function (e) {
            e.preventDefault();

            if ($(this).hasClass('btn-close')) {
                $(this).parent().parent().parent().fadeOut();
            } else if ($(this).hasClass('btn-minimize')) {
                var $target = $(this).parent().parent().next('.card-block');
                if (!$(this).hasClass('collapsed')) {
                    $('i', $(this)).removeClass($.panelIconOpened).addClass($.panelIconClosed);
                } else {
                    $('i', $(this)).removeClass($.panelIconClosed).addClass($.panelIconOpened);
                }

            } else if ($(this).hasClass('btn-setting')) {
                $('#myModal').modal('show');
            }

        });
    }
}
