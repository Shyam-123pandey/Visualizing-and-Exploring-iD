// cycleDetection.ts

export function checkCycle(
  stack: string[],
  id: string
) {
  if (stack.includes(id)) {
    throw new Error(
      `Circular reference detected: ${[...stack, id].join(' → ')}`
    )
  }
}