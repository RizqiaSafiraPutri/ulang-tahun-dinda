
let current = 0;

const slides = document.querySelectorAll('.slide');

const pageNumber = document.getElementById('pageNumber');

const music = document.getElementById('music');


// MUSIK OTOMATIS SAAT WEBSITE DIBUKA

let musicStarting = false;

function startBackgroundMusic() {
    if (!music || !music.paused || musicStarting) {
        return;
    }

    musicStarting = true;

    music.play()
        .then(() => {
            musicStarting = false;
        })
        .catch(() => {
            musicStarting = false;
        });
}

window.addEventListener("load", () => {
    startBackgroundMusic();
});

// MUSIK DIMULAI SETELAH PENGUNJUNG MENYENTUH LAYAR

document.addEventListener("pointerdown", (event) => {

    // Jangan mulai musik saat tombol video ditekan
    if (event.target.closest("#playMemoryVideo")) {
        return;
    }

    startBackgroundMusic();

});
document.addEventListener("keydown", startBackgroundMusic);


// MENAMPILKAN SLIDE

function showSlide(index) {

    if (index < 0 || index >= slides.length) {
        return;
    }

    slides[current].classList.remove('active');

    current = index;

    slides[current].classList.add('active');

    if (pageNumber) {
        pageNumber.textContent = (current + 1) + ' / ' + slides.length;
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


// TOMBOL NEXT

function nextSlide() {

    if (current < slides.length - 1) {
        showSlide(current + 1);
    }

}


// TOMBOL BACK

function prevSlide() {

    if (current > 0) {
        showSlide(current - 1);
    }

}

// KEJUTAN CONFETTI

function celebrate() {

    document.getElementById('finalMessage').textContent =
        'Sending you lots of love and happiness, Dinda! 🎉💗';

    for (let i = 0; i < 35; i++) {

        const heart = document.createElement('div');

        heart.textContent = ['💗','💕','🌸','✨','🎀'][
            Math.floor(Math.random() * 5)
        ];

        heart.style.position = 'fixed';

        heart.style.left = Math.random() * 100 + 'vw';

        heart.style.top = '-30px';

        heart.style.fontSize = '24px';

        heart.style.zIndex = '100';

        heart.style.pointerEvents = 'none';

        heart.style.transition =
            'transform 3s linear, opacity 3s';

        document.body.appendChild(heart);

        requestAnimationFrame(() => {

            heart.style.transform =
                'translateY(' +
                (window.innerHeight + 80) +
                'px) rotate(360deg)';

            heart.style.opacity = '0';

        });

        setTimeout(() => {

            heart.remove();

        }, 3200);

    }

}


// KEYBOARD NAVIGATION

document.addEventListener('keydown', (e) => {

    if (e.key === 'ArrowRight') {
        nextSlide();
    }

    if (e.key === 'ArrowLeft') {
        prevSlide();
    }

});


// ANIMASI DEKORASI

for (let i = 0; i < 12; i++) {

    const item = document.createElement('div');

    item.className = 'floating';

    item.textContent = ['♡','✿','✨','♥'][i % 4];

    item.style.left = Math.random() * 100 + 'vw';

    item.style.animationDelay = Math.random() * 6 + 's';

    item.style.fontSize =
        (15 + Math.random() * 15) + 'px';

    document.body.appendChild(item);

}

let isVideoOpen = false;
function openMemoryVideo() {
    const videoPage = document.getElementById("memoryVideoPage");
    const video = document.getElementById("birthdayMemoryVideo");

    if (!videoPage || !video) return;

    isVideoOpen = true;

    music.pause();

    videoPage.classList.add("show");

    video.currentTime = 0;

    video.play().catch(() => {
        console.log("Tekan tombol Play pada video.");
    });
}

function closeMemoryVideo() {
    const videoPage = document.getElementById("memoryVideoPage");
    const video = document.getElementById("birthdayMemoryVideo");

    video.pause();
    video.currentTime = 0;

    videoPage.classList.remove("show");

    isVideoOpen = false;

    music.play().catch(() => {});
}

// MUSIK KEMBALI SETELAH VIDEO SELESAI

const birthdayVideo = document.getElementById("birthdayMemoryVideo");

birthdayVideo.addEventListener("ended", () => {
    const videoPage = document.getElementById("memoryVideoPage");

    videoPage.classList.remove("show");

    music.play().catch(() => {});
});

// PERPINDAHAN SLIDE OTOMATIS MENGIKUTI MUSIK

const slideTimings = [0, 6, 12, 19, 26];

music.addEventListener("timeupdate", () => {

    if (isVideoOpen) return;

    const waktu = music.currentTime;

    let slideTujuan = 0;

    for (let i = 0; i < slideTimings.length; i++) {
        if (waktu >= slideTimings[i]) {
            slideTujuan = i;
        }
    }

    if (current !== slideTujuan && slideTujuan < slides.length) {
        showSlide(slideTujuan);
    }
});

// ANIMASI PEMBUKA WEBSITE

window.addEventListener("load", () => {

    setTimeout(() => {

        const welcome = document.getElementById("welcomeAnimation");

        if (welcome) {

            welcome.style.transition = "opacity 1s";
            welcome.style.opacity = "0";

            setTimeout(() => {
                welcome.remove();
            }, 1000);

        }

    }, 5000);

});
