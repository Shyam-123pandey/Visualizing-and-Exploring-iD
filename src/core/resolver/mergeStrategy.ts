// mergeStrategy.ts

export function mergeArraysUnique(
  parent: string[] = [],
  child: string[] = []
): string[] {
  return Array.from(new Set([...parent, ...child]))
}

export function mergeTags(
  parent: Record<string,string> = {},
  child: Record<string,string> = {}
) {
  return { ...parent, ...child }
}