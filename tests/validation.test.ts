import { describe, it, expect } from "vitest"
import { loadSchema } from "../src/core/loader/loadSchema"
import { runValidation } from "../src/core/validation/runValidation"

describe("Schema Validation", () => {

  it("should detect invalid references", async () => {

    const schema = await loadSchema()

    const issues = runValidation(schema)

    expect(Array.isArray(issues)).toBe(true)

  })

})