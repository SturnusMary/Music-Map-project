import PropTypes from 'prop-types';
import React from 'react';

export class Item extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            level: this.props.level,
        }
    }
    
    render() {
        const className = 'item level' + this.props.level;

        return(
            <div id={this.props.id} className={this.props.level == 0 ? `${className} example` :className}>
                {this.props.element}
            </div>
        )
    }
}

Item.propType = {
    element: PropTypes.array,
    id:  PropTypes.number,
    level: PropTypes.string,
}