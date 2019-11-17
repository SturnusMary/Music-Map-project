import React from 'react';
import ReactDOM from 'react-dom';
import s from './stylesheet.scss';
import {MapElement} from './MapElement/index';
import {SidebarWrapper} from './SidebarWrapper/index';
import {SelectWrapper} from './SelectWrapper/index';
import {Loader} from './Loader/index';
import {titleAnimation} from './animationTitle';
import {PopUp} from './modal';
import db from './db.json';

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            time: '',
            place: false,
            isLoading: true,
        }
        this.onTimeChange = this.onTimeChange.bind(this);
        this.onPlaceChange = this.onPlaceChange.bind(this);
        this.onLoad =  this.onLoad.bind(this);
        this.items = [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010];
        this.dbOfSongs = db.songs;
    }
    componentDidMount() {
        // this.setState({
        //     place: 'true',
        // })
        setTimeout(this.onLoad, 4000);
        titleAnimation();
    }

    onLoad(){this.setState({isLoading: false})}
    onTimeChange(time){this.setState({time,})}
    onPlaceChange(place){this.setState({place,})}

    onClickButtonSideBarShow(){
        document.getElementById("sidebar-wrapper").classList.toggle('active')
    }

    filterByPlace(place){
        let arrayOfOneCountry =[];
        for(let i=0; i < this.dbOfSongs.length; i++) {
           for(let k in this.dbOfSongs[i]) {
                 if(place == this.dbOfSongs[i][k]) {
                    arrayOfOneCountry.push(this.dbOfSongs[i])
                 }
           }
        }
        return arrayOfOneCountry;
    }

    filterByTime(time, arr){
        let objOfOneSong;
        for(let i=0; i < arr.length; i++) {
           for(let k in arr[i]) {
              if(time == arr[i][k]) {
                 objOfOneSong = arr[i];
                 return objOfOneSong;
              }
           }
        }
    }

    render() {
     
        const songs = this.filterByPlace(this.state.place || null);
        let finalSong = this.filterByTime(this.state.time || 1900, songs);
      
        console.log(this.state.place)
        return(
            <React.Fragment>
                <Loader isLoading={this.state.isLoading} />
                <PopUp finalSong={finalSong} stateForPopUp={this.state.place}> </PopUp>
                <main>
                    <aside>
                        <SidebarWrapper 
                            finalSong={finalSong}>
                        </SidebarWrapper>
                    </aside>
                    <button id="showSideBar" onClick={this.onClickButtonSideBarShow} />
                    <SelectWrapper 
                        items={this.items}
                        active={0}
                        decade={0}
                        onTimeChange={this.onTimeChange} />
                        <MapElement finalSong={finalSong} onPlaceChange={this.onPlaceChange} stateForPopUp={this.state.place}/>
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


