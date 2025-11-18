# Card

The `<app-card>` is a content container for text, photos, and actions in the context of a single subject.

## Inputs

| Input   | Description                        | Type     |
| ------- | ---------------------------------- | -------- |
| `color` | (optional) The color of the border | `Colors` |

## Example

### Reactive Form

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    CardComponent,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {}
```

```html
<!-- example.component.html -->
<app-card colo="primary">Card content goes here</app-card>
<app-card colo="secondary">Card content goes here</app-card>
<app-card colo="success">Card content goes here</app-card>
<app-card colo="danger">Card content goes here</app-card>
<app-card colo="info">Card content goes here</app-card>
<app-card colo="gray">Card content goes here</app-card>
```
