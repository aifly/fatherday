import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/index.css';
import {utilMethods,_$,$$} from './utilMethod.es6';
import './static/js/zepto-touch.min';
const path = './static/js/';


import t from './static/images/text.png';
const text =path+t;

import i from './static/images/input-bg.png';
const inputBg = path + i;

import line from './static/images/line.png';


import g from './static/images/ganen.png';
const ganen = path + g;
import f from './static/images/father.png';
const father = path + f;

import FButton from './static/components/f-button.jsx';
import FPhoto from './static/components/f-photo.jsx';
import FStripe from './static/components/f-stripe.jsx';
import FLoading from './static/components/f-loading.jsx';
import PubSub from './static/js/pubsub';
import FIndexPage from './static/components/f-index-page.jsx';

import IScroll from 'iscroll';

class App extends React.Component {
    constructor(args) {
        super(...args);
        this.defaultTap=this.defaultTap.bind(this);
        this.onBlur=this.onBlur.bind(this);
        this.state = {
            fatherPhoto: '',
            myPhoto: ''
        };

    }
    onBlur(){

    }
    defaultTap(e){

        if(e.target.nodeName === "TEXTAREA"){
            return;
        }

        e.preventDefault();

        $(e.target).trigger('blur');

        return false;
    }
    render() {
        /*
         <input ref="file" type="file" onChange={this.onChange}/>
         {this.state.fatherPhoto &&<img src={this.state.fatherPhoto} alt=""/>}
         * */
        return (
            <div onTouchEnd={this.defaultTap}>
                <FLoading loadingText="正在上传..."></FLoading>
                <div className="f-main-ui">
                    <div className="f-main-all">
                        <FIndexPage></FIndexPage>
                        <section className="f-main-content" style={{backgroundColor:'#46a17d'}}>
                            <div className="f-father">
                                <img src={father} alt=""/>
                                <canvas ref="canvas" className="f-ganen opacity0"></canvas>
                                <canvas ref="canvas1" className="f-ganen1"></canvas>
                            </div>
                            <FStripe des="right"></FStripe>
                            <div className="f-text">
                                <img src={text} alt=""/>
                            </div>
                            <section className="f-input-C">
                                <img src={inputBg} alt=""/>
                                <textarea name="" onBlur={this.onBlur} id="" ref="input" className="f-input" placeholder="献上你的祝福吧!"></textarea>
                            </section>
                            <div className="f-btn">
                                <FButton type="father" r="me"></FButton>
                            </div>
                            <FPhoto display="none" type="father"></FPhoto>
                            <FStripe des="left"></FStripe>
                            <div className="f-btn">
                                <FButton type="me" display="none" r="father1"  content="不来张自己的么"></FButton>
                            </div>
                            <FPhoto display="none" type="me"></FPhoto>
                            <FStripe des="right"></FStripe>
                            <img src={line} alt=""/>
                            <div className="f-btn">
                                <FButton content="确定" r="upload" upload={false} theme={{color1:'#77c4d3',color2:'#116b55'}}></FButton>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

        )
    }

    refresh(){


    }
    componentDidMount() {


        window.iscroll = new IScroll('.f-main-ui');

        let canvas = this.refs.canvas;
        let canvas1 = this.refs.canvas1;
        canvas1.width = 120;
        canvas1.height = 60;

        canvas.width = 120;
        canvas.height = 60;
        let context = canvas.getContext('2d');
        let context1 = canvas1.getContext('2d');

        let img = new Image();
        img.onload = ()=> {
            let dots = this.imgOnload(img, context);
            class FCircle {
                constructor(opts) {

                    this.x = opts.x;
                    this.y = opts.y;
                    this.R = 1.2;
                    this.r = opts.r;
                    this.g = opts.g;
                    this.b = opts.b;
                    this.a = opts.a;
                    this.render();
                }

                render() {
                    context1.fillStyle = 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
                    //context1.fillStyle='red';
                    context1.beginPath();
                    context1.arc(this.x, this.y, this.R, 0, Math.PI * 2, false);
                    context1.closePath();
                    context1.fill();
                }

            }
            dots.forEach(d=> {
                new FCircle({
                    x: d.x,
                    y: d.y,
                    r: d.r,
                    g: d.g,
                    b: d.b,
                    a: d.a
                });
            });


            canvas.classList.remove('opacity0');
            canvas1.classList.add('opacity0');


        };

        img.src = ganen;
    }

    imgOnload(img, context) {

        document.getElementsByTagName('html')[0].style.fontSize = ( document.documentElement.clientWidth / 10) + 'px';

        let [width,height ] =[context.canvas.width, context.canvas.height];
        context.drawImage(img, 0, 0, width, height);

        let imgData = context.getImageData(0, 0, width, height),
            gap = 4,
            dots = [];


        for (let i = 0, w = imgData.width; i < w; i += gap) {
            for (let j = 0, h = imgData.height; j < h; j += gap) {
                let a = (i + j * width) * 4;
                if (imgData.data[a + 3] > 0) {
                    dots.push({
                        x: i,
                        y: j,
                        r: imgData.data[a],
                        g: imgData.data[a + 1],
                        b: imgData.data[a + 2],
                        a: imgData.data[a + 3]
                    });
                }
            }
        }
        return dots;
    }


}



ReactDOM.render(<App></App>, document.getElementById('fly-main'));