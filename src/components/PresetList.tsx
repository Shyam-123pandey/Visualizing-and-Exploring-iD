import { useSchemaStore } from "../store/schemaStore"
export default function PresetList() {
  const results = useSchemaStore(state => state.searchResults)
  const selectPreset = useSchemaStore(state => state.selectPreset)

  if (!results.length) {

    return (
      <div className="results">
        <p>No results yet. Try searching.</p>
      </div>
    )

  }

  return (

    <div className="results">

      <h3>Search Results</h3>

      <ul>

        {results.map((presetId) => (

          <li
            key={presetId}
            onClick={() => selectPreset(presetId)}
            className="preset-item"
          >
            {presetId}
          </li>

        ))}

      </ul>

    </div>

  )

}