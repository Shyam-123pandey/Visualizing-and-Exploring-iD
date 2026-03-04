import { describe, it, expect } from "vitest"
import { loadSchema } from "../src/core/loader/loadSchema"
import { buildGraph } from "../src/core/graph/buildGraph"

describe("Preset Graph", () => {

  it("should build dependency graph", async () => {

    const schema = await loadSchema()

    const graph = buildGraph(schema)

    expect(graph["railway/_platform"]).toContain("public_transport/platform") // {railway/_platform} should contain -> [{public_transport/platform}]
  })

})