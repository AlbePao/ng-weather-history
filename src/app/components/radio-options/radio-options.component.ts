import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  booleanAttribute,
  inject,
  input,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Option } from '@interfaces/option';
import { provideNgValueAccessor } from '@providers/ng-value-accessor';
import { getUniqueId } from '@utils/getUniqueId';

export interface RadioOption<T> extends Option<T> {
  smallLabel?: string;
}

@Component({
  selector: 'app-radio-options',
  templateUrl: './radio-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [provideNgValueAccessor(RadioOptionsComponent)],
  host: {
    class: 'block',
    '[id]': 'id',
  },
})
export class RadioOptionsComponent<T> implements ControlValueAccessor {
  private readonly _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);

  private _hasInnerFocus = false;

  @ViewChild('inputRadio') firstInputRadio?: ElementRef<HTMLInputElement>;

  @Input() id = getUniqueId('app-radio');

  @Input()
  get options(): RadioOption<T>[] {
    return this._options;
  }
  set options(options: RadioOption<T>[] | null) {
    this._options = options ?? [];
  }
  private _options: RadioOption<T>[] = [];

  name = input(getUniqueId('app-radio-options'));

  @Input()
  get value(): T | null {
    return this._value;
  }
  set value(value: T | null) {
    this._value = value;
  }
  private _value: T | null = null;

  @Input({ transform: booleanAttribute })
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(disabled: boolean) {
    const disabledNewValue = disabled;

    if (disabledNewValue !== this.disabled) {
      this._disabled = disabledNewValue;
      this._changeDetectorRef.markForCheck();
    }

    if (this._hasInnerFocus) {
      this._hasInnerFocus = false;
      this.elementBlur.emit();
    }
  }
  private _disabled = false;

  @Output() readonly valueChange = new EventEmitter<T | null>();
  @Output() readonly elementFocus = new EventEmitter<void>();
  @Output() readonly elementBlur = new EventEmitter<void>();

  onChange = (value: T | null): void => {};
  onTouched = (): void => {};

  required = true;
  touched = false;

  get hostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  protected changeInnerFocus(isFocused: boolean): void {
    this.markAsTouched();

    if (isFocused !== this._hasInnerFocus) {
      this._hasInnerFocus = isFocused;

      if (this._hasInnerFocus) {
        this.elementFocus.emit();
      } else {
        this.elementBlur.emit();
      }
    }
  }

  writeValue(value: T | null): void {
    this.value = value;
    this._changeDetectorRef.markForCheck();
  }

  registerOnChange(fn: (value: T | null) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetectorRef.markForCheck();
  }

  setValue(value: T): void {
    this.markAsTouched();

    if (!this.disabled) {
      this.value = value;
      this.onChange(this.value);
      this.valueChange.emit(value);
    }
  }
}
