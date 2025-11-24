export interface Option<T = string> {
  value: T;
  label: string;
  icon?: string;
  disabled?: boolean;
}
