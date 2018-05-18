function throttle(fn, time = 500) {
    let timer = null;
    return function(...args){
        if(timer == null){
            fn.apply(this, args);
            // time时间内，timer不为null，故函数不会触发
            timer = setTimeout(() => {
                timer = null;
            }, time);
        }
    }
}
// 记录次数的事件函数
function handler(){
    this.innerHTML = parseInt(this.innerHTML) + 1;
}
circle1.onclick = throttle(handler);
circle2.onclick = handler;
