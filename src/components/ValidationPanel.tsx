import { useSchemaStore } from "../store/schemaStore"

export default function ValidationPanel() {

  const issues = useSchemaStore(state => state.validationIssues)

  if (!issues || issues.length === 0) {
    return (
      <div style={{ padding: "20px" }}>
        <h3>Schema Validation</h3>
        <p>No validation issues found ✅</p>
      </div>
    )
  }

  return (
    <div style={{ padding: "20px" }}>

      <h3>Schema Validation Issues</h3>

      <p>Total Issues: {issues.length}</p>

      <ul>

        {issues.map((issue, i) => (

          <li key={i} style={{ marginBottom: "10px" }}>

            <strong>{issue.type || "Issue"}</strong>

            <div>
              {issue.message || JSON.stringify(issue)}
            </div>

          </li>

        ))}

      </ul>

    </div>
  )
}