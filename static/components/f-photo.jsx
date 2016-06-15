
import React from 'react';
import './scss/f-photo.css';
import PubSub from '../js/pubsub';

import photobg from '../images/photobg.png';
import tape from '../images/tape.png';


export default class FPhoto extends React.Component{
    constructor(args){
        super(...args);
        this.state = {
            fatherPhoto:'./static/images/1.png',
            myPhoto:''
        };

    }

    changeFatherPhoto(fatherPhoto){
        this.setState({
            fatherPhoto:fatherPhoto
        });
    }

    componentDidMount(){

        PubSub.subscribe('changeFatherPhoto',(b,a)=>{
            this.changeFatherPhoto(a);
        });
    }

    render(){

        let style={
            background:'url('+photobg+') repeat center center'
        };
        return(
            <figure className="f-photo-C" style={style}>
                <img src={this.state.fatherPhoto} alt=""/>
                <figcaption className="f-tape">
                    <img src={tape} alt=""/>
                </figcaption>
                <figcaption className="f-tape"></figcaption>
            </figure>
        )
    }
};