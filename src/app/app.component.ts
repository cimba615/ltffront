import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { CacheService } from './services/cache.service';

import { Router, NavigationEnd } from '@angular/router';
import {  Injectable  } from '@angular/core';

@Component({
    selector: 'ltf-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, AfterViewInit {
    title = 'Les Trois Fleurs';
    resizeTimeout: null | ReturnType<typeof setTimeout> = null;
    screenWidth = 0;

    constructor(
        private router: Router,
        private cacheService: CacheService) { }

    ngOnInit() {
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });

        this.cacheService.init();
    }

    ngAfterViewInit() {
        this.screenWidth = window.outerWidth;
    }

    @HostListener('window:resize', ['$event'])
    onResize(e) {
        // debounce resize, wait for resize to finish before doing stuff
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = setTimeout((() => {
            if (this.screenWidth !== e.target.outerWidth) {
                window.location.reload();
            }
            console.log();
        }).bind(this), 100);
    }
}
