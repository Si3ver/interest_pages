function clear(){
    clearInterval(timer);
    clearInterval(timer1);
    clearInterval(timer2);
}
function pos(){
    ball.style.left=posX+'px';
    ball.style.left=posY+'px';
}
var z,y,score=0;
var posX=150;
var posY=0;
var moveX=true;
var moveY=true;
var timer=null;
var timer1,timer2;
window.onload=pos;
start.onclick=function(){
    clear();
    score = 0;
    ball.style.display="block";
    df.style.display="none";
    timer=setInterval(move,5);
    timer2=setInterval(function(){
        fs.innerHTML = score;
    },100);
    key();
    x=Math.round(Math.random()*300);//从第二次开始小球的位置随机开始
    posX=x;
    posY=0;
}
function move(){//小球的移动
    if(moveX){
        if(posX>0){
            posX--;
            ball.style.left=posX+'px';
        }else{
            moveX=false;
        }
    }else{
        if(posX<outer.clientWidth-ball.offsetWidth){
            posX++;
            ball.style.left=posX+'px';
        }else{
            moveX=true;
        }
    }
    if(moveY){
        if(posY>0){
            posY--;
            ball.style.top=posY+'px';
        }else{
            moveY=false;
        }
    }else{
        if(posY<outer.clientHeight-ball.offsetHeight-15){
            posY++;
            ball.style.top=posY+'px';
        }else{
            if(box.offsetLeft > ball.offsetLeft || (box.offsetLeft + box.offsetWidth) < ball.offsetLeft){
                clear();
                df.style.display="block";
                ff.innerHTML="得分: "+score;
                score=0; //判断小条是否接到小球，否，游戏结束
            }
            score++;
            moveY=true;
        }
    }
}

function key(){
    document.onkeydown=function(ev) {
        var ev=ev||window;
        switch(ev.keyCode){
            case 37:
                    z=true;
                    break;
            case 39:
                    y=true;
                    break;
        }
    }
    document.onkeyup=function(ev) {
        var ev=ev||window;
        switch(ev.keyCode){
            case 37:
                    z=false;
                    break;
            case 39:
                    y=false;
                    break;
        }
    }
    timer1=setInterval(function() {
        if(z){
            if(box.offsetLeft > 0){
                box.style.left = (box.offsetLeft-2 < 0? 0 : box.offsetLeft-2)+"px";
            }
        }
        if(y){
            if(box.offsetLeft < 230){
                box.style.left = (box.offsetLeft+2 > 400? 400 : box.offsetLeft+2)+"px";
                }
        }
    },10);      //左右移动的小条
}
