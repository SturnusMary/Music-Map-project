import React from 'react';
import s from './stylesheet.scss';
import PropTypes from 'prop-types';
import {Item} from './item';
import ReactCSSTransitionGroup from  'react-addons-css-transition-group';

export class SelectWrapper extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            items: this.props.items,
            active: this.props.active,
            direction: '',
            decade: this.props.decade,
            targetTime: '',
        }
        this.bottomClick = this.moveBottom.bind(this);
        this.topClick = this.moveTop.bind(this);
    }
    
    generateItems() {
        let items = []
        let level;
        let year = 1890;
        for (let i = this.state.active - 2; i < this.state.active + 3; i++) {
            let index = i;
            year = year + 10;
            if (i < 0) { 
                index = this.state.items.length + i;
            } else if (i >= this.state.items.length) {
                index = i % this.state.items.length;
            }
            level = this.state.active - i;
            items.push(<Item key={index} id={this.state.items[index]} element={this.state.items[index]} level={level} />);
        }
        return items;
    }
    
     moveBottom() {
        let newActive = this.state.active
        newActive--
        this.setState({
            active: newActive < 0 ? this.state.items.length - 1 : newActive,
            direction: 'left'
        })
        let level0 = timeSelect.querySelector('.level1');
        let decade = level0.textContent;
        this.props.onTimeChange(decade);
    }
    
    moveTop() {
        let newActive = this.state.active
        this.setState({
            active: (newActive + 1) % this.state.items.length,
            direction: 'right'
        })
        let level0 = timeSelect.querySelector('.level-1');
        let decade = level0.textContent;
        this.props.onTimeChange(decade);
    }
    
    render() {
        return(
            <div id="carousel" className="noselect select-wrapper">
                <div className="inner-select-wrapper">
                    <svg
                        className="arrowMain arrow-top"
                        onClick={this.bottomClick}
                        width="18px"
                        height="17px"
                        viewBox="-1 0 18 17"
                        version="1.1">
                        <g>
                            <polygon
                                className="arrow"
                                points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
                            <polygon
                                className="arrow-fixed"
                                points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
                            <path
                                d="M-4.58892184e-16,0.56157424 L-4.58892184e-16,16.1929159 L9.708,8.33860465 L-1.64313008e-15,0.56157424 L-4.58892184e-16,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z"></path>
                        </g>
                    </svg>
                    <ReactCSSTransitionGroup 
                        id="timeSelect"
                        className="select-middle-wrapper"
                        transitionEnterTimeout={300}
                        transitionLeaveTimeout={300}
                        transitionName={this.state.direction}>   
                        {this.generateItems()}
                    </ReactCSSTransitionGroup>
                    <svg
                        className="arrowMain arrow-bottom"
                        onClick={this.topClick}
                        width="18px"
                        height="17px"
                        viewBox="0 0 18 17"
                        version="1.1">
                        <g
                            id="prev"
                            transform="translate(8.500000, 8.500000) scale(-1, 1) translate(-8.500000, -8.500000)">
                            <polygon
                                className="arrow"
                                points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
                            <polygon
                                className="arrow-fixed"
                                points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596"></polygon>
                            <path
                                d="M-1.48029737e-15,0.56157424 L-1.48029737e-15,16.1929159 L9.708,8.33860465 L-2.66453526e-15,0.56157424 L-1.48029737e-15,0.56157424 Z M1.33333333,3.30246869 L7.62533333,8.34246869 L1.33333333,13.4327013 L1.33333333,3.30246869 L1.33333333,3.30246869 Z"></path>
                        </g>
                    </svg>
                </div>
            </div>
        )
    }
}

SelectWrapper.propType = {
    items: PropTypes.array,
    active: PropTypes.number,
    decade: PropTypes.number,
    onTimeChange: PropTypes.func,
}



