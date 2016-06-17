import React from 'react';
import ReactDOM from 'react-dom';
import './static/css/share.css';
const path = './static/js/';
import share from './static/images/index-bg.png';
import share1 from './static/images/arron1.png';
const bg = path + share;
const shareBg = path + share1;
import IScroll from 'iscroll';
import FButton from './static/components/f-button.jsx'
import {utilMethods,_$,$$} from './utilMethod.es6';


class App extends React.Component {
    constructor(args) {
        super(...args);
        this.touchEnd = this.touchEnd.bind(this);
        this.state = {
            fatherPhoto: '',
            myPhoto: '',
            content: ""
        }
    }

    touchEnd() {//发送给老爸
        this.refs['share'].classList.add('active');
        setTimeout(()=>{
            this.refs['share'].classList.remove('active');
        },5000)
    }

    render() {
        return (
            <div className="f-main-ui"
                 style={{background:'#63bf9b url('+bg+') no-repeat center bottom',backgroundSize:'cover'}}>
                <section className="f-main-content">
                    <img className="f-main-share-1" src="./static/images/share_1.png" alt=""/>
                    <div className="f-main-line"></div>
                    <div className="f-main-text">
                        <p className="f-main-text-content">
                            {this.state.content}
                        </p>
                    </div>
                    <div className="f-main-img-content">
                        <div className="f-main-img-items">
                            <div className="f-main-img-line"></div>
                            <div className="f-main-img-temp f-main-img">
                                <div className="f-main-img-item">
                                    <figcaption className="f-tape">
                                        <img src="static/images/tape.png" alt=""/>
                                    </figcaption>
                                    <div>
                                        <img className="f-img1" src={this.state.fatherPhoto} alt=""/>
                                    </div>
                                </div>
                                <div className="f-btn-line"></div>
                            </div>

                            <div className="f-main-img-temp f-main-img1">
                                <div className="f-main-img-item">
                                    <figcaption className="f-tape">
                                        <img src="static/images/tape.png" alt=""/>
                                    </figcaption>
                                    <div>
                                        {this.state.fatherPhoto &&
                                        <img className="f-img2" src={this.state.fatherPhoto} alt=""/>}
                                    </div>
                                </div>
                                <div className="f-main-img-item1">
                                    <figcaption className="f-tape">
                                        <img src="static/images/tape.png" alt=""/>
                                    </figcaption>
                                    <div>
                                        {this.state.myPhoto &&
                                        <img className="f-img2" src={this.state.myPhoto} alt=""/>}
                                    </div>
                                </div>
                                <div className="f-btn-line" style={{marginTop:".5rem"}}></div>
                            </div>

                            <div className="f-main-img-temp f-main-img2">
                                <div className="f-main-img-item">
                                    <figcaption className="f-tape">
                                        <img src="static/images/tape.png" alt=""/>
                                    </figcaption>
                                    <div>
                                        {this.state.fatherPhoto &&
                                        <img className="f-img3" src={this.state.fatherPhoto} alt=""/>}
                                    </div>
                                </div>
                                <div className="f-main-img-item1">
                                    <figcaption className="f-tape">
                                        <img src="static/images/tape.png" alt=""/>
                                    </figcaption>
                                    <div>
                                        {this.state.myPhoto &&
                                        <img className="f-img3" src={this.state.myPhoto} alt=""/> }
                                    </div>
                                </div>
                                <div className="f-btn-line" style={{marginTop:".5rem"}}></div>
                            </div>

                        </div>
                        <div className="f-btn" ref="btn" >
                                <FButton theme={{color1:'rgb(119, 196, 211)',color2:' rgb(47, 135, 100)'}} content="分享出去" upload='send' sendFn={this.touchEnd}></FButton>
                        </div>
                        <div className="f-btn-line" style={{height:'1rem'}}></div>
                        <div className="f-main-logo" ref="logo">
                            <img src="./static/images/logo.png" alt=""/>
                        </div>
                        <div className="f-btn" >
                            <FButton  content="我也做一个" upload='send' sendFn={()=>{window.location.href='./index.html'}}></FButton>
                        </div>
                        <div className="f-btn-line" style={{height:'1rem'}}></div>
                    </div>

                </section>
                <div className="f-main-share" ref="share"
                     style={{background:'url('+shareBg+') no-repeat center top',backgroundSize:'cover'}}>
                </div>
            </div>
        )
    }

    componentDidMount() {


        const imgArr = [bg, shareBg];
        var json = (utilMethods.getQueryString("json"));

        if (json) {
            json = JSON.parse(json);
            let fatherPhoto, myPhoto;
            fatherPhoto = json.fatherPhoto;
            myPhoto = json.myPhoto;

            this.setState({
                fatherPhoto: fatherPhoto,
                myPhoto: myPhoto,
                content: unescape(json.content.replace(/\\u/g,'%u'))
            });
            if (fatherPhoto && myPhoto) {
                imgArr.push(fatherPhoto, myPhoto);
                let num = Math.ceil(utilMethods.r(0, 2));
                if (num === 1) {
                    document.querySelector(".f-main-img1").style.display = "block";
                }
                else if (num == 2) {
                    document.querySelector(".f-main-img2").style.display = "block";
                }
                this.refs['logo'].classList.add('has-img1');
            }
            else if (fatherPhoto) {
                imgArr.push(fatherPhoto);
                document.querySelector(".f-main-img").style.display = "block";
                this.refs['logo'].classList.add('has-img');
            }
            else {

                this.refs['btn'].classList.add('no-img');
            }
        }
        utilMethods.loading(imgArr, null, ()=> {
            loaded();
            setTimeout(function () {
                new IScroll(".f-main-ui");
            }, 100);
        });
    }
}

ReactDOM.render(<App></App>, document.getElementById('f-main'));


