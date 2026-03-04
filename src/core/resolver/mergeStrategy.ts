
export function mergeArraysUnique(
  parent: string[] = [],
  child: string[] = []
) {
  return Array.from(new Set([...parent, ...child])) // The Set will automatically remove duplicates, and Array.from converts it back to an array
}

export function mergeTags(
  parent: Record<string,string> = {},
  child: Record<string,string> = {}
) {
  return { ...parent, ...child } // The spread operator will merge the two objects, with the child properties overwriting any duplicate keys from the parent
}

export function mergeFieldOrigins(
  parent: Record<string,string> = {},
  child: Record<string,string> = {}
) {
  return { ...parent, ...child }
}