/**
 * LUN-E LUNAR OPS — Application Logic
 * absurd.industries // 2026
 * 
 * Built with Vue 3 (CDN) because we're absurd, not irresponsible.
 */

const { createApp, ref, computed, onMounted } = Vue;

const app = createApp({
  setup() {

    // ---- State ----
    const showModal = ref(false);
    const showReveal = ref(false);
    const pilotEmail = ref('');
    const pilotRegistered = ref(false);
    const pilotCallsign = ref('');

    // ---- Rover Fleet Data ----
    const roverFleet = ref([
      {
        id: 'UNIT-01',
        emoji: '🤖',
        status: 'Patrolling Sector 7G',
        morale: 'STABLE',
        critical: false,
      },
      {
        id: 'UNIT-03',
        emoji: '😰',
        status: 'Refuses to cross crater',
        morale: 'DECLINING',
        critical: true,
      },
      {
        id: 'UNIT-04',
        emoji: '🫠',
        status: 'Going up. Not going up.',
        morale: 'SISYPHEAN',
        critical: true,
      },
      {
        id: 'UNIT-07',
        emoji: '😢',
        status: 'Emotionally compromised',
        morale: 'DECLINING',
        critical: true,
      },
      {
        id: 'UNIT-09',
        emoji: '🌀',
        status: 'Entered orbit (on the ground)',
        morale: 'TRANSCENDENT',
        critical: true,
      },
      {
        id: 'UNIT-11',
        emoji: '🧘',
        status: 'Has not moved in 47 minutes',
        morale: 'THINKING',
        critical: false,
      },
      {
        id: 'UNIT-12',
        emoji: '🙈',
        status: 'Refuses to acknowledge crater',
        morale: 'DENIAL',
        critical: true,
      },
      {
        id: 'UNIT-14',
        emoji: '🤝',
        status: 'In a standoff with Unit-15',
        morale: 'STUBBORN',
        critical: true,
      },
      {
        id: 'UNIT-15',
        emoji: '🤝',
        status: 'In a standoff with Unit-14',
        morale: 'EQUALLY STUBBORN',
        critical: true,
      },
      {
        id: 'UNIT-18',
        emoji: '🤖',
        status: 'Collecting samples',
        morale: 'STABLE',
        critical: false,
      },
      {
        id: 'UNIT-20',
        emoji: '😴',
        status: 'Power nap (unauthorized)',
        morale: 'RESTED',
        critical: false,
      },
      {
        id: 'UNIT-22',
        emoji: '🎵',
        status: 'Vibrating at 440Hz',
        morale: 'VIBING',
        critical: true,
      },
    ]);

    // ---- Methods ----

    /**
     * Generate a pilot callsign from email
     */
    function generateCallsign(email) {
      const prefixes = ['LUNAR', 'CRATER', 'ORBIT', 'DUST', 'APOLLO', 'ROCK', 'TIDE', 'MARE', 'HELM', 'DRIFT'];
      const suffixes = ['HAWK', 'WOLF', 'BEAR', 'FOX', 'OWL', 'LYNX', 'PUMA', 'RAVEN', 'VIPER', 'EAGLE'];
      
      // Use email hash to pick deterministic but "random" callsign
      let hash = 0;
      for (let i = 0; i < email.length; i++) {
        hash = ((hash << 5) - hash) + email.charCodeAt(i);
        hash |= 0;
      }
      
      const prefix = prefixes[Math.abs(hash) % prefixes.length];
      const suffix = suffixes[Math.abs(hash >> 4) % suffixes.length];
      const num = String(Math.abs(hash) % 100).padStart(2, '0');
      
      return `${prefix}-${suffix}-${num}`;
    }

    /**
     * Register as a Lun-E Pilot
     */
    function registerPilot() {
      if (!pilotEmail.value || !pilotEmail.value.includes('@')) return;
      
      pilotCallsign.value = generateCallsign(pilotEmail.value);
      pilotRegistered.value = true;

      // In production: POST to your email collection endpoint
      console.log(`[LUN-E OPS] New pilot registered: ${pilotEmail.value} — Callsign: ${pilotCallsign.value}`);
    }

    // ---- Lifecycle ----

    onMounted(() => {
      initScrollAnimations();
      createStarField();
    });

    /**
     * Intersection Observer for scroll-triggered animations
     */
    function initScrollAnimations() {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -40px 0px',
        }
      );

      // Small delay to let Vue render
      requestAnimationFrame(() => {
        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
          observer.observe(el);
        });
      });
    }

    /**
     * Generate a starry background
     */
    function createStarField() {
      const container = document.createElement('div');
      container.style.cssText = 'position:fixed;inset:0;z-index:-1;overflow:hidden;pointer-events:none;';

      for (let i = 0; i < 80; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2 + 0.5;
        star.className = 'star';
        star.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          --duration: ${Math.random() * 4 + 2}s;
          --delay: ${Math.random() * 5}s;
        `;
        container.appendChild(star);
      }

      document.body.appendChild(container);
    }

    // ---- Expose ----
    return {
      showModal,
      showReveal,
      pilotEmail,
      pilotRegistered,
      pilotCallsign,
      roverFleet,
      registerPilot,
    };
  },
});

app.mount('#app');