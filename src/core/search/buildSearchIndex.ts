import type{ SchemaData } from "../loader/schemaTypes"

export function buildSearchIndex(schema: SchemaData) {

  const index: Record<string, Set<string>> = {}

  function add(term: string, presetId: string) {

    const key = term.toLowerCase()

    if (!index[key]) {
      index[key] = new Set()
    }

    index[key].add(presetId)
  }

  for (const id in schema.presets) {

    const preset = schema.presets[id]

    // preset name
    if (preset.name) {
      add(preset.name, id)
    }

    // tags
    if (preset.tags) {

      for (const key in preset.tags) {
        add(key, id)
        add(preset.tags[key], id)
      }

    }

    // fields
    const fields = [
      ...(preset.fields || []),
      ...(preset.moreFields || [])
    ]

    for (const field of fields) {

      if (!field.startsWith("{")) {
        add(field, id)
      }

    }

  }

  return index
}