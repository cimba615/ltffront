import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatBadgeModule } from '@angular/material/badge';

import { NgbModule, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { Ng5SliderModule } from 'ng5-slider';
import { RecaptchaModule } from 'ng-recaptcha';
// import { MasonryGalleryModule  } from 'ngx-masonry-gallery';
import { NgxMasonryModule } from 'ngx-masonry';

import { AppComponent } from './app.component';
import { ErrorComponent } from './components/shared/error/error.component';
import { HeaderComponent } from './components/browsing/header/header.component';
import { FooterComponent } from './components/browsing/footer/footer.component';
import { HomeComponent } from './components/browsing/home/home.component';
import { NgIfMediaQueryDirective } from './directives/ng-if-media-query.directive';
import { ProductComponent } from './components/product/product.component';
import { ProductsService } from './services/products.service';
import { FlowersComponent } from './components/browsing/flowers/flowers.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { RangeSliderComponent } from './components/shared/range-slider/range-slider.component';
import { PlantsComponent } from './components/browsing/plants/plants.component';
import { OccasionsComponent } from './components/browsing/occasions/occasions.component';
import { GiftsComponent } from './components/browsing/gifts/gifts.component';
import { GalleryComponent } from './components/browsing/gallery/gallery.component';
import { WeddingsComponent } from './components/browsing/gallery/weddings/weddings.component';
import { EventsComponent } from './components/browsing/gallery/events/events.component';
import { LandscapingComponent } from './components/browsing/gallery/landscaping/landscaping.component';
import { AboutusComponent } from './components/browsing/aboutus/aboutus.component';
import { MasonryDialogComponent } from './dialogs/masonry-dialog/masonry-dialog.component';
import { CheckoutComponent } from './components/browsing/checkout/checkout.component';
import { CheckoutDetailsComponent } from './components/browsing/checkout-details/checkout-details.component';
import { CreateBouquetComponent } from './components/browsing/create-bouquet/create-bouquet.component';
import { OccasionProductsComponent } from './components/browsing/occasion-products/occasion-products.component';
import { ProductCartComponent } from './components/browsing/product-cart/product-cart.component';
import { SpecialPaymentComponent } from './components/browsing/special-payment/special-payment.component';
import { SpecialPaymentLBPComponent } from './components/browsing/special-payment-lbp/special-payment-lbp.component';
import { SpecialPaymentService } from './services/special-payment.service';
import { ContactService } from './services/contact.service';
import { InterceptorService } from './services/interceptor.service';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { LoadingService } from './services/loading.service';
import { NotificationComponent } from './components/shared/notification/notification.component';
import { NotificationService } from './services/notification.service';
import { AreebaHookComponent } from './components/pgHook/areeba-hook/areeba-hook.component';
import { PgHookModule } from './modules/pg-hook/pg-hook.module';
import { CategoriesService } from './services/categories.service';
import { CacheService } from './services/cache.service';
import { OccasionsService } from './services/occasions.service';
import { SettingsService } from './services/settings.service';
import { TransactionService } from './services/transaction.service';
import { LoginComponent } from './components/login/login.component';
import { LoginService } from './services/login.service';
import { ProfileComponent } from './components/browsing/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { GalleryService } from './services/gallery.service';
import { LogisticsService } from './services/logistics.service';
import { OrderService } from './services/order.service';
import { AuthGuard } from './guards/auth.guard';
import { CheckoutGuard } from './guards/checkout.guard';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { ValidatePassComponent } from './components/validate-pass/validate-pass.component';
import { BundleComponent } from './components/bundle/bundle.component';
import { BundleCartComponent } from './components/browsing/bundle-cart/bundle-cart.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Platform } from '@angular/cdk/platform';
import { ShareButtonsConfig, ShareModule } from 'ngx-sharebuttons';
import { ShareButton, ShareButtonModule } from 'ngx-sharebuttons/button';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { library } from '@fortawesome/fontawesome-svg-core';

import { faFacebookF } from '@fortawesome/free-brands-svg-icons/faFacebookF';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter';
import { faRedditAlien } from '@fortawesome/free-brands-svg-icons/faRedditAlien';
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons/faGooglePlusG';
import { faTumblr } from '@fortawesome/free-brands-svg-icons/faTumblr';
import { faPinterestP } from '@fortawesome/free-brands-svg-icons/faPinterestP';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faVk } from '@fortawesome/free-brands-svg-icons/faVk';
import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons/faFacebookMessenger';
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons/faTelegramPlane';
import { faMix } from '@fortawesome/free-brands-svg-icons/faMix';
import { faXing } from '@fortawesome/free-brands-svg-icons/faXing';
import { faLine } from '@fortawesome/free-brands-svg-icons/faLine';

