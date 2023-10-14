import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.scss']
})

export class PasswordStrengthComponent {
  isWeak: boolean = false;
  isMedium: boolean = false;
  isStrong: boolean = false;


  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.passwordForm = this.fb.group({ password: ['', Validators.minLength(8) ]});
    
    this.setupPasswordChangeSubscription();
  }

  private setupPasswordChangeSubscription() {
    const passwordControl = this.passwordForm.get('password');
    if (passwordControl) {
      passwordControl.valueChanges.subscribe(value => {
        this.checkPasswordStrength(value);
      });
    }
  }

  checkPasswordStrength(password: string) {
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasDigits = /\d/.test(password);
    const hasSymbols = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

    this.isWeak = false;
    this.isMedium = false;
    this.isStrong = false;

     if (password.length < 8) {
      this.isWeak = true;
    } else if (hasLetters && hasDigits && hasSymbols) {
      this.isStrong = true;
    } else if ((hasLetters && hasDigits) || (hasDigits && hasSymbols) || (hasLetters && hasSymbols)) {
      this.isMedium = true;
    } else {
      this.isWeak = true;
    }
  }
}