import React from 'react';
const uuidv1 = require('uuid/v1');
import './AutoCompleteText.scss';
import PropTypes from 'prop-types';

export default class AutoCompleteText extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: ""
        };
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onKeyDown =  this.onKeyDown.bind(this);
    }

    async onChange(e){
        const { suggestions } = this.props;
        const userInput = e.currentTarget.value;
        const regex = new RegExp(`^${userInput}`, 'i');
        const filteredSuggestions = suggestions.sort().filter(
            v => regex.test(v)
        );

        if(!userInput) {
            this.props.getInformation(null)
        }

        await this.setState({
            activeSuggestion: 0,
            filteredSuggestions,
            showSuggestions: true,
            userInput: e.currentTarget.value
        });
  };

    async onClick (e){
        await this.setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: e.currentTarget.innerText
        });

        this.props.getInformation(this.state.userInput || null)
    };

    async onKeyDown (e){
        const { activeSuggestion, filteredSuggestions } = this.state;

        if (e.keyCode === 13) {
        await this.setState({
            activeSuggestion: 0,
            showSuggestions: false,
            userInput: filteredSuggestions[activeSuggestion]
        });
        
        this.props.getInformation(this.state.userInput || null);
        }

        else if (e.keyCode === 38) {
        if (activeSuggestion === 0) {
            return;
        }

        this.setState({ activeSuggestion: activeSuggestion - 1 });
        }
  
        else if (e.keyCode === 40) {
        if (activeSuggestion - 1 === filteredSuggestions.length) {
            return;
        }
        this.setState({ activeSuggestion: activeSuggestion + 1 });
        }
    };

  render() {
    const {
        onChange,
        onClick,
        onKeyDown,
        state: {
            activeSuggestion,
            filteredSuggestions,
            showSuggestions,
            userInput
        }
    } = this;

    let suggestionsListComponent;

    if (showSuggestions && userInput) {
        if (filteredSuggestions.length) {
            suggestionsListComponent = (
            <ul className="suggestions">
                {filteredSuggestions.map((suggestion, index) => {
                let className;

                if (index === activeSuggestion) {
                    className = "suggestion-active";
                }

                return (
                    <li className={className} key={uuidv1()} onClick={onClick} >
                    {suggestion}
                    </li>
                );
                })}
            </ul>
            );
        } else {
            suggestionsListComponent = (
            <div className="no-suggestions">
                <em>No suggestions, you're on your own!</em>
            </div>
            );
        }
    }
   
    return (
        <React.Fragment>
    
            <label htmlFor={this.props.htmlFor}>{this.props.children}</label>
            <div className="AutoCompleteText">
            <input
            autoComplete="off"
            id={this.props.id}
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            value={userInput}/>
            {suggestionsListComponent}
            </div>
        </React.Fragment>
    );
  }
}

AutoCompleteText.propType = {
    suggestions: PropTypes.array,
    getInformation: PropTypes.func,
    htmlFor: PropTypes.string,
    children: PropTypes.string,
    id: PropTypes.string,
}




class Typer extends React.Component {

    static defaultProps = {
      heading: '',
      dataText: []
    }
  
    constructor(props) {
      super(props);
  
      this.state = {
        text: '',
        isDeleting: false,
        loopNum: 0,
        typingSpeed: 150
      }
    }
  
    componentDidMount() {
      this.handleType();
    }
  
    handleType = () => {
      const { dataText } = this.props;
      const { isDeleting, loopNum, text, typingSpeed } = this.state;
      const i = loopNum % dataText.length;
      const fullText = dataText[i];
  
      this.setState({
        text: isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1),
        typingSpeed: isDeleting ? 30 : 150
      });
  
      if (!isDeleting && text === fullText) {
        
        setTimeout(() => this.setState({ isDeleting: true }), 500);
        
      } else if (isDeleting && text === '') {
        
        this.setState({
          isDeleting: false,
          loopNum: loopNum + 1
        });
        
      }
  
      setTimeout(this.handleType, typingSpeed);
    };
  
    render() {    
      return (
        <h1>{ this.props.heading }&nbsp;
          <span>{ this.state.text }</span>
          <span id="cursor"/>
        </h1>
      );
      
    }
  }
  
   