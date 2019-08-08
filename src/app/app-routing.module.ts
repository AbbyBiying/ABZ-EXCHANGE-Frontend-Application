import { NgModule } from "@angular/core";
import { RouterModule, Routes, PreloadAllModules } from "@angular/router";

import { HomeComponent } from "./core/home/home.component";
import { ErrorPageComponent } from "./error-page/error-page.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuardService } from "./auth/auth-guard.service";

const appRoutes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: "users",
    loadChildren: () => import("./users/users.module").then(m => m.UsersModule)
  },
  {
    path: "listings",
    loadChildren: () =>
      import("./listings/listings.module").then(m => m.ListingsModule)
  },
  {
    path: "offers",
    loadChildren: () =>
      import("./offers/offers.module").then(m => m.OffersModule)
  },
  {
    path: "locations",
    loadChildren: () =>
      import("./locations/locations.module").then(m => m.LocationsModule)
  },
  {
    path: "groups",
    loadChildren: () =>
      import("./groups/groups.module").then(m => m.GroupsModule)
  },
  // {
  //   path: 'exchanges',
  //   loadChildren: () =>
  //     import("./exchanges/exchanges.module").then(m => m.ExchangesModule)
  // },
  {
    path: "successful-exchanges",
    loadChildren: () =>
      import("./successful-exchanges/successful-exchanges.module").then(
        m => m.SuccessfulExchangesModule
      )
  },
  {
    path: "images",
    loadChildren: () =>
      import("./images/images.module").then(m => m.ImagesModule)
  },

  {
    path: "not-found",
    component: ErrorPageComponent,
    data: { message: "Page not found!" }
  },
  // wild card route, any unknown route, has to be the last route
  { path: "**", redirectTo: "/not-found" }
];

@NgModule({
  imports: [
    // Provides a preloading strategy that preloads all modules as quickly as possible
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
    // ,{ enableTracing: true } ),
  ],
  exports: [RouterModule],

  declarations: [DashboardComponent, ErrorPageComponent],
  providers: []
})
export class AppRoutingModule {}
