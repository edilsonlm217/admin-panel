import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  /**
   * Determines if a given NgForm instance is valid.
   * @param ngForm - The NgForm instance to check.
   * @returns A boolean indicating whether the NgForm instance is valid or not.
   */
  resolveIsFormValid(ngForm: NgForm): boolean {
    return ngForm.form.status === 'VALID';
  }

  /**
   * This function takes an NgForm object as input and focuses on the first invalid field in the form.
   * @param ngForm - The NgForm object representing the form to be checked.
   * @returns void
   */
  focusMissingField(ngForm: NgForm): void {
    const control = ngForm.form.controls;
    try {
      for (const name in control) {
        if (control[name].invalid) {
          const element = document.getElementById(name);
          if (element) { element.focus() }
        }
      }
    } catch (error) {
      console.error(error);
    }

    this.blurAllField(control);
  }

  /**
   * This function blurs all the fields in the form.
   * @param controls - An object containing the form controls.
   * @returns void
   */
  blurAllField(controls: any): void {
    try {
      for (const name in controls) {
        if (controls[name]) {
          const element = document.getElementById(name);
          if (element) { element.blur() }
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
