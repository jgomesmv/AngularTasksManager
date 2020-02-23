import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  host: { class: 'p-login' }
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      postCode: ['', [Validators.required, Validators.pattern('^[0-9]{4}(?:-[0-9]{3})?$')]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    const returnUrlKey = 'returnUrl';
    this.returnUrl = this.route.snapshot.queryParams[returnUrlKey] || '/';
  }

  get formControls() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }

    const isAuthenticated = this.authenticationService.login(
      this.formControls.username.value,
      this.formControls.postCode.value,
      this.formControls.password.value
    );

    if (isAuthenticated) {
      this.router.navigate([this.returnUrl]);
    }
  }
}
