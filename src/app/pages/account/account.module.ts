import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MarketplaceCardModule } from 'src/app/shared/components/marketplace-card/marketplace-card.module';

import { RouterModule } from '@angular/router';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AccountCardModule } from 'src/app/shared/components/account-card/account-card.module';
import { AppMarketplaceCardTwoModule } from 'src/app/shared/components/app-marketplace-card-two/app-marketplace-card-two.module';
import { ListCardModule } from 'src/app/shared/components/list-card/list-card.module';
import { PageTopSectionModule } from 'src/app/shared/components/page-top-section/page-top-section.module';
import { SubscriptionCardModule } from 'src/app/shared/components/subscription-card/subscription-card.module';
import { AccountRoutingModule } from './account-routing.module';
import { AccountSidebarComponent } from './account-sidebar/account-sidebar.component';
import { AccountTopSectionComponent } from './account-top-section/account-top-section.component';
import { AccountComponent } from './account.component';
import { MyListComponent } from './my-list/my-list.component';
import { ProfileVarificationComponent } from './profile-varification/profile-varification.component';
import { ProfileComponent } from './profile/profile.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    AccountComponent,
    MyListComponent,
    ProfileComponent,
    WishlistComponent,
    AccountSidebarComponent,
    SubscriptionComponent,
    ProfileVarificationComponent,
    AccountTopSectionComponent,
    AccountSettingsComponent,
  ],
  imports: [
    CommonModule,
    ListCardModule,
    AccountCardModule,
    AccountRoutingModule,
    PageTopSectionModule,
    RouterModule,
    SubscriptionCardModule,
    NgxDropzoneModule,
    MarketplaceCardModule,
    AppMarketplaceCardTwoModule,
    ReactiveFormsModule,
    MatIconModule

  ],
})
export class AccountModule {}
