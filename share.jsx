import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/share.css';
const path = './static/js/';
import share from './static/images/index-bg.png';
const bg = path + share;
import IScroll from 'iscroll';
class App extends React.Component{
    constructor(args){
        super(...args)
    }
    render(){
        return (
            <div className="f-main-ui" style={{background:'#63bf9b url('+bg+') no-repeat center bottom',backgroundSize:'cover'}}>
                <section className="f-main-content">
                    <img className="f-main-share-1" src="./static/images/share_1.png" alt=""/>
                    <div className="f-main-line"></div>
                    <div className="f-main-text">
                        <p className="f-main-text-content">父爱，伟岸如青山，圣洁如冰雪，温暖如骄阳，宽广如江海。我在父亲的爱中成长，如今我长大了，我在父亲的爱中成长，如今我长大了，我要用更多的爱来回报你，我最亲爱的老爸</p>
                    </div>
                    <div className="f-main-img-content">
                        <div className="f-main-img-items">
                            <div className="f-main-img-line"></div>
                            <div className="f-main-img">
                                <div className="f-main-img-item">
                                    <figcaption className="f-tape">
                                        <img src="static/images/tape.png" alt=""/>
                                    </figcaption>
                                    <div>
                                        <img src="./static/images/1.png" alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="f-btn-line"></div>
                        <div className="f-btn">
                            <div className="f-button-group">
                                <div ref="btn1" className='f-button1'>发送给老爸!</div>
                                <div className="f-button2">发送给老爸!</div>
                            </div>
                        </div>
                        <div className="f-btn-line" style={{height:'1rem'}}></div>
                        <div className="f-main-logo">
                            <img src="./static/images/logo.png" alt=""/>
                        </div>
                        <div className="f-btn-line" style={{height:'3rem'}}></div>
                    </div>
                </section>
            </div>
        )
    }
    componentDidMount() {
       setTimeout(function(){
           new IScroll(".f-main-ui");
       },100);
    }
}


ReactDOM.render(<App></App>,document.getElementById('f-main'));


