import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  NonNullableFormBuilder,
  ValidatorFn,
  AbstractControl,
} from '@angular/forms';
import { NzFormTooltipIcon } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  validateForm: FormGroup<{
    entity: FormControl<string>;
    project: FormControl<string>;
    riskassesment: FormControl<string>;
    address: FormControl<string>;
    date: FormControl<Date | null>;
    supervisor: FormControl<string>;
    dbyd: FormControl<string>;
  }>;
  captchaTooltipIcon: NzFormTooltipIcon = {
    type: 'info-circle',
    theme: 'twotone',
  };

  submitForm(): void {
    if (this.validateForm.valid) {
      alert('Saved ' + JSON.stringify(this.validateForm.value));
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  // updateConfirmValidator(): void {
  //   /** wait for refresh value */
  //   Promise.resolve().then(() =>
  //     this.validateForm.controls.checkPassword.updateValueAndValidity()
  //   );
  // }

  // confirmationValidator: ValidatorFn = (
  //   control: AbstractControl
  // ): { [s: string]: boolean } => {
  //   if (!control.value) {
  //     return { required: true };
  //   } else if (control.value !== this.validateForm.controls.password.value) {
  //     return { confirm: true, error: true };
  //   }
  //   return {};
  // };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  constructor(private fb: NonNullableFormBuilder) {
    this.validateForm = this.fb.group({
      entity: ['', [Validators.required]],
      project: ['', [Validators.required]],
      riskassesment: ['', [Validators.required]],
      address: ['', [Validators.required]],
      date: this.fb.control<Date | null>(new Date()),
      supervisor: ['', []],
      dbyd: ['', []],
    });
  }
}
