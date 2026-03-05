import { describe,it,expect } from "vitest"
import { SchemaEngine } from "../src/core/engine/schemaEngine"

describe("Schema Engine", () => {

  it("should initialize engine", async () => {

    const engine = new SchemaEngine()

    await engine.init()

    const results = engine.search("platform")

    expect(Array.isArray(results)).toBe(true)

  })

})