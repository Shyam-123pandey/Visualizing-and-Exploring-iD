import { useEffect } from "react"
import SearchBar from "../components/SearchBar"
import PresetList from "../components/PresetList"
import PresetDetail from "../components/PresetDetail"
import { useSchemaStore } from "../store/schemaStore"
import "./Styles.css"

export default function App() {

  const initialize = useSchemaStore(state => state.initialize)
  const selectedPreset = useSchemaStore(state => state.selectedPreset)

  useEffect(() => {
    initialize()
  }, [])

  return (
    <div className="app">

      {/* FIXED HEADER */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <svg className="logo" width="40" height="40" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                stroke="#2563eb"
                strokeWidth="2"
                fill="#3b82f6"
                opacity="0.2"
              />
              <circle cx="12" cy="9" r="2.5" fill="#2563eb"/>
            </svg>

            <div className="title-section">
              <h1 className="title">iD Preset Visualizer</h1>
              <p className="subtitle">OpenStreetMap Tagging Schema Explorer</p>
            </div>
          </div>

          <div className="header-stats">
            <div className="badge">
              <span className="badge-text">GSOCC 2026</span>
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH BAR - FIXED BELOW HEADER */}
      <div className="search-bar-wrapper">
        <SearchBar />
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="main-layout">
        
        {/* LEFT SIDEBAR - FIXED, SCROLLABLE */}
        <aside className="sidebar">
          <PresetList />
        </aside>

        {/* RIGHT CONTENT - SCROLLABLE DETAIL VIEW */}
        <section className="content-area">
          {selectedPreset ? (
            <PresetDetail />
          ) : (
            <div className="welcome-screen">
              <div className="welcome-content">
                <svg className="welcome-icon" width="120" height="120" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    stroke="#667eea"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <circle cx="12" cy="9" r="2.5" fill="#667eea"/>
                </svg>
                <h2 className="welcome-title">Welcome to iD Preset Visualizer</h2>
                <p className="welcome-description">
                  Search for OpenStreetMap presets using the search bar above, then click on any result to view detailed information including:
                </p>
                <ul className="welcome-features">
                  <li>✓ Preset inheritance and field resolution</li>
                  <li>✓ Tag definitions and geometry types</li>
                  <li>✓ Field origins and override tracking</li>
                  <li>✓ Dependency graph (parents and children)</li>
                  <li>✓ Field usage across all presets</li>
                  <li>✓ Schema validation insights</li>
                </ul>
              </div>
            </div>
          )}
        </section>

      </main>

    </div>
  )
}