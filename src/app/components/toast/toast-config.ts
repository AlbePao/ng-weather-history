import { InjectionToken } from '@angular/core';
import { Colors } from '@interfaces/colors';

export interface ToastData {
  color: Colors;
  message: string;
  duration?: number;
  icon?: string;
}

export const TOAST_DATA = new InjectionToken<ToastData>('ToastData');
