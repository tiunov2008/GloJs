const canvas = document.getElementById('canvas'),
    ctx = canvas.getContext('2d');
const color = document.getElementById('color');
const range = document.getElementById('range');
const rangeNum = document.getElementById('range_num');

const angle = degrees => Math.PI/180 * degrees;
canvas.width = document.body.clientWidth;
canvas.height = innerHeight - 100;
canvas.style.margin = '0';
canvas.style.padding = '0';
document.body.style.margin = '0';
document.body.style.padding = '0';
color.addEventListener('input', () => ctx.strokeStyle = color.value);
range.addEventListener('input', () => {
    ctx.lineWidth = range.value;
    rangeNum.textContent = range.value;
});

canvas.addEventListener('mousemove', event => {
    const x = event.offsetX,
        y = event.offsetY,
        mx = event.movementX,
        my = event.movementY;
    if (event.buttons > 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x - mx, y - my);
        ctx.stroke();
        ctx.closePath();
    }
});
ctx.beginPath();
ctx.lineWidth = 5;
ctx.strokeStyle = 'blue';
ctx.moveTo(canvas.width - 140, canvas.height - 100);
ctx.arc(canvas.width - 165, canvas.height - 100, 25, 0, angle(360), false);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.strokeStyle = '#000000';
ctx.moveTo(canvas.width - 85, canvas.height - 100);
ctx.arc(canvas.width - 110, canvas.height - 100, 25, 0, angle(360), false);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.strokeStyle = 'red';
ctx.moveTo(canvas.width - 30, canvas.height - 100);
ctx.arc(canvas.width - 55, canvas.height - 100, 25, 0, angle(360), false);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.strokeStyle = 'yellow';
ctx.moveTo(canvas.width - 112.5, canvas.height - 75);
ctx.arc(canvas.width - 137.5, canvas.height - 75, 25, 0, angle(360), false);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.strokeStyle = 'green';
ctx.moveTo(canvas.width - 57.5, canvas.height - 75);
ctx.arc(canvas.width - 82.5, canvas.height - 75, 25, 0, angle(360), false);
ctx.stroke();
ctx.strokeStyle = '#000000  ';
ctx.closePath();

