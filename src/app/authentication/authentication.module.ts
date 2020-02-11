import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginPage } from './pages/login/login.page';

@NgModule({
  declarations: [LoginPage],
  imports: [CommonModule, AuthenticationRoutingModule]
})
export class AuthenticationModule {}
