import type { SchemaData } from "../loader/schemaTypes"

export function buildFieldGraph(schema: SchemaData) {

  const graph: Record<string, Set<string>> = {}

  for (const id in schema.presets) {

    const preset = schema.presets[id]

    const fields = [
      ...(preset.fields || []),
      ...(preset.moreFields || [])
    ]

    for (const field of fields) {

      if (!field.startsWith("{")) {

        if (!graph[field]) {
          graph[field] = new Set()
        }

        graph[field].add(id)

      }

    }

  }

  return graph
}