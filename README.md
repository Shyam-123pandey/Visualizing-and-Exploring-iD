# iD Preset Visualizer  
### Visualizing and Exploring the iD Tagging Schema  
Google Summer of Code 2026 – OpenStreetMap  

---

## 📖 Overview

The **iD Preset Visualizer** is a deterministic schema exploration tool designed to improve transparency and contributor onboarding within the OpenStreetMap ecosystem.

The `id-tagging-schema` repository defines how presets, fields, categories, and translations are structured and consumed by the iD editor. However, it currently exists as structured JSON without an interactive inspection layer.

This project transforms that raw schema into an interactive visualization system that:

- Resolves preset inheritance deterministically  
- Tracks field origin and overrides  
- Visualizes preset dependency graphs  
- Highlights regional variants  
- Displays translation coverage  
- Provides schema validation insights  

---

## 🎯 Project Goals

- Reduce barrier to entry for new contributors  
- Improve schema debugging workflow  
- Provide deterministic inheritance resolution  
- Improve transparency of tagging infrastructure  
- Enable future linting and CI integration tools  

---

## 🏗️ Architecture Overview

Core principle:

> All schema logic lives inside `/core`.  
> UI components only consume resolved data.

High-level flow:

```
id-tagging-schema JSON
        ↓
Schema Loader
        ↓
Normalization Layer
        ↓
Inheritance Resolution Engine
        ↓
Resolved Schema Store
        ↓
Search / Graph / Validation
        ↓
UI Rendering Layer
```

---

## 📂 Project Structure

```
src/
│
├── core/                # Pure schema logic (no React here)
│   ├── loader/          # Schema loading
│   ├── resolver/        # Inheritance resolution
│   ├── graph/           # Dependency graph construction
│   ├── search/          # Inverted search index
│   └── validation/      # Integrity checks
│
├── components/          # React UI components
├── store/               # Zustand state management
├── types/               # TypeScript interfaces
├── data/                # Local test schema (mock)
└── app/                 # Application layout
```

---

## 🛠️ Tech Stack

### Frontend
- React (TypeScript)

### Build Tool
- Vite

### State Management
- Zustand

### Testing
- Vitest / Jest
- React Testing Library

### Deployment
- Static site (GitHub Pages compatible)

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Shyam-123pandey/Visualizing-and-Exploring-iD.git
cd Visualizing-and-Exploring-iD
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run Development Server

```bash
npm run dev
```

Application runs at:

```
http://localhost:5173
```

### 4️⃣ Run Tests

```bash
npm run test
```

---

## 📚 Data Source

Initial development uses mock schema data located in:

```
src/data/
```

Future versions will integrate directly with:

https://github.com/openstreetmap/id-tagging-schema

Version locking will ensure deterministic and reproducible behavior.

---

## 🧪 Testing Strategy

- Unit tests for inheritance resolution  
- Merge conflict validation tests  
- Translation fallback tests  
- Graph integrity validation tests  

---

## 📈 Complexity Overview

| Operation | Complexity |
|-----------|------------|
| Schema Load | O(N) |
| Inheritance Resolution | O(N + E) |
| Graph Construction | O(N + E) |
| Search Lookup | O(1) |
| Validation Pass | O(N) |

Where:
- N = number of presets  
- E = number of inheritance edges  

---

## ⚙️ Development Roadmap

### Phase 1
- Schema loader  
- Deterministic resolver  
- Unit testing  

### Phase 2
- Preset explorer UI  
- Inheritance visualization  

### Phase 3
- Translation coverage viewer  
- Regional comparison engine  

### Phase 4
- Validation engine  
- Performance optimization  
- Documentation & refinement  

---

## 🤝 Contribution Strategy

The project follows an incremental contribution model:

1. Schema Loader  
2. Resolution Engine  
3. Explorer UI  
4. Graph Visualization  
5. Validation Engine  

Each module is independently reviewable.

---

## 🌍 Community Impact

This tool aims to:

- Improve contributor onboarding  
- Reduce schema debugging friction  
- Improve preset review workflows  
- Increase transparency in tagging infrastructure  
- Enable future linting and automation tools  

---

## 👨‍💻 Author

Shyam Pandey  
B.Tech – NIT Meghalaya  
GSoC 2026 Applicant – OpenStreetMap  

---

## 🔮 Long-Term Vision

- Schema diff viewer  
- Automated preset impact analysis  
- CI integration  
- Library extraction for other OSM editors  
- Tag usage analytics overlay  

---