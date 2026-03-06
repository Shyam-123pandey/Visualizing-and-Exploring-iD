export interface RawPreset {
  name: string;
  tags?: Record<string, string>;
  fields?: string[];
  moreFields?: string[];
  geometry?: string[];
  icon?: string;
  searchable?: boolean;
  locationSet?: any;
  extends?: string;
}

export interface RawField {
  label: string;
  key?: string;
  type?: string;
}

export interface SchemaData {
  presets: Record<string, RawPreset>;
  fields: Record<string, RawField>;
}