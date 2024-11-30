import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {CustomInputComponent} from "./components/custom-input/custom-input.component";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

interface IForm {
  count: FormControl<number | null>
}

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet, CustomInputComponent, ReactiveFormsModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  private fb: FormBuilder = inject(FormBuilder);
  private destroyRef: DestroyRef = inject(DestroyRef)
  protected form!: FormGroup<IForm>

  public ngOnInit(): void {
    this.buildForm();
    this.formControlListener();
  }

  private buildForm(): void {
    this.form = this.fb.group({
      count: new FormControl({value: 100, disabled: false})
    });
  }

  private formControlListener(): void {
    this.form.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => {
        console.log(value)
      })
  }

  protected submit(): void {
    alert('submit')
  }
}

// console.log(this.form.get('count')?.errors)


//     "address": {
//       "addressLine1": "Street name 1",
//       "addressLine2": "Street name 2",
//       "zipCode": "1000",
//       "city": "New York"
//   }
// }
