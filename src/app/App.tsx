import { loadSchema } from "../core/loader/loadSchema";
import { resolvePreset } from "../core/resolver/resolvePreset";

function App() {
  const { presets } = loadSchema();

  const resolved = resolvePreset("amenity/restaurant", presets);

  return (
    <div>
      <h1 className="text-2xl font-bold">{resolved.id}</h1>
      <pre className="m-4">{JSON.stringify(resolved, null, 2)}</pre>
    </div>
  );
}

export default App;