# Tooltip

The `appTooltip` directive provides a text label that is displayed when the user hovers an element.

## Inputs

| Input                | Description                                                                          | Type                 |
| -------------------- | ------------------------------------------------------------------------------------ | -------------------- |
| `appTooltip`         | The message to be displayed in the tooltip                                           | `string`, `string[]` |
| `appTooltipPosition` | Allows the user to define the position of the tooltip relative to the parent element | `TooltipPosition`    |
| `appTooltipDisabled` | Whether the tooltip is disabled or not                                               | `boolean`            |
| `appTooltipClass`    | (optional) Classes to be passed to the tooltip                                       | `string`             |

## Type aliases

### `TooltipPosition`

Position of the tooltip

```typescript
type TooltipPosition = 'left' | 'right' | 'above' | 'below';
```

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
    TooltipDirective,
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {}
```

```html
<!-- example.component.html -->
<button appTooltip="Example tooltip">Example button</button>
```
