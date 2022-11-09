document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');

    window.addEventListener('resize', () => {
        draw(canvas, context);
    });

    draw(canvas, context);
});

function draw(canvas, context) {
    maximiseCanvas(context.canvas);

    // Get starting point (bottom left of square)
    const length = Math.min(canvas.width, canvas.height) / 6;
    const x = (canvas.width/2) - length;
    const y = canvas.height;
    const depth = 1;

    context.translate(x,y);

    drawTree(context, 0, 0, length, depth);
}

function maximiseCanvas(canvas) {
    const maxX = window.innerWidth - 5;
    const maxY = window.innerHeight - 5;
    canvas.width = maxX;
    canvas.height = maxY;
}

function drawTree (context, x, y, length, depth) {
    const maxDepth = 10;
    const colours = [
        'c10004',
        'fd0200',
        'ffbf00',
        'fffe00',
        '91d14f',
        '09af50',
        '01afef',
        '0070c1',
        '05205d',
        '722d9e'
    ];
    if (depth > maxDepth) return;

    const fillColour = '#' + colours[depth - 1];

    context.fillStyle = fillColour;
    context.fillRect(x, y - length, length, length);
  
    // using Pythagorean ration 3,4,5
    // Tan of angle = Opposite / Adjacent
    const angleLeft = Math.atan(4/3);
    const angleRight = Math.atan(3/4);


    // Get new left side
    const lengthLeft = (length/5) * 3;
    context.translate(0, -length);
    context.rotate(-angleLeft);
    drawTree(context, 0, 0, lengthLeft, depth + 1);
    context.rotate(angleLeft);
    context.translate(0, length);

    // Get new right side
    const lengthRight = (length/5) * 4;
    context.translate(length, -length);
    context.rotate(angleRight);
    context.translate(-lengthRight, 0);
    drawTree(context, 0, 0, lengthRight, depth + 1);
    context.translate(lengthRight, 0);
    context.rotate(-angleRight);
    context.translate(-length, length);
}