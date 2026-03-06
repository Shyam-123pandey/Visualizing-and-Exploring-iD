import { loadSchema } from "../loader/loadSchema"
import { resolvePreset } from "../resolver/resolvePreset"
import { buildGraph } from "../graph/buildGraph"
import { buildFieldGraph } from "../graph/buildFieldGraph"
import { buildSearchIndex } from "../search/buildSearchIndex"
import { runValidation } from "../validation/runValidation"

import type { SchemaData } from "../loader/schemaTypes"

export class SchemaEngine {

  private schema!: SchemaData
  private presetGraph!: Record<string, string[]>
  private fieldGraph!: Record<string, Set<string>>
  private searchIndex!: Record<string, Set<string>>
  private validationIssues!: any[]

  // Initialize engine
  async init() {

    // Load schema
    this.schema = await loadSchema()

    // Build preset dependency graph
    this.presetGraph = buildGraph(this.schema)

    // Build field usage graph
    this.fieldGraph = buildFieldGraph(this.schema)

    // Build search index
    this.searchIndex = buildSearchIndex(this.schema)

    // Run validation
    this.validationIssues = runValidation(this.schema)

  }

  // Resolve preset inheritance
  resolvePreset(presetId: string) {
    return resolvePreset(presetId, this.schema)
  }

  // Search presets
  search(term: string) {

    const key = term.trim().toLowerCase()

    const results = this.searchIndex[key]

    if (!results) return []

    return Array.from(results)

  }

  // Get dependency parents
  getParents(presetId: string) {

    const resolved = this.resolvePreset(presetId)

    return resolved.inheritedFrom || []

  }

  // Get dependency children
  getChildren(presetId: string) {

    const children: string[] = []

    for (const [id, preset] of Object.entries(this.schema.presets)) {

      const parent = (preset as any).extends

      if (!parent) continue

      // extends: string
      if (typeof parent === "string" && parent === presetId) {
        children.push(id)
      }

      // extends: array
      if (Array.isArray(parent) && parent.includes(presetId)) {
        children.push(id)
      }

    }

    return children

  }

  // Get presets using a field
  getFieldUsage(field: string) {

    const result = this.fieldGraph[field]

    if (!result) return []

    return Array.from(result)

  }

  // Get preset dependencies from graph
  getDependencies(presetId: string) {

    return this.presetGraph[presetId] || []

  }

  // Validation issues
  getValidationIssues() {

    return this.validationIssues

  }

}