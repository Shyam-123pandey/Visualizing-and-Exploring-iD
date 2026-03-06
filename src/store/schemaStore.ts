import { create } from "zustand"
import { SchemaEngine } from "../core/engine/schemaEngine"

interface SchemaState {

  engine: SchemaEngine | null
  selectedPreset: string | null
  resolvedPreset: any | null

  searchResults: string[]
  validationIssues: any[]

  dependencies: {
    parents: string[]
    children: string[]
  } | null

  fieldUsage: Record<string, string[]>

  initialize: () => Promise<void>
  selectPreset: (id: string) => void
  search: (term: string) => void
}

export const useSchemaStore = create<SchemaState>((set, get) => ({

  engine: null,
  selectedPreset: null,
  resolvedPreset: null,
  searchResults: [],
  validationIssues: [],
  dependencies: null,
  fieldUsage: {},

  async initialize() {

    const engine = new SchemaEngine()

    await engine.init()

    set({
      engine,
      validationIssues: engine.getValidationIssues()
    })

  },

  selectPreset(id: string) {

    const engine = get().engine
    if (!engine) return

    const preset = engine.resolvePreset(id)

    const parents = engine.getParents(id)
    const children = engine.getChildren(id)

    // Build field usage map
    const fieldUsage: Record<string, string[]> = {}

    for (const field of preset.fields || []) {
      fieldUsage[field] = engine.getFieldUsage(field)
    }

    set({
      selectedPreset: id,
      resolvedPreset: preset,
      dependencies: {
        parents,
        children
      },
      fieldUsage
    })

  },

  search(term: string) {

    const engine = get().engine
    if (!engine) return

    const results = engine.search(term)

    set({
      searchResults: results
    })

  }
}))