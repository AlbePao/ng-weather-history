# Input

`appInput` is a directive that allows native `<input>` and `<textarea>` elements to work with `<app-form-field>`.

## Inputs

| Input      | Description                          | Type      |
| ---------- | ------------------------------------ | --------- |
| `id`       | (optional) Unique ID for the input   | `string`  |
| `disabled` | Whether the input is disabled or not | `boolean` |

## Outputs

| Output        | Description                                  | Type emitted |
| ------------- | -------------------------------------------- | ------------ |
| `elementBlur` | Event emitted when the component loses focus | `void`       |

## Example

### Reactive Form

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    FormFieldModule,
    InputDirective,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  form = this._fb.group({
    inputControlExample: [''],
  });

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log('form values', value);
    });
  }
}
```

```html
<!-- example.component.html -->
<form [formGroup]="form">
  <app-form-field>
    <app-label>Input Control Example</app-label>
    <input appInput type="text" formControlName="inputControlExample" />
    @if (form.controls.inputControlExample | showControlError: 'required') {
    <app-error>Required field</app-error>
    }
  </app-form-field>
</form>
```

### Standalone

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    FormFieldModule,
    InputDirective,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
  logInputChange(event: Event): void {
    console.log('logInputChange', event);
  }
}
```

```html
<!-- example.component.html -->
<app-form-field>
  <app-label>Input Example</app-label>
  <input appInput type="text" (change)="logInputChange($event)" />
</app-form-field>
```
