import { resolvePreset } from "../src/core/resolver/resolvePreset";

test("child overrides parent", () => {
  const presetMap = new Map([
    ["parent", { id: "parent", tags: { amenity: "restaurant" } }],
    ["child", { id: "child", extends: "parent", tags: { cuisine: "indian" } }]
  ]);

  const result = resolvePreset("child", presetMap);

  expect(result.tags?.amenity).toBe("restaurant");
  expect(result.tags?.cuisine).toBe("indian");
});