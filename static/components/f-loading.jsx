import React from 'react';
import './scss/f-loading.css';
import PubSub from '../js/pubsub';

export default class FLoading extends React.Component{
    constructor(args){
        super(...args);
        this.state= {
            starting:false
        }
    }
    start(){
        this.setState({
            starting:true
        });
        this._loading();
       this.timer = setInterval(()=>{
           this._loading();
        },2100);
    }

    _loading(){
        var bar = new ProgressBar.Path('#heart-path1', {
            easing: 'easeInOut',
            duration: 1000
        });

        bar.set(0);
        bar.animate(1);  // Number from 0.0 to 1.0
    }
    stop(){
        this.setState({
            starting:false
        });
        this.timer && clearInterval(this.timer);
    }
    componentDidMount(){
        PubSub.subscribe("start",()=>{
           this.start();
        });

        PubSub.subscribe('stop',()=>{
            this.stop();
        })
    }
    render(){
        return(
            <div className="f-loading-C" style={{display:this.state.starting?'block':'none'}}>
                <div className="loading">
                    <span>{this.props.loadingText}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100">
                        <path fill-opacity="0" stroke-width="2" stroke="#bbb" d="M81.495,13.923c-11.368-5.261-26.234-0.311-31.489,11.032C44.74,13.612,29.879,8.657,18.511,13.923  C6.402,19.539,0.613,33.883,10.175,50.804c6.792,12.04,18.826,21.111,39.831,37.379c20.993-16.268,33.033-25.344,39.819-37.379  C99.387,33.883,93.598,19.539,81.495,13.923z"/>
                        <path id="heart-path1" fill-opacity="0" stroke-width="3" stroke="#ED6A5A" d="M81.495,13.923c-11.368-5.261-26.234-0.311-31.489,11.032C44.74,13.612,29.879,8.657,18.511,13.923  C6.402,19.539,0.613,33.883,10.175,50.804c6.792,12.04,18.826,21.111,39.831,37.379c20.993-16.268,33.033-25.344,39.819-37.379  C99.387,33.883,93.598,19.539,81.495,13.923z"/>
                    </svg>
                </div>
            </div>
        )
    }
}

FLoading.defaultProps={
    loadingText:''
}