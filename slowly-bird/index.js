var i = 0;
setInterval(function() {
    bird.className = "sprite " + 'bird' + ((i++) % 3);
},1000 / 10);

function debounce(fn, dur) {
    dur = dur || 100;
    var timer;
    return function() {
        clearTimeout(timer);
        // dur空档期，不会触发fn函数
        timer = setTimeout(() => {
            fn.apply(this, arguments);
        },dur);
    }
}

document.addEventListener('mousemove', debounce(function(evt) {
    var x = evt.clientX,
    y = evt.clientY,
    x0 = bird.offsetLeft,
    y0 = bird.offsetTop;

    // console.log(x, y);
    var a1 = new Animator(1000, function(ep) {
        bird.style.top = y0 + ep * (y - y0) + 'px';
        bird.style.left = x0 + ep * (x - x0) + 'px';
    }, p => p * p);
    a1.animate();
},100));
