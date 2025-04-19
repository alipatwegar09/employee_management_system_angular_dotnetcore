import { Routes } from '@angular/router';
import { EmployeeListComponent } from './componenet/employee-list/employee-list.component';

export const routes: Routes = [
    {
        path:'',
        component:EmployeeListComponent
    },
    {
        path:'employee-list',
        component:EmployeeListComponent
    }
];
