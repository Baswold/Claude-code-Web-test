// CHRONO-MORPHIC CANVAS - A Temporal Art Experience
// Combines chaos theory, temporal dynamics, and generative soundscapes

class ChronoMorphicCanvas {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.audioContext = null;
        this.soundEnabled = false;

        // Resize canvas
        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Temporal DNA
        this.temporalDNA = this.generateTemporalDNA();

        // Particles and effects
        this.particles = [];
        this.ripples = [];
        this.attractorPoints = [];
        this.maxParticles = 500;

        // Interaction modes
        this.modes = ['Ethereal', 'Quantum', 'Fractal', 'Cosmic', 'Dreams'];
        this.currentMode = 0;

        // Mouse tracking
        this.mouse = { x: 0, y: 0, px: 0, py: 0 };

        // Animation state
        this.time = 0;
        this.chaosIndex = 0;

        // Audio nodes
        this.audioNodes = [];

        this.initializeEventListeners();
        this.generateAttractorPoints();
        this.updateUI();
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    generateTemporalDNA() {
        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const day = now.getDate();
        const month = now.getMonth();
        const year = now.getFullYear();

        // Calculate moon phase (approximate)
        const moonPhase = this.calculateMoonPhase(year, month, day);

        // Determine season (Northern Hemisphere)
        const seasons = ['Winter', 'Spring', 'Summer', 'Autumn'];
        const seasonIndex = Math.floor(((month + 1) % 12) / 3);
        const season = seasons[seasonIndex];

        // Calculate time of day energy
        const timeEnergy = Math.sin((hour * 60 + minute) / (24 * 60) * Math.PI * 2);

        // Generate unique fingerprint
        const fingerprint = this.generateFingerprint(now, moonPhase);

        return {
            hour,
            minute,
            day,
            month,
            year,
            moonPhase,
            moonPhaseName: this.getMoonPhaseName(moonPhase),
            season,
            seasonIndex,
            timeEnergy,
            fingerprint
        };
    }

    calculateMoonPhase(year, month, day) {
        // Simplified moon phase calculation
        const date = new Date(year, month, day);
        const knownNewMoon = new Date(2000, 0, 6);
        const synodicMonth = 29.53058867;
        const diff = (date - knownNewMoon) / (1000 * 60 * 60 * 24);
        const phase = (diff % synodicMonth) / synodicMonth;
        return phase;
    }

    getMoonPhaseName(phase) {
        if (phase < 0.0625 || phase >= 0.9375) return '🌑 New Moon';
        if (phase < 0.1875) return '🌒 Waxing Crescent';
        if (phase < 0.3125) return '🌓 First Quarter';
        if (phase < 0.4375) return '🌔 Waxing Gibbous';
        if (phase < 0.5625) return '🌕 Full Moon';
        if (phase < 0.6875) return '🌖 Waning Gibbous';
        if (phase < 0.8125) return '🌗 Last Quarter';
        return '🌘 Waning Crescent';
    }

