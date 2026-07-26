// PASSWORD
const unlock = document.getElementById("unlock");
const password = document.getElementById("password");
const website = document.getElementById("website");
const screen = document.getElementById("password-screen");
const error = document.getElementById("error");

unlock.addEventListener("click", () => {
  if (password.value === "190424") {
    screen.style.display = "none";
    website.style.display = "block";
  } else {
    error.innerHTML = "Wrong password 🤍";
    password.value = "";
  }
});

password.addEventListener("keypress", (e) => {
  if (e.key === "Enter") unlock.click();
});

// MUSIC
const music = document.getElementById("music");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (isPlaying) {
    music.pause();
    musicBtn.innerHTML = "🎵 Play Music";
    isPlaying = false;
  } else {
    music.play();
    musicBtn.innerHTML = "⏸ Pause Music";
    isPlaying = true;
  }
});

// RELATIONSHIP TIMER
const startDate = new Date("April 19, 2024 00:00:00");

function updateTimer() {
  const now = new Date();
  const diff = now - startDate;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
}

updateTimer();
setInterval(updateTimer, 1000);

// TYPEWRITER EFFECT
function typewriterEffect(element, text, speed = 50) {
  let index = 0;
  element.textContent = "";

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    }
  }

  type();
}

// SMOOTH SCROLL
document.querySelector(".start").addEventListener("click", () => {
  document.querySelector(".letter").scrollIntoView({ behavior: "smooth" });
});

// FIREWORKS
function showFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.classList.add("active");

  let particles = [];

  function createExplosion(x, y) {
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: x,
        y: y,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.5) * 15 - 5,
        life: 1,
        size: Math.random() * 3 + 2,
        color: [
          "#FF69B4",
          "#FFB6C1",
          "#FF85A1",
          "#FFC0CB",
          "#FFD700"
        ][Math.floor(Math.random() * 5)]
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(p => p.life > 0);

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.1;
      p.life -= 0.01;

      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    ctx.globalAlpha = 1;

    if (particles.length > 0) {
      requestAnimationFrame(animate);
    } else {
      canvas.classList.remove("active");
    }
  }

  for (let i = 0; i < 8; i++) {
    setTimeout(() => {
      createExplosion(
        Math.random() * canvas.width,
        Math.random() * canvas.height * 0.5
      );
    }, i * 150);
  }

  animate();
}

window.addEventListener("resize", () => {
  if (document.getElementById("fireworks").classList.contains("active")) {
    const canvas = document.getElementById("fireworks");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});