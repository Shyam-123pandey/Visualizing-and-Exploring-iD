import { describe, it, expect } from 'vitest'
import { loadSchema } from '../src/core/loader/loadSchema'

describe('Schema Loader', () => {
  it('should load presets and fields', async () => {
    const schema = await loadSchema()

    expect(Object.keys(schema.presets).length).toBeGreaterThan(1000)
    expect(Object.keys(schema.fields).length).toBeGreaterThan(500)

    expect(schema.presets['railway/_platform']).toBeDefined()
  })
})