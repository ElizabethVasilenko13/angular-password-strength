import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})

export class PasswordStrengthComponent {
  isEasy = false;
  isMedium = false;
  isStrong = false;
  isShort = false;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({ password: [ '',
      Validators.minLength(8)
    ]});
    this.setupPasswordChangeSubscription();
  }

  private setupPasswordChangeSubscription() {
    this.passwordForm.get('password')?.valueChanges.subscribe(value => {
      this.checkPasswordStrength(value);
    });
  }

  public resetPassword() {
    this.passwordForm.get('password')?.setValue('');
  }

  private resetFlags() {
    this.isEasy = false;
    this.isMedium = false;
    this.isStrong = false;
    this.isShort = false;
  }

  private checkPasswordStrength(password: string) {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

    this.resetFlags();

    if (password.length === 0) {
      this.isShort = false;
    } else if (password.length < 8 && password.length > 0) {
      this.isShort = true;
    } else if (hasLetters && hasDigits && hasSymbols) {
      this.isStrong = true;
    } else if ((hasLetters && hasDigits) || (hasDigits && hasSymbols) || (hasLetters && hasSymbols)) {
      this.isMedium = true;
    } else {
      this.isEasy = true;
    }
  }
}