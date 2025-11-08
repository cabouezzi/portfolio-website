# Interactive Preview Window Feature

## 🎮 Overview

The project detail pages now feature an interactive preview window that allows visitors to try out your projects directly in the browser! The Chess AI board is embedded as a live, playable demo.

## ✨ Features

### Preview Window Controls:
- **Expand/Minimize** - Toggle between normal and full-screen view
- **Reset** - Restart the preview component (useful for games/demos)
- **macOS-style window** - Beautiful header with red/yellow/green dots

### Design:
- Positioned right under the title and before the description
- Dark gradient background to showcase the component
- Responsive height adjustment when expanded
- Helpful text: "✨ Try interacting with the preview above!"

## 📝 How to Add Preview to Projects

In `projectsData.js`, add these fields to any project:

```javascript
{
  // ... other fields ...
  previewComponent: "ChessBoard", // Name of component to render
  previewHeight: "600px", // Height of preview window (optional, default: 600px)
}
```

### Example (Chess AI):
```javascript
{
  id: 1,
  slug: "chess-ai",
  title: "Chess AI",
  // ... other fields ...
  previewComponent: "ChessBoard", // This renders the ChessBoard component
  previewHeight: "600px", // Custom height
}
```

### For Projects WITHOUT Preview:
Simply set `previewComponent: null` or omit it entirely. The project will show the static image instead.

```javascript
{
  id: 2,
  slug: "other-project",
  title: "Other Project",
  // ... other fields ...
  previewComponent: null, // No interactive preview
}
```

## 🔧 Adding New Preview Components

### Step 1: Create Your Component
Create a new component file (e.g., `MyGameComponent.js`):

```javascript
import React from 'react';

const MyGameComponent = () => {
  return (
    <div>
      {/* Your interactive component here */}
      <h2>My Interactive Demo</h2>
      <p>This could be a game, visualization, or any React component!</p>
    </div>
  );
};

export default MyGameComponent;
```

### Step 2: Register the Component
In `ProjectDetail.js`, import and add to the `PREVIEW_COMPONENTS` map:

```javascript
import ChessBoard from './ChessBoard';
import MyGameComponent from './MyGameComponent'; // Import your component

const PREVIEW_COMPONENTS = {
  ChessBoard: ChessBoard,
  MyGameComponent: MyGameComponent, // Add here
};
```

### Step 3: Reference in Project Data
In `projectsData.js`:

```javascript
{
  id: 2,
  slug: "my-game",
  title: "My Game",
  previewComponent: "MyGameComponent", // Use the exact key from PREVIEW_COMPONENTS
  previewHeight: "500px",
}
```

## 🎯 Chess AI Preview

The Chess AI preview is fully functional:
- **Click a piece** to select it
- **Click a destination** to move
- **Play against the AI** - The WebSocket connection to your backend enables real gameplay
- **Visual feedback** - Selected pieces are highlighted

### Note on WebSocket:
The ChessBoard component connects to `ws://localhost:8080/game`. Make sure your backend server is running for the chess game to work. If the server isn't running, the board will display but moves won't work.

## 🎨 Styling Tips

### Adjust Preview Window Size:
In `projectsData.js`:
```javascript
previewHeight: "400px" // Smaller
previewHeight: "800px" // Larger
```

### Full-Screen Mode:
Users can click the expand button (⛶) to make the preview fill most of the screen (80vh).

### Custom Backgrounds:
The preview area has a gradient background. To customize, edit the `style` in `ProjectDetail.js`:
```javascript
className="bg-gradient-to-br from-slate-800 to-slate-900"
// Change to your preferred gradient
```

## 🐛 Troubleshooting

### Preview not showing:
1. Check that `previewComponent` name matches exactly in `PREVIEW_COMPONENTS`
2. Verify the component is imported in `ProjectDetail.js`
3. Make sure there are no errors in your preview component

### ChessBoard not working:
1. Ensure your backend WebSocket server is running on `localhost:8080`
2. Check browser console for connection errors
3. The board will display even if WebSocket fails, but moves won't work

### Preview window too small/large:
Adjust `previewHeight` in the project data or use the expand button for temporary full-screen view.

## 💡 Ideas for Preview Components

You can create preview components for:
- **Interactive games** (like Chess AI)
- **Data visualizations** (charts, graphs)
- **Calculators or tools**
- **API demonstrations**
- **UI component showcases**
- **Simulations or animations**
- **Form examples**
- **Mini-apps or utilities**

Any React component can be embedded as a preview!

## 🚀 Benefits

- **Engagement**: Visitors can immediately interact with your projects
- **Showcase**: Demonstrates that your projects actually work
- **Professional**: Shows attention to detail and user experience
- **Memorable**: Interactive demos are more impressive than static images
- **Flexible**: Easy to add/remove for different projects

Your portfolio now has an amazing interactive showcase feature! 🎉
