// @ts-nocheck
// API Response Types
export type ApiResponse<T = any> = {
  data?: T;
  error?: string;
  details?: string;
};

export type PlantStage =
  | 'seedling'
  | 'vegetative'
  | 'flowering'
  | 'harvest'
  | 'drying'
  | 'curing'
  | 'cured';

// Plant Types
export type Plant = {
  id: number;
  name: string;
  strain?: string;
  stage: PlantStage;
  planted_date?: string;
  expected_harvest?: string;
  harvest_date?: string;
  final_yield?: number;
  notes?: string;
  grow_tent?: string;
  archived: boolean;
  archive_reason?: string;
  archived_at?: string;
  created_at: string;
  updated_at: string;
  log_count?: number;
  last_log_date?: string;
};

export type CreatePlantRequest = {
  name: string;
  strain?: string;
  stage?: PlantStage;
  planted_date?: string;
  expected_harvest?: string;
  notes?: string;
  grow_tent?: string;
};

export type UpdatePlantRequest = {
  name?: string;
  strain?: string;
  stage?: PlantStage;
  planted_date?: string;
  expected_harvest?: string;
  harvest_date?: string;
  final_yield?: number;
  notes?: string;
  archived?: boolean;
  archive_reason?: string;
  grow_tent?: string;
};

export type ArchivePlantRequest = {
  archive_reason: string;
  final_yield?: number;
  harvest_date?: string;
};

// Log Types
export type Log = {
  id: number;
  plant_id: number;
  type: string;
  description?: string;
  value?: string;
  notes?: string;
  ph_level?: string;
  ec_tds?: string;
  water_amount?: string;
  height_cm?: string;
  nutrient_info?: string;
  logged_at: string;
  created_at: string;
  updated_at: string;
};

export type CreateLogRequest = {
  plant_id: number;
  type: string;
  description?: string;
  value?: string;
  notes?: string;
};

export type UpdateLogRequest = {
  type?: string;
  description?: string;
  value?: string;
  notes?: string;
};

// Environment Types
export type EnvironmentData = {
  id: number;
  grow_tent?: string;
  temperature?: number;
  humidity?: number;
  ph_level?: number;
  light_hours?: number;
  vpd?: number;
  co2_ppm?: number;
  ppfd?: number;
  logged_at: string;
  created_at: string;
};

export type CreateEnvironmentRequest = {
  grow_tent?: string;
  temperature?: number;
  humidity?: number;
  ph_level?: number;
  light_hours?: number;
  vpd?: number;
  co2_ppm?: number;
  ppfd?: number;
};

export type UpdateEnvironmentRequest = {
  grow_tent?: string;
  temperature?: number;
  humidity?: number;
  ph_level?: number;
  light_hours?: number;
  vpd?: number;
  co2_ppm?: number;
  ppfd?: number;
};

// Archived Types
export type ArchivedGrow = {
  id: number;
  plant_name: string;
  strain?: string;
  planted_date?: string;
  harvest_date?: string;
  final_yield?: number;
  final_stage?: string;
  archive_reason?: string;
  grow_tent?: string;
  total_logs: number;
  archived_at: string;
  activity_logs_count?: number;
  activityLogs?: ArchivedLog[];
};

export type ArchivedLog = {
  id: number;
  archived_grow_id: number;
  type: string;
  description?: string;
  value?: string;
  notes?: string;
  logged_at: string;
  plant_name?: string;
};

// Grow Tent Types
export type GrowTent = {
  grow_tent: string;
  plant_count: number;
};

// API Query Parameters
export type PlantsQueryParams = {
  archived?: boolean;
  grow_tent?: string;
};

export type LogsQueryParams = {
  plant_id?: number;
  type?: string;
  start_date?: string;
  end_date?: string;
};

export type EnvironmentQueryParams = {
  grow_tent?: string;
  start_date?: string;
  end_date?: string;
};

// Form Data Types
export type FormData = {
  append(name: string, value: string | Blob): void;
  get(name: string): string | Blob | null;
  getAll(name: string): (string | Blob)[];
  has(name: string): boolean;
  set(name: string, value: string | Blob): void;
  delete(name: string): void;
  entries(): IterableIterator<[string, string | Blob]>;
  keys(): IterableIterator<string>;
  values(): IterableIterator<string | Blob>;
};

// Event Types
export type ChangeEvent<T = Element> = {
  target: T & EventTarget;
  currentTarget: T & EventTarget;
  preventDefault(): void;
  stopPropagation(): void;
};

export type MouseEvent<T = Element> = {
  target: T & EventTarget;
  currentTarget: T & EventTarget;
  preventDefault(): void;
  stopPropagation(): void;
  clientX: number;
  clientY: number;
};

export type FocusEvent<T = Element> = {
  target: T & EventTarget;
  currentTarget: T & EventTarget;
  preventDefault(): void;
  stopPropagation(): void;
};

export type FormEvent<T = Element> = {
  target: T & EventTarget;
  currentTarget: T & EventTarget;
  preventDefault(): void;
  stopPropagation(): void;
};
