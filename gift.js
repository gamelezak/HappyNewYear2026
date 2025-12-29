const gift = document.getElementById('gift');
const letter = document.getElementById('letter');
const letterClose = document.getElementById('letterClose');

gift.addEventListener('click', () => {
    gift.classList.add('open');
    setTimeout(() => {
        letter.classList.add('show');
    }, 400); // после анимации крышки
});

letterClose.addEventListener('click', () => {
    letter.classList.remove('show');
});

// опционально — закрытие по клику на фон
letter.addEventListener('click', (e) => {
    if (e.target === letter) {
        letter.classList.remove('show');
    }
});