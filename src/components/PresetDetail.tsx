import { useSchemaStore } from "../store/schemaStore"
import "./PresetDetail.css"

export default function PresetDetail() {

  const preset = useSchemaStore(s => s.resolvedPreset)
  const presetId = useSchemaStore(s => s.selectedPreset)

  const deps = useSchemaStore(s => s.dependencies)
  const fieldUsage = useSchemaStore(s => s.fieldUsage)
  const issues = useSchemaStore(s => s.validationIssues)

  const selectPreset = useSchemaStore(s => s.selectPreset)

  if (!preset) {
    return null
  }

  return (
    <div className="preset-detail">

      {/* BREADCRUMB & TITLE */}
      <div className="detail-header">
        <div className="breadcrumb">
          {presetId?.split('/').map((part, idx, arr) => (
            <span key={idx} className="breadcrumb-item">
              {part}
              {idx < arr.length - 1 && <span className="breadcrumb-separator">/</span>}
            </span>
          ))}
        </div>
        <h1 className="detail-title">{presetId}</h1>
        {preset.name && <p className="detail-name">{preset.name}</p>}
      </div>

      {/* QUICK INFO CARDS */}
      <div className="info-cards">
        <div className="info-card">
          <div className="info-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="info-card-content">
            <div className="info-card-label">Geometry Types</div>
            <div className="info-card-value">{preset.geometry?.length || 0}</div>
          </div>
        </div>

        <div className="info-card">
          <div className="info-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="7" cy="7" r="1" fill="currentColor"/>
            </svg>
          </div>
          <div className="info-card-content">
            <div className="info-card-label">Tags</div>
            <div className="info-card-value">{Object.keys(preset.tags || {}).length}</div>
          </div>
        </div>

        <div className="info-card">
          <div className="info-card-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
          <div className="info-card-content">
            <div className="info-card-label">Fields</div>
            <div className="info-card-value">{preset.fields?.length || 0}</div>
          </div>
        </div>
      </div>

      {/* GEOMETRY */}
      {preset.geometry && preset.geometry.length > 0 && (
        <section className="detail-section">
          <h2 className="section-title">
            <svg className="section-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Geometry Types
          </h2>
          <div className="pill-container">
            {preset.geometry.map((g: string) => (
              <span key={g} className="pill pill-geometry">{g}</span>
            ))}
          </div>
        </section>
      )}

      {/* TAGS */}
      {preset.tags && Object.keys(preset.tags).length > 0 && (
        <section className="detail-section">
          <h2 className="section-title">
            <svg className="section-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="currentColor" strokeWidth="2"/>
              <circle cx="7" cy="7" r="1" fill="currentColor"/>
            </svg>
            Tags
          </h2>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Key</th>
                  <th>Value</th>
                </tr>
              </thead>

              <tbody>
                {Object.entries(preset.tags).map(([k, v]) => (
                  <tr key={k}>
                    <td><code className="code-key">{k}</code></td>
                    <td><code className="code-value">{String(v)}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* FIELDS */}
      {preset.fields && preset.fields.length > 0 && (
        <section className="detail-section">
          <h2 className="section-title">
            <svg className="section-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
              <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
              <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Fields ({preset.fields.length})
          </h2>

          <div className="pill-container">
            {preset.fields.map((f: string) => (
              <span key={f} className="pill pill-field">{f}</span>
            ))}
          </div>
        </section>
      )}

      {/* FIELD ORIGINS */}
      {preset.fieldOrigins && Object.keys(preset.fieldOrigins).length > 0 && (
        <section className="detail-section">
          <h2 className="section-title">
            <svg className="section-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Field Origins
          </h2>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Origin Preset</th>
                </tr>
              </thead>

              <tbody>
                {Object.entries(preset.fieldOrigins).map(([field, origin]) => (
                  <tr key={field}>
                    <td><code className="code-key">{field}</code></td>
                    <td
                      className="clickable-cell"
                      onClick={() => selectPreset(origin as string)}
                      title="Click to view this preset"
                    >
                      {String(origin)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* FIELD USAGE */}
      {fieldUsage && Object.keys(fieldUsage).length > 0 && (
        <section className="detail-section">
          <h2 className="section-title">
            <svg className="section-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
              <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2"/>
            </svg>
            Field Usage Across Presets
          </h2>

          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Usage Count</th>
                  <th>Example Presets</th>
                </tr>
              </thead>

              <tbody>
                {Object.entries(fieldUsage).map(([field, presets]) => (
                  <tr key={field}>
                    <td><code className="code-key">{field}</code></td>
                    <td>
                      <span className="badge-count">{presets.length}</span>
                    </td>
                    <td>
                      <div className="preset-chips">
                        {presets.slice(0, 3).map(p => (
                          <span
                            key={p}
                            className="preset-chip"
                            onClick={() => selectPreset(p)}
                            title={p}
                          >
                            {p.split('/').pop()}
                          </span>
                        ))}
                        {presets.length > 3 && (
                          <span className="preset-chip-more">
                            +{presets.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* DEPENDENCIES */}
      <section className="detail-section">
        <h2 className="section-title">
          <svg className="section-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M12 2v6m0 0L9 5m3 3l3-3M12 22v-6m0 0l-3 3m3-3l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M8 12H2m6 0L5 9m3 3l-3 3M22 12h-6m0 0l3-3m-3 3l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Dependency Graph
        </h2>

        <div className="dependency-grid">
          <div className="dependency-column">
            <h3 className="dependency-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 19V5M5 12l7-7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Parent Presets
            </h3>
            {deps?.parents?.length ? (
              <div className="dependency-list">
                {deps.parents.map(p => (
                  <div
                    key={p}
                    className="dependency-item"
                    onClick={() => selectPreset(p)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {p}
                  </div>
                ))}
              </div>
            ) : (
              <p className="dependency-empty">No parent presets</p>
            )}
          </div>

          <div className="dependency-column">
            <h3 className="dependency-title">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 5v14M5 12l7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Child Presets
            </h3>
            {deps?.children?.length ? (
              <div className="dependency-list">
                {deps.children.map(c => (
                  <div
                    key={c}
                    className="dependency-item"
                    onClick={() => selectPreset(c)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {c}
                  </div>
                ))}
              </div>
            ) : (
              <p className="dependency-empty">No child presets</p>
            )}
          </div>
        </div>
      </section>

      {/* VALIDATION */}
      <section className="detail-section">
        <h2 className="section-title">
          <svg className="section-icon" width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Schema Validation
        </h2>

        <div className="validation-box">
          {(!issues || issues.length === 0) ? (
            <div className="validation-success">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                <polyline points="22 4 12 14.01 9 11.01" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <p className="validation-success-text">No validation issues found</p>
            </div>
          ) : (
            <div className="validation-issues">
              {issues.slice(0, 50).map((issue, i) => (
                <div key={i} className="issue-item">
                  <div className="issue-type">{issue.type}</div>
                  <div className="issue-message">{issue.message}</div>
                </div>
              ))}
              {issues.length > 50 && (
                <div className="issue-more">
                  And {issues.length - 50} more issues...
                </div>
              )}
            </div>
          )}
        </div>
      </section>

    </div>
  )
}