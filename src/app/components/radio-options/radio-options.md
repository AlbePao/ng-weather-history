# Radio Options

The `<app-radio-options>` provides the same functionality as a native input radio enhanced with styling and behaviour.

## Inputs

| Input      | Description                                     | Type               |
| ---------- | ----------------------------------------------- | ------------------ |
| `options`  | Options to display in the radio options         | `RadioOption<T>[]` |
| `name`     | Name of the radio button options                | `string`           |
| `value`    | The value attribute of the native input element | `T`                |
| `disabled` | Whether the radio options is disabled or not    | `boolean`          |

## Outputs

| Output         | Description                                        | Type emitted |
| -------------- | -------------------------------------------------- | ------------ |
| `valueChange`  | Event emitted when the radio options changes value | `T`, `null`  |
| `elementFocus` | Event emitted when the component gets focused      | `void`       |
| `elementBlur`  | Event emitted when the component loses focus       | `void`       |

## Interfaces

### `RadioOption<T>`

Used to describe a single option. It extends [`Option` interface](../../../types/option.md)

- `value` value of the option
- `label` label of the option
- `smallLabel` (optional) a small label that integrates the main label

## Example

### Reactive Form

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    RadioOptionsComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent implements OnInit {
  private readonly _fb = inject(FormBuilder);

  radioOptionsExamples: RadioOption<string>[] = [
    { value: 'example-1', label: 'Example One' },
    { value: 'example-2', label: 'Example Two' },
  ];

  form = this._fb.group({
    inputRadioControlExample: [true],
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
  <app-radio-options [options]="radioOptionsExamples" formControlName="inputRadioControlExample" />
</form>
```

### Standalone

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    RadioOptionsComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
  radioOptionsExamples: RadioOption<string>[] = [
    { value: 'example-1', label: 'Example One' },
    { value: 'example-2', label: 'Example Two' },
  ];

  logRadioChange(event: boolean | null): void {
    console.log('logRadioChange', event);
  }
}
```

```html
<!-- example.component.html -->
<app-radio-options [options]="radioOptionsExamples" (valueChange)="logRadioChange($event)" />
```
