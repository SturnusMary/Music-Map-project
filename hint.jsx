import React from 'react'; 
import PropTypes from 'prop-types';

export class Hint1 extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            haveHint: false,
        }
        this.hendlerDelateSecond = this.hendlerDelateSecond.bind(this);
        this.hendlerDelate = this.hendlerDelate.bind(this);
    }
    hendlerDelate(){
        hint1.remove();
            this.setState({
                haveHint: true,
            })
        // localStorage.setItem('hint', true)
    }
    hendlerDelateSecond(){
        hint2.remove();
        this.setState({
            haveHint: 'true',
        })
    }
    hendlerDelateThird(){
        hint3.remove();
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
                    >Select the decade</Hint>
                <Hint 
                    id = 'hint2'
                    className = 'hint2-content'
                    onClick={this.hendlerDelateSecond}
                    innerStyle = {{display: !this.state.haveHint ? 'none' : 'flex'}}
                    >Then click on one <br/> of the countries</Hint>
                <Hint 
                    id = 'hint3'
                    className = 'hint3-content'
                    onClick={this.hendlerDelateThird}
                    innerStyle = {{display: this.state.haveHint != 'true' ? 'none' : 'flex'}} 
                    >There's a music player,<br /> you can listen a piece of music <br />  that is suitable <br />  for the selected criteria </Hint>
            </React.Fragment>
        )
    }
    
}

function Hint(props){
    return(
         <div  id={props.id} style={props.style}>
            <div className={props.className} style={props.innerStyle}>
                <div className="text-hint">{props.children}</div>
                <div className="arrow-hint"></div>
                <button onClick={props.onClick}>Skip</button>
            </div> 
        </div>
    )
}


Hint1.propType = {
    isLoading: PropTypes.bool,
}

Hint.propType = {
    style: PropTypes.string,
    className: PropTypes.string,
    children: PropTypes.string,
    onClick: PropTypes.string,
}