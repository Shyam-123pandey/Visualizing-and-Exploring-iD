import { useState } from "react"
import { useSchemaStore } from "../store/schemaStore"

export default function SearchBar() {
  const [query, setQuery] = useState("")
  const search = useSchemaStore(state => state.search)

  function handleSearch() {
    if (!query.trim()) return
    search(query)
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <div className="search-section">
      <div className="search-header">
        <h2 className="search-title">Explore OSM Presets</h2>
        <p className="search-description">
          Search and discover OpenStreetMap tagging presets used in the iD editor
        </p>
      </div>
      
      <div className="search-container">
        <div className="search-input-wrapper">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <input
            className="search-input"
            type="text"
            placeholder="Search presets (e.g., restaurant, platform, hotel...)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
        <button
          className="search-button"
          onClick={handleSearch}
          disabled={!query.trim()}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
            <path d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM18 18l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Search
        </button>
      </div>
    </div>
  )
}