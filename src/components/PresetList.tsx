import { useState, useEffect, useRef } from "react"
import { useSchemaStore } from "../store/schemaStore"

const ITEMS_PER_PAGE = 20

export default function PresetList() {
  const results = useSchemaStore(state => state.searchResults)
  const selectPreset = useSchemaStore(state => state.selectPreset)
  const selectedPreset = useSchemaStore(state => state.selectedPreset)
  
  const [displayCount, setDisplayCount] = useState(ITEMS_PER_PAGE)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setDisplayCount(ITEMS_PER_PAGE)
  }, [results])

  const handleScroll = () => {
    if (!scrollContainerRef.current) return
    
    const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current
    
    // Load more when scrolled to 80% of the way down
    if (scrollTop + clientHeight >= scrollHeight * 0.8) {
      setDisplayCount(prev => Math.min(prev + ITEMS_PER_PAGE, results.length))
    }
  }

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
            Try searching for <strong>restaurant</strong>, <strong>park</strong>, or <strong>station</strong>.
          </p>
        </div>
      </div>
    )
  }

  const displayedResults = results.slice(0, displayCount)

  return (
    <div className="results-container">
      <div className="results-header">
        <div>
          <h3 className="results-title">Search Results</h3>
          <p className="results-subtitle">
            Showing {displayCount} of {results.length} presets
          </p>
        </div>
        <span className="results-badge">{results.length}</span>
      </div>

      <div 
        className="preset-list" 
        ref={scrollContainerRef}
        onScroll={handleScroll}
      >
        {displayedResults.map((presetId) => {
          const parts = presetId.split('/')
          const name = parts[parts.length - 1]
          const category = parts.length > 1 ? parts[parts.length - 2] : 'General'
          const isSelected = selectedPreset === presetId
          
          return (
            <div
              key={presetId}
              onClick={() => selectPreset(presetId)}
              className={`preset-card ${isSelected ? 'preset-card-active' : ''}`}
            >
              <div className="preset-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path 
                    d="M12 2L2 7l10 5 10-5-10-5z" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                  <path 
                    d="M2 17l10 5 10-5M2 12l10 5 10-5" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="preset-content">
                <h4 className="preset-name">{name.replace(/_/g, ' ')}</h4>
                <p className="preset-category">{category}</p>
                <p className="preset-id">{presetId}</p>
              </div>
              <div className="preset-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          )
        })}
        
        {displayCount < results.length && (
          <div className="loading-indicator">
            <div className="spinner"></div>
            <p>Loading more results...</p>
          </div>
        )}
      </div>
    </div>
  )
}