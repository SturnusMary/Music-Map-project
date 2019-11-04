import React from 'react';
import s from './stylesheet.scss';
import PropTypes from 'prop-types';
import db from '../db.json';
// import ReactCSSTransitionGroup from  'react-addons-css-transition-group';

export class SelectWrapper extends React.Component {
    constructor(props){
        super(props);
        
        this.state = {
            targetTime: '',
        }
        this.handleClickSelect = this.handleClickSelect.bind(this);
    }
    handleClickSelect(){
        const target = event.target.closest('li');
        
        if (!target) return;
        if(!timeSelect.contains(target)) return;
        const targetTime = event.target.id;
        if(targetTime !== this.state.targetTime) {
            this.setState({
                targetTime: `${targetTime}`,
            })
            this.props.onTimeChange(targetTime);
            // console.log(targetTime)
        }
       
        // console.log(this.state.targetTime, db);
        // return this.targetTime;
    }



    render(){
        return(
            <div className="select-wrapper">
               <ul onClick={this.handleClickSelect} id="timeSelect" className="select-middle-wrapper">
                  <li id="2010">Now</li>
                  <li id="2000">2000</li>
                  <li id="1990">1990</li>
                  <li id="1980">1980</li>
                  <li id="1970">1970</li>
                  <li id="1960">1960</li>
                  <li id="1950">1950</li>
                  <li id="1940">1940</li>
                  <li id="1930">1930</li>
                  <li id="1920">1920</li>
                  <li id="1910">1910</li>
                  <li id="1900">1900</li>
               </ul>
            </div>
        )
    }
}
