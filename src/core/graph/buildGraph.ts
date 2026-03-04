import type{ SchemaData } from "../loader/schemaTypes"

export function buildGraph(schema: SchemaData) {

  const graph: Record<string, string[]> = {}

  for (const id in schema.presets) {

    const preset = schema.presets[id]

    const refs: string[] = []

    const allFields = [
      ...(preset.fields || []),
      ...(preset.moreFields || [])
    ]

    for (const field of allFields) {

      if (field.startsWith("{") && field.endsWith("}")) {
        const ref = field.slice(1, -1)
        refs.push(ref)
      }

    }

    graph[id] = refs
  }

  return graph
}