import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule  }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';

import { AppComponent }  from './app.component';
import { routing }        from './app-routing.module';

import { AlertComponent } from './_components/alert.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthenticationService } from './_services/authentication.service';
import { AlertService } from './_services/alert.service';
import { UserService } from './_services/user.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { OnboradingFormComponent } from './onborading-form/onborading-form.component';
import { StudentCardComponent } from './student-card/student-card.component';

import {MatCardModule, MatGridListModule } from '@angular/material';
import { StudentsListComponent } from './students-list/students-list.component';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatDialogModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { MatDatepickerModule, MatIconModule, MatNativeDateModule } from '@angular/material';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        HttpClientModule,
        routing,
        MatCardModule,
        MatGridListModule,
        MatInputModule,
        MDBBootstrapModule.forRoot(),
        MatCheckboxModule,
        MatSelectModule,
        BrowserAnimationsModule,
        MatButtonModule,
        FormsModule,
        MatDatepickerModule,
        MatIconModule,
        MatNativeDateModule,
        MatDialogModule
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        RegisterComponent,
        OnboradingFormComponent,
        StudentCardComponent,
        StudentsListComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
