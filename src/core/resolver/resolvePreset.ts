import type { Preset } from "../loader/schemaTypes";

export function resolvePreset(
  id: string,
  presetMap: Map<string, Preset>,
  visited = new Set<string>()
): Preset {

  if (visited.has(id)) {
    throw new Error("Circular inheritance detected");
  }

  visited.add(id);

  const preset = presetMap.get(id);
  if (!preset) throw new Error("Preset not found");

  if (!preset.extends) return preset;

  const parent = resolvePreset(preset.extends, presetMap, visited);

  return {
    ...parent,
    ...preset,
    tags: { ...parent.tags, ...preset.tags },
    fields: [...(parent.fields || []), ...(preset.fields || [])]
  };
}