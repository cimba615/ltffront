import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponent } from './components/shared/error/error.component';
import { HomeComponent } from './components/browsing/home/home.component';
import { FlowersComponent } from './components/browsing/flowers/flowers.component';
import { PlantsComponent } from './components/browsing/plants/plants.component';
import { OccasionsComponent } from './components/browsing/occasions/occasions.component';
import { GiftsComponent } from './components/browsing/gifts/gifts.component';
import { GalleryComponent } from './components/browsing/gallery/gallery.component';
import { WeddingsComponent } from './components/browsing/gallery/weddings/weddings.component';
import { EventsComponent } from './components/browsing/gallery/events/events.component';
import { LandscapingComponent } from './components/browsing/gallery/landscaping/landscaping.component';
import { AboutusComponent } from './components/browsing/aboutus/aboutus.component';
import { CheckoutComponent } from './components/browsing/checkout/checkout.component';
import { CheckoutDetailsComponent } from './components/browsing/checkout-details/checkout-details.component';
import { CreateBouquetComponent } from './components/browsing/create-bouquet/create-bouquet.component';
import { OccasionProductsComponent } from './components/browsing/occasion-products/occasion-products.component';
import { ProductCartComponent } from './components/browsing/product-cart/product-cart.component';
import { SpecialPaymentComponent } from './components/browsing/special-payment/special-payment.component';
import { SpecialPaymentLBPComponent } from './components/browsing/special-payment-lbp/special-payment-lbp.component';
import { PgHookModule } from './modules/pg-hook/pg-hook.module';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/browsing/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { CheckoutGuard } from './guards/checkout.guard';
import { ResetPassComponent } from './components/reset-pass/reset-pass.component';
import { ValidatePassComponent } from './components/validate-pass/validate-pass.component';
import { BundleCartComponent } from './components/browsing/bundle-cart/bundle-cart.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'passReset',
    component: ResetPassComponent
  },
  {
    path: 'passValidate/:email',
    component: ValidatePassComponent
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfileComponent
  },
  {
    path: 'flowers',
    component: FlowersComponent
  },
  {
    path: 'flowers/:name/:categId',
    component: FlowersComponent
  },
  {
    path: 'flowers/:categId',
    component: FlowersComponent
  },
  {
    path: 'plants',
    component: PlantsComponent
  },
  {
    path: 'plants/:name/:categId',
    component: PlantsComponent
  },
  {
    path: 'plants/:categId',
    component: PlantsComponent
  },
  {
    path: 'occasions',
    component: OccasionsComponent
  },
  {
    path: 'gifts',
    component: GiftsComponent
  },
  {
    path: 'gifts/:name/:categId',
    component: GiftsComponent
  },
  {
    path: 'gifts/:categId',
    component: GiftsComponent
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    children: [
      {
        path: 'weddings',
        component: WeddingsComponent
      },
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'landscaping',
        component: LandscapingComponent
      }
    ]
  },
  {
    path: 'aboutus',
    component: AboutusComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'checkoutDetails',
    canActivate: [CheckoutGuard],
    component: CheckoutDetailsComponent
  },
  {
    path: 'createBouquet',
    component: CreateBouquetComponent
  },
  {
    path: 'occasionProducts/:name/:occasionId',
    component: OccasionProductsComponent
  },
  {
    path: 'occasionProducts/:occasionId',
    component: OccasionProductsComponent
  },
  {
    path: 'shopProduct/:name/:id',
    component: ProductCartComponent
  },
  {
    path: 'shopProduct/:id',
    component: ProductCartComponent
  },
  {
    path: 'shopBundle/:name/:id',
    component: BundleCartComponent
  },
  {
    path: 'shopBundle/:id',
    component: BundleCartComponent
  },
  {
    path: 'specialPayment',
    component: SpecialPaymentComponent
  },
  {
    path: 'specialPaymentLBP',
    component: SpecialPaymentLBPComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login'
  },
  {
    path: '**',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PgHookModule
  ],
  exports: [RouterModule, PgHookModule]
})
export class AppRoutingModule { }
