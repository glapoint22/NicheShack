import { Directive, Input } from '@angular/core';
import { Validator, ValidationErrors, NG_VALIDATORS, FormGroup } from '@angular/forms';

@Directive({
  selector: '[matchValue]',
  providers: [{ provide: NG_VALIDATORS, useExisting: MatchValueDirective, multi: true }]
})
export class MatchValueDirective implements Validator {
  @Input('matchValue') controls: Array<string> = []

  validate(formGroup: FormGroup): ValidationErrors {
    let control1 = formGroup.controls[this.controls[0]];
    let control2 = formGroup.controls[this.controls[1]];

    // Return null if controls are not initialized
    if (!control1 || !control2) return null;

    // See if values match
    if (control1.value != control2.value) {
      control2.setErrors({ matchValueError: true });
    } else {
      control2.setErrors(null);
      control2.markAsPristine();
      return null;
    }
  }
}