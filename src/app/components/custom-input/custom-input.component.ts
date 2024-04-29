import {Component, forwardRef} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule, NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from "@angular/forms";

@Component({
  selector: 'app-custom-input',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './custom-input.component.html',
  styleUrl: './custom-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => CustomInputComponent)
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => CustomInputComponent)
    }
  ]
})
export class CustomInputComponent implements ControlValueAccessor, Validator {
  protected count: string = '';

  public writeValue(value: string): void {
    this.count = value;
  }

  private onChange: any = () => {
  };

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  private onTouched: any = () => {
  };


  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  protected disabled: boolean = false

  public setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  protected action(event: any): void {
    this.onChange(event)
    this.onTouched();
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    const myValue = control.value;
    if (myValue <= 0) {
      return {
        mustBePositive: {
          myValue
        }
      };
    }
    return null
  }

  // or registerOnValidatorChange() if validation depends on component input
}
