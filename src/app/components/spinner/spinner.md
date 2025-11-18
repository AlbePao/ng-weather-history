# Spinner

The `<app-spinner>` is a circular indicators of progress and activity

## Inputs

| Input      | Description                                                             | Type     |
| ---------- | ----------------------------------------------------------------------- | -------- |
| `diameter` | The diameter of the progress spinner (will set width and height of svg) | `number` |

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    SpinnerComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {}
```

```html
<!-- example.component.html -->
<app-spinner />
```
