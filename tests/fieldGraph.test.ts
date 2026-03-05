import { describe, it, expect } from "vitest"
import { loadSchema } from "../src/core/loader/loadSchema"
import { buildFieldGraph } from "../src/core/graph/buildFieldGraph"

describe("Field Graph", () => {

  it("should map fields to presets", async () => {

    const schema = await loadSchema()

    const graph = buildFieldGraph(schema)

    expect(graph["name"]).toBeDefined()

  })
})