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
    console.log(x);
    console.log(y);
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
ctx.strokeStyle = 'yellow';
ctx.moveTo(canvas.width - 112.5, canvas.height - 75);
ctx.arc(canvas.width - 137.5, canvas.height - 75, 25, 0, angle(360), false);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.strokeStyle = 'red';
ctx.moveTo(canvas.width - 20, canvas.height - 100);
ctx.arc(canvas.width - 45, canvas.height - 100, 25, 0, angle(360), false);
ctx.stroke();
ctx.strokeStyle = '#000000';
ctx.closePath();

ctx.beginPath();
ctx.strokeStyle = 'green';
ctx.moveTo(canvas.width - 52.5, canvas.height - 75);
ctx.arc(canvas.width - 77.5, canvas.height - 75, 25, 0, angle(360), false);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.strokeStyle = 'blue';
ctx.moveTo(canvas.width - 140, canvas.height - 100);
ctx.arc(canvas.width - 165, canvas.height - 100, 25, 0, angle(360), false);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.strokeStyle = '#000000';
ctx.moveTo(canvas.width - 80, canvas.height - 100);
ctx.arc(canvas.width - 105, canvas.height - 100, 25, 0, angle(360), false);
ctx.stroke();
ctx.closePath();


ctx.beginPath();
ctx.strokeStyle = 'yellow';
ctx.moveTo(canvas.width - 112.5, canvas.height - 75);
ctx.arc(canvas.width - 137.5, canvas.height - 75, 25, 0, angle(256), false);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.strokeStyle = 'yellow';
ctx.moveTo(canvas.width - 112.5, canvas.height - 75);
ctx.arc(canvas.width - 137.5, canvas.height - 75, 25, 0, angle(280), true);
ctx.stroke();
ctx.closePath();

ctx.beginPath();
ctx.strokeStyle = '#000000';
ctx.moveTo(canvas.width - 80, canvas.height - 100);
ctx.arc(canvas.width - 105, canvas.height - 100, 25, 0, angle(140), false);
ctx.stroke();
ctx.closePath();


ctx.beginPath();
ctx.strokeStyle = 'green';
ctx.moveTo(canvas.width - 52.5, canvas.height - 75);
ctx.arc(canvas.width - 77.5, canvas.height - 75, 25, 0, angle(200), false);
ctx.stroke();
ctx.closePath();



ctx.beginPath();
ctx.strokeStyle = 'red';
ctx.moveTo(canvas.width - 20, canvas.height - 100);
ctx.arc(canvas.width - 45, canvas.height - 100, 25, 0, angle(140), false);
ctx.stroke();
ctx.strokeStyle = '#000000';
ctx.closePath();
