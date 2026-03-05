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

    <div className="search-container">

      <input
        className="search-input"
        type="text"
        placeholder="Search presets (platform, restaurant...)"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
      />

      <button
        className="search-button"
        onClick={handleSearch}
      >
        Search
      </button>

    </div>

  )

}