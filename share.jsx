import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/share.css';
const path = './static/js/';
import share from './static/images/share.png';
const bg = path + share;
class App extends React.Component{
    constructor(args){
        super(...args)
    }
    render(){
        return (
            <div className="f-main-ui">
                <section className="f-main-content" style={{backgroundColor:'#46a17d',background:'url('+bg+') no-repeat',backgroundSize:'cover'}}>
                    <div className="f-main-text">
                        <p className="f-main-text-content">父爱，伟岸如青山，圣洁如冰雪，温暖如骄阳，宽广如江海。我在父亲的爱中成长，如今我长大了，我在父亲的爱中成长，如今我长大了，我要用更多的爱来回报你，我最亲爱的老爸</p>
                    </div>
                    <div>
                        <div className="f-main-img">
                            <figcaption className="f-tape">
                                <img src="static/images/tape.png" alt=""/>
                            </figcaption>
                            <div className="f-main-img-item">
                                <div>
                                    <img src="./static/images/1.png" alt="" />
                                </div>
                            </div>
                            <div className="f-main-img-item1">
                            </div>
                        </div>
                        <div className="f-btn">
                            <div className="f-button-group">
                                <div ref="btn1" className='f-button1'>发送给老爸!</div>
                                <div className="f-button2">发送给老爸!</div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
    componentDidMount() {
        document.getElementsByTagName('html')[0].style.fontSize = ( document.documentElement.clientWidth / 10) + 'px';
    }
}


ReactDOM.render(<App></App>,document.getElementById('f-main'));


