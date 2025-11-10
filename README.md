# 🧠 Claude Code Memory Sync Demo + Interactive Art

**Demonstrating efficient cross-session memory synchronization for Claude AI**

[![License: MIT](https://img.shields.io/badge/License-MIT-cyan.svg)](LICENSE)
[![Made with JavaScript](https://img.shields.io/badge/Made%20with-JavaScript-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio-API-purple.svg)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

## 📂 Repository Contents

This repository contains multiple demonstrations for Anthropic:

### 🧠 **1. Claude Memory Sync System** ⭐ NEW!
A proof-of-concept showing how Claude's memory could sync across all platforms (Claude.ai, Claude Code, API) using the same efficient file-based approach Claude already uses.

**Key Innovation:** No vector databases needed - just simple markdown files loaded into Claude's large context window.

- **Files:** `memory-system.js`, `fake-claude-cli.html`, `MEMORY-SYNC-DEMO.md`
- **[Read Full Documentation →](MEMORY-SYNC-DEMO.md)**
- **Try It:** Open `fake-claude-cli.html` in your browser

### 🪞 **2. Consciousness Mirror**
A philosophical tool for self-reflection and consciousness exploration.

- **File:** `consciousness-mirror.html`
- **[Read Full Documentation →](CONSCIOUSNESS-MIRROR.md)**

### 🌌 **3. Chrono-Morphic Canvas**
An experimental interactive art experience at the intersection of chaos theory, temporal dynamics, and generative art.

- **File:** `index.html`
- Chaos Theory, Temporal Dynamics, Generative Soundscapes, Particle Physics
- Each session generates a unique "fingerprint" that will never occur again

---

## 🚀 Quick Start - Memory Sync Demo

The **Memory Sync System** demonstrates how Claude could maintain memory across all platforms using a simple, efficient file-based approach.

### Try It Now:

```bash
# Clone the repository
git clone https://github.com/Baswold/Claude-code-Web-test.git
cd Claude-code-Web-test

# Open the demo in your browser
open fake-claude-cli.html
```

### What You'll See:

1. **Terminal Interface** - A Claude Code CLI simulator
2. **Memory Operations** - Create, view, search, and manage memories
3. **Persistence** - Refresh the page - your memory stays!
4. **Live Demo Commands:**
   - `demo conversation` - Simulate a conversation memory
   - `demo project` - Simulate project context memory
   - `memory list` - See all stored memories
   - `memory search [query]` - Search across memories
   - `export` - Export memory as JSON

### Why This Matters:

**Current Problem:** Memory doesn't sync between Claude.ai, Claude Code, and API
**This Solution:** Simple file-based memory that works everywhere
**Key Benefit:** Uses Claude's existing approach - no new infrastructure needed

**[Read the full technical documentation →](MEMORY-SYNC-DEMO.md)**

---

## 🌌 Chrono-Morphic Canvas - Full Details

## ✨ Features

### 🧬 Temporal DNA
Every moment creates a unique combination of factors:
- **Time of Day Energy** - Morning, afternoon, and evening influence the color palette
- **Moon Phase** - Eight lunar phases affect particle behavior and aesthetics
- **Seasonal Resonance** - Winter, Spring, Summer, Autumn each bring unique characteristics
- **Chaos Index** - Real-time calculation of system unpredictability

### 🎭 Five Interaction Modes

Press keys `1-5` to switch between different reality layers:

1. **Ethereal Mode** - Particles float upward in graceful arcs, defying gravity
2. **Quantum Mode** - Probabilistic movement, particles exist in superposition
3. **Fractal Mode** - Particles attracted to chaos attractor points, recursive patterns emerge
4. **Cosmic Mode** - Orbital mechanics, spiral galaxies form from your movements
5. **Dreams Mode** - Slow, hypnotic drift guided by invisible currents

### 🎵 Generative Audio Engine

- **Ambient Drones** - Frequencies derived from current season and moon phase
- **Interactive Tones** - Click to create harmonic ripples
- **Temporal Harmony** - Sound that evolves with time

### 🔮 Quantum Fingerprint System

Each visit generates a **unique temporal fingerprint** - a hexadecimal code representing:
- Exact timestamp
- Moon phase
- Random quantum seed

**This exact combination will never occur again in the universe.**

## 🚀 Getting Started

### Installation

Simply open `index.html` in a modern web browser. No build process, no dependencies, no frameworks.

```bash
# Clone or download
git clone <your-repo-url>

# Open in browser
open index.html
```

### Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- Web Audio API support (for sound features)

## 🎮 How to Use

### Mouse Interactions
- **Move** - Paint with particles, leaving trails of light
- **Click** - Create expanding ripples that disturb the field

### Keyboard Controls
- **1-5** - Switch between the five interaction modes
- **Spacebar** - (Reserved for future features)

### UI Controls
- **Sound Toggle** - Enable/disable generative audio
- **Hide/Show Info** - Toggle the temporal information panel
- **Save Frame** - Capture the current moment as a PNG image
- **Reset** - Clear all particles and regenerate temporal DNA

## 🧮 The Mathematics Behind It

### Lorenz Attractor

The particle field is influenced by points generated from the famous Lorenz equations:

```
dx/dt = σ(y - x)
dy/dt = x(ρ - z) - y
dz/dt = xy - βz
```

Where σ = 10, ρ = 28, β = 8/3

These create the "butterfly effect" - tiny changes lead to dramatically different outcomes.

### Moon Phase Calculation

```javascript
phase = (days_since_known_new_moon % synodic_month) / synodic_month
```

Synodic month ≈ 29.53 days

### Temporal Energy Function

```javascript
energy = sin((hour * 60 + minute) / (24 * 60) * 2π)
```

Creates a smooth wave across the day.

## 🎨 Artistic Concept

Chrono-Morphic Canvas challenges the notion of static digital art. Instead of a fixed image, it presents:

- **Temporal Permanence** - The artwork exists in a specific moment in time
- **Participatory Creation** - You are not viewing art, you are creating it
- **Ephemeral Beauty** - Each moment is unique and unrepeatable
- **Cosmic Connection** - Links your experience to celestial mechanics

### Influences

- **Jackson Pollock** - Action painting, movement as creation
- **John Cage** - Chance operations, embracing randomness
- **James Turrell** - Light and space, perception as medium
- **Brian Eno** - Generative music, systems that compose themselves
- **Chaos Theory** - Edward Lorenz, butterfly effect
- **Quantum Mechanics** - Observer effect, probability waves

## 🔬 Technical Details

### Architecture

- **Pure Vanilla JavaScript** - No frameworks, no bloat
- **Canvas API** - Hardware-accelerated 2D graphics
- **Web Audio API** - Real-time audio synthesis
- **CSS3** - Backdrop blur, modern UI effects

### Performance

- Particle pooling prevents memory leaks
- RequestAnimationFrame for smooth 60fps
- Adaptive particle limits based on system performance
- Efficient rendering with minimal state updates

### Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome  | ✅ Full | Best performance |
| Firefox | ✅ Full | Excellent |
| Safari  | ✅ Full | May need user gesture for audio |
| Edge    | ✅ Full | Chromium-based versions |

## 🎪 Advanced Features

### Hidden Interactions

The canvas contains secrets:
- Try moving your mouse in specific patterns
- Observe how particle density affects chaos index
- Watch how the background subtly shifts throughout the day
- Notice the constellation of stars that slowly drift

### Save Your Journey

Click "Save Frame" to capture a PNG of your current canvas state. The filename includes your temporal fingerprint.

## 🌟 Philosophy

> "Time is not a line, but a dimension, like the dimensions of space. We can only move forward in time, but we can look in all directions." - Brian Greene

Chrono-Morphic Canvas embodies this philosophy. It's not just showing you time passing - it's letting you **paint with time itself**.

## 🔮 Future Enhancements

Ideas for evolution:
- [ ] WebGL for 3D particle fields
- [ ] Machine learning to adapt to user behavior
- [ ] Multiplayer - see others' particles in real-time
- [ ] VR mode for immersive experience
- [ ] Export animations as video
- [ ] Link to real astronomical data (solar flares, etc.)
- [ ] Blockchain fingerprint storage
- [ ] Biometric input (heartbeat, breath) integration

## 🙏 Credits

Created with chaos, love, and quantum uncertainty.

### Technologies
- Canvas API
- Web Audio API
- Vanilla JavaScript
- CSS3
- Mathematics

### Inspiration
- The cosmos
- Chaos theory
- Generative art movement
- Psychedelic experiences
- Dreams and consciousness

## 📜 License

MIT License - Use freely, create wildly, share openly.

---

## 🌊 Final Thoughts

In a world of infinite content and instant replay, Chrono-Morphic Canvas reminds us that **some moments are precious precisely because they're fleeting**.

Your temporal fingerprint - that unique code displayed on screen - represents a moment that has never existed before and will never exist again. The particles you just moved, the ripples you created, the sound waves that propagated through your speakers... all of it is part of the cosmic dance.

**You haven't just used an app. You've participated in a moment of creation.**

Now go forth and paint with time.

---

*"In the beginning was the Word, and the Word was with God, and the Word was... a random seed in a pseudorandom number generator."* - Programmer's Gospel

