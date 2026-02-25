import presets from "../../data/presets.json";

export function loadSchema() {
  const presetMap = new Map<string, any>();

  presets.forEach((preset: any) => {
    presetMap.set(preset.id, preset);
  });

  return {
    presets: presetMap
  };
}