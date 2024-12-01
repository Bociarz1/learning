import {
  afterRender,
  afterRenderEffect,
  Component,
  DestroyRef,
  inject,
  linkedSignal,
  signal,
  WritableSignal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-angular-19',
  template: `
    <table>
      <thead>
        <tr>
          @for (column of columns; track $index) {
          <th>{{ column }}</th>
          }
        </tr>
      </thead>
      <tbody>
        @for (rowKey of rowKeys; track rowKey) {
        <tr>
          @for (column of columns; track column) {
          <td>
            <!-- {{ data[rowKey][column] }} -->
            @let cell = data[rowKey][column];
            {{ cell }}
          </td>
          }
        </tr>
        }
      </tbody>
    </table>

    <!--  2. ComputedSignals -->
    Change myLinkedSignal value : {{ myLinkedSignal() }}
    <input #input (change)="changeSignalData(input.value)" type="number" />
    <br />
    <!-- 3. -->
    Change secondSignal value
    <input #input (change)="change2SignalData(input.value)" type="number" />
  `,
  standalone: true,
  styleUrls: ['./angular-19.component.scss'],
})
export class Angular19Component {
  // 1. @let

  // Obiekt przechowujący dane w formie wierszy
  protected readonly data: Record<string, Record<string, any>> = {
    row1: { id: 1, userId: 1001, name: 'John Doe' },
    row2: { id: 2, userId: 1002, name: 'Jane Smith' },
    row3: { id: 3, userId: 1003, name: 'Alice Johnson' },
    row4: { id: 4, userId: 1004, name: 'Bob Brown' },
  };
  // Klucze wierszy
  protected readonly rowKeys = Object.keys(this.data);

  // Klucze kolumn (kolumny w tabeli)
  protected readonly columns = Object.keys(this.data[this.rowKeys[0]]);

  // 2. ComputedSignals
  private destroyRef = inject(DestroyRef);
  private interval$ = interval(5000).pipe(takeUntilDestroyed(this.destroyRef));
  protected signalOne: WritableSignal<number> = signal(0);
  public ngOnInit(): void {
    this.interval$.subscribe((count) => {
      this.signalOne.set(+count);
    });
  }

  protected myLinkedSignal = linkedSignal<number, number>({
    source: this.signalOne,
    computation: (source: number) => source,
  });

  protected changeSignalData(value: string): void {
    this.myLinkedSignal.set(+value);
  }

  // 3. afterRenderEffect and afterRender
  protected signalTwo: WritableSignal<number> = signal(0);
  protected change2SignalData(value: string): void {
    this.signalTwo.set(+value);
  }
  constructor() {
    afterRenderEffect(() => {
      console.log('after render effect');
    });

    afterRender(() => {
      console.log('after render');
    });
  }
}
