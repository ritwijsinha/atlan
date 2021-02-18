# SQL Editor

## Demo
[https://ritwij.com/atlan](https://ritwij.com/atlan)

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
- First meaningful paint: ~150ms
- App fully loaded: ~450ms

_Measured using `Performance` tab in Chrome DevTools_

## Performance Optimizations
- Virtualized Response Table
- Virtualized History (Sidebar)
- Lazily loaded Monaco Editor, to unblock rendering
- Lazily initialized all the Stores (MobX)
- Load bare-bones of the app, for the first load.