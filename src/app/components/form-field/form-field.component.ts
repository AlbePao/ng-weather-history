import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  QueryList,
  inject,
  input,
} from '@angular/core';
import { InputDirective } from '@components/input';
import { injectDestroy } from '@utils/injectDestroy';
import { merge, of, startWith, takeUntil } from 'rxjs';
import { APP_ERROR, ErrorDirective } from './directives/error.directive';
import { APP_LABEL, LabelDirective } from './directives/label.directive';
import { APP_PREFIX, PrefixDirective } from './directives/prefix.directive';
import { APP_SUFFIX, SuffixDirective } from './directives/suffix.directive';

export type SubscriptSizing = 'fixed' | 'dynamic';

@Component({
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent implements AfterContentInit {
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _destroy$ = injectDestroy();

  protected id = '';
  protected isControlDisabled = false;
  protected isControlInvalid = false;
  protected hasContentPrefix = false;
  protected hasTextPrefix = false;
  protected hasContentSuffix = false;
  protected hasTextSuffix = false;
  protected isFieldValueEmpty = true;

  @ContentChild(APP_LABEL) labelChild?: LabelDirective;
  @ContentChild(InputDirective) input?: InputDirective;
  @ContentChildren(APP_PREFIX, { descendants: true }) prefixChildren = new QueryList<PrefixDirective>();
  @ContentChildren(APP_SUFFIX, { descendants: true }) suffixChildren = new QueryList<SuffixDirective>();
  @ContentChildren(APP_ERROR, { descendants: true }) errorChildren = new QueryList<ErrorDirective>();

  readonly subscriptSizing = input<SubscriptSizing>('fixed');

  ngAfterContentInit(): void {
    this._initializePrefixAndSuffix();
    this._initializeChildElement();
    this._changeDetectorRef.detectChanges();
  }

  private _checkPrefixAndSuffixTypes(): void {
    this.hasContentPrefix = !!this.prefixChildren.find((p) => !p.isText());
    this.hasTextPrefix = !!this.prefixChildren.find((p) => p.isText());
    this.hasContentSuffix = !!this.suffixChildren.find((s) => !s.isText());
    this.hasTextSuffix = !!this.suffixChildren.find((s) => s.isText());
  }

     * @example
/** Initializes the prefix and suffix containers. */
  private _initializePrefixAndSuffix(): void {
    this._checkPrefixAndSuffixTypes();
    // Mark the form field as dirty whenever the prefix or suffix children change. This
    // is necessary because we conditionally display the prefix/suffix containers based
    // on whether there is projected content.
    merge(this.prefixChildren.changes, this.suffixChildren.changes)
      .pipe(takeUntil(this._destroy$))
      .subscribe(() => {
        this._checkPrefixAndSuffixTypes();
        this._changeDetectorRef.markForCheck();
      });
  }

  private _initializeChildElement(): void {
    // TODO: re-add select component support
    // const childElement = this.input ?? this.select;
    const childElement = this.input;

    if (childElement) {
      this.id = childElement.id;

      if (this.labelChild) {
        childElement.hostElement.classList.add('pt-3.5', 'pb-1');
      } else {
        childElement.hostElement.classList.add('py-1.5');
      }

      if (this.hasContentPrefix || this.hasTextPrefix) {
        childElement.hostElement.classList.add('pl-10');
      }

      if (this.hasContentSuffix || this.hasTextSuffix) {
        childElement.hostElement.classList.add('pr-10');
      }

      merge(
        childElement.elementBlur,
        childElement.control
          ? childElement.control.statusChanges.pipe(startWith(childElement.control.status))
          : of(null),
      )
        .pipe(takeUntil(this._destroy$))
        .subscribe((status) => {
          if (this.hasContentPrefix || this.hasTextPrefix) {
            childElement.hostElement.classList.add('pl-10');
          } else {
            childElement.hostElement.classList.remove('pl-10');
          }

          if (this.hasContentSuffix || this.hasTextSuffix) {
            childElement.hostElement.classList.add('pr-10');
          } else {
            childElement.hostElement.classList.remove('pr-10');
          }

          this.isControlDisabled = status === 'DISABLED';
          this.isControlInvalid = childElement.invalid;

          const value = childElement.hostElement.value;
          this.isFieldValueEmpty = !(value !== null && value !== undefined && `${value}`.length > 0);

          this._changeDetectorRef.markForCheck();
        });
    }
  }
}
