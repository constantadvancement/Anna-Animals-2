import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { provideHttpClient, withFetch, withInterceptorsFromDi } from "@angular/common/http";
import { ApiServiceService } from './api-service.service';
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    // List any additional components, directives, or pipes here
  ],
  imports: [
    BrowserModule,
    FormsModule, // Include only if you are using template-driven forms
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    ApiServiceService
  ],
  bootstrap: [ReactiveFormsModule] // Replace AppComponent with your root component
})
export class AppModule { }
