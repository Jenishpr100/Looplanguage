// --- Loop Lyrics Translator ---
//
// Normal text
//      ↓
// ASCII binary
//      ↓
// loop / lyrics
//
// loop / lyrics
//      ↓
// binary
//      ↓
// Normal text
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const translateBtn = document.getElementById('translateBtn');
const flipBtn = document.getElementById('flipBtn');
const status = document.getElementById('status');
// ==========================================
// TEXT → BINARY
// ==========================================
function textToBinary(text) {
    return Array.from(text)
        .map(char => {
            return char
                .charCodeAt(0)
                .toString(2)
                .padStart(8, '0');
        })
        .join(' ');
}
// ==========================================
// BINARY → TEXT
// ==========================================
function binaryToText(binary) {
    const bytes = binary.trim().split(/\s+/);
    return bytes
        .map(byte => {
            return String.fromCharCode(
                parseInt(byte, 2)
            );
        })
        .join('');
}
// ==========================================
// BINARY → LOOP / LYRICS
// ==========================================
function binaryToLoopLyrics(binary) {
    return binary
        .replace(/0/g, 'loop')
        .replace(/1/g, 'lyrics');
}
// ==========================================
// LOOP / LYRICS → BINARY
// ==========================================
function loopLyricsToBinary(text) {
    return text
        .replace(/loop/g, '0')
        .replace(/lyrics/g, '1');
}
// ==========================================
// TEXT → LOOP / LYRICS
// ==========================================
function textToLoopLyrics(text) {
    const binary = textToBinary(text);
    return binaryToLoopLyrics(binary);
}
// ==========================================
// LOOP / LYRICS → TEXT
// ==========================================
function loopLyricsToText(text) {
    const binary = loopLyricsToBinary(text);
    return binaryToText(binary);
}
// ==========================================
// TRANSLATE BUTTON
// ==========================================
translateBtn.addEventListener('click', () => {
    const input = inputText.value;
    outputText.value = textToLoopLyrics(input);
    status.textContent =
        "Translating text → binary → Loop/Lyrics...";
});
// ==========================================
// FLIP BUTTON
// ==========================================
flipBtn.addEventListener('click', () => {
    const input = inputText.value;
    outputText.value = loopLyricsToText(input);
    status.textContent =
        "Translating Loop/Lyrics → binary → text...";
});
// ==========================================
// STARFIELD
// ==========================================
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');
let stars = [];
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
function createStars(count = 200) {
    stars = [];
    for (let i = 0; i < count; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2,
            speed: Math.random() * 0.5 + 0.2,
            opacity: Math.random()
        });
    }
}
createStars();
function drawStars() {
    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(
            star.x,
            star.y,
            star.size,
            0,
            Math.PI * 2
        );
        ctx.fillStyle =
            `rgba(255,255,255,${star.opacity})`;
        ctx.fill();
        star.x += star.speed;
        if (star.x > canvas.width) {
            star.x = 0;
            star.y =
                Math.random() * canvas.height;
        }
    }
    requestAnimationFrame(drawStars);
}
drawStars();
