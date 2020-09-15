import { Component, AfterViewInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { PageComponent } from '../page/page.component';
import { NgForm, NgModel } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';

@Component({
  template: ''
})
export class ValidationPageComponent extends PageComponent implements AfterViewInit {
  @ViewChild('form', { static: false }) form: NgForm;

  constructor(titleService: Title,
    metaService: Meta,
    @Inject(DOCUMENT) document: Document,
    @Inject(PLATFORM_ID) private platformId: Object) {
    super(titleService, metaService, document)
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.setControls();
    }
  }

  setControls() {
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