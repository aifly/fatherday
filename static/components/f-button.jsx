import React from 'react';
import './scss/f-button.css';
import PubSub from '../js/pubsub';
import IScroll from 'iscroll';
import injectTapEventPlugin from 'react-tap-event-plugin';

import message from 'antd/lib/message';
import 'antd/lib/message/style/css';
injectTapEventPlugin();


export default class FButton extends React.Component {
    constructor(args) {
        super(...args);
        this.touchStart = this.touchStart.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
        this.uploadImage = this.uploadImage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            btn1ClassList: "f-button1",
            fatherPhoto: '',
            myPhoto: '',
            display: 'block',
            content: ''
        };
        this.data = {
            fatherPhoto: '',
            myPhoto: ''
        }


    }

    uploadImage() {

        if (this.props.upload === 'send') {
            this.props.sendFn();
        }
        else if(this.props.upload){
            this.refs['f-file'].click();
        }
        else {

            let json = encodeURI(JSON.stringify(FButton.data));

            window.location.href = './share.html?json=' + json;

        }

    }

    touchStart(e) {

        this.refs['btn1'].classList.add('active');

    }

    touchEnd(e) {
        this.refs['btn1'].classList.remove('active');
    }

    render() {

        let btn1Style = {
                backgroundColor: this.props.theme.color1
            },
            btn2Style = {
                backgroundColor: this.props.theme.color2
            }

        return (
            <div ref={this.props.r} className="f-button-group" style={{display:this.state.display}}>
                <div ref="btn1" style={btn1Style} onTouchEnd={this.touchEnd} className='f-button1'
                     onTouchTap={this.uploadImage} onTouchStart={this.touchStart}>{this.state.content}</div>
                <div className="f-button2" style={btn2Style}>{this.state.content}</div>
                <input type="file" ref="f-file" style={{opacity:0,position:'fixed',zIndex:-1}}
                       onChange={this.onChange}/>
            </div>
        )
    }

    componentDidMount() {
        this.setState({
            display: this.props.display,
            content: this.props.content
        });
    }

    onChange() {

        PubSub.publish('start')
        let formData = new FormData();
        if (this.refs['f-file'].files.length <= 0) {
            return;
        }

        let file = this.refs['f-file'].files[0];
        formData.append("path", file);
        formData.append('filename', 'fatherday');
        let s = this;


        $.ajax({
            url: s.props.baseUrl,
            type: "POST",
            data: formData,
            contentType: false,
            processData: false,
            success(data){

                if(data.getisImg){

                    message.error('请上传图片',2);
                    PubSub.publish('stop');
                    return;
                }

                if (data.getret === 0 ) {

                    let url = 'http://webapi.zmiti.com/' + data.geturl[0];
                    PubSub.publish("changeFatherPhoto", {url, type: s.props.type});
                    if (s.props.type === 'father') {
                        $('.f-button-group').show();

                        s.setState({
                            content: "重新上传"
                        });
                        FButton.data.fatherPhoto = url;
                    }
                    else if (s.props.type === "me") {
                        s.setState({
                            content: "重新上传"
                        });
                        FButton.data.myPhoto = url;
                    }
                    let img = new Image();
                    img.onload = ()=> {

                        setTimeout(()=> {
                            window.iscroll.refresh();
                            PubSub.publish('stop');
                        }, 1)

                    }
                    img.src = url;
                }



            },
            error(msg){

            }
        });

    }
}

FButton.data = {};
window.s = FButton;

FButton.defaultProps = {
    content: "秀秀老爸的照片",
    theme: {
        color1: '#f2921f',
        color2: '#116b55'
    },
    display: 'block',
    upload: true,
    baseUrl: "http://webapi.zmiti.com/v1/upload/pub_upload_file/"
};

