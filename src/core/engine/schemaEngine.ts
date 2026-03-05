import { loadSchema } from "../loader/loadSchema"
import { resolvePreset } from "../resolver/resolvePreset"
import { buildGraph } from "../graph/buildGraph"
import { buildFieldGraph } from "../graph/buildFieldGraph"
import { buildSearchIndex } from "../search/buildSearchIndex"
import { runValidation } from "../validation/runValidation"

import type{ SchemaData } from "../loader/schemaTypes"

export class SchemaEngine {

  private schema!: SchemaData 
  private presetGraph!: Record<string, string[]>
  private fieldGraph!: Record<string, Set<string>>
  private searchIndex!: Record<string, Set<string>>
  private validationIssues!: any[]

  //initialize the engine
  async init() {

    // Load schema files
    this.schema = await loadSchema()

    // Build preset dependency graph
    this.presetGraph = buildGraph(this.schema)

    // Build field usage graph
    this.fieldGraph = buildFieldGraph(this.schema)

    // Build search index
    this.searchIndex = buildSearchIndex(this.schema)

    // Run validation checks
    this.validationIssues = runValidation(this.schema)

  }

   // Resolve a preset by ID
  resolvePreset(presetId: string) {

    return resolvePreset(presetId, this.schema)

  }


  //search for presets by term
  search(term: string) {

    const key = term.toLowerCase()

    const results = this.searchIndex[key]

    if (!results) return []

    return Array.from(results) 

  }

 // Get dependencies of a preset
  getDependencies(presetId: string) {

    return this.presetGraph[presetId] || []

  }

  // Get presets that use a specific field
  getFieldUsage(field: string) {

    const result = this.fieldGraph[field]

    if (!result) return []

    return Array.from(result)

  }

  // Get validation issues
  getValidationIssues() {

    return this.validationIssues

  }

}