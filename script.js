

document.addEventListener('DOMContentLoaded', function() {
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const progressFill = document.getElementById('progress-fill');
    const progressPercent = document.getElementById('progress-percent');
    const dynamicMessage = document.getElementById('dynamic-message');
    const fireworksContainer = document.getElementById('fireworks');
    
    const codeLinesEl = document.getElementById('code-lines');
    const coffeeCupsEl = document.getElementById('coffee-cups');
    const bugsFixedEl = document.getElementById('bugs-fixed');
    const memoriesEl = document.getElementById('memories');

    const countdownSound = document.getElementById('countdown-sound');
    const newyearSound = document.getElementById('newyear-sound');
    
    const newYearDate = new Date('January 1, 2026 00:00:00').getTime();
    
    const messages = [
        { timeLeft: 30 * 24 * 60 * 60 * 1000, message: "Новый год уже близится^^" },
        { timeLeft: 7 * 24 * 60 * 60 * 1000, message: "Уже через неделю! Пора готовиться к  празднику! 🎁" },
        { timeLeft: 6 * 24 * 60 * 60 * 1000, message: "Осталось 6 дней! Успей  завершить все дела в этом году чтобы войти в новый год с выполненными делами^^" },
        { timeLeft: 5 * 24 * 60 * 60 * 1000, message: "Уже осталось 5 дней! Не забывай кушать^^" },
        { timeLeft: 4 * 24 * 60 * 60 * 1000, message: "Осталось всего 4 дня!Чем планируешь сегодня занятся?" },
        { timeLeft: 24 * 60 * 60 * 1000, message: "Всего один день остался! Предвкушение зашкаливает! ✨" },
        { timeLeft: 60 * 60 * 1000, message: "ПОЧТИ СОВСЕМ СКОРО! Последние приготовления! 🎉" },
        { timeLeft: 10 * 60 * 1000, message: "Осталось всего десять минут!" },
        { timeLeft: 60 * 1000, message: "ПОСЛЕДНЯЯ МИНУТА! Приготовься! ⏰" },
        { timeLeft: 0, message: "С НОВЫМ 2025 ГОДОООМ! 🎊🎆🥳" }
    ];
        const garlandWrap = document.getElementById('garland-svg');
    
    function animateStats() {
        animateValue(codeLinesEl, 0, 15432, 3000);
        animateValue(coffeeCupsEl, 0, 428, 3000);
        animateValue(bugsFixedEl, 0, 167, 3000);
        animateValue(memoriesEl, 0, 89, 3000);
    }


    
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function createFirework(x, y) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = `${x}px`;
        firework.style.top = `${y}px`;
        fireworksContainer.appendChild(firework);
        

        const colors = ['#ff5e5e', '#f6b93b', '#78e08f', '#4a69bd', '#e55039'];
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 3;
            const size = 3 + Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.borderRadius = '50%';
            
            firework.appendChild(particle);
            
     
            const animation = particle.animate([
                { transform: 'translate(0, 0)', opacity: 1 },
                { 
                    transform: `translate(${Math.cos(angle) * velocity * 100}px, ${Math.sin(angle) * velocity * 100}px)`, 
                    opacity: 0 
                }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0.1, 0.8, 0.9, 0.1)'
            });
            
            animation.onfinish = () => particle.remove();
        }
        
        setTimeout(() => {
            firework.remove();
        }, 1500);
    }
    

    function startFireworks() {
        fireworksContainer.style.opacity = '1';
        

        newyearSound.currentTime = 0;
        newyearSound.play().catch(e => console.log("Автовоспроизведение звука заблокировано"));
        

        setTimeout(() => createFirework(window.innerWidth / 2, window.innerHeight / 2), 100);
        
  
        const fireworkInterval = setInterval(() => {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createFirework(x, y);
        }, 200);
        
  
        setTimeout(() => {
            clearInterval(fireworkInterval);
            window.location.href = 'congrats.html';
        }, 5000);
    }
    
    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = newYearDate - now;
        const fourDays = 4 * 24 * 60 * 60 * 1000;
        const sixDays = 6 * 24 * 60 * 60 * 1000;
        const messageForm = document.getElementById('message-form');
        const body = document.querySelector('body');
        const progbar = document.querySelector('.progress-fill');
        const numbers = document.getElementsByClassName('number');
        const separators = document.getElementsByClassName('separator');
        const header = document.querySelector('.header h1')
        const text = document.querySelector('.text');
        const fiveDays = 5 * 24 * 60 * 60 * 1000;
        if(timeLeft <= fiveDays){
            window.addEventListener('resize', resize);
            resize();
            render(0);
            
            


        }
        if (timeLeft <= sixDays){
            for (let i = 0; i < numbers.length; i++) {
                numbers[i].style.color = '#3bf6ceff'
                numbers[i].style.textShadow = '0 0 10px rgba(59, 246, 196, 0.5)'

            }

            for (let i = 0; i < separators.length; i++) {
                separators[i].style.color = '#3bf6ceff'
            }
            text.style.color = '#3bf6f0ff'
            header.style.color = '#3bf6f0ff'
            body.style.background = 'linear-gradient(135deg, #0c1761ff, #1e3099ff, #4a8dbdff)';
            progbar.style.background = 'linear-gradient(90deg, #f3f63bff, #e55939ff)'
        }
        if (timeLeft <= fourDays) {
            messageForm.style.display = 'block';
        }

        if (timeLeft <= 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            progressFill.style.width = '100%';
            progressPercent.textContent = '100%';
            dynamicMessage.textContent = "С НОВЫМ 2025 ГОДОООМ! 🎊🎆🥳";
            
            if (!window.newYearStarted) {
                window.newYearStarted = true;
                startFireworks();
            }
            
            return;
        }
        

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        

        daysEl.textContent = days.toString().padStart(2, '0');
        hoursEl.textContent = hours.toString().padStart(2, '0');
        minutesEl.textContent = minutes.toString().padStart(2, '0');
        secondsEl.textContent = seconds.toString().padStart(2, '0');
        

        secondsEl.style.animation = 'none';
        setTimeout(() => {
            secondsEl.style.animation = 'countdownPop 0.5s';
        }, 10);
        

        const startOfYear = new Date('January 1, 2025 00:00:00').getTime();
        const endOfYear = newYearDate;
        const totalYearDuration = endOfYear - startOfYear;
        const elapsedTime = now - startOfYear;
        const progress = Math.min(Math.max((elapsedTime / totalYearDuration) * 100, 0), 100);
    
        progressFill.style.width = `${progress}%`;
        progressPercent.textContent = `${progress.toFixed(1)}%`;
        

        updateMessage(timeLeft);
        
  
        if (timeLeft < 11000 && timeLeft > 0 && seconds % 1 === 0) {
            countdownSound.currentTime = 0;
            countdownSound.play().catch(e => console.log("Автовоспроизведение звука заблокировано"));
        }
    }
    

    function updateMessage(timeLeft) {
        for (let i = 0; i < messages.length; i++) {
            if (timeLeft <= messages[i].timeLeft && timeLeft > messages[i+1].timeLeft  ) {
                dynamicMessage.textContent = messages[i].message;
                break;
            }
        }
    }
    


    
