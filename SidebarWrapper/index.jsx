import React from 'react';
import s from './stylesheet.scss';
import PropTypes from 'prop-types';
import {Player} from './player';

export class SidebarWrapper extends React.Component {
   constructor(props){
      super(props);
      this.getData = this.getData.bind(this);
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
      const  songUrl = this.getData(this.props.finalSong);
        return(
            <div id="sidebar-wrapper" className="sidebar-wrapper">
               <div className="sidebar-content">
                  <Player {...this.props.finalSong} src={songUrl ? songUrl : null} />
               </div>
            </div>
        )
    }
}

SidebarWrapper.propType = {
   finalSong: PropTypes.object,
   place: PropTypes.string,
   time: PropTypes.string,
}