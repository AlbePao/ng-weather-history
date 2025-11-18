import {
  Directive,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  booleanAttribute,
  effect,
  inject,
  input,
} from '@angular/core';
import { AbstractControl, NgControl, Validators } from '@angular/forms';
import { getUniqueId } from '@utils/getUniqueId';

// Invalid input type. Using one of these will throw an MatInputUnsupportedTypeError.
const APP_INPUT_INVALID_TYPES = ['button', 'checkbox', 'file', 'hidden', 'image', 'radio', 'range', 'reset', 'submit'];

@Directive({
  selector: 'input[appInput], textarea[appInput], select[appSelect]',
  host: {
    '[class]': 'classes',
    '[id]': 'id',
    '[attr.disabled]': 'disabled || null',
    '[attr.required]': 'required || null',
    '(blur)': 'elementBlur.emit()',
  },
})
export class InputDirective implements DoCheck {
  private readonly _ngControl = inject(NgControl, { self: true, optional: true });
  private readonly _elementRef =
    inject<ElementRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>>(ElementRef);

  readonly type = input('text');

  @Input() id = getUniqueId('app-input');

  @Input({ transform: booleanAttribute }) disabled = false;

  @Input({ transform: booleanAttribute })
  get required(): boolean {
    return (this._required || this.control?.hasValidator(Validators.required)) ?? false;
  }
  set required(value: boolean) {
    this._required = value;
  }
  protected _required = false;

  @Output() readonly elementBlur = new EventEmitter<void>();

  get classes(): string {
    const borderColorClasses = this.invalid
      ? 'border-danger focus:border-danger focus:ring-danger/40 '
      : `border-gray-darker focus:border-primary focus:ring-primary/40`;

    const paddingClasses = this._isSelect ? 'pl-2.5 pr-8' : 'px-2.5';

    return `block min-h-10 ${paddingClasses} w-full text-sm text-black rounded-sm border appearance-none focus:ring-4 focus:ring-offset-0 peer select-none disabled:bg-gray-lighter disabled:opacity-50 ${borderColorClasses}`;
  }

  get hostElement(): HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement {
    return this._elementRef.nativeElement;
  }

  get invalid(): boolean {
    if (!this.control) {
      return false;
    }

    return !!(this.control?.dirty || this.control?.touched) && !!this.control?.invalid;
  }

  get control(): AbstractControl<unknown, unknown> | null {
    return this._ngControl?.control ?? null;
  }

  get nodeName(): string {
    return this.hostElement.nodeName.toLowerCase();
  }

  private readonly _isInput = this.nodeName === 'input';
  private readonly _isSelect = this.nodeName === 'select';

  constructor() {
    effect(() => {
      if (this.type() && this._isInput) {
        const type = this.type();

        if (APP_INPUT_INVALID_TYPES.includes(type)) {
          throw new Error(`InputDirective: Input type "${type}" isn't supported`);
        }

        this._elementRef.nativeElement.setAttribute('type', type);
      }
    });
  }

  ngDoCheck(): void {
    if (this._ngControl && this._ngControl.disabled !== null && this._ngControl.disabled !== this.disabled) {
      this.disabled = this._ngControl.disabled;
    }
  }
}
