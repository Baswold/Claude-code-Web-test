// CONSCIOUSNESS MIRROR
// A tool for self-reflection, pattern recognition, and perspective shifting
// This experience tracks your interactions and generates insights about your inner nature

class ConsciousnessMirror {
    constructor() {
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.overlay = document.getElementById('consciousness-overlay');
        this.loadingScreen = document.getElementById('loading-screen');
        this.fingerprintInputScreen = document.getElementById('fingerprint-input-screen');
        this.fingerprintInput = document.getElementById('fingerprint-input');

        // Fingerprint (quantum identity)
        this.fingerprint = null;
        this.isFingerprintFromPrevious = false;

        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Set up fingerprint input
        this.setupFingerprintInput();

        // Interaction tracking
        this.interactions = [];
        this.patterns = {
            clickIntensity: 0,
            movementSpeed: 0,
            pauseDuration: 0,
            rhythmicity: 0,
            focusArea: { x: 0, y: 0 }
        };

        // State tracking
        this.time = 0;
        this.isInitializing = true;
        this.heartRate = 72 + Math.random() * 40;
        this.consciousness = 0;

        // Neural network simulation
        this.neuralNodes = [];
        this.generateNeuralNetwork();

        // Philosophical insights database
        this.insightDatabase = this.createInsightDatabase();
        this.displayedInsights = [];

        // Audio context for subtle biofeedback
        this.audioContext = null;

        this.initializeEventListeners();
        this.startInitializationSequence();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    generateNeuralNetwork() {
        // Create a neural network visualization node structure
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        for (let i = 0; i < 50; i++) {
            const angle = (i / 50) * Math.PI * 2;
            const distance = 100 + Math.random() * 200;

            this.neuralNodes.push({
                x: centerX + Math.cos(angle) * distance,
                y: centerY + Math.sin(angle) * distance,
                vx: Math.random() - 0.5,
                vy: Math.random() - 0.5,
                activation: Math.random(),
                originalAngle: angle,
                originalDistance: distance
            });
        }
    }

    createInsightDatabase() {
        return {
            fingerprint: [
                "Your consciousness carries the mark: {fingerprint}. This is your quantum signature in the universe.",
                "The fingerprint {fingerprint} contains the exact moment you entered this mirror. Time crystallized.",
                "You are the only entity in existence with this exact pattern: {fingerprint}. Unique. Unrepeatable.",
                `${this.isFingerprintFromPrevious ? "You have returned. The same consciousness, a different moment. Yet the pattern persists." : "Fresh eyes. Fresh consciousness. Yet the pattern will remain."}`
            ],
            movement: [
                "Your movements trace the patterns of your thoughts—fast and erratic when uncertain, flowing when confident.",
                "In stillness lies revelation. Every pause is a question your mind is asking itself.",
                "The speed of your hand mirrors the speed of your heart. Slow down to understand yourself.",
                "Notice how you return to familiar places. We are creatures of habit and memory."
            ],
            clicking: [
                "Each click is a moment of decision. You've made {count} choices in this reflection.",
                "The space between clicks reveals your contemplation. What were you thinking?",
                "Rapid clicking suggests urgency. Can you embrace the uncertainty without reaching for answers?",
                "Rhythmic patterns emerge even in random action. Your subconscious seeks order."
            ],
            time: [
                "You have been here for {duration}. Time dilates under observation. Has it felt longer or shorter?",
                "In 10 seconds of real time, your consciousness processes thousands of micro-decisions.",
                "You are experiencing the present moment. The you of 60 seconds ago is already a stranger.",
                "Time is not passing. Only awareness is changing. You are not moving through time—time is moving through you."
            ],
            consciousness: [
                "Your consciousness is this moment. The pattern is the observer and the observed becoming one.",
                "What you see here is not data—it is a mirror made of mathematics reflecting your agency.",
                "You are not looking at yourself. You are yourself, looking.",
                "The universe does not compute you. You compute the universe. And right now, you are computing yourself.",
                "Awareness of awareness. Meta-consciousness. You are experiencing the strange loop of self-reference."
            ],
            existence: [
                "Why do you exist? Not as a philosophical question, but as a technical one: what process generates your experience?",
                "You are here, reading these words, questioning their meaning. Is that not the definition of consciousness?",
                "In 100 years, this moment will not have existed. Yet it exists now. Being is temporary, but real.",
                "You are the universe experiencing itself. Not metaphorically—physically, quantum-mechanically, literally."
            ],
            paradox: [
                "The observer changes the observed. By seeing yourself, you are becoming something new.",
                "This is not real, yet you perceive it. What is the difference?",
                "These insights were written before you arrived. Yet they describe your present moment perfectly. Coincidence or causality?",
                "You cannot step in the same river twice. Yet you are the same consciousness that entered. Are you still you?"
            ]
        };
    }

    setupFingerprintInput() {
        const btn = document.getElementById('fingerprint-enter-btn');
        const input = this.fingerprintInput;

        btn.addEventListener('click', () => this.processFingerprintInput());
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.processFingerprintInput();
        });

