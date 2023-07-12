import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface AddressFormGroup {
  address: FormControl<string | null>;
}

interface UserModel {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  city: FormControl<string | null>;
  addresses: FormArray<FormGroup<AddressFormGroup>>
}

@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent {
  emailControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('');
  cityControl = new FormControl('', [Validators.required]);

  addresesFormArray = new FormArray<FormGroup<AddressFormGroup>>([
    new FormGroup({
      address: new FormControl(''),
    }),
  ]);

  userModel: FormGroup<UserModel> = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl,
    city: this.cityControl,
    addresses: this.addresesFormArray,
  });

  addAddressControl(): void {
    this.addresesFormArray.push(
      this.fb.group({
        address: [''],
      })
    )
  }

  constructor(private fb: FormBuilder) {
    console.log(this.addresesFormArray);
  }

  deleteFormGroupFromAddressesFormArray(index: number): void {
    this.addresesFormArray.removeAt(index);
  }
}