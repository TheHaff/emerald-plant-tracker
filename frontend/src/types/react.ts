// @ts-nocheck
import type { ChangeEvent, MouseEvent, FocusEvent, FormEvent } from 'react';

// React Event Types
export type InputChangeEvent = ChangeEvent<HTMLInputElement>;
export type TextAreaChangeEvent = ChangeEvent<HTMLTextAreaElement>;
export type SelectChangeEvent = ChangeEvent<HTMLSelectElement>;
export type ButtonClickEvent = MouseEvent<HTMLButtonElement>;
export type DivClickEvent = MouseEvent<HTMLDivElement>;
export type FormSubmitEvent = FormEvent<HTMLFormElement>;
export type InputFocusEvent = FocusEvent<HTMLInputElement>;
export type InputBlurEvent = FocusEvent<HTMLInputElement>;

// File Input Types
export interface FileInputChangeEvent extends ChangeEvent<HTMLInputElement> {
  target: HTMLInputElement & {
    files: FileList | null;
  };
}

// File Types
export interface FileWithPreview extends File {
  preview?: string;
}

// State Types
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// API Response Types
export interface ApiResponse<T = unknown> {
  data?: T;
  error?: string;
  message?: string;
  success?: boolean;
}

// Parsed Data Types
export interface ParsedData {
  source: string;
  metadata: unknown;
  timestamp: string | null;
  temperature: number | null;
  humidity: number | null;
  ph: number | null;
  co2: number | null;
  vpd: number | null;
  ppfd: number | null;
  success: boolean;
  parsedValues: Record<string, unknown>;
  error?: string;
  message?: string;
}

// Nutrient Calculation Types
export interface NutrientCalculation {
  tankSize: number;
  brand: string;
  stage: string;
  strength: string;
  wateringMethod: string;
  baseNutrients: NutrientItem[];
  supplements: SupplementItem[];
  totalCost: number;
  instructions: string[];
  targetEC: number;
  targetTDS: number;
}

export interface NutrientItem {
  name: string;
  amount: number;
  unit: string;
  originalRatio: number;
  originalUnit: string;
}

export interface SupplementItem {
  name: string;
  amount: number;
  unit: string;
  optional: boolean;
  originalRatio: number;
  originalUnit: string;
  waterTypeNote: string | null;
}

// Ref Types
export type FileInputRef = React.RefObject<HTMLInputElement>;
export type TextAreaRef = React.RefObject<HTMLTextAreaElement>;
export type InputRef = React.RefObject<HTMLInputElement>;
