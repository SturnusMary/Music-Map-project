import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import s from './stylesheet.scss';
import {MapElement} from './MapElement/index';
import {SidebarWrapper} from './SidebarWrapper/index';
import {SelectWrapper} from './SelectWrapper/index';

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            time: '',
            place: '',
        }
        this.onTimeChange = this.onTimeChange.bind(this);
        this.onPlaceChange = this.onPlaceChange.bind(this);
        this.items = [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010];
    }
    onTimeChange(time){
        this.setState({
            time,
        })
        console.log(this.state.time);
    }
    onPlaceChange(place){
        this.setState({
            place,
        })
        console.log(this.state.place);
    }
    render() {
        const { time, place } = this.state;
        return(
            <React.Fragment>

                <main>
                <aside>
                <SidebarWrapper time={time} place={place}></SidebarWrapper>
                </aside>
                <SelectWrapper 
                    items={this.items}
                    active={0}
                    decade={0}
                    onTimeChange={this.onTimeChange} />
                    <MapElement onPlaceChange={this.onPlaceChange} />
                </main>

            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <div className="container">

        <App />
    </div>,
   document.getElementById('root')
);
