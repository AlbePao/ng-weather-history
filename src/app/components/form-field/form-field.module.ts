import { NgModule } from '@angular/core';
import { ErrorDirective } from './directives/error.directive';
import { LabelDirective } from './directives/label.directive';
import { PrefixDirective } from './directives/prefix.directive';
import { SuffixDirective } from './directives/suffix.directive';
import { FormFieldComponent } from './form-field.component';
import { ShowControlErrorPipe } from './pipes/show-control-error.pipe';

@NgModule({
  imports: [FormFieldComponent, LabelDirective, ErrorDirective, PrefixDirective, SuffixDirective, ShowControlErrorPipe],
  exports: [FormFieldComponent, LabelDirective, ErrorDirective, PrefixDirective, SuffixDirective, ShowControlErrorPipe],
})
export class FormFieldModule {}
