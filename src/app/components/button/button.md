# Button

## `button[app-button]`

The `button[app-button]` component selector enhances native button behaviour and styles. Thw `a[app-button]` applies the same style and behaviour also to links.

### `[app-button]` Inputs

| Input        | Description                           | Type               |
| ------------ | ------------------------------------- | ------------------ |
| `appearance` | The appearance of the button          | `ButtonAppearance` |
| `size`       | The size of the button                | `ButtonSize`       |
| `disabled`   | Whether the button is disabled or not | `boolean`          |

### `[app-button]` Slots

| Name                                      | Description                        |
| ----------------------------------------- | ---------------------------------- |
| `app-icon`, `app-icon[iconPositionStart]` | Icon placed before the button text |
| `app-icon[iconPositionEnd]`               | Icon placed after the button text  |

### `[app-button]` Type aliases

#### `ButtonAppearance`

Appearances of the button

```typescript
type ButtonAppearance = 'primary' | 'secondary' | 'outline' | 'link' | 'danger' | 'success';
```

#### `ButtonSize`

Size of the button

```typescript
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
```

## `button[app-icon-button]`

The `button[app-icon-button]` and `a[app-icon-button]` component are specifically designed for buttons with icons only.

### `[app-icon-button]` Inputs

| Input        | Description                           | Type                   |
| ------------ | ------------------------------------- | ---------------------- |
| `appearance` | The appearance of the button          | `IconButtonAppearance` |
| `size`       | The size of the button                | `ButtonSize`           |
| `disabled`   | Whether the button is disabled or not | `boolean`              |

### `[app-button]` Type aliases

#### `IconButtonAppearance`

Appearances of the icon button

```typescript
type IconButtonAppearance = 'primary' | 'secondary' | 'outline' | 'base';
```

#### `ButtonSize`

Size of the icon button

```typescript
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
```

## `button[app-rounded-button]`

The `button[app-rounded-button]` and `a[app-rounded-button]` component are specifically designed for buttons with icons only.

### `[app-rounded-button]` Inputs

| Input      | Description                           | Type                 |
| ---------- | ------------------------------------- | -------------------- |
| `color`    | The color of the rounded button       | `RoundedButtonColor` |
| `size`     | The size of the button                | `ButtonSize`         |
| `disabled` | Whether the button is disabled or not | `boolean`            |

### `[app-rounded-button]` Slots

| Name                                      | Description                        |
| ----------------------------------------- | ---------------------------------- |
| `app-icon`, `app-icon[iconPositionStart]` | Icon placed before the button text |
| `app-icon[iconPositionEnd]`               | Icon placed after the button text  |

### `[app-rounded-button]` Type aliases

#### `RoundedButtonColor`

Appearances of the rounded button

```typescript
type RoundedButtonColor = 'primary' | 'secondary' | 'success' | 'danger' | 'info' | 'gray' | 'base';
```

#### `ButtonSize`

Size of the rounded button

```typescript
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
```

### Example

```typescript
// example.component.ts
@Component({
  // other stuff...
  imports: [
    ButtonModule,
    IconComponent, // import also this component to use app-button with icons
  ],
  // other stuff...
})
export class ExampleComponent {}
```

```html
<!-- example.component.html -->

<button app-button type="button" appearance="primary">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-button type="button" appearance="secondary">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-button type="button" appearance="outline">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-button type="button" appearance="link">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-button type="button" appearance="danger">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-button type="button" appearance="success">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>

<button app-button type="button" appearance="primary" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-button type="button" appearance="secondary" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-button type="button" appearance="outline" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-button type="button" appearance="link" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-button type="button" appearance="danger" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-button type="button" appearance="success" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>

<a app-button routerLink="/" type="button" appearance="primary">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-button routerLink="/" type="button" appearance="secondary">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-button routerLink="/" type="button" appearance="outline">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-button routerLink="/" type="button" appearance="link">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-button routerLink="/" type="button" appearance="danger">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-button routerLink="/" type="button" appearance="success">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>

<a app-button routerLink="/" type="button" disabled appearance="primary">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-button routerLink="/" type="button" disabled appearance="secondary">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-button routerLink="/" type="button" disabled appearance="outline">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-button routerLink="/" type="button" disabled appearance="link">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-button routerLink="/" type="button" disabled appearance="danger">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-button routerLink="/" type="button" disabled appearance="success">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>

<button app-icon-button type="button" appearance="primary">
  <app-icon>add</app-icon>
</button>

<button app-icon-button type="button" appearance="secondary">
  <app-icon>add</app-icon>
</button>

<button app-icon-button type="button" appearance="outline">
  <app-icon>add</app-icon>
</button>

<button app-icon-button type="button" appearance="base">
  <app-icon>add</app-icon>
</button>

<button app-icon-button type="button" appearance="primary" disabled>
  <app-icon>add</app-icon>
</button>

<button app-icon-button type="button" appearance="secondary" disabled>
  <app-icon>add</app-icon>
</button>

<button app-icon-button type="button" appearance="outline" disabled>
  <app-icon>add</app-icon>
</button>

<button app-icon-button type="button" appearance="base" disabled>
  <app-icon>add</app-icon>
</button>

<a app-icon-button routerLink="/" type="button" appearance="primary">
  <app-icon>add</app-icon>
</a>

<a app-icon-button routerLink="/" type="button" appearance="secondary">
  <app-icon>add</app-icon>
</a>

<a app-icon-button routerLink="/" type="button" appearance="outline">
  <app-icon>add</app-icon>
</a>

<a app-icon-button routerLink="/" type="button" appearance="base">
  <app-icon>add</app-icon>
</a>

<a app-icon-button routerLink="/" type="button" appearance="primary" disabled>
  <app-icon>add</app-icon>
</a>

<a app-icon-button routerLink="/" type="button" appearance="secondary" disabled>
  <app-icon>add</app-icon>
</a>

<a app-icon-button routerLink="/" type="button" appearance="outline" disabled>
  <app-icon>add</app-icon>
</a>

<a app-icon-button routerLink="/" type="button" appearance="base" disabled>
  <app-icon>add</app-icon>
</a>

<button app-rounded-button type="button" color="primary">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-rounded-button type="button" color="secondary">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-rounded-button type="button" color="success">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-rounded-button type="button" color="danger">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-rounded-button type="button" color="info">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-rounded-button type="button" color="gray">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-rounded-button type="button" color="base">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>

<button app-rounded-button type="button" color="primary" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-rounded-button type="button" color="secondary" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-rounded-button type="button" color="success" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-rounded-button type="button" color="danger" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-rounded-button type="button" color="info" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-rounded-button type="button" color="gray" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>
<button app-rounded-button type="button" color="base" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</button>

<a app-rounded-button routerLink="/" color="primary">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-rounded-button routerLink="/" color="secondary">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-rounded-button routerLink="/" color="success">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-rounded-button routerLink="/" color="danger">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-rounded-button routerLink="/" color="info">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-rounded-button routerLink="/" color="gray">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-rounded-button routerLink="/" color="base">
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>

<a app-rounded-button routerLink="/" color="primary" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-rounded-button routerLink="/" color="secondary" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-rounded-button routerLink="/" color="success" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-rounded-button routerLink="/" color="danger" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-rounded-button routerLink="/" color="info" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-rounded-button routerLink="/" color="gray" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
<a app-rounded-button routerLink="/" color="base" disabled>
  <app-icon>add</app-icon>
  Label
  <app-icon iconPositionEnd>add</app-icon>
</a>
```
