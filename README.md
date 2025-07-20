# Phasmophobia Item Unlock Roller

A simple, compact web-based progression system for Phasmophobia that simulates unlocking equipment through rolling. Built with SolidJS for optimal performance and reactivity.

## Features

### 🎯 Core Mechanics
- **Simple Rolling**: Click "Roll for Item" to unlock a random item
- **Progressive Unlocking**: Each roll unlocks a new item
- **No Duplicates**: Once an item is unlocked, it won't be unlocked again
- **Reset Functionality**: Start fresh with the reset button

### 📦 Item Categories
The roller includes all 20 unlockable item categories:
- **Video Camera** 📹 (starts unlocked)
- **Head Gear** 🪖
- **Sanity Meds** 💊
- **Firelights** 🔥
- **Parabolic Mic** 🎤
- **Sound Sensor** 📡
- **Motion Sensor** 📊
- **Lighters** 🔥
- **Thermometer** 🌡️
- **EMF Reader** 📱
- **DOTS** 👁️
- **Tripod** 📐
- **Writing Book** 📖
- **Flashlight** 🔦
- **Ultraviolet** 💜
- **Spirit Box** 📻
- **Crucifix** ✝️
- **Salt** 🧂
- **Smudges** 🌿
- **Sound Recorder** 🎙️
- **Photo Camera** 📷

### 💾 Persistence
- All progress is automatically saved to local storage
- Unlocked items persist between sessions
- Reset button available to start fresh

## How to Use

### Development
1. **Install dependencies**: `npm install`
2. **Start development server**: `npm run dev`
3. **Open browser**: Navigate to `http://localhost:3000`

### Production
1. **Build the project**: `npm run build`
2. **Preview build**: `npm run preview`

## Technical Details

### File Structure
```
phasmo-roller/
├── index.html              # Main HTML file
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── src/
│   ├── index.jsx           # SolidJS entry point
│   └── App.jsx             # Main application component
└── README.md               # This file
```

### Technologies Used
- **SolidJS**: Reactive UI framework for optimal performance
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Local Storage**: Data persistence

### Design Features
- **Compact Layout**: Efficient use of screen space
- **Responsive Grid**: Items displayed in 3 or 5 columns based on screen size
- **Modern UI**: Clean, dark theme with glass-morphism effects
- **Smooth Animations**: Hover effects and transitions for better UX
- **Mobile-Friendly**: Responsive design that works on all devices

### Browser Compatibility
- Chrome/Chromium (recommended)
- Firefox
- Safari
- Edge

## Features in Detail

### Rolling Mechanics
- Each roll has a 100% chance to unlock a new item if any remain locked
- Random selection from remaining locked items
- No duplicates - each item can only be unlocked once
- Special notification when all items are unlocked

### User Interface
- **Simple Design**: Clean interface focused on the core functionality
- **Dark Theme**: Easy on the eyes during night gaming sessions
- **Responsive Grid**: Items organized in 3 or 5 columns
- **Smooth Animations**: Engaging visual feedback with hover effects
- **Modal Notifications**: Celebratory unlock notifications
- **Real-time Updates**: UI updates immediately after each roll

### Data Management
- **Automatic Saving**: Progress saved after every roll
- **Error Handling**: Graceful handling of corrupted save data
- **Reset Functionality**: Complete progress reset with confirmation

## SolidJS Benefits

### Performance
- **Fine-grained reactivity**: Only updates what changes
- **No virtual DOM**: Direct DOM manipulation for better performance
- **Small bundle size**: Minimal runtime overhead

### Developer Experience
- **Simple API**: Easy to learn and use
- **TypeScript support**: Full type safety
- **Hot module replacement**: Fast development iteration

### State Management
- **Reactive primitives**: `createSignal`, `createStore`, `createEffect`
- **Automatic tracking**: Dependencies tracked automatically
- **Predictable updates**: Clear data flow

## Customization

The application is easily customizable:

### Adding New Items
Edit the `ITEMS` constant in `src/App.jsx`:
```javascript
const ITEMS = {
  'new-item': { name: 'New Item', icon: '🎯', unlocked: false },
  // ... existing items
};
```

### Changing Icons
Replace the emoji icons in the items object with any Unicode emoji or text.

### Modifying Roll Chances
Edit the `roll()` function to change the probability of unlocking items.

### Styling Changes
Since we use Tailwind CSS, you can easily modify the appearance by changing utility classes in the JSX.

## Performance

- **Lightweight**: SolidJS has minimal runtime overhead
- **Fast Loading**: Vite provides instant hot module replacement
- **Efficient Rendering**: Only updates changed components
- **Local Storage**: Fast data persistence without server requirements

## License

This project is open source and available under the MIT License.

---

**Enjoy your Phasmophobia progression tracking!** 👻 