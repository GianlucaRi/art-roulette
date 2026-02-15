export type RouletteType = 'tool' | 'style' | 'subject' | 'support' | 'time' | 'twist';

export interface RouletteOption {
  value: string;
  color?: string;
}

export interface RouletteData {
  type: RouletteType;
  title: string;
  options: string[];
  color: string;
  optional?: boolean;
}

export interface ExerciseResult {
  tool: string | null;
  style: string | null;
  subject: string | null;
  support: string | null;
  time: string | null;
  twist: string | null;
}

export interface SpinState {
  tool: boolean;
  style: boolean;
  subject: boolean;
  support: boolean;
  time: boolean;
  twist: boolean;
}

export interface OptionalWheelsState {
  support: boolean;
  time: boolean;
  twist: boolean;
}