import { faCommentAlt } from '@fortawesome/free-solid-svg-icons/faCommentAlt';
import { faMinus } from '@fortawesome/free-solid-svg-icons/faMinus';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { faLink } from '@fortawesome/free-solid-svg-icons/faLink';
import { faExclamation } from '@fortawesome/free-solid-svg-icons/faExclamation';
import { faPrint } from '@fortawesome/free-solid-svg-icons/faPrint';
import { faCheck } from '@fortawesome/free-solid-svg-icons/faCheck';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons/faEnvelope';
import { NgMatSearchBarModule } from "./components/browsing/ng-mat-search-bar/ng-mat-search-bar.module"

import {
  faBook,
  faCoffee,
  faInfo,
  faLightbulb,
} from '@fortawesome/free-solid-svg-icons';

const icons = [
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faGooglePlusG,
  faPinterestP,
  faRedditAlien,
  faTumblr,
  faWhatsapp,
  faVk,
  faFacebookMessenger,
  faTelegramPlane,
  faMix,
  faXing,
  faCommentAlt,
  faBook,
  faLine,
  faEnvelope,
  faCheck,
  faPrint,
  faExclamation,
  faLink,
  faEllipsisH,
  faMinus,
  faLightbulb,
  faCoffee,
  faInfo,
];
const customConfig: ShareButtonsConfig = {
  include: ['facebook', 'instagram', 'google'],
  exclude: ['tumblr', 'stumble', 'vk'],
  theme: 'modern-light',
  gaTracking: true,
};
library.add(...icons);
import { RouterModule } from '@angular/router';
import { CartComponent } from './components/cart/cart.component';
import { TimeSlotDialogComponent } from './dialogs/time-slot-dialog/time-slot-dialog.component';
import { ShippingMethodDialogComponent } from './dialogs/shipping-method-dialog/shipping-method-dialog.component';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
@NgModule({
  declarations: [
    NgIfMediaQueryDirective,
    AppComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ProductComponent,
    FlowersComponent,
    CategoriesComponent,
    RangeSliderComponent,
    PlantsComponent,
    OccasionsComponent,
    GiftsComponent,
    GalleryComponent,
    WeddingsComponent,
    EventsComponent,
    LandscapingComponent,
    AboutusComponent,
    MasonryDialogComponent,
    CheckoutComponent,
    CheckoutDetailsComponent,
    CreateBouquetComponent,
    OccasionProductsComponent,
    ProductCartComponent,
    SpecialPaymentComponent,
    SpecialPaymentLBPComponent,
    LoadingComponent,
    NotificationComponent,
    AreebaHookComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    ResetPassComponent,
    ValidatePassComponent,
    BundleComponent,
    BundleCartComponent,
    CartComponent,
    TimeSlotDialogComponent,
    ShippingMethodDialogComponent,
    ClickStopPropagationDirective,
  ],
  imports: [
    NgMatSearchBarModule,
    MatAutocompleteModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    PgHookModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    MatBadgeModule,
    NgbModule,
    Ng5SliderModule,
    NgxMasonryModule,
    // MasonryGalleryModule ,
    FontAwesomeModule,
    RecaptchaModule,
    ShareModule,
    ShareButtonModule,
    ShareIconsModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA9e6_o50I9Z1aZJbFKXFtEGbSbo_kYGK4',
    }),
  ],
  providers: [
    Platform,
    AuthGuard,
    CheckoutGuard,
    NgbCarouselConfig,
    LoadingService,
    NotificationService,
    CacheService,
    LogisticsService,
    SettingsService,
    CategoriesService,
    OccasionsService,
    ProductsService,
    GalleryService,
    LoginService,
    SpecialPaymentService,
    ContactService,
    TransactionService,
    OrderService,
    ShareButton,
    DatePipe,
    { provide: MatDialogRef, useValue: {} },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true,
    },
  ],
  entryComponents: [
    LoadingComponent,
    NotificationComponent,
    MasonryDialogComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
