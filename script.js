// Scroll Animation Observer
const observerOptions = {
    root: null,
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        } else {
            entry.target.classList.remove('in-view');
        }
    });
}, observerOptions);

// Observe all scroll-animate elements
window.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-fade, .scroll-animate-stagger');
    animateElements.forEach(el => scrollObserver.observe(el));
});

// Toast Notification Helper
const toast = document.getElementById('toast');
const toastClose = document.getElementById('toast-close');
let toastTimer;

function showToast(type, title, message) {
    if (!toast) return;
    toast.className = 'toast ' + type;
    toast.querySelector('.toast-label').textContent = type === 'success' ? 'Terkirim' : 'Gagal';
    toast.querySelector('.toast-title').textContent = title;
    toast.querySelector('.toast-message').textContent = message;
    
    // Force reflow for animation
    void toast.offsetWidth;
    toast.classList.add('show');
    
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

if (toastClose) {
    toastClose.addEventListener('click', () => {
        if (toast) toast.classList.remove('show');
        clearTimeout(toastTimer);
    });
}

// Initialize EmailJS
(function() {
    emailjs.init("dBFdqNVcmXW1UxbIW");
})();

/* Cursor Custom Interaction with Tech Logo Trail */
const cursorDot = document.getElementById('cursor-dot');
const cursorOutline = document.getElementById('cursor-outline');

// Daftar logo bahasa & teknologi
const techLogos = [
    { icon: 'fa-brands fa-flutter', color: '#02569B' },
    { icon: 'fa-brands fa-python', color: '#3776AB' },
    { icon: 'fa-brands fa-js', color: '#D4AF37' },
    { icon: 'fa-brands fa-laravel', color: '#FF2D20' },
    { icon: 'fa-brands fa-react', color: '#00B4D8' },
    { icon: 'fa-brands fa-git-alt', color: '#F05032' },
    { icon: 'fa-brands fa-android', color: '#3DDC84' },
    { icon: 'fa-brands fa-java', color: '#ED8B00' },
    { icon: 'fa-brands fa-html5', color: '#E34F26' },
    { icon: 'fa-solid fa-code', color: '#0A2E23' }
];

let currentTechIndex = 0;
let lastMouseX = window.innerWidth / 2;
let lastMouseY = window.innerHeight / 2;
let lastSpawnX = lastMouseX;
let lastSpawnY = lastMouseY;
let lastScrollTime = 0;

function spawnTechIcon(x, y) {
    const tech = techLogos[currentTechIndex];
    currentTechIndex = (currentTechIndex + 1) % techLogos.length;

    const el = document.createElement('i');
    el.className = `${tech.icon} cursor-logo-trail`;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.color = tech.color;

    // Sedikit rotasi dan offset acak agar terlihat natural
    const randomRot = (Math.random() - 0.5) * 40;
    el.style.setProperty('--rot', `${randomRot}deg`);

    document.body.appendChild(el);

    // Hapus elemen setelah animasi selesai (1s)
    setTimeout(() => {
        el.remove();
    }, 1000);
}

// Fungsi khusus untuk efek burst saat klik (banyak logo sekaligus)
function spawnClickBurst(x, y) {
    const burstCount = 8; // Jumlah logo yang muncul
    const radius = 60; // Jarak dari titik klik

    for (let i = 0; i < burstCount; i++) {
        const angle = (Math.PI * 2 * i) / burstCount;
        const offsetX = Math.cos(angle) * radius;
        const offsetY = Math.sin(angle) * radius;
        
        setTimeout(() => {
            spawnTechIcon(x + offsetX, y + offsetY);
        }, i * 40); // Stagger timing
    }
}

if (cursorDot && cursorOutline) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        lastMouseX = posX;
        lastMouseY = posY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 400, fill: "forwards" });

        // Hitung jarak gerakan mouse, jika sudah > 45px munculkan 1 icon
        const dist = Math.hypot(posX - lastSpawnX, posY - lastSpawnY);
        if (dist > 45) {
            spawnTechIcon(posX, posY);
            lastSpawnX = posX;
            lastSpawnY = posY;
        }
    });

    // Saat user scroll, munculkan juga logo bahasa pemrograman di dekat cursor
    window.addEventListener('scroll', () => {
        const now = Date.now();
        if (now - lastScrollTime > 120) {
            // Tambahkan sedikit variasi acak di sekitar posisi kursor
            const jitterX = (Math.random() - 0.5) * 30;
            const jitterY = (Math.random() - 0.5) * 30;
            spawnTechIcon(lastMouseX + jitterX, lastMouseY + jitterY);
            lastScrollTime = now;
        }
    }, { passive: true });
}

// Efek burst untuk semua tombol dan elemen interaktif
document.addEventListener('click', (e) => {
    const target = e.target;
    
    // Cek apakah target adalah tombol atau elemen interaktif
    const isInteractive = target.tagName === 'BUTTON' || 
                         target.tagName === 'A' ||
                         target.classList.contains('btn-primary') ||
                         target.classList.contains('btn-secondary') ||
                         target.closest('.btn-primary') ||
                         target.closest('.btn-secondary') ||
                         target.closest('.social-link') ||
                         target.closest('.project-card') ||
                         target.closest('.skill-item') ||
                         target.closest('.contact-btn');
    
    if (isInteractive) {
        spawnClickBurst(e.clientX, e.clientY);
    }
});

// Copy Email Feature
const btnCopyEmail = document.getElementById('btn-copy-email');
if (btnCopyEmail) {
    btnCopyEmail.addEventListener('click', () => {
        navigator.clipboard.writeText('febriopp25@gmail.com');
        showToast('success', 'Email disalin!', 'febriopp25@gmail.com berhasil disalin ke clipboard.');
    });
}

