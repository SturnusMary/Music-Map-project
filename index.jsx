import React from 'react';
import ReactDOM from 'react-dom';
import s from './stylesheet.scss';
import {MapElement} from './MapElement/index';
import {SidebarWrapper} from './SidebarWrapper/index';
import {SelectWrapper} from './SelectWrapper/index';
import {Loader} from './Loader/index';
import 'regenerator-runtime/runtime';
import {PopUp} from './modal';
import {Hint1} from './hint';
import {Mob} from './MobVersia/mob';
import db from './db.json';

class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            time: '',
            place: false,
            isLoading: true,
            hint: '',
            height: window.innerHeight, 
            width: window.innerWidth,
        }
        this.onTimeChange = this.onTimeChange.bind(this);
        this.onPlaceChange = this.onPlaceChange.bind(this);
        this.onHintChange =  this.onHintChange.bind(this);
        this.updateDimensions = this.updateDimensions.bind(this);

        this.onLoad =  this.onLoad.bind(this);
        this.items = [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010];
        this.dbOfSongs = db.songs;
    }
    componentDidMount() {
       this.timerID = setTimeout(this.onLoad, 4000);
       window.addEventListener("resize", this.updateDimensions);
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }
    updateDimensions(){
        this.setState({
            height: window.innerHeight, 
            width: window.innerWidth,
        });
    }
    componentDidUpdate(){
        clearTimeout(this.timerID);

        let array;
        if(this.state.hint){
        array = document.querySelectorAll('.blur');
     
        for(let i = 0; i < array.length; i++){
            array[i].classList.remove('blur');
        }
            carousel.classList.add('blur');
            aside.classList.add('blur');
            title.classList.add('blur');
        }

        if(this.state.hint === 'true') {
           array = document.querySelectorAll('.blur');
     
        for(let i = 0; i < array.length; i++){
            array[i].classList.remove('blur');
        }
            carousel.classList.add('blur');
            wrapperMap.classList.add('blur');
        }

        if(this.state.hint === 'false') {
            array = document.querySelectorAll('.blur');
         for(let i = 0; i < array.length; i++){
             array[i].classList.remove('blur');
            }
        }
    }

    onLoad(){this.setState({isLoading: false})}
    onTimeChange(time){this.setState({time,})}
    onPlaceChange(place){this.setState({place,})}
    onHintChange(hint){this.setState({hint,})}

    filterByPlace(place, arr){
        let objOfOneSong;
        for(let i=0; i < arr.length; i++) {
            for(let k in arr[i]) {
               if(place == arr[i][k]) {
                  objOfOneSong = arr[i];
                  return objOfOneSong;
               }
            }
         }
    }

    filterByTime(time){
      let arrayOfCountries =[];
        for(let i=0; i < this.dbOfSongs.length; i++) {
            for(let k in this.dbOfSongs[i]) {
                  if(time == this.dbOfSongs[i][k]) {
                     arrayOfCountries.push(this.dbOfSongs[i])
                  }
            }
         }
         return arrayOfCountries;
    }
    
    highlightPlaces(array){
        let path;
        let pathDel;
        let arrayClass = document.querySelectorAll('.highlightPlaces');
        for(let i = 0; i < arrayClass.length; i++){
            pathDel = document.getElementById(arrayClass[i].id);
            if(pathDel){
                pathDel.classList.remove('highlightPlaces');
            }
        }
        
        for(let i = 0; i < array.length; i++){
            path = document.getElementById(array[i].countryId);
      
            if(path){
                path.classList.add('highlightPlaces');  
            }    
        }

    }

    render() {
        const songs  = this.filterByTime(this.state.time || 1900);
        let  finalSong = this.filterByPlace(this.state.place || null, songs);
        let highlightCountries = this.highlightPlaces(songs);

        return(
            <React.Fragment>
            {this.state.width > 960 ? (
                <div id='mainVersia' style={{display: this.state.width < 960 ? 'none' : 'block'}}>
                    <Loader isLoading={this.state.isLoading} />
                    <PopUp finalSong={finalSong} stateForPopUp={this.state.place}> </PopUp>
                    <Hint1 isLoading={this.state.isLoading} onHintChange={this.onHintChange}/>
                    <main >
                        <SidebarWrapper
                            width={this.state.width}
                            finalSong={finalSong}>
                        </SidebarWrapper>
                        <SelectWrapper 
                            items={this.items}
                            active={0}
                            decade={0}
                            onTimeChange={this.onTimeChange} />
                        <MapElement className={localStorage.getItem('hint')  ? '' : 'blur'} finalSong={finalSong} onPlaceChange={this.onPlaceChange} stateForPopUp={this.state.place}/>
                    </main>
                </div>
            ) :
            (
                <div id='mobVersia' style={{display: this.state.width < 960 ? 'block' : 'none'}}>
                    <Loader isLoading={this.state.isLoading} />
                    <Mob width={this.state.width}/>
                </div>
            )}
            </React.Fragment>
        )
    }
}

ReactDOM.render(
    <div className="container" id="mainContainer">
        <App />
    </div>,
   document.getElementById('root')
);


