import { useSchemaStore } from "../store/schemaStore"

export default function PresetList() {
  const results = useSchemaStore(state => state.searchResults)
  const selectPreset = useSchemaStore(state => state.selectPreset)
  if (!results.length) {
    return (
      <div className="results-container">
        <div className="empty-state">
          <svg className="empty-icon" width="64" height="64" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <h3 className="empty-title">Start Your Search</h3>
          <p className="empty-description">
            Enter a keyword above to search through OSM presets.
            Try searching for "restaurant", "park", or "station".
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="results-container">
      <div className="results-header">
        <h3 className="results-title">
          Found {results.length} {results.length === 1 ? 'Preset' : 'Presets'}
        </h3>
        <span className="results-count">{results.length} results</span>
      </div>

      <div className="preset-grid">
        {results.map((presetId) => {
          const parts = presetId.split('/')
          const name = parts[parts.length - 1]
          const category = parts.length > 1 ? parts[0] : 'General'
          
          return (
            <div
              key={presetId}
              onClick={() => selectPreset(presetId)}
              className="preset-card"
            >
              <div className="preset-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="preset-content">
                <h4 className="preset-name">{name.replace(/_/g, ' ')}</h4>
                <p className="preset-category">{category}</p>
                <p className="preset-id">{presetId}</p>
              </div>
              <div className="preset-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}