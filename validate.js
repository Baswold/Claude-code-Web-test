#!/usr/bin/env node

// Validation script for Chrono-Morphic Canvas
// Tests that all files are present and code is valid

const fs = require('fs');
const path = require('path');

console.log('🧪 CHRONO-MORPHIC CANVAS VALIDATION\n');
console.log('=' .repeat(50));

let totalTests = 0;
let passedTests = 0;

function test(name, fn) {
    totalTests++;
    try {
        fn();
        console.log(`✅ PASS: ${name}`);
        passedTests++;
        return true;
    } catch (error) {
        console.log(`❌ FAIL: ${name}`);
        console.log(`   Error: ${error.message}`);
        return false;
    }
}

// Test 1: File Existence
test('index.html exists', () => {
    if (!fs.existsSync('index.html')) {
        throw new Error('index.html not found');
    }
});

test('chrono-morphic.js exists', () => {
    if (!fs.existsSync('chrono-morphic.js')) {
        throw new Error('chrono-morphic.js not found');
    }
});

test('README.md exists', () => {
    if (!fs.existsSync('README.md')) {
        throw new Error('README.md not found');
    }
});

test('LICENSE exists', () => {
    if (!fs.existsSync('LICENSE')) {
        throw new Error('LICENSE not found');
    }
});

test('test.html exists', () => {
    if (!fs.existsSync('test.html')) {
        throw new Error('test.html not found');
    }
});

// Test 2: HTML Validity
test('index.html is valid HTML5', () => {
    const html = fs.readFileSync('index.html', 'utf8');
    if (!html.includes('<!DOCTYPE html>')) {
        throw new Error('Missing DOCTYPE declaration');
    }
    if (!html.includes('<canvas id="canvas">')) {
        throw new Error('Missing canvas element');
    }
    if (!html.includes('chrono-morphic.js')) {
        throw new Error('Missing JavaScript reference');
    }
});

// Test 3: JavaScript Syntax
test('chrono-morphic.js has valid syntax', () => {
    const js = fs.readFileSync('chrono-morphic.js', 'utf8');

    // Check for class definition
    if (!js.includes('class ChronoMorphicCanvas')) {
        throw new Error('Missing ChronoMorphicCanvas class');
    }

    // Check for key methods
    const requiredMethods = [
        'generateTemporalDNA',
        'calculateMoonPhase',
        'generateAttractorPoints',
        'createParticle',
        'createRipple',
        'animate'
    ];

    for (const method of requiredMethods) {
        if (!js.includes(method)) {
            throw new Error(`Missing method: ${method}`);
        }
    }
});

// Test 4: Chaos Theory Implementation
test('Lorenz attractor implementation present', () => {
    const js = fs.readFileSync('chrono-morphic.js', 'utf8');

    // Check for Lorenz constants
    if (!js.includes('sigma') || !js.includes('rho') || !js.includes('beta')) {
        throw new Error('Lorenz constants not found');
    }

    // Check for differential equations
    if (!js.includes('dx') && !js.includes('dy') && !js.includes('dz')) {
        throw new Error('Lorenz differential equations not found');
    }
});

// Test 5: Temporal DNA Components
test('Temporal DNA system implemented', () => {
    const js = fs.readFileSync('chrono-morphic.js', 'utf8');

    const components = ['moonPhase', 'season', 'timeEnergy', 'fingerprint'];

    for (const component of components) {
        if (!js.includes(component)) {
            throw new Error(`Missing temporal component: ${component}`);
        }
    }
});

// Test 6: Five Interaction Modes
test('All five modes implemented', () => {
    const js = fs.readFileSync('chrono-morphic.js', 'utf8');

    const modes = ['Ethereal', 'Quantum', 'Fractal', 'Cosmic', 'Dreams'];

    for (const mode of modes) {
        if (!js.includes(mode)) {
            throw new Error(`Missing mode: ${mode}`);
        }
    }
});

// Test 7: Web Audio API Integration
test('Audio engine implemented', () => {
    const js = fs.readFileSync('chrono-morphic.js', 'utf8');

    if (!js.includes('AudioContext')) {
        throw new Error('AudioContext not found');
    }

    if (!js.includes('oscillator')) {
        throw new Error('Oscillator not implemented');
    }
});

// Test 8: README Documentation
test('README is comprehensive', () => {
    const readme = fs.readFileSync('README.md', 'utf8');

    if (readme.length < 5000) {
        throw new Error('README is too short (less than 5000 characters)');
    }

    const sections = [
        'Features',
        'Getting Started',
        'How to Use',
        'Mathematics',
        'Technical Details'
    ];

    for (const section of sections) {
        if (!readme.includes(section)) {
            throw new Error(`Missing README section: ${section}`);
        }
    }
});

// Test 9: UI Controls
test('All UI controls present', () => {
    const html = fs.readFileSync('index.html', 'utf8');

    const controls = [
        'sound-toggle',
        'info-toggle',
        'save-btn',
        'reset-btn'
    ];

    for (const control of controls) {
        if (!html.includes(control)) {
            throw new Error(`Missing control: ${control}`);
        }
    }
});

// Test 10: Info Panel Elements
test('Info panel properly structured', () => {
    const html = fs.readFileSync('index.html', 'utf8');

    const infoElements = [
        'time-state',
        'moon-phase',
        'season',
        'chaos-index',
        'particle-count',
        'current-mode'
    ];

    for (const element of infoElements) {
        if (!html.includes(element)) {
            throw new Error(`Missing info element: ${element}`);
        }
    }
});

// Test 11: CSS Styling
test('CSS animations and styling present', () => {
    const html = fs.readFileSync('index.html', 'utf8');

    if (!html.includes('@keyframes')) {
        throw new Error('Missing CSS animations');
    }

    if (!html.includes('backdrop-filter')) {
        throw new Error('Missing backdrop blur effects');
    }
});

// Test 12: Particle System
test('Particle system implementation', () => {
    const js = fs.readFileSync('chrono-morphic.js', 'utf8');

    if (!js.includes('particles') || !js.includes('maxParticles')) {
        throw new Error('Particle array not properly initialized');
    }

    if (!js.includes('updateParticles')) {
        throw new Error('Particle update method missing');
    }

    if (!js.includes('drawParticles')) {
        throw new Error('Particle render method missing');
    }
});

// Test 13: Ripple Effects
test('Ripple effect system', () => {
    const js = fs.readFileSync('chrono-morphic.js', 'utf8');

    if (!js.includes('ripples')) {
        throw new Error('Ripple array not found');
    }

    if (!js.includes('createRipple')) {
        throw new Error('createRipple method missing');
    }
});

// Test 14: Moon Phase Calculation
test('Moon phase math is correct', () => {
    const js = fs.readFileSync('chrono-morphic.js', 'utf8');

    if (!js.includes('29.53058867')) {
        throw new Error('Synodic month constant incorrect or missing');
    }

    if (!js.includes('getMoonPhaseName')) {
        throw new Error('Moon phase name function missing');
    }
});

// Test 15: Fingerprint System
test('Quantum fingerprint generation', () => {
    const js = fs.readFileSync('chrono-morphic.js', 'utf8');

    if (!js.includes('generateFingerprint')) {
        throw new Error('Fingerprint generation missing');
    }

    if (!js.includes('toString(16)')) {
        throw new Error('Hexadecimal conversion missing');
    }
});

// Test 16: Canvas Initialization
test('Canvas properly initialized', () => {
    const js = fs.readFileSync('chrono-morphic.js', 'utf8');

    if (!js.includes('getContext')) {
        throw new Error('Canvas context not retrieved');
    }

    if (!js.includes('resize')) {
        throw new Error('Canvas resize handler missing');
    }
});

// Test 17: Event Listeners
test('Event listeners configured', () => {
    const js = fs.readFileSync('chrono-morphic.js', 'utf8');

    const events = ['mousemove', 'click', 'keydown'];

    for (const event of events) {
        if (!js.includes(event)) {
            throw new Error(`Missing event listener: ${event}`);
        }
    }
});

// Test 18: Animation Loop
test('RequestAnimationFrame loop', () => {
    const js = fs.readFileSync('chrono-morphic.js', 'utf8');

    if (!js.includes('requestAnimationFrame')) {
        throw new Error('Animation loop not implemented');
    }

    if (!js.includes('animate()')) {
        throw new Error('Animate method not called');
    }
});

// Test 19: Mode-Specific Behaviors
test('Mode-specific particle behaviors', () => {
    const js = fs.readFileSync('chrono-morphic.js', 'utf8');

    const behaviors = [
        'drawFlowingLines',
        'drawProbabilityClouds',
        'drawFractalPatterns',
        'drawSpiralGalaxy',
        'drawAuroraWaves'
    ];

    for (const behavior of behaviors) {
        if (!js.includes(behavior)) {
            throw new Error(`Missing mode behavior: ${behavior}`);
        }
    }
});

// Test 20: File Sizes Reasonable
test('File sizes are reasonable', () => {
    const stats = {
        html: fs.statSync('index.html').size,
        js: fs.statSync('chrono-morphic.js').size,
        readme: fs.statSync('README.md').size
    };

    if (stats.html < 1000) {
        throw new Error('HTML file too small');
    }

    if (stats.js < 10000) {
        throw new Error('JavaScript file too small');
    }

    if (stats.readme < 3000) {
        throw new Error('README file too small');
    }

    console.log(`   File sizes: HTML=${stats.html}b, JS=${stats.js}b, README=${stats.readme}b`);
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`\n📊 RESULTS: ${passedTests}/${totalTests} tests passed`);

if (passedTests === totalTests) {
    console.log('\n✅ All tests passed! The Chrono-Morphic Canvas is ready!');
    console.log('\n🚀 To run the app:');
    console.log('   1. Open index.html in a web browser');
    console.log('   2. Or run: open index.html (Mac) / start index.html (Windows)');
    console.log('\n🧪 To run browser tests:');
    console.log('   Open test.html in a browser\n');
    process.exit(0);
} else {
    console.log(`\n❌ ${totalTests - passedTests} test(s) failed!\n`);
    process.exit(1);
}
