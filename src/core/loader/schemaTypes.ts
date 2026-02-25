export default interface Preset {
  id: string;
  tags?: Record<string, string>;
  fields?: string[];
  extends?: string;
  geometry?: string[];
}