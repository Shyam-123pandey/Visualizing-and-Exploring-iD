import { describe, it, expect } from "vitest"
import { loadSchema } from "../src/core/loader/loadSchema"
import { buildSearchIndex } from "../src/core/search/buildSearchIndex"

describe("Search Index", () => {

  it("should index presets for search", async () => {

    const schema = await loadSchema()

    const index = buildSearchIndex(schema)

    expect(index["platform"]).toBeDefined()

  })

})