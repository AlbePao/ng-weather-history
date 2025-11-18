# Toast

This component shows a toast overlay.

## Interfaces

### `ToastData`

Used to describe toast data

- `color` color of the toast
- `message` message of the toast
- `duration` (optional) toast duration in milliseconds
- `icon` (optional) [Material Icon](https://fonts.google.com/icons?icon.set=Material+Icons) to display over the message

## Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    // other imports...
  ],
  // other stuff...
})
export class ExampleComponent {
  private readonly _toastService = inject(ToastService);

  showToast(): void {
    this._toastService.show({
      color: 'primary',
      icon: 'face',
      message: 'Alert popup message',
      duration: 10000,
    });
  }

  showMultipleToast(): void {
    this._toastService.showMultiple([
      {
        color: 'primary',
        icon: 'face',
        message: 'Alert popup message 1',
        duration: 10000,
      },
      {
        color: 'secondary',
        icon: 'face',
        message: 'Alert popup message 2',
        duration: 10000,
      },
    ]);
  }
}
```

```html
<!-- example.component.html -->
<button (click)="showToast()">Show toast</button>
<button (click)="showMultipleToast()">Show multiple toast</button>
```