/* ❄️ WEBGL СНЕГ — БЕЗ СКАЧКОВ ❄️ */
const canvas = document.getElementById('snow');
const gl = canvas.getContext('webgl', { alpha: true });

if (!gl) {
    console.warn('WebGL не поддерживается');
    return;
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
}



const vertexSrc = `
attribute float a_id;
uniform float u_time;
uniform vec2 u_resolution;

float rand(float n) {
    return fract(sin(n) * 43758.5453123);
}

void main() {
    float id = a_id;

    float x = rand(id) * u_resolution.x;
    float speed = 20.0 + rand(id + 1.0) * 30.0;
    float drift = rand(id + 2.0) * 40.0;

    float y = mod(
        u_resolution.y - (u_time * speed) + rand(id + 3.0) * u_resolution.y,
        u_resolution.y
    );

    float dx = sin(u_time * 0.2 + id) * drift;

    vec2 pos = vec2(x + dx, y);
    vec2 clip = (pos / u_resolution) * 2.0 - 1.0;
    clip.y *= 1.0;

    gl_Position = vec4(clip, 0.0, 1.0);
    gl_PointSize = 1.5 + rand(id + 4.0) * 2.5;
}
`;

const fragmentSrc = `
precision mediump float;

void main() {
    float d = length(gl_PointCoord - 0.5);
    float alpha = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.8);
}
`;

function compile(type, src) {
    const s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
}

const vs = compile(gl.VERTEX_SHADER, vertexSrc);
const fs = compile(gl.FRAGMENT_SHADER, fragmentSrc);

const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);
gl.useProgram(program);


const COUNT = 1200;
const ids = new Float32Array(COUNT);
for (let i = 0; i < COUNT; i++) ids[i] = i;

const buffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
gl.bufferData(gl.ARRAY_BUFFER, ids, gl.STATIC_DRAW);

const a_id = gl.getAttribLocation(program, 'a_id');
gl.enableVertexAttribArray(a_id);
gl.vertexAttribPointer(a_id, 1, gl.FLOAT, false, 0, 0);

const u_time = gl.getUniformLocation(program, 'u_time');
const u_resolution = gl.getUniformLocation(program, 'u_resolution');

function render(time) {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(u_time, time * 0.001);
    gl.uniform2f(u_resolution, canvas.width, canvas.height);
    gl.drawArrays(gl.POINTS, 0, COUNT);
    requestAnimationFrame(render);
}






   


    function init() {
        animateStats();
        updateCountdown();
        

        setInterval(updateCountdown, 1000);
        

        const style = document.createElement('style');
        style.textContent = `
            .firework {
                position: absolute;
                pointer-events: none;
                z-index: 1000;
            }
            .particle {
                position: absolute;
                pointer-events: none;
            }
        `;
        document.head.appendChild(style);
    }
    

    init();
});