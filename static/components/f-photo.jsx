import React from 'react';
import './scss/f-photo.css';
import PubSub from '../js/pubsub';

import photobg from '../images/photobg.png';
import tape from '../images/tape.png';


export default class FPhoto extends React.Component {
    constructor(args) {
        super(...args);
        this.state = {
            fatherPhoto: './static/images/1.png',
            myPhoto: '',
            display:'block'
        };

    }

    changeFatherPhoto(fatherPhoto) {
        this.setState({
            fatherPhoto: fatherPhoto,
            display:'block'
        });
    }

    componentDidMount() {

        this.setState({
            display: this.props.display
        });

        PubSub.subscribe('changeFatherPhoto', (b, a)=> {
            if (a.type === this.props.type) {
                this.changeFatherPhoto(a.url);
            }
        });
    }

    render() {

        let style = {
            background: 'url(' + photobg + ') repeat center center',
            display: this.state.display
        };
        return (
            <figure className="f-photo-C" style={style}>
                <img src={this.state.fatherPhoto} alt=""/>
                <figcaption className="f-tape">
                    <img src={tape} alt="" draggable="false"/>
                </figcaption>
                <figcaption className="f-tape">
                    <img src={tape} alt="" draggable="false"/>
                </figcaption>
            </figure>
        )
    }
};

FPhoto.defaultProps = {
    display: 'block'
}