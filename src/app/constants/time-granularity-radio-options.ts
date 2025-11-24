import { RadioOption } from '@components/radio-options';

export const TIME_GRANULARITY_RADIO_OPTIONS: RadioOption<string>[] = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
];
