import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';

@Component({
  template: '',
})
export class ValidationPageComponent implements AfterViewInit {
  @ViewChild('form', { static: false }) form: NgForm;

  ngAfterViewInit() {
    let interval = window.setInterval(() => {
      if (this.form && this.form.controls) {
        Object.keys(this.form.controls).forEach(key => {
          this.form.controls[key].valueChanges.subscribe(() => this.form.controls[key].markAsPristine());
        });
        window.clearInterval(interval);
      }
    }, 1);
  }

  onSubmit() {
    if (this.form.valid) {
      this.submitData();
    } else {
      Object.keys(this.form.controls).forEach(key => {
        if (!this.form.controls[key].valid) this.form.controls[key].markAsDirty();
      });
    }
  }

  valid(control: NgModel) {
    return control.pristine;
  }

  submitData() { }

}