import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

interface FormLogin {
  login: FormControl<string | null>;
  password: FormControl<string | null>;
  check: FormControl<boolean>;
}

@Component({
  selector: 'app-modal-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatCheckboxModule,
    ReactiveFormsModule,
  ],
  templateUrl: './modal-login.component.html',
  styleUrl: './modal-login.component.scss',
})
export class ModalLoginComponent {
  hide = true;
  public color = 'primary';
  public formLogin = new FormGroup<FormLogin>({
    login: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    check: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  constructor() {}

  ngOnInit(): void {
    this.formLogin.valueChanges.subscribe((v) => {});
  }
}
