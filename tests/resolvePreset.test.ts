// tests/resolvePreset.test.ts
import { describe, it, expect } from 'vitest'
import { loadSchema } from '../src/core/loader/loadSchema'
import { resolvePreset } from '../src/core/resolver/resolvePreset'

describe('Preset Resolver', () => { // describe means grouping of tests, it means a single test case
  it('should resolve reference presets', async () => {
    const schema = await loadSchema() 

    const result = resolvePreset(
      'railway/_platform',
      schema
    )

    expect(result.fields.length).toBeGreaterThan(0) // expect means assertion means that the value should be greater than 0
    expect(result.inheritedFrom.length).toBeGreaterThan(0)
    expect(result.fieldOrigins).toBeDefined()
    expect(Object.keys(result.fieldOrigins).length).toBeGreaterThan(0)
  })
})