
const garland = document.getElementById('garland');
const svg = document.getElementById('garlandSvg');
const path = document.getElementById('wirePath');
const lightsBox = document.getElementById('lights');
const toggle = document.getElementById('garlandToggle');

const colors = ['#ff6b6b','#ffd93d','#6bff95','#6bd4ff','#c77dff'];

function isMoscowNight() {
  const h = (new Date().getUTCHours() + 3) % 24;
  return h >= 9 || h < 8;
}

// состояние тумблера
let enabled = localStorage.getItem('garland') !== 'off';

toggle.onclick = () => {
  enabled = !enabled;
  localStorage.setItem('garland', enabled ? 'on' : 'off');
  updateVisibility();
};

function updateVisibility() {
  garland.style.opacity = (enabled && isMoscowNight()) ? '1' : '0';
}

function createLights() {
  lightsBox.innerHTML = '';

  const count = window.innerWidth < 600 ? 18 : 28;
  const length = path.getTotalLength();
  const rect = svg.getBoundingClientRect();

  for (let i = 0; i < count; i++) {
    const p = path.getPointAtLength(length * i / (count - 1));

    const x = rect.left + (p.x / 1000) * rect.width;
    const y = rect.top  + (p.y / 120)  * rect.height;

    const light = document.createElement('div');
    light.className = 'light';

    const c = colors[Math.floor(Math.random() * colors.length)];
    light.style.background = c;
    light.style.boxShadow = `0 0 16px ${c}, 0 0 36px ${c}`;
    light.style.left = x + 'px';
    light.style.top = y + 'px';

    // мягкое мерцание (один интервал — без утечек)
    setInterval(() => {
      light.style.opacity = Math.random() > 0.3 ? '1' : '0.5';
    }, 900 + Math.random() * 1200);

    lightsBox.appendChild(light);
  }
}

window.addEventListener('load', () => {
  createLights();
  updateVisibility();
});

window.addEventListener('resize', createLights);
setInterval(updateVisibility, 60000);

