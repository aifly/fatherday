
import React from 'react';
import './scss/f-button.css';
import PubSub from '../js/pubsub';


import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export default class FButton extends React.Component{
    constructor(args){
        super(...args);
        this.touchStart=this.touchStart.bind(this);
        this.touchEnd=this.touchEnd.bind(this);
        this.uploadImage=this.uploadImage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.state = {
            btn1ClassList:"f-button1",
            fatherPhoto:''
        };

    }

    uploadImage(){
       this.refs['f-file'].click();
    }

    touchStart(e){

        this.refs['btn1'].classList.add('active');

    }
    touchEnd(e){
        this.refs['btn1'].classList.remove('active');
    }

    render(){

        let btn1Style =  {
            backgroundColor:this.props.theme.color1
        },
            btn2Style={
                backgroundColor:this.props.theme.color2
            }
        return (
            <div className="f-button-group" onTouchEnd={this.touchEnd}>
                <div ref="btn1" style={btn1Style} className='f-button1' onTouchTap={this.uploadImage} onTouchStart={this.touchStart} >{this.props.content}</div>
                <div className="f-button2" style={btn2Style}>{this.props.content}</div>
                <input type="file" ref="f-file" style={{opacity:0}} onChange={this.onChange}/>
            </div>
        )
    }
    onChange() {
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

                if (data.getret === 0) {
                    let url='http://webapi.zmiti.com/' + data.geturl[0];
                    console.log(url);
                    PubSub.publish("changeFatherPhoto",url);
                   
                }

            },
            error(msg){

            }
        });

    }
}

FButton.defaultProps = {
    content:"秀秀老爸的照片",
    theme:{
        color1:'#f2921f',
        color2:'#2f8764'
    },
    baseUrl: "http://webapi.zmiti.com/v1/upload/pub_upload_file/"
};