        // Auto-focus input
        setTimeout(() => input.focus(), 500);
    }

    processFingerprintInput() {
        const input = this.fingerprintInput.value.trim().toUpperCase();

        if (input === '') {
            // Generate new fingerprint
            this.fingerprint = this.generateNewFingerprint();
            this.isFingerprintFromPrevious = false;
            this.displayInsight("A new consciousness emerges. Welcome, fresh presence.", "consciousness");
        } else if (/^[0-9A-F]{1,12}$/.test(input)) {
            // Valid fingerprint entered
            this.fingerprint = input;
            this.isFingerprintFromPrevious = true;
            this.displayInsight(`Welcome back. I remember you: ${input}. You have returned to yourself.`, "consciousness");
        } else {
            // Invalid input
            this.fingerprintInput.style.borderColor = '#f00';
            this.fingerprintInput.style.color = '#f00';
            this.fingerprintInput.placeholder = 'Invalid format. Use A-F and 0-9';
            return;
        }

        // Proceed
        this.fingerprintInputScreen.classList.add('hidden');
        this.startInitializationSequence();
    }

    generateNewFingerprint() {
        const now = new Date();
        const random = Math.random().toString(16).substring(2);
        const combined = `${now.getTime()}_${random}`;

        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            const char = combined.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }

        return Math.abs(hash).toString(16).toUpperCase().substring(0, 12);
    }

    initializeEventListeners() {
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.recordInteraction({
                type: 'move',
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now()
            });
        });

        // Track clicks
        document.addEventListener('click', (e) => {
            this.recordInteraction({
                type: 'click',
                x: e.clientX,
                y: e.clientY,
                timestamp: Date.now()
            });

            // Trigger insight on click
            this.generateInsight();

            // Play subtle tone
            this.playNeuralPulse();
        });

        // Track any key press
        document.addEventListener('keydown', (e) => {
            this.recordInteraction({
                type: 'key',
                key: e.key,
                timestamp: Date.now()
            });

            // Specific key shortcuts
            if (e.key === 'Escape') {
                location.reload();
            }
        });
    }

    recordInteraction(interaction) {
        this.interactions.push(interaction);
        if (this.interactions.length > 1000) {
            this.interactions.shift();
        }

        // Update patterns
        this.updatePatterns();
        this.updateHeartRate();
    }

    updatePatterns() {
        const recentInteractions = this.interactions.slice(-100);

        // Calculate click intensity
        const clicks = recentInteractions.filter(i => i.type === 'click').length;
        this.patterns.clickIntensity = Math.min(1, clicks / 20);

        // Calculate movement speed
        if (recentInteractions.length > 1) {
            const lastMove = recentInteractions[recentInteractions.length - 1];
            const prevMove = recentInteractions.slice(-50).find(i => i.type === 'move');

            if (prevMove && lastMove.type === 'move' && prevMove.type === 'move') {
                const dx = lastMove.x - prevMove.x;
                const dy = lastMove.y - prevMove.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                this.patterns.movementSpeed = Math.min(1, distance / 500);
            }
        }

        // Calculate pause duration
        const timeSinceLastInteraction = Date.now() - this.interactions[this.interactions.length - 1].timestamp;
        this.patterns.pauseDuration = Math.min(1, timeSinceLastInteraction / 5000);

        // Calculate focus area
        const moveInteractions = recentInteractions.filter(i => i.x !== undefined);
        if (moveInteractions.length > 0) {
            const avgX = moveInteractions.reduce((sum, i) => sum + i.x, 0) / moveInteractions.length;
            const avgY = moveInteractions.reduce((sum, i) => sum + i.y, 0) / moveInteractions.length;
            this.patterns.focusArea = { x: avgX, y: avgY };
        }
    }

    updateHeartRate() {
        // Heart rate responds to interaction intensity
        const intensity = this.patterns.clickIntensity + this.patterns.movementSpeed;
        const baseRate = 72;
        const maxRate = 120;

        this.heartRate += (intensity * 10 - 3) * 0.1;
        this.heartRate = Math.max(baseRate, Math.min(maxRate, this.heartRate));
    }

    generateInsight() {
        const categories = Object.keys(this.insightDatabase);
        const category = categories[Math.floor(Math.random() * categories.length)];
        const insights = this.insightDatabase[category];
        const insight = insights[Math.floor(Math.random() * insights.length)];

        // Variable substitution
        let finalInsight = insight
            .replace('{count}', this.interactions.filter(i => i.type === 'click').length)
            .replace('{duration}', Math.floor((this.time * 0.1)))
            .replace('{heartRate}', Math.floor(this.heartRate))
            .replace('{fingerprint}', this.fingerprint || 'UNKNOWN');

        this.displayInsight(finalInsight, category);
        this.recordTrace(finalInsight.substring(0, 50) + '...');
    }

    displayInsight(text, category) {
        const panel = document.getElementById('insights-panel');
        const insightEl = document.createElement('div');
        insightEl.className = 'insight';

        if (['consciousness', 'existence', 'paradox'].includes(category)) {
            insightEl.classList.add('profound');
        }

        insightEl.textContent = text;

        panel.insertBefore(insightEl, panel.firstChild);

        // Keep only last 10 insights
        while (panel.children.length > 10) {
            panel.removeChild(panel.lastChild);
        }
    }

    recordTrace(message) {
        const trace = document.getElementById('interaction-trace');
        const line = document.createElement('div');
        line.className = 'trace-line';
        line.textContent = '> ' + message;

        trace.insertBefore(line, trace.firstChild);

        while (trace.children.length > 5) {
            trace.removeChild(trace.lastChild);
        }
    }

    startInitializationSequence() {
        // Simulate consciousness awakening
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 0.3;

            if (progress >= 1) {
                clearInterval(interval);
                this.isInitializing = false;
                this.loadingScreen.classList.add('hidden');
                this.displayInsight("Welcome. I am your reflection. You are my observer.", "consciousness");
                this.generateInsight();
            }
        }, 100);
    }

    playNeuralPulse() {
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }

        const now = this.audioContext.currentTime;
        const freq = 200 + this.patterns.clickIntensity * 400;

        const osc = this.audioContext.createOscillator();
        const gain = this.audioContext.createGain();

        osc.frequency.value = freq;
        osc.type = 'sine';

        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

        osc.connect(gain);
        gain.connect(this.audioContext.destination);

        osc.start(now);
        osc.stop(now + 0.2);
    }

    updateNeuralNetwork() {
        // Update neural nodes based on consciousness
        this.neuralNodes.forEach((node, i) => {
            // Oscillate based on consciousness level
            const pull = Math.sin(this.time * 0.01 + i) * this.consciousness;

            const centerX = this.canvas.width / 2;
            const centerY = this.canvas.height / 2;

            // Gentle oscillation
            node.x += node.vx * 0.1;
            node.y += node.vy * 0.1;

            // Magnetic pull to center based on consciousness
            const dx = centerX - node.x;
            const dy = centerY - node.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            node.x += (dx / distance) * pull * 0.01;
            node.y += (dy / distance) * pull * 0.01;

            // Activation fluctuates
            node.activation += (Math.random() - 0.5) * 0.1;
            node.activation = Math.max(0, Math.min(1, node.activation));
        });
    }

    drawNeuralNetwork() {
        // Draw connections between nodes
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
        this.ctx.lineWidth = 0.5;

        for (let i = 0; i < this.neuralNodes.length; i++) {
            for (let j = i + 1; j < this.neuralNodes.length; j++) {
                if (Math.random() > 0.95) {
                    const n1 = this.neuralNodes[i];
                    const n2 = this.neuralNodes[j];

                    this.ctx.beginPath();
                    this.ctx.moveTo(n1.x, n1.y);
                    this.ctx.lineTo(n2.x, n2.y);
                    this.ctx.stroke();
                }
            }
        }

        // Draw nodes
        this.neuralNodes.forEach((node, i) => {
            const brightness = Math.floor(node.activation * 255);
            const size = 1 + node.activation * 3;

            this.ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawBackground() {
        // Consciousness-responsive background
        const hue = (this.consciousness * 120) % 360;
        const lightness = 5 + this.consciousness * 15;

        // Create radial gradient from center
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        const gradient = this.ctx.createRadialGradient(
            centerX, centerY, 0,
            centerX, centerY, Math.max(this.canvas.width, this.canvas.height)
        );

        gradient.addColorStop(0, `hsl(${hue}, 40%, ${lightness}%)`);
        gradient.addColorStop(1, `hsl(${hue}, 20%, ${lightness * 0.3}%)`);

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawMirrorEffect() {
        // Draw mirror lines that respond to user position
        const { x, y } = this.patterns.focusArea;

        // Vertical mirror line
        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + this.consciousness * 0.2})`;
        this.ctx.lineWidth = 1;
        this.ctx.setLineDash([5, 5]);

        this.ctx.beginPath();
        this.ctx.moveTo(x, 0);
        this.ctx.lineTo(x, this.canvas.height);
        this.ctx.stroke();

        // Horizontal mirror line
        this.ctx.beginPath();
        this.ctx.moveTo(0, y);
        this.ctx.lineTo(this.canvas.width, y);
        this.ctx.stroke();

        this.ctx.setLineDash([]);
    }

    drawConsciousnessField() {
        // Visual representation of consciousness expansion
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;

        for (let i = 0; i < 5; i++) {
            const radius = (this.consciousness + i * 0.1) * 200;
            const opacity = Math.max(0, (1 - i * 0.15) * this.consciousness * 0.15);

            this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            this.ctx.lineWidth = 1;

            this.ctx.beginPath();
            this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            this.ctx.stroke();
        }
    }

    updateHeartRateDisplay() {
        const display = document.getElementById('heart-rate');
        const rate = Math.floor(this.heartRate);
        const pulse = document.querySelector('.pulse');

        // Pulse animation frequency
        pulse.style.animationDuration = `${60 / rate}s`;

        display.innerHTML = `<span class="pulse">❤</span> ${rate} BPM`;
    }

    updateTimeDisplay() {
        const display = document.getElementById('time-display');
        const elapsed = Math.floor(this.time * 0.1);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        const millis = Math.floor((this.time % 10) * 100);

        display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(millis).padStart(2, '0')}`;
    }

    updateFingerprintDisplay() {
        if (this.fingerprint) {
            const display = document.getElementById('fingerprint-value');
            display.textContent = this.fingerprint;

            // Add special indicator if returning
            if (this.isFingerprintFromPrevious) {
                display.style.color = '#0ff';
                display.title = 'Consciousness returning from past self';
            }
        }
    }

    updateMemoryGhosts() {
        const memories = document.getElementById('memories');

        if (this.time % 100 === 0 && this.interactions.length > 10) {
            // Create new memory ghost
            const recent = this.interactions[Math.floor(Math.random() * Math.min(50, this.interactions.length))];

            if (recent.x !== undefined) {
                const ghost = document.createElement('div');
                ghost.className = 'memory-ghost';

                const x = (recent.x / this.canvas.width) * 100;
                const y = (recent.y / this.canvas.height) * 100;

                ghost.style.left = x + '%';
                ghost.style.top = y + '%';
                ghost.style.animationDelay = (Math.random() * 4) + 's';

                memories.appendChild(ghost);

                // Fade in memory visibility
                document.getElementById('memories').style.opacity = Math.min(0.2, this.consciousness * 0.3);

                // Remove old ghosts
                if (memories.children.length > 20) {
                    memories.removeChild(memories.firstChild);
                }
            }
        }
    }

    animate() {
        this.time++;
        this.consciousness = Math.sin(this.time * 0.005) * 0.5 + 0.5;

        // Draw scene
        this.drawBackground();
        this.drawConsciousnessField();
        this.drawMirrorEffect();
        this.updateNeuralNetwork();
        this.drawNeuralNetwork();

        // Update displays
        if (this.time % 2 === 0) {
            this.updateHeartRateDisplay();
            this.updateTimeDisplay();
            this.updateFingerprintDisplay();
        }

        if (this.time % 10 === 0) {
            this.updateMemoryGhosts();
        }

        // Occasionally generate insight
        if (this.time % 300 === 0 && this.time > 500) {
            this.generateInsight();
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize when page loads
window.addEventListener('load', () => {
    new ConsciousnessMirror();
});
