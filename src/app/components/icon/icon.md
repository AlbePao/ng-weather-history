# Icon

The `<app-icon>` provides a way to use [Material Icons](https://fonts.google.com/icons?icon.set=Material+Icons).

## Inputs

| Input   | Description                                     | Type     |
| ------- | ----------------------------------------------- | -------- |
| `color` | The color of the icon. Defaults to parent color | `Colors` |

## Type aliases

### `Colors`

Color of the icon

```typescript
type Colors = 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'gray';
```

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    IconComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {}
```

```html
<!-- example.component.html -->
<app-icon color="primary">face</app-icon>
<app-icon color="secondary">face</app-icon>
<app-icon color="success">face</app-icon>
<app-icon color="danger">face</app-icon>
<app-icon color="info">face</app-icon>
<app-icon color="gray">face</app-icon>
<app-icon color="black">face</app-icon>
```
