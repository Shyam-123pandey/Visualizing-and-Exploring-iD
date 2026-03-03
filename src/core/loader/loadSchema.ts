import fs from 'fs'
import path from 'path'
import type{ RawPreset, RawField, SchemaData } from './schemaTypes'

const PRESET_DIR = path.resolve(
  __dirname,
  '../../data/raw/presets'
)

const FIELD_DIR = path.resolve(
  __dirname,
  '../../data/raw/fields'
)

function readJSONFilesRecursively(
  dir: string,
  baseDir: string
): Record<string, any> {
  const result: Record<string, any> = {}

  function walk(currentDir: string) {
    const files = fs.readdirSync(currentDir)

    for (const file of files) {
      const fullPath = path.join(currentDir, file)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        walk(fullPath)
      } else if (file.endsWith('.json')) {
        const raw = fs.readFileSync(fullPath, 'utf-8')
        const json = JSON.parse(raw)

        const id = fullPath
          .replace(baseDir + path.sep, '')
          .replace('.json', '')
          .replace(/\\/g, '/')

        result[id] = json
      }
    }
  }

  walk(dir)
  return result
}

export async function loadSchema(): Promise<SchemaData> {
  const presets = readJSONFilesRecursively(PRESET_DIR, PRESET_DIR)
  const fields = readJSONFilesRecursively(FIELD_DIR, FIELD_DIR)

  return { presets, fields }
}