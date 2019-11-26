import React from 'react';
import PropTypes from 'prop-types';

export class Conclusion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            targetClick: false,
        }
        this.handlerClick = this.handlerClick.bind(this);
    }
    async handlerClick(){
        await this.setState ({
            targetClick: true,
        })
        this.props.getStatePage(this.state.targetClick);
    }
    render(){
        return (
            <div className="conclusions">
                <div style={{display: this.props.finalSong ? 'block': 'none'}}>
                    
                <div className='container'>
                    <span className='pulse-button' onClick={this.handlerClick}>Go to Player</span>
                </div>
                  </div>
                <div style={{display: this.props.getCountry &&  this.props.getDecade && !this.props.finalSong ? 'block': 'none'}}><p>This Area / Decade is Empty at this time!</p></div>
            </div>
        )
    }
}

Conclusion.propType = {
    finalSong: PropTypes.object,
    getCountry: PropTypes.string,
    getDecade: PropTypes.string,
}