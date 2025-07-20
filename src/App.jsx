import { createSignal, createEffect, Show } from 'solid-js';
import { createStore } from 'solid-js/store';

const ITEMS = {
  'video-camera': { name: 'Video Camera', icon: '📹', unlocked: true },
  'head-gear': { name: 'Head Gear', icon: '🪖', unlocked: false },
  'sanity-meds': { name: 'Sanity Meds', icon: '💊', unlocked: false },
  'firelights': { name: 'Firelights', icon: '🔥', unlocked: false },
  'parabolic-mic': { name: 'Parabolic Mic', icon: '🎤', unlocked: false },
  'sound-sensor': { name: 'Sound Sensor', icon: '📡', unlocked: false },
  'motion-sensor': { name: 'Motion Sensor', icon: '📊', unlocked: false },
  'lighters': { name: 'Lighters', icon: '🔥', unlocked: false },
  'thermometer': { name: 'Thermometer', icon: '🌡️', unlocked: false },
  'emf-reader': { name: 'EMF Reader', icon: '📱', unlocked: false },
  'dots': { name: 'DOTS', icon: '👁️', unlocked: false },
  'tripod': { name: 'Tripod', icon: '📐', unlocked: false },
  'writing-book': { name: 'Writing Book', icon: '📖', unlocked: false },
  'flashlight': { name: 'Flashlight', icon: '🔦', unlocked: false },
  'ultraviolet': { name: 'Ultraviolet', icon: '💜', unlocked: false },
  'spirit-box': { name: 'Spirit Box', icon: '📻', unlocked: false },
  'crucifix': { name: 'Crucifix', icon: '✝️', unlocked: false },
  'salt': { name: 'Salt', icon: '🧂', unlocked: false },
  'smudges': { name: 'Smudges', icon: '🌿', unlocked: false },
  'sound-recorder': { name: 'Sound Recorder', icon: '🎙️', unlocked: false },
  'photo-camera': { name: 'Photo Camera', icon: '📷', unlocked: false }
};

