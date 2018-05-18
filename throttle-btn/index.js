function throttle(fn, time = 500) {
    let timer;
    return function(...args){
        if(timer == null){
            fn.apply(this, args);
            timer = setTimeout(() => {
                timer = null;
            }, time);
        }
    }
}
function handler(){
    this.innerHTML = parseInt(this.innerHTML) + 1;
}
circle1.onclick = throttle(handler);
circle2.onclick = handler;
