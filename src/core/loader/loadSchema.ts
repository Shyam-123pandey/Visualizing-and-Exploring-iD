import type{ SchemaData } from "./schemaTypes"

export async function loadSchema(): Promise<SchemaData> {

  const presets: Record<string, any> = {}
  const fields: Record<string, any> = {}

  const files = import.meta.glob("/src/data/**/*.json", { eager: true })

  for (const path in files) {

    const file: any = files[path]

    // Handle presets
    if (path.includes("/presets/")) {

      const id = path
        .split("/presets/")[1]
        .replace(".json", "")

      presets[id] = file.default
    }

    // Handle fields
    if (path.includes("/fields/")) {

      const id = path
        .split("/fields/")[1]
        .replace(".json", "")

      fields[id] = file.default
    }

  }

  // console.log("PRESETS LOADED:", Object.keys(presets).length)
  // console.log("FIELDS LOADED:", Object.keys(fields).length)

  return {
    presets,
    fields
  }

}