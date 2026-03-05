import { create } from "zustand"
import { SchemaEngine } from "../core/engine/schemaEngine"
interface SchemaState {
  engine: SchemaEngine | null
  selectedPreset: string | null
  resolvedPreset: any | null
  searchResults: string[]
  validationIssues: any[]
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

    set({
      selectedPreset: id,
      resolvedPreset: preset
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