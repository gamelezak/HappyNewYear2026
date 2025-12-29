import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  onChildRemoved,
  get,
  remove
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-database.js";


const firebaseConfig = {
   apiKey: "AIzaSyBV01cQyq-INnrFkvrNVCTcqgtvGzbC9Pw",
   authDomain: "words-6eef3.firebaseapp.com",
   databaseURL: "https://words-6eef3-default-rtdb.europe-west1.firebasedatabase.app",
   projectId: "words-6eef3",
 };
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, 'messages');


const input = document.getElementById('bg-input');
const btn = document.getElementById('bg-submit');
const container = document.getElementById('background-messages');


function getSlots() {
  if (window.innerWidth <= 480) {
    return [20, 40, 60];   // телефон
  }
  if (window.innerWidth <= 768) {
    return [30, 50];      // планшет
  }
  return [45, 50];        // десктоп
}

let SLOTS = getSlots();

window.addEventListener('resize', () => {
  SLOTS = getSlots();
});

const elements = new Map();


function wind() {
  container.classList.remove('wind');
  void container.offsetHeight;
  container.classList.add('wind');
}


function explodeIce(el) {
  if (window.innerWidth <= 480) return; // ❗ отключаем на телефонах

  const rect = el.getBoundingClientRect();
  const cx = rect.width / 2;
  const cy = rect.height / 2;

  for (let i = 0; i < 10; i++) {
    const s = document.createElement('div');
    s.className = 'spark';

    const angle = Math.random() * Math.PI * 2;
    const dist = 30 + Math.random() * 30;

    s.style.left = cx + 'px';
    s.style.top = cy + 'px';
    s.style.setProperty('--x', Math.cos(angle) * dist + 'px');
    s.style.setProperty('--y', Math.sin(angle) * dist + 'px');

    el.appendChild(s);
    setTimeout(() => s.remove(), 1300);
  }
}



function spawnMessage(key, text) {
  const div = document.createElement('div');
  div.className = 'bg-message';
  div.textContent = text;

  container.appendChild(div);

  // --- вычисляем безопасные координаты ---
  const cw = container.clientWidth;
  const mw = div.offsetWidth;

  const minX = 8;                 // отступ от края
  const maxX = cw - mw - 8;        // ❗ не даём выйти за экран

  const x = Math.random() * (maxX - minX) + minX;

  const index = elements.size % SLOTS.length;
  div.style.top = SLOTS[index] + '%';
  div.style.left = x + 'px';

  elements.set(key, div);
  wind();
}



function removeMessage(key) {
  const el = elements.get(key);
  if (!el) return;

  explodeIce(el);

  setTimeout(() => {
    el.remove();
    elements.delete(key);
  }, 1800);
}


onChildAdded(messagesRef, snap => {
  spawnMessage(snap.key, snap.val().text);
});


onChildRemoved(messagesRef, snap => {
  removeMessage(snap.key);
});


btn.onclick = async () => {
  const text = input.value.trim();
  if (!text) return;

  await push(messagesRef, { text, time: Date.now() });

  const snap = await get(messagesRef);
  const data = snap.val();
  if (!data) return;

  const entries = Object.entries(data)
    .sort((a, b) => a[1].time - b[1].time);

  if (entries.length > 2) {
    entries
      .slice(0, entries.length - 2)
      .forEach(([key]) => remove(ref(db, 'messages/' + key)));
  }

  input.value = '';
};