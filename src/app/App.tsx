import { useEffect } from "react"
import SearchBar from "../components/SearchBar"
import PresetList from "../components/PresetList"
import PresetDetail from "../components/PresetDetail"
import { useSchemaStore } from "../store/schemaStore"
import "./Styles.css"

export default function App() {

  const initialize = useSchemaStore(state => state.initialize)

  useEffect(() => {
    initialize()
  }, [])

  return (
    <div className="app">

      {/* HEADER */}
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
              <h1 className="title">ID Preset Visualizer</h1>
              <p className="subtitle">OpenStreetMap Tagging Schema Explorer</p>
            </div>
          </div>

          <div className="badge">
            <span className="badge-text">GSOCC Project</span>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="main-content">
        <div className="container">

          <SearchBar />

          {/* DAY 11 LAYOUT */}
          <div className="workspace">

            {/* LEFT PANEL */}
            <div className="results-panel">
              <PresetList />
            </div>

            {/* RIGHT PANEL */}
            <div className="detail-panel">
              <PresetDetail />
            </div>

          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="footer">
        <p className="footer-text">
          Built for OpenStreetMap contributors • GSOCC 2026
        </p>
      </footer>

    </div>
  )
}