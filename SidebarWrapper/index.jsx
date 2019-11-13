import React from 'react';
import s from './stylesheet.scss';
import PropTypes from 'prop-types';
import db from '../db.json';
import {Player} from './player';


export class SidebarWrapper extends React.Component {
   constructor(props){
      super(props);
      this.dbOfSongs = db.songs;
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
               console.log(arr[i])
               return objOfOneSong;
            }
         }
      }
   }

   getData (obj) {
      let url;
      for(let key in obj) {

         if(key == 'songUrl') {
            url = obj[key].split('https://youtube.com/embed/')[1];
            return url;
          }
      }
   }

   render() {
      const songs = this.filterByPlace(this.props.place || null);
      const  finalSong = this.filterByTime(this.props.time || null, songs);
      const  songUrl = this.getData(finalSong);
      // console.log(this.props.place, this.props.time, songUrl)
        return(
            <div id="sidebar-wrapper" className="sidebar-wrapper">
               <div className="sidebar-content">
                  <Player {...finalSong} src={songUrl} />
             
               </div>
            </div>
        )
    }
}
