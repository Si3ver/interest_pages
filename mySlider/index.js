/* 组件模型 */
class Component {
    constructor(id, opts = {data:[]}){
        this.container = document.getElementById(id);
        this.options = opts;
        this.container.innerHTML = this.render(opts.data);
    }
    registerPlugins(...plugins){
        plugins.forEach(plugin => {
            const pluginContainer = document.createElement('div');
            pluginContainer.className = 'slider-list__plugin';
            pluginContainer.innerHTML = plugin.render(this.options.data);
      this.container.appendChild(pluginContainer);
            plugin.action(this);
        });
    }
    render(data) {
        return '';
    }
}

class Slider extends Component{
    constructor(id, opts = {data: [], cycle: 3000}){
        super(id, opts);
        this.items = this.container.querySelectorAll('.slider-list__item, .slider-list__item--selected');
        this.cycle = opts.cycle || 3000;
        this.slideTo(0);
    }
    render(data){
        const content = data.map(image=>`
            <li class="slider-list__item">
                <img src="${image}" />
            </li>
        `.trim());

        return `<ul>${content.join("")}</ul>`;
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
        // 自定义slide事件 es7
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

const pluginController = {
    render(images){
        return `
          <div class="slider-list__control">
            ${images.map((image, i) => `
                <span class="slider-list__control-buttons${i===0?'--selected':''}"></span>
             `).join('')}
          </div>    
        `.trim();
    },
    action(slider){
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
                const selected = controller.querySelector('.slider-list__control-buttons--selected');
                if(selected){
                    selected.className = 'slider-list__control-buttons';
                }
                buttons[idx].className = 'slider-list__control-buttons--selected';
            });
        }
    }
};

const pluginPrevious = {
    render(){
        return `<a class="slider-list__previous"></a>`;
    },
    action(slider){
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
}

const pluginNext = {
    render(){
        return `<a class="slider-list__next"></a>`;
    },
    action(slider){
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
}

const slider = new Slider('my-slider', {data:['img/img1.png','img/img2.jpg','img/img3.jpg','img/img4.jpg'], cycle:3000});

slider.registerPlugins(pluginController, pluginPrevious, pluginNext);
slider.start();
