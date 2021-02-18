# SQL Editor

## Supported features
- `SELECT` / `CREATE` / `UPDATE` / `DELETE` queries
- Persistent (storage) History of the previous queries
- Sidebar to display an entire row in a cleaner way
- Filtering/Sorting Response Table
- Filtering History
- Responsive UI

## Directory Structure
```
src
├── view                   # React components
├── stores                 # MobX stores for state management
├── services               # Services communicating with backend
├── styles                 # CSS Styles
└── constants              # String constants
```

## External Libraries/Tools used
- `react`
- `react-window` for virtualizing History and Response Table
- `material-ui` for `Button` / `Input` / `Tabs`
- `mobx` (Store) for state management
- `react-split-pane` for layout
- `monaco-editor` for Query Editor
- `Postman Mock Servers` for backend

## Components built from Scratch
- Response Table (virtualized)
- Sidebar
- History (virtualized)
- Response Meta
- Stores

## Performance
_to be filled_