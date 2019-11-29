import React from 'react'; 
import PropTypes from 'prop-types';

let hintState;
export class Hint1 extends React.Component {
    constructor(props){
        super(props)
    
        this.hendlerDelateSecond = this.hendlerDelateSecond.bind(this);
        this.hendlerDelate = this.hendlerDelate.bind(this);
    }

    hendlerDelate(){
        hint1.remove();
        hintState = true
        this.props.onHintChange(hintState);
        localStorage.setItem('hint', true);
    }
    
    hendlerDelateSecond(){
        hint2.remove();
        hintState = 'true'
        this.props.onHintChange(hintState);
    }

    render(){
        // localStorage.clear()
        return (
            <React.Fragment>
                <Hint 
                    style = {{display: localStorage.getItem('hint') ? 'none' : 'flex'}}
                    innerStyle = {{display: this.props.isLoading ? 'none' : 'flex'}}
                    className = 'hint1-content'
                    onClick={this.hendlerDelate}
                    id = 'hint1'
                    textBtn='Next'
                    >Select the decade</Hint>
                <Hint 
                    id = 'hint2'
                    className = 'hint2-content'
                    onClick={this.hendlerDelateSecond}
                    innerStyle = {{display: !hintState ? 'none' : 'flex'}}
                    textBtn='Next'
                    >Then click on one <br/> of the countries</Hint>
            </React.Fragment>
        )
    }
    
}

export function Hint(props){
    return(
         <div  id={props.id} style={props.style}>
            <div className={props.className} style={props.innerStyle}>
                <div className="text-hint">{props.children}</div>
                <div className="arrow-hint"></div>
                <button onClick={props.onClick}>{props.textBtn}</button>
            </div> 
        </div>
    )
}


Hint1.propType = {
    isLoading: PropTypes.bool,
    onHintChange: PropTypes.func,
}

Hint.propType = {
    style: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.string,
    onClick: PropTypes.string,
}