import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginPage } from './pages/login/login.page';

@NgModule({
  declarations: [LoginPage],
  imports: [CommonModule, AuthenticationRoutingModule, ReactiveFormsModule]
})
export class AuthenticationModule {}
