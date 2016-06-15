
import React from 'react';
import './scss/f-stripe.css';

export default class FStripe extends React.Component{
    constructor(args){
        super(...args)
    }
    render(){
        return(
            <div className={'f-stripe '+ this.props.des}>

            </div>
        )
    }
}
