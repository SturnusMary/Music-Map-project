import React from 'react';
import s from './stylesheet.scss';
import PropTypes from 'prop-types';
import db from '../db.json';
import sideBarAnim from './animation'


export class SidebarWrapper extends React.Component {
   constructor(props){
      super(props);
      this.dbOfSongs = db.songs;

      this.state = {
         show: false
      }
   }

   componentDidMount(){
   sideBarAnim();
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

   getSongUrl (obj) {
      let url;
      for(let key in obj) {
         if(key == 'songUrl') {
            url = `${obj[key]}?autoplay=1&autohide=1`;
            return url;
          }
      }
   }

   render() {
      const songs = this.filterByPlace(this.props.place || null);
      const  finalSong = this.filterByTime(this.props.time || null, songs);
      const  songUrl = this.getSongUrl(finalSong);
      console.log(this.props.place, this.props.time, songUrl)
        return(
            <div id="sidebar-wrapper">

            <svg class="sidebar" id='sidebar' viewBox="0 0 50 500">
                     <path class="s-path" id="path" fill="lightblue" d="M0,0 50,0 a0,250 0 1,1 0,500 L0,500" />
                  </svg>

                  <div class="static">
                     
                  </div>

                  <div class="sidebar-content" id="sidebar-content">
                  <iframe id="iframe" src={songUrl || null}  ></iframe>
                  </div>
                 {/* <div className="sidebar-middle-wrapper">
                    <ul className="sidebar-nav-top">
                        <li>
                            <span>
                            </span>
                        </li>
                    </ul>
                  <ul className="sidebar-nav-top">
                     <li>
                     </li>
                  </ul>
                  <iframe id="iframe" src={songUrl || null} style={{display:'none'}} ></iframe>
               </div> */}
            </div>
        )
    }
}
