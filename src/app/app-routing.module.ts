import { NgModule } from '@angular/core';

import {
  Routes,
  RouterModule,
  PreloadAllModules,
} from '@angular/router';


//Adding Routes...
const appRoutes: Routes = [
{path: '', redirectTo: '/recipes', pathMatch: 'full'},
{path: 'recipes',
 loadChildren: () => import('./recipes/recipes.module')
 .then(m => m.RecipesModule)
},
{path: 'auth',
  loadChildren: () => import('./auth/auth.module')
  .then(m => m.AuthModule)
}
]

@NgModule({
  imports:[RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports:[RouterModule]
})

export class AppRoutingModule{}
