import { useEffect } from "react"
import SearchBar from "../components/SearchBar"
import PresetList from "../components/PresetList"
import { useSchemaStore } from "../store/schemaStore"
import "./Styles.css"

export default function App() {

  const initialize = useSchemaStore(state => state.initialize)

  useEffect(() => {
    initialize()
  }, [])

  return (

    <div className="container">

      <h1 className="title">iD Preset Visualizer</h1>

      <SearchBar />

      <PresetList />

    </div>

  )

}