    generateFingerprint(date, moonPhase) {
        const str = `${date.getTime()}_${moonPhase}_${Math.random()}`;
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16).toUpperCase().substring(0, 12);
    }

    generateAttractorPoints() {
        // Generate points using Lorenz attractor (chaos theory)
        const dt = 0.01;
        const sigma = 10;
        const rho = 28;
        const beta = 8/3;

        let x = 0.1, y = 0, z = 0;

        for (let i = 0; i < 1000; i++) {
            const dx = sigma * (y - x) * dt;
            const dy = (x * (rho - z) - y) * dt;
            const dz = (x * y - beta * z) * dt;

            x += dx;
            y += dy;
            z += dz;

            if (i % 5 === 0) {
                this.attractorPoints.push({
                    x: x * 10 + this.canvas.width / 2,
                    y: y * 10 + this.canvas.height / 2,
                    z: z
                });
            }
        }
    }

    initializeEventListeners() {
        // Mouse movement
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.px = this.mouse.x;
            this.mouse.py = this.mouse.y;
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;

            // Create particles on movement
            if (Math.random() > 0.7) {
                this.createParticle(this.mouse.x, this.mouse.y);
            }
        });

        // Click for ripples
        this.canvas.addEventListener('click', (e) => {
            this.createRipple(e.clientX, e.clientY);
            if (this.soundEnabled) {
                this.playTone(200 + Math.random() * 400, 0.2);
            }
        });

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (e.key >= '1' && e.key <= '5') {
                this.currentMode = parseInt(e.key) - 1;
                this.updateUI();
            }
        });

        // Button controls
        document.getElementById('start-btn').addEventListener('click', () => {
            document.getElementById('welcome').classList.add('hidden');
        });

        document.getElementById('sound-toggle').addEventListener('click', () => {
            this.toggleSound();
        });

        document.getElementById('info-toggle').addEventListener('click', (e) => {
            const panel = document.getElementById('info-panel');
            panel.classList.toggle('hidden');
            e.target.textContent = panel.classList.contains('hidden') ? 'Show Info' : 'Hide Info';
        });

        document.getElementById('save-btn').addEventListener('click', () => {
            this.saveFrame();
        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            this.reset();
        });
    }

    toggleSound() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        this.soundEnabled = !this.soundEnabled;
        const btn = document.getElementById('sound-toggle');
        btn.textContent = `Sound: ${this.soundEnabled ? 'ON' : 'OFF'}`;
        btn.classList.toggle('active');

        if (this.soundEnabled) {
            this.startAmbience();
        } else {
            this.stopAmbience();
        }
    }

    startAmbience() {
        // Create ambient drone based on temporal DNA
        const freq = 55 * Math.pow(2, this.temporalDNA.seasonIndex / 4);

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'sine';
        oscillator.frequency.value = freq;
        gainNode.gain.value = 0.05;

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start();

        this.audioNodes.push({ oscillator, gainNode });
    }

    stopAmbience() {
        this.audioNodes.forEach(node => {
            node.oscillator.stop();
        });
        this.audioNodes = [];
    }

    playTone(frequency, duration) {
        if (!this.audioContext) return;

        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.frequency.value = frequency;
        oscillator.type = 'sine';

        gainNode.gain.value = 0.1;
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + duration);
    }

    createParticle(x, y) {
        if (this.particles.length >= this.maxParticles) {
            this.particles.shift();
        }

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2 + 1;

        this.particles.push({
            x, y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1,
            decay: Math.random() * 0.01 + 0.005,
            size: Math.random() * 3 + 1,
            hue: (this.time * 20 + this.temporalDNA.moonPhase * 360) % 360,
            mode: this.currentMode
        });
    }

    createRipple(x, y) {
        this.ripples.push({
            x, y,
            radius: 0,
            maxRadius: 200 + Math.random() * 100,
            life: 1,
            decay: 0.02,
            hue: (this.time * 20 + this.temporalDNA.moonPhase * 360) % 360
        });
    }

    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            // Apply mode-specific behaviors
            switch(p.mode) {
                case 0: // Ethereal - float upward
                    p.vy -= 0.1;
                    p.vx *= 0.98;
                    break;
                case 1: // Quantum - jittery movement
                    p.vx += (Math.random() - 0.5) * 0.5;
                    p.vy += (Math.random() - 0.5) * 0.5;
                    break;
                case 2: // Fractal - attracted to attractor points
                    if (this.attractorPoints.length > 0) {
                        const target = this.attractorPoints[Math.floor(this.time * 10) % this.attractorPoints.length];
                        const dx = target.x - p.x;
                        const dy = target.y - p.y;
                        p.vx += dx * 0.0001;
                        p.vy += dy * 0.0001;
                    }
                    break;
                case 3: // Cosmic - orbital motion
                    const centerX = this.canvas.width / 2;
                    const centerY = this.canvas.height / 2;
                    const dx = p.x - centerX;
                    const dy = p.y - centerY;
                    p.vx += -dy * 0.001;
                    p.vy += dx * 0.001;
                    break;
                case 4: // Dreams - slow drift
                    p.vx += Math.sin(this.time + p.x * 0.01) * 0.05;
                    p.vy += Math.cos(this.time + p.y * 0.01) * 0.05;
                    p.vx *= 0.95;
                    p.vy *= 0.95;
                    break;
            }

            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;

            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    updateRipples() {
        for (let i = this.ripples.length - 1; i >= 0; i--) {
            const r = this.ripples[i];
            r.radius += (r.maxRadius - r.radius) * 0.1;
            r.life -= r.decay;

            if (r.life <= 0) {
                this.ripples.splice(i, 1);
            }
        }
    }

    drawBackground() {
        // Create temporal gradient based on time of day and season
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);

        const baseHue = (this.temporalDNA.hour * 15 + this.temporalDNA.seasonIndex * 90) % 360;
        const saturation = 20 + this.temporalDNA.moonPhase * 30;
        const lightness = 5 + Math.abs(this.temporalDNA.timeEnergy) * 10;

        gradient.addColorStop(0, `hsl(${baseHue}, ${saturation}%, ${lightness}%)`);
        gradient.addColorStop(1, `hsl(${(baseHue + 60) % 360}, ${saturation}%, ${lightness * 0.5}%)`);

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Add subtle noise/stars
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i < 100; i++) {
            const x = (Math.sin(this.time * 0.1 + i) * 0.5 + 0.5) * this.canvas.width;
            const y = (Math.cos(this.time * 0.05 + i) * 0.5 + 0.5) * this.canvas.height;
            const size = Math.sin(this.time + i) * 0.5 + 0.5;
            this.ctx.fillRect(x, y, size, size);
        }
    }

    drawAttractorField() {
        // Draw subtle attractor connections
        this.ctx.strokeStyle = 'rgba(0, 255, 255, 0.05)';
        this.ctx.lineWidth = 1;

        for (let i = 0; i < this.attractorPoints.length - 1; i += 10) {
            const p1 = this.attractorPoints[i];
            const p2 = this.attractorPoints[i + 1];

            this.ctx.beginPath();
            this.ctx.moveTo(p1.x, p1.y);
            this.ctx.lineTo(p2.x, p2.y);
            this.ctx.stroke();
        }
    }

    drawParticles() {
        this.particles.forEach(p => {
            this.ctx.save();
            this.ctx.globalAlpha = p.life;

            // Create gradient for each particle
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2);
            gradient.addColorStop(0, `hsla(${p.hue}, 80%, 60%, ${p.life})`);
            gradient.addColorStop(1, `hsla(${p.hue}, 80%, 60%, 0)`);

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
            this.ctx.fill();

            this.ctx.restore();
        });
    }

    drawRipples() {
        this.ripples.forEach(r => {
            this.ctx.save();
            this.ctx.globalAlpha = r.life * 0.5;
            this.ctx.strokeStyle = `hsl(${r.hue}, 80%, 60%)`;
            this.ctx.lineWidth = 2;

            this.ctx.beginPath();
            this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
            this.ctx.stroke();

            this.ctx.restore();
        });
    }

    drawModeSpecificEffects() {
        switch(this.currentMode) {
            case 0: // Ethereal - flowing lines
                this.drawFlowingLines();
                break;
            case 1: // Quantum - probability clouds
                this.drawProbabilityClouds();
                break;
            case 2: // Fractal - sierpinski triangle
                this.drawFractalPatterns();
                break;
            case 3: // Cosmic - spiral galaxy
                this.drawSpiralGalaxy();
                break;
            case 4: // Dreams - aurora waves
                this.drawAuroraWaves();
                break;
        }
    }

    drawFlowingLines() {
        this.ctx.strokeStyle = `hsla(${this.time * 20}, 70%, 50%, 0.1)`;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();

        for (let x = 0; x < this.canvas.width; x += 50) {
            const y = this.canvas.height / 2 + Math.sin(x * 0.01 + this.time) * 100;
            if (x === 0) {
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.stroke();
    }

    drawProbabilityClouds() {
        for (let i = 0; i < 5; i++) {
            const x = this.canvas.width / 2 + Math.cos(this.time + i) * 200;
            const y = this.canvas.height / 2 + Math.sin(this.time + i) * 200;

            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, 50);
            gradient.addColorStop(0, `hsla(${i * 72}, 70%, 50%, 0.1)`);
            gradient.addColorStop(1, `hsla(${i * 72}, 70%, 50%, 0)`);

            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(x - 50, y - 50, 100, 100);
        }
    }

    drawFractalPatterns() {
        // Simple recursive triangle
        const drawTriangle = (x, y, size, depth) => {
            if (depth === 0 || size < 2) return;

            this.ctx.strokeStyle = `hsla(${depth * 60}, 70%, 50%, 0.2)`;
            this.ctx.beginPath();
            this.ctx.moveTo(x, y - size);
            this.ctx.lineTo(x - size, y + size);
            this.ctx.lineTo(x + size, y + size);
            this.ctx.closePath();
            this.ctx.stroke();

            drawTriangle(x, y - size/2, size/2, depth - 1);
            drawTriangle(x - size/2, y + size/2, size/2, depth - 1);
            drawTriangle(x + size/2, y + size/2, size/2, depth - 1);
        };

        const rotation = this.time * 0.5;
        this.ctx.save();
        this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.rotate(rotation);
        drawTriangle(0, 0, 100, 4);
        this.ctx.restore();
    }

    drawSpiralGalaxy() {
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        this.ctx.strokeStyle = `hsla(${this.time * 10}, 70%, 50%, 0.2)`;
        this.ctx.lineWidth = 1;

        for (let i = 0; i < 500; i++) {
            const angle = i * 0.1 + this.time;
            const radius = i * 0.5;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;

            if (i === 0) {
                this.ctx.beginPath();
                this.ctx.moveTo(x, y);
            } else {
                this.ctx.lineTo(x, y);
            }
        }
        this.ctx.stroke();
    }

    drawAuroraWaves() {
        for (let layer = 0; layer < 3; layer++) {
            this.ctx.strokeStyle = `hsla(${120 + layer * 60}, 70%, 50%, 0.1)`;
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();

            for (let x = 0; x < this.canvas.width; x += 5) {
                const y = this.canvas.height / 3 +
                          Math.sin(x * 0.01 + this.time + layer) * 50 +
                          Math.sin(x * 0.02 + this.time * 2 + layer) * 30;
                if (x === 0) {
                    this.ctx.moveTo(x, y);
                } else {
                    this.ctx.lineTo(x, y);
                }
            }
            this.ctx.stroke();
        }
    }

    updateUI() {
        const timeState = this.temporalDNA.hour < 12 ? 'Morning' :
                         this.temporalDNA.hour < 18 ? 'Afternoon' : 'Evening';

        document.getElementById('time-state').textContent = timeState;
        document.getElementById('moon-phase').textContent = this.temporalDNA.moonPhaseName;
        document.getElementById('season').textContent = this.temporalDNA.season;
        document.getElementById('chaos-index').textContent = this.chaosIndex.toFixed(2);
        document.getElementById('particle-count').textContent = this.particles.length;
        document.getElementById('current-mode').textContent = this.modes[this.currentMode];
        document.getElementById('fingerprint-code').textContent = this.temporalDNA.fingerprint;
    }

    saveFrame() {
        const link = document.createElement('a');
        link.download = `chrono-morphic-${this.temporalDNA.fingerprint}.png`;
        link.href = this.canvas.toDataURL();
        link.click();
    }

    reset() {
        this.particles = [];
        this.ripples = [];
        this.time = 0;
        this.temporalDNA = this.generateTemporalDNA();
        this.updateUI();
    }

    animate() {
        this.time += 0.01;
        this.chaosIndex = Math.sin(this.time) * Math.cos(this.time * 0.7) * 0.5 + 0.5;

        // Draw everything
        this.drawBackground();
        this.drawAttractorField();
        this.drawModeSpecificEffects();
        this.drawRipples();
        this.drawParticles();

        // Update physics
        this.updateParticles();
        this.updateRipples();

        // Update UI periodically
        if (Math.floor(this.time * 10) % 10 === 0) {
            this.updateUI();
        }

        // Auto-generate particles in some modes
        if (this.currentMode === 1 && Math.random() > 0.9) {
            this.createParticle(
                Math.random() * this.canvas.width,
                Math.random() * this.canvas.height
            );
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when page loads
window.addEventListener('load', () => {
    new ChronoMorphicCanvas();
});
