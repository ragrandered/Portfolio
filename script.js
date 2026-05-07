document.addEventListener('DOMContentLoaded', () => {
    // Glow effect following mouse
    const glow = document.getElementById('glow');
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX;
        const y = e.clientY;
        glow.style.transform = `translate(${x - 300}px, ${y - 300}px)`;
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card, .section-title, .about-content p').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // Audio Toggle Logic
    const audioToggle = document.getElementById('audioToggle');
    const audioText = audioToggle.querySelector('.audio-text');
    let isPlaying = false;

    // Create placeholder audio element (simulating 435Hz ambient/bansuri)
    // In a real scenario, you'd have an actual .mp3 or .wav file
    const audio = new Audio();
    audio.loop = true;
    // For now, we'll just toggle the UI state
    
    audioToggle.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            audioToggle.classList.add('playing');
            audioText.textContent = "Experience On";
            // audio.play(); // would play if source was set
            console.log("Playing 435Hz Ambient Track...");
        } else {
            audioToggle.classList.remove('playing');
            audioText.textContent = "435Hz Ambient";
            // audio.pause();
            console.log("Experience Paused.");
        }
    });

    // Smooth navigation highlighting
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });
});
