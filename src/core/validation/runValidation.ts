export interface ValidationResult {
  type: string
  message: string
  presetId?: string
}

import type{ SchemaData } from "../loader/schemaTypes"

export function runValidation(schema: SchemaData) {

  const issues = []

  for (const id in schema.presets) {

    const preset = schema.presets[id]

    const fields = [
      ...(preset.fields || []),
      ...(preset.moreFields || [])
    ]

    for (const field of fields) {

      if (field.startsWith("{") && field.endsWith("}")) {

        const ref = field.slice(1, -1)

        if (!schema.presets[ref]) {

          issues.push({
            type: "INVALID_REFERENCE",
            message: `Reference ${ref} not found`,
            presetId: id
          })

        }

      }

    }

  }

  return issues
}