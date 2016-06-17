import React from 'react';
import './scss/f-index-page.css';
import index from '../images/index-bg.png';
const path = './static/js/';
const indexBg = path + index;
import h from '../images/heart.png';
const heart = path + h;

import c from '../images/camera.png';
const camera = path + c;

import n from '../images/necktie.png';
const necktie = path + n;

import ff from '../images/f-father.png';
const ffather = path + ff;

import l from '../images/love.png';
const love = path + l;

import l0 from '../images/logo.png';
const logo = l0;

import ft from '../images/f-father-text.png';
const ftext = path + ft;

import info from '../images/info.png';

import TWEEN from '../js/Tween';
import requestAnimationFrame from '../js/requestAnimationFrame';
import {utilMethods,_$,$$} from '../../utilMethod.es6';

let imgArr =[indexBg,heart,camera,necktie,ffather,love,logo,ftext];

utilMethods.loading(imgArr,null,()=>{
    loaded();
});


export default class FIndexPage extends React.Component {
    constructor(args) {
        super(...args);
    }

    render() {
        function l() {
            console.log(arguments);
        }

        window.log = l;
        let style = {
            background: '#5fbd98 url(' + indexBg + ') no-repeat center bottom'
        }
        return (
            <div ref="index-page" className="f-index-page-C" style={style}>
                <div className="f-heart" ref="heart">
                    <img src={heart} alt=""/>
                </div>
                <div className="f-camera" ref="camera">
                    <img src={camera} alt=""/>
                </div>
                <div className="f-necktie" ref="necktie">
                    <img src={necktie} alt=""/>
                </div>
                <div className="f-father-text" ref="father-text">
                    <img src={ftext} alt=""/>
                </div>
                <div className="f-father" ref="father">
                    <img src={ffather} alt=""/>
                </div>
                <div className="f-love" ref="love">
                    <img src={love} alt=""/>
                </div>
                <div className="f-logo" ref="logo">
                    <img src={logo} alt=""/>
                </div>
                <div className="f-info">
                    <img src={info} alt=""/>
                </div>
            </div>
        )
    }

    componentDidMount() {



        let
            s = this,
            heart = s.refs['heart'],
            camera = s.refs['camera'],
            necktie = s.refs['necktie'],
            fatherText = s.refs['father-text'],
            father = s.refs['father'],
            love = s.refs['love'],
            logo = s.refs['logo'];

        var isStarting = true;

        function animate(time) {
            isStarting && requestAnimationFrame(animate);
            TWEEN.update(time);
        }
        animate();


        heart.scale = {scale: 0};
        necktie.X = {x: -100, opacity: 0};
        camera.scale = {scale: 0};
        fatherText.scale = {scale: 0};
        father.X = {x: 300};
        love.X = {opacity: 0};
        logo.X = {opacity: 0};

        if (!heart.timer) {
            heart.timer = new TWEEN.Tween(heart.scale).to({scale: 1.4}, 2000)
                .delay(1400)
                .easing(TWEEN.Easing.Elastic.InOut)
                .onUpdate(()=> {
                    s.setTransform(heart, 'scale(' + heart.scale.scale + ')');
                })
                .onComplete(function () {
                    s.setTransform(heart, 'scale(1.4)');
                    //isStarting =false;
                });

            necktie.timer = new TWEEN.Tween(necktie.X).to({x: 0, opacity: 1}, 2000)
                .delay(100)
                .easing(TWEEN.Easing.Elastic.InOut)
                .onUpdate(()=> {
                    s.setTransform(necktie, 'translate3d(' + necktie.X.x + 'px,0,0)');
                    necktie.style.opacity = necktie.X.opacity;
                })
                .onComplete(()=> {
                    s.setTransform(necktie, 'translate3d(0,0,0)');
                    necktie.style.opacity = 1;
                });

            camera.timer = new TWEEN.Tween(camera.scale).to({scale: 1}, 1000)

                .easing(TWEEN.Easing.Elastic.InOut)
                .onUpdate(()=> {
                    s.setTransform(camera, 'scale(' + camera.scale.scale + ')');
                })
                .onComplete(function () {
                    s.setTransform(camera, 'scale(1)');
                    //isStarting =false;
                });

            fatherText.timer = new TWEEN.Tween(fatherText.scale).to({scale: 1}, 2000)
                .easing(TWEEN.Easing.Elastic.InOut)
                .onUpdate(()=> {
                    s.setTransform(fatherText, 'scale(' + fatherText.scale.scale + ')');
                })
                .onComplete(function () {
                    s.setTransform(fatherText, 'scale(1)');
                    //isStarting =false;
                });

            father.timer = new TWEEN.Tween(father.X).to({x: 0}, 2000)
                .easing(TWEEN.Easing.Elastic.InOut)
                .onUpdate(()=> {
                    s.setTransform(father, 'translate3d(' + father.X.x + 'px,0,0)');
                })
                .onComplete(()=> {
                    s.setTransform(father, 'translate3d(0,0,0)');
                });


            love.timer = new TWEEN.Tween(love.X).to({opacity: 1}, 3000)
                .easing(TWEEN.Easing.Elastic.Out)
                .onUpdate(()=> {
                    love.style.opacity = love.X.opacity;
                })
                .onComplete(()=> {
                    love.style.opacity = 1;
                });

            logo.timer = new TWEEN.Tween(logo.X).to({opacity: 1}, 3000)
                .easing(TWEEN.Easing.Elastic.InOut)
                .onUpdate(()=> {
                    logo.style.opacity = logo.X.opacity;
                })
                .onComplete(()=> {
                    logo.style.opacity = 1;
                    isStarting =false;
                });


            heart.timer.chain(necktie.timer, camera.timer);
            camera.timer.chain(fatherText.timer,love.timer);
            fatherText.timer.chain(father.timer,logo.timer);

            heart.timer.start();
        }


        $(this.refs['index-page']).swipe('up',(e,_this)=>{
            isStarting =false;
            _this.classList.add('hidden');
            setTimeout(()=>{
                window.defaultTouched =true;

               $(_this).remove();
            },1000);
        });



    }

    setTransform(obj, value) {
        obj.style.transform = value;
        obj.style.WebkitTransform = value;
    }
}

