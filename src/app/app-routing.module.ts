import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentCardComponent } from './student-card/student-card.component'
import { OnboradingFormComponent } from './onborading-form/onborading-form.component'
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [
    // { path: '', redirectTo:'login',pathMatch:'full'},
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'studentList', component: StudentsListComponent },
    { path: 'studentCard', component: StudentCardComponent },
    { path: 'onboardingForm', component: OnboradingFormComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
