import { useSchemaStore } from "../store/schemaStore"

export default function PresetDetail() {

  const preset = useSchemaStore(state => state.resolvedPreset)
  const presetId = useSchemaStore(state => state.selectedPreset)

  const deps = useSchemaStore(state => state.dependencies)
  const fieldUsage = useSchemaStore(state => state.fieldUsage)

  const selectPreset = useSchemaStore(state => state.selectPreset)

  if (!preset) {
    return (
      <div style={{ padding: "20px" }}>
        <h3>Select a preset to inspect</h3>
      </div>
    )
  }

  return (
    <div style={{ padding: "20px" }}>

      <h2>{presetId}</h2>

      {/* Geometry */}
      <h3>Geometry</h3>
      <ul>
        {preset.geometry?.map((g: string) => (
          <li key={g}>{g}</li>
        ))}
      </ul>

      {/* Tags */}
      <h3>Tags</h3>
      <ul>
        {Object.entries(preset.tags || {}).map(([k, v]) => (
          <li key={k}>
            {k} = {String(v)}
          </li>
        ))}
      </ul>

      {/* Fields */}
      <h3>Fields</h3>
      <ul>
        {preset.fields?.map((f: string) => (
          <li style={{color: "#fff"}} key={f}>{f}</li>
        ))}
      </ul>

      {/* Field Origins */}
      <h3>Field Origins</h3>
      <ul>
        {Object.entries(preset.fieldOrigins || {}).map(([field, origin]) => (
          <li key={field}>
            {field} → {String(origin)}
          </li>
        ))}
      </ul>

      {/* Field Usage Inspector */}
      <h3>Field Usage</h3>

      {Object.entries(fieldUsage || {}).map(([field, presets]) => (

        <div key={field} style={{ marginBottom: "15px" }}>

          <strong>{field}</strong> → used by {presets.length} presets

          <ul>

            {presets.slice(0, 5).map((p) => (

              <li
                key={p}
                style={{ cursor: "pointer", color: "#2563eb" }}
                onClick={() => selectPreset(p)}
              >
                {p}

              </li>

            ))}

          </ul>

        </div>

      ))}

      {/* Dependencies */}
      <h3>Dependencies</h3>

      <h4>Parent Presets</h4>
      <ul>
        {deps?.parents?.length ? (
          deps.parents.map((p, i) => (
            <li
              key={i}
              style={{ cursor: "pointer", color: "#2563eb" }}
              onClick={() => selectPreset(p)}
            >
              {p}
            </li>
          ))
        ) : (
          <li>No parent presets</li>
        )}
      </ul>

      <h4>Used By</h4>
      <ul>
        {deps?.children?.length ? (
          deps.children.map((c, i) => (
            <li
              key={i}
              style={{ cursor: "pointer", color: "#2563eb" }}
              onClick={() => selectPreset(c)}
            >
              {c}
            </li>
          ))
        ) : (
          <li>No child presets</li>
        )}
      </ul>

    </div>
  )
}