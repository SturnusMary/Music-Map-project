import React from 'react';
import s from './stylesheet.scss';
import PropTypes from 'prop-types';
import db from '../db.json';

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
                 <div className="sidebar-middle-wrapper">
                    <ul className="sidebar-nav-top">
                        <li>
                            <span>
                            </span>
                        </li>
                    </ul>
                  <ul className="sidebar-nav-top">
                     <li>
                           {/* <a href="javascript:void(0)">
                              <svg
                                 x="0px"
                                 y="0px"
                                 viewBox="0 0 90.7 91.4"
                                 <g>
                                       <g>
                                          <linearGradient
                                             id="SVGID_1_"
                                             gradientUnits="userSpaceOnUse"
                                             x1="-71.2266"
                                             y1="187.3072"
                                             x2="114.6813"
                                             y2="-37.0403">
                                             <stop offset="0" style="stop-color:#FF001C"/>
                                             <stop offset="0.2194" style="stop-color:#FF009D"/>
                                             <stop offset="0.2677" style="stop-color:#F9049F"/>
                                             <stop offset="0.3324" style="stop-color:#E80FA3"/>
                                             <stop offset="0.4064" style="stop-color:#CC22AA"/>
                                             <stop offset="0.4872" style="stop-color:#A53CB4"/>
                                             <stop offset="0.5737" style="stop-color:#735DC0"/>
                                             <stop offset="0.6634" style="stop-color:#3785CF"/>
                                             <stop offset="0.7369" style="stop-color:#00AADD"/>
                                             <stop offset="1" style="stop-color:#FFD400"/>
                                          </linearGradient>
                                          <path
                                             fill="url(#SVGID_1_)"
                                             d="M45.1,4.8C21.8,4.8,2.9,23.7,2.9,47c0,23.3,18.9,42.2,42.2,42.2c23.3,0,42.2-18.9,42.2-42.2
                                 C87.3,23.7,68.4,4.8,45.1,4.8z M32,68.1V25.8L68.7,47L32,68.1z"/>
                                          <g>
                                             <linearGradient
                                                   id="SVGID_2_"
                                                   gradientUnits="userSpaceOnUse"
                                                   x1="-73.4367"
                                                   y1="185.4792"
                                                   x2="112.4746"
                                                   y2="-38.8724">
                                                   <stop offset="0" style="stop-color:#FF001C"/>
                                                   <stop offset="0.2194" style="stop-color:#FF009D"/>
                                                   <stop offset="0.2677" style="stop-color:#F9049F"/>
                                                   <stop offset="0.3324" style="stop-color:#E80FA3"/>
                                                   <stop offset="0.4064" style="stop-color:#CC22AA"/>
                                                   <stop offset="0.4872" style="stop-color:#A53CB4"/>
                                                   <stop offset="0.5737" style="stop-color:#735DC0"/>
                                                   <stop offset="0.6634" style="stop-color:#3785CF"/>
                                                   <stop offset="0.7369" style="stop-color:#00AADD"/>
                                                   <stop offset="1" style="stop-color:#FFD400"/>
                                             </linearGradient>
                                             <polygon
                                                   fill="url(#SVGID_2_)"
                                                   points="30.7,27.1 30.7,69.5 67.3,48.3 66.8,48 32,68.1 32,27.9 			"/>
                                             <linearGradient
                                                   id="SVGID_3_"
                                                   gradientUnits="userSpaceOnUse"
                                                   x1="-71.185"
                                                   y1="187.3408"
                                                   x2="114.7226"
                                                   y2="-37.0063">
                                                   <stop offset="0" style="stop-color:#FF001C"/>
                                                   <stop offset="0.2194" style="stop-color:#FF009D"/>
                                                   <stop offset="0.2677" style="stop-color:#F9049F"/>
                                                   <stop offset="0.3324" style="stop-color:#E80FA3"/>
                                                   <stop offset="0.4064" style="stop-color:#CC22AA"/>
                                                   <stop offset="0.4872" style="stop-color:#A53CB4"/>
                                                   <stop offset="0.5737" style="stop-color:#735DC0"/>
                                                   <stop offset="0.6634" style="stop-color:#3785CF"/>
                                                   <stop offset="0.7369" style="stop-color:#00AADD"/>
                                                   <stop offset="1" style="stop-color:#FFD400"/>
                                             </linearGradient>
                                             <path
                                                   fill="url(#SVGID_3_)"
                                                   d="M45.1,4.8c-12,0-22.8,5-30.5,13.1c7.6-7.3,17.8-11.7,29.2-11.7C67,6.1,85.9,25,85.9,48.3
                                    c0,11.3-4.5,21.6-11.7,29.1c8-7.7,13-18.5,13-30.5C87.3,23.7,68.4,4.8,45.1,4.8z"/>
                                          </g>
                                       </g>
                                 </g>
                              </svg>

                           </a> */}
                     </li>
                  </ul>
                  <iframe id="iframe" src={songUrl || null} style={{display:'none'}} ></iframe>
               </div>
            </div>
        )
    }
}