function App() {
  const [items, setItems] = createStore(ITEMS);
  const [animatingItem, setAnimatingItem] = createSignal(null);
  const [windowWidth, setWindowWidth] = createSignal(window.innerWidth);

  // Track window width for responsive grid
  createEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  // Load from localStorage on mount
  createEffect(() => {
    const savedData = localStorage.getItem('phasmoRollerData');
    if (savedData) {
      try {
        const data = JSON.parse(savedData);
        if (data.items) {
          // Merge saved data with default items to ensure all items exist
          Object.keys(ITEMS).forEach(key => {
            if (data.items[key]) {
              setItems(key, 'unlocked', data.items[key].unlocked);
            }
          });
        }
        // Ensure video camera stays unlocked
        setItems('video-camera', 'unlocked', true);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  });

  const saveToStorage = () => {
    const saveData = { items };
    localStorage.setItem('phasmoRollerData', JSON.stringify(saveData));
  };

  const unlockItem = (itemKey) => {
    setItems(itemKey, 'unlocked', true);
    setAnimatingItem({ key: itemKey, item: items[itemKey] });
    saveToStorage();
    
    // Stop animation after 3 seconds
    setTimeout(() => {
      setAnimatingItem(null);
    }, 3000);
  };

  const handleItemClick = (itemKey, item) => {
    // Don't allow video camera to be locked
    if (itemKey === 'video-camera') return;
    
    // Toggle the unlocked state
    setItems(itemKey, 'unlocked', !item.unlocked);
    saveToStorage();
  };

  const roll = () => {
    // Check if there are any locked items to unlock
    const lockedItems = Object.entries(items).filter(([key, item]) => !item.unlocked);
    
    if (lockedItems.length === 0) {
      setAnimatingItem({ 
        key: 'all-unlocked', 
        item: { icon: '🎉', name: 'All items unlocked!', subtitle: "You've unlocked everything!" }
      });
      
      // Stop animation after 3 seconds
      setTimeout(() => {
        setAnimatingItem(null);
      }, 3000);
      return;
    }

    // 100% chance to unlock an item if there are locked items
    const randomIndex = Math.floor(Math.random() * lockedItems.length);
    const [itemKey, item] = lockedItems[randomIndex];
    
    unlockItem(itemKey);
  };

  const resetProgress = () => {
    // Reset all items to locked except video camera
    Object.keys(items).forEach(key => {
      if (key !== 'video-camera') {
        setItems(key, 'unlocked', false);
      }
    });
    saveToStorage();
  };

  // Calculate grid layout
  const itemsPerRow = () => windowWidth() >= 1024 ? 5 : 3;
  const totalItems = () => Object.keys(items).length;
  const isLastItemAlone = (index) => {
    const total = totalItems();
    const perRow = itemsPerRow();
    return index === total - 1 && (total % perRow === 1);
  };

  const getCenterColumn = () => Math.floor(itemsPerRow() / 2) + 1;

  return (
    <div class="max-w-7xl mx-auto p-4">
      {/* Header */}
      <header class="text-center mb-6">
        <h1 class="text-3xl font-bold mb-2 bg-gradient-to-r from-phasmo-red to-phasmo-accent bg-clip-text text-transparent">
          Phasmophobia Item Unlock Roller
        </h1>
        <p class="text-gray-300 text-sm">Unlock items through rolling</p>
      </header>

      {/* Actions Section */}
      <div class="flex flex-col sm:flex-row gap-3 justify-center mb-8">
        <button 
          onClick={roll}
          class="bg-gradient-to-r from-phasmo-red to-red-600 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg text-lg"
        >
          <span class="text-xl">🎲</span>
          Roll for Item
        </button>
        <button 
          onClick={resetProgress}
          class="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg text-lg"
        >
          <span class="text-xl">🔄</span>
          Reset Progress
        </button>
      </div>

      {/* Items Section */}
      <div>
        <h2 class="text-xl font-bold text-phasmo-accent mb-4 text-center">Item Categories</h2>
        <div class="grid grid-cols-3 lg:grid-cols-5 gap-2">
          {Object.entries(items).map(([key, item], index) => {
            const isAllUnlocked = animatingItem()?.key === 'all-unlocked';
            
            return (
              <div 
                onClick={() => handleItemClick(key, item)}
                class={`p-2 rounded-lg border text-xs transition-all duration-300 cursor-pointer ${
                  item.unlocked 
                    ? 'bg-phasmo-accent/20 border-phasmo-accent/30 text-phasmo-accent' 
                    : 'bg-white/5 border-white/10 text-gray-400 opacity-60'
                } ${
                  isLastItemAlone(index) ? `col-start-${getCenterColumn()}` : ''
                } ${
                  isAllUnlocked ? 'animate-pulse' : ''
                }`}
              >
                <div class="flex flex-col items-center text-center">
                  <span class="text-lg mb-1">{item.icon}</span>
                  <span class="font-medium leading-tight">{item.name}</span>
                  <div class={`mt-1 text-xs ${item.unlocked ? 'text-phasmo-accent' : 'text-gray-500'}`}>
                    {item.unlocked ? '✅' : '🔒'}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Animated Item Overlay */}
      <Show when={animatingItem()?.key && animatingItem()?.key !== 'all-unlocked'}>
        <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-700 ease-in-out">
          <div class="bg-gradient-to-br from-phasmo-dark to-phasmo-blue rounded-xl border-2 border-phasmo-accent/50 shadow-2xl p-8 text-center transform transition-all duration-700 ease-in-out scale-100">
            <div class="text-phasmo-accent font-bold">
              <div class="text-6xl mb-4">{animatingItem()?.item?.icon}</div>
              <div class="text-3xl mb-2">{animatingItem()?.item?.name}</div>
              <div class="text-lg text-gray-300">
                🎉 New Item Unlocked!
              </div>
            </div>
          </div>
        </div>
      </Show>

      {/* All Unlocked Overlay */}
      <Show when={animatingItem()?.key === 'all-unlocked'}>
        <div class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-700 ease-in-out">
          <div class="bg-gradient-to-br from-phasmo-dark to-phasmo-blue rounded-xl border border-white/20 shadow-2xl max-w-sm w-full p-6 text-center transform transition-all duration-700 ease-in-out scale-100">
            <div class="text-phasmo-accent font-bold">
              <div class="text-6xl mb-3">{animatingItem()?.item?.icon}</div>
              <div class="text-2xl">{animatingItem()?.item?.name}</div>
              <div class="text-sm text-gray-300 mt-2">{animatingItem()?.item?.subtitle}</div>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default App; 