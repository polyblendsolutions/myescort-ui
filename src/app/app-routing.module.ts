import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomPreloadingStrategy} from './core/utils/preloading-strategy';
import {PagesComponent} from './pages/pages.component';
import {UserAuthGuard} from "./auth-guard/user-auth.guard";
import {UserAuthStateGuard} from "./auth-guard/user-auth-state.guard";

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'login',
        loadChildren: () => import('./pages/user/login/login.module').then(m => m.LoginModule),
        canActivate: [UserAuthStateGuard],
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./pages/sign-up/sign-up.module').then(m => m.SignUpModule),
        canActivate: [UserAuthStateGuard],

      },
      {
        path: 'ads',
        loadChildren: () => import('./pages/product-list/product-list.module').then(m => m.ProductListModule)
      },
      {
        path: 'ad-details',
        loadChildren: () => import('./pages/product-details/product-details.module').then(m => m.ProductDetailsModule)
      },
      {
        path: 'account',
        loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
        canActivate: [UserAuthGuard],
      },
      {
        path: 'account-details',
        loadChildren: () => import('./pages/account-details/account-details.module').then(m => m.AccountDetailsModule)
      },
      {
        path: 'create-new',
        loadChildren: () => import('./pages/create-ads-three/create-ads-three.module').then(m => m.CreateAdsThreeModule),
        canActivate: [UserAuthGuard],
      },
      {
        path: "blogs",
        loadChildren: () => import('./pages/blogs/blogs.module').then(m => m.BlogsModule)
      },
      {
        path: "massage/:id",
        loadChildren: () => import('./pages/spot/spot.module').then(m => m.SpotModule)
      },
      {
        path: "escort/:id",
        loadChildren: () => import('./pages/spot/spot.module').then(m => m.SpotModule)
      },
      {
        path: "verified-otp",
        loadChildren: () => import('./pages/verified-otp/verified-otp.module').then(m => m.VerifiedOtpModule)
      },

      {
        path: "blog-details/:id",
        loadChildren: () => import('./pages/blog-details/blog-details.module').then(m => m.BlogDetailsModule)
      },
      {
        path: "coming-soon",
        loadChildren: () => import('./pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule)
      },
      {
        path: 'pages',
        loadChildren: () => import('./pages/additional-page-view/additional-page-view.module').then(m => m.AdditionalPageViewModule),
        data: {preload: false, delay: false}
      },
      {
        path: '**',
        redirectTo: 'home',
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    preloadingStrategy: CustomPreloadingStrategy
  })],
  providers: [UserAuthGuard, UserAuthStateGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
