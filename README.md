# Weather History

This is an Angular v21 project to search weather history data of a given address all around the world.

The architecture of the project is inspired from [angular-components-boilerplate](https://github.com/AlbePao/angular-components-boilerplate)

## Project setup

Clone this repository and go to its root from command line, then install the required packages with the following command

```bash
npm i
```

Start the project with the following command

```bash
ng serve -o
```

The browser opens automatically to [http://localhost:4200/](http://localhost:4200/).

## Build

Build the project with the following command

```bash
ng build
```

## Lint

This project uses [angular-eslint](https://github.com/angular-eslint/angular-eslint#readme) to lint with ESLint.

```bash
ng lint
```

## Note about zone.js

As of Angular 21, zone.js is no longer included by default in new apps. This project follows best practices for developing a zoneless Angular application by scaffolding new components with `ChangeDetectionStrategy` set to `OnPush` and using signals to manage components' internal state. RxJS is still used to handle http requests and to manage the resulting data streams.

## Features

- [Angular v21](https://angular.dev/)
- [Tailwind CSS v4.1](https://tailwindcss.com/)
- [Fontsource](https://fontsource.org/)
- [angular-eslint](https://github.com/angular-eslint/angular-eslint/)
- [highcharts-angular](https://github.com/highcharts/highcharts-angular#readme)
- [OpenCage Geocoding API](https://opencagedata.com/)
- [Open-Meteo API](https://open-meteo.com/)

## UI Components documentation

Atomic components used across the whole application and in other composed components

- [Button](./src/app/components/button/button.md)
- [Card](./src/app/components/card/card.md)
- [Form Field](./src/app/components/form-field/form-field.md)
- [Icon](./src/app/components/icon/icon.md)
- [Input](./src/app/components/input/input.md)
- [Radio Options](./src/app/components/radio-options/radio-options.md)
- [Spinner](./src/app/components/spinner/spinner.md)
- [Toast](./src/app/components/toast/toast.md)

## Colors

### Gray palette

| Color                                                    | HEX Code  | Name           |
| -------------------------------------------------------- | --------- | -------------- |
| ![#F7F7F8](https://placehold.co/32x32/F7F7F8/F7F7F8.png) | `#F7F7F8` | `gray-lighter` |
| ![#EDEEF2](https://placehold.co/32x32/EDEEF2/EDEEF2.png) | `#EDEEF2` | `gray-light`   |
| ![#DADBDF](https://placehold.co/32x32/DADBDF/DADBDF.png) | `#DADBDF` | `gray`         |
| ![#B0B0B0](https://placehold.co/32x32/B0B0B0/B0B0B0.png) | `#B0B0B0` | `gray-dark`    |
| ![#636363](https://placehold.co/32x32/636363/636363.png) | `#636363` | `gray-darker`  |

### Primary palette

| Color                                                    | HEX Code  | Name              |
| -------------------------------------------------------- | --------- | ----------------- |
| ![#DEE7F8](https://placehold.co/32x32/DEE7F8/DEE7F8.png) | `#DEE7F8` | `primary-lighter` |
| ![#BCD0F0](https://placehold.co/32x32/BCD0F0/BCD0F0.png) | `#BCD0F0` | `primary-light`   |
| ![#2570EA](https://placehold.co/32x32/2570EA/2570EA.png) | `#2570EA` | `primary`         |
| ![#1F498E](https://placehold.co/32x32/1F498E/1F498E.png) | `#1F498E` | `primary-dark`    |

### Secondary palette

| Color                                                    | HEX Code  | Name                |
| -------------------------------------------------------- | --------- | ------------------- |
| ![#EEE1FF](https://placehold.co/32x32/EEE1FF/EEE1FF.png) | `#EEE1FF` | `secondary-lighter` |
| ![#DEC4FF](https://placehold.co/32x32/DEC4FF/DEC4FF.png) | `#DEC4FF` | `secondary-light`   |
| ![#9747FF](https://placehold.co/32x32/9747FF/9747FF.png) | `#9747FF` | `secondary`         |
| ![#6730AD](https://placehold.co/32x32/6730AD/6730AD.png) | `#6730AD` | `secondary-dark`    |

### Success palette

| Color                                                    | HEX Code  | Name              |
| -------------------------------------------------------- | --------- | ----------------- |
| ![#E1FCE7](https://placehold.co/32x32/E1FCE7/E1FCE7.png) | `#E1FCE7` | `success-lighter` |
| ![#C4FAD0](https://placehold.co/32x32/C4FAD0/C4FAD0.png) | `#C4FAD0` | `success-light`   |
| ![#47EF6C](https://placehold.co/32x32/47EF6C/47EF6C.png) | `#47EF6C` | `success`         |
| ![#2CAC49](https://placehold.co/32x32/2CAC49/2CAC49.png) | `#2CAC49` | `success-dark`    |

### Danger palette

| Color                                                    | HEX Code  | Name             |
| -------------------------------------------------------- | --------- | ---------------- |
| ![#FADBE5](https://placehold.co/32x32/FADBE5/FADBE5.png) | `#FADBE5` | `danger-lighter` |
| ![#F5B8CA](https://placehold.co/32x32/F5B8CA/F5B8CA.png) | `#F5B8CA` | `danger-light`   |
| ![#DF215A](https://placehold.co/32x32/DF215A/DF215A.png) | `#DF215A` | `danger`         |
| ![#BA2853](https://placehold.co/32x32/BA2853/BA2853.png) | `#BA2853` | `danger-dark`    |

### Info palette

| Color                                                    | HEX Code  | Name           |
| -------------------------------------------------------- | --------- | -------------- |
| ![#FFFBEC](https://placehold.co/32x32/FFFBEC/FFFBEC.png) | `#FFFBEC` | `info-lighter` |
| ![#FFF7D9](https://placehold.co/32x32/FFF7D9/FFF7D9.png) | `#FFF7D9` | `info-light`   |
| ![#FFE589](https://placehold.co/32x32/FFE589/FFE589.png) | `#FFE589` | `info`         |
| ![#F2AE2A](https://placehold.co/32x32/F2AE2A/F2AE2A.png) | `#F2AE2A` | `info-dark`    |