// Modal Contact Form
const btnContactModal = document.getElementById('btn-contact-modal');
const contactModal = document.getElementById('contact-modal');
const closeModal = document.getElementById('close-modal');
const contactForm = document.getElementById('contact-form');

if (btnContactModal) {
    btnContactModal.addEventListener('click', () => {
        contactModal.classList.remove('hidden');
        contactModal.classList.add('show');
    });
}

if (closeModal) {
    closeModal.addEventListener('click', () => {
        contactModal.classList.add('hidden');
        contactModal.classList.remove('show');
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === contactModal) {
        contactModal.classList.add('hidden');
        contactModal.classList.remove('show');
    }
});

// Handle Form Submission
if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');

    // Validasi email dengan regex yang lebih ketat
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Validasi nama (minimal 3 karakter, tidak boleh hanya angka)
    const validateName = (name) => {
        const trimmedName = name.trim();
        return trimmedName.length >= 3 && /[a-zA-Z]/.test(trimmedName);
    };

    // Validasi pesan (minimal 10 karakter)
    const validateMessage = (message) => {
        return message.trim().length >= 10;
    };

    // Real-time validation untuk nama
    nameInput.addEventListener('blur', () => {
        const nameValue = nameInput.value.trim();
        if (!nameValue) {
            nameError.textContent = 'Nama tidak boleh kosong';
            nameError.classList.add('show');
            nameInput.classList.add('is-invalid');
            nameInput.classList.remove('is-valid');
        } else if (!validateName(nameValue)) {
            nameError.textContent = 'Nama minimal 3 karakter dan harus mengandung huruf';
            nameError.classList.add('show');
            nameInput.classList.add('is-invalid');
            nameInput.classList.remove('is-valid');
        } else {
            nameError.classList.remove('show');
            nameInput.classList.remove('is-invalid');
            nameInput.classList.add('is-valid');
        }
    });

    nameInput.addEventListener('input', () => {
        if (nameInput.classList.contains('is-invalid')) {
            nameInput.dispatchEvent(new Event('blur'));
        }
    });

    // Real-time validation untuk email
    emailInput.addEventListener('blur', () => {
        const emailValue = emailInput.value.trim();
        if (!emailValue) {
            emailError.textContent = 'Email tidak boleh kosong';
            emailError.classList.add('show');
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
        } else if (!validateEmail(emailValue)) {
            emailError.textContent = 'Format email tidak valid (contoh: nama@domain.com)';
            emailError.classList.add('show');
            emailInput.classList.add('is-invalid');
            emailInput.classList.remove('is-valid');
        } else {
            emailError.classList.remove('show');
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.classList.contains('is-invalid')) {
            emailInput.dispatchEvent(new Event('blur'));
        }
    });

    // Real-time validation untuk pesan
    messageInput.addEventListener('blur', () => {
        const messageValue = messageInput.value.trim();
        if (!messageValue) {
            messageError.textContent = 'Pesan tidak boleh kosong';
            messageError.classList.add('show');
            messageInput.classList.add('is-invalid');
            messageInput.classList.remove('is-valid');
        } else if (!validateMessage(messageValue)) {
            messageError.textContent = 'Pesan minimal 10 karakter';
            messageError.classList.add('show');
            messageInput.classList.add('is-invalid');
            messageInput.classList.remove('is-valid');
        } else {
            messageError.classList.remove('show');
            messageInput.classList.remove('is-invalid');
            messageInput.classList.add('is-valid');
        }
    });

    messageInput.addEventListener('input', () => {
        if (messageInput.classList.contains('is-invalid')) {
            messageInput.dispatchEvent(new Event('blur'));
        }
    });

    // Form submission handler
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Validasi semua field sebelum submit
        let isValid = true;

        if (!validateName(name)) {
            nameError.textContent = 'Nama minimal 3 karakter dan harus mengandung huruf';
            nameError.classList.add('show');
            nameInput.classList.add('is-invalid');
            isValid = false;
        } else {
            nameError.classList.remove('show');
            nameInput.classList.remove('is-invalid');
            nameInput.classList.add('is-valid');
        }

        if (!validateEmail(email)) {
            emailError.textContent = 'Format email tidak valid';
            emailError.classList.add('show');
            emailInput.classList.add('is-invalid');
            isValid = false;
        } else {
            emailError.classList.remove('show');
            emailInput.classList.remove('is-invalid');
            emailInput.classList.add('is-valid');
        }

        if (!validateMessage(message)) {
            messageError.textContent = 'Pesan minimal 10 karakter';
            messageError.classList.add('show');
            messageInput.classList.add('is-invalid');
            isValid = false;
        } else {
            messageError.classList.remove('show');
            messageInput.classList.remove('is-invalid');
            messageInput.classList.add('is-valid');
        }

        // Jika ada error, jangan lanjut
        if (!isValid) {
            showToast('error', 'Validasi Gagal', 'Silakan periksa kembali data yang Anda masukkan.');
            return;
        }

        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Mengirim...';
        submitBtn.disabled = true;

        try {
            await emailjs.send('service_9r8gmmj', 'template_3ww1mzu', {
                from_name: name,
                from_email: email,
                message: message,
                to_email: 'febriopp25@gmail.com'
            });

            showToast('success', 'Pesan Terkirim', 'Terima kasih, pesan Anda berhasil dikirim ke Febrio.');
            contactForm.reset();
            nameInput.classList.remove('is-valid');
            emailInput.classList.remove('is-valid');
            messageInput.classList.remove('is-valid');
            contactModal.classList.add('hidden');
            contactModal.classList.remove('show');
        } catch (error) {
            console.error('Error:', error);
            showToast('error', 'Gagal Mengirim', 'Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi via email langsung.');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });
}

