class Slider{
    constructor(id, cycle = 3000){
        this.container = document.getElementById(id);
        this.items = this.container.querySelectorAll('.slider-list__item, .slider-list__item--selected');
        this.cycle = cycle;
    }
    registerPlugins(...plugins){
        plugins.forEach(plugin => plugin(this));
    }
    getSelectedItem(){
        const selected = this.container.querySelector('.slider-list__item--selected');
        return selected;
    }
    getSelectedItemIndex(){
        return Array.from(this.items).indexOf(this.getSelectedItem());
    }
    slideTo(idx){
        const selected = this.getSelectedItem();
        if(selected){
            selected.className = 'slider-list__item';
        }
        const item = this.items[idx];
        if(item){
            item.className = 'slider-list__item--selected';
        }
        // 自定义slide事件
        const detail = {index: idx};
        const event = new CustomEvent('slide', {bubbles: true, detail});
        this.container.dispatchEvent(event);
    }
    slideNext(){
        const currentIdx = this.getSelectedItemIndex();
        const nextIdx = (currentIdx+1) % this.items.length;
        this.slideTo(nextIdx);
    }
    slidePrevious(){
        const currentIdx = this.getSelectedItemIndex();
        const previousIdx = (currentIdx-1+this.items.length) % this.items.length;
        this.slideTo(previousIdx);
    }
    start(){
        this.stop();
        this._timer = setInterval(()=>this.slideNext(), this.cycle);
    }
    stop(){
        clearInterval(this._timer);
    }
}

function pluginController(slider){
    const controller = slider.container.querySelector('.slider-list__control');
    if(controller){
        const buttons = controller.querySelectorAll('.slider-list__control-buttons, .slider-list__control-buttons--selected');
        controller.addEventListener('mouseover', evt=>{
            const idx = Array.from(buttons).indexOf(evt.target);
            if(idx >= 0){
                slider.slideTo(idx);
                slider.stop();
            }
        });
        controller.addEventListener('mouseout', evt=>{
            slider.start();
        });
        slider.container.addEventListener('slide', evt=>{
            const idx = evt.detail.index;
            console.log(idx);
            const selected = controller.querySelector('.slider-list__control-buttons--selected');
            if(selected){
                selected.className = 'slider-list__control-buttons';
            }
            buttons[idx].className = 'slider-list__control-buttons--selected';
        });
    }
}

function pluginPrevious(slider){
    const previous = slider.container.querySelector('.slider-list__previous');
    if(previous){
        previous.addEventListener('click', evt=>{
            slider.stop();
            slider.slidePrevious();
            slider.start();
            evt.preventDefault();
        });
    }
}

function pluginNext(){
    const next = slider.container.querySelector('.slider-list__next');
    if(next){
        next.addEventListener('click', evt=>{
            slider.stop();
            slider.slideNext();
            slider.start();
            evt.preventDefault();
        });
    }
}

const slider = new Slider('my-slider');
slider.registerPlugins(pluginController, pluginPrevious, pluginNext);
slider.start();