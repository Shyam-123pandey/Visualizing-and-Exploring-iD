export interface ResolvedPreset {
  id: string
  fields: string[]
  tags: Record<string,string>
  geometry: string[]
  inheritedFrom: string[]
  fieldOrigins: Record<string,string>
}