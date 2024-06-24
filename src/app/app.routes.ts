import { Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { UpdateComponent } from './update/update.component';
import { SelectComponent } from './select/select.component';

export const routes: Routes = [
  {
    path: '',
    component: SelectComponent,
    title: 'Home'
  },
  {
    path: 'create',
    component: CreateComponent,
    title: 'Create'
  },
  {
    path: 'create/:id',
    component: CreateComponent,
    title: 'Update'
  },
  {
    path: 'update',
    component: UpdateComponent,
    title: 'Update'
  },

];
