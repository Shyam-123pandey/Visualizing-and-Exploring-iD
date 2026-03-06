import { useSchemaStore } from "../store/schemaStore";
import { v4 as uuid } from "uuid";

export default function PresetDetail() {
  const preset = useSchemaStore((state) => state.resolvedPreset);
  const presetId = useSchemaStore((state) => state.selectedPreset);
  const deps = useSchemaStore((state) => state.dependencies);

  if (!preset) {
    return <div style={{ padding: "20px" }}>Select a preset</div>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{presetId}</h2>

      <h3>Geometry</h3>
      <ul>
        {preset.geometry?.map((g: string) => (
          <li key={g}>{g}</li>
        ))}
      </ul>

      <h3>Tags</h3>
      <ul>
        {Object.entries(preset.tags || {}).map(([k, v]) => (
          <li key={uuid()}>
            {k} = {String(v)}
          </li>
        ))}
      </ul>

      <h3>Fields</h3>
      <ul>
        {preset.fields?.map((f: any, i: number) => (
          <li key={uuid() }>{f.id || f.key || f}</li>
        ))}
      </ul>

      <h3>Inherited From</h3>
      <ul>
        {preset.inheritedFrom?.length ? (
          preset.inheritedFrom.map((p: string, i: number) => (
            <li key={uuid()}>{p}</li>
          ))
        ) : (
          <li>No inheritance</li>
        )}
      </ul>

      <h3>Parent Presets</h3>
      <ul>
        {deps?.parents?.map((p) => (
          <li key={uuid()}>{p}</li>
        ))}
      </ul>
      
      { deps?.children && deps.children.length > 0 && (
        <>
          <h3>Used By</h3>
          <ul>
            {deps.children?.map((c) => (
              <li key={uuid()}>{c}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
