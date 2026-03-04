// resolvePreset.ts
import type { SchemaData } from "../loader/schemaTypes";
import type { ResolvedPreset } from "../../types/presets";
import { checkCycle } from "./cycleDetection";
import { mergeArraysUnique, mergeTags, mergeFieldOrigins } from "./mergeStrategy";

function extractReference(field: string): string | null {
  if (field.startsWith("{") && field.endsWith("}")) {
    return field.slice(1, -1);
  }
  return null;
}

export function resolvePreset(
  id: string,
  schema: SchemaData,
  stack: string[] = [],
): ResolvedPreset {
  checkCycle(stack, id);

  const raw = schema.presets[id];
  if (!raw) {
    throw new Error(`Preset not found: ${id}`);
  }

  const newStack = [...stack, id];

  let resolvedFields: string[] = [];
  let inheritedFrom: string[] = [];

  // Resolve normal fields
  const allFields = [...(raw.fields || []), ...(raw.moreFields || [])];

  let fieldOrigins: Record<string, string> = {};

  for (const field of allFields) {
    const ref = extractReference(field);

    if (ref) {
      const resolvedRef = resolvePreset(ref, schema, newStack);

      resolvedFields = mergeArraysUnique(resolvedFields, resolvedRef.fields);

      fieldOrigins = mergeFieldOrigins(fieldOrigins, resolvedRef.fieldOrigins);

      inheritedFrom.push(ref);
    } else {
      resolvedFields.push(field);
      fieldOrigins[field] = id;
    }
  }

  return {
    id,
    fields: Array.from(new Set(resolvedFields)),
    tags: mergeTags({}, raw.tags || {}),
    geometry: mergeArraysUnique([], raw.geometry || []),
    inheritedFrom,
    fieldOrigins,
  };
}
