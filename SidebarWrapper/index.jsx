import React from 'react';
import s from './stylesheet.scss';
import PropTypes from 'prop-types';
import {Player} from './player/player';
import {SideBar} from './sideBar'

export class SidebarWrapper extends React.Component {
   constructor(props){
      super(props);
      this.getData = this.getData.bind(this);
   }

   componentDidMount(){
      this.SideBar = SideBar();
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

         <aside id="sidebar-wrapper" className="sidebar-wrapper">
               <svg className="sidebar" id='sidebar' viewBox="0 0 50 800" >
                  <path
                        className="s-path"
                        id="path"
                        fill="#bccbde"
                        d="M0,0 50,0 a0,250 0 1,1 0,800 L0,800"/>
               </svg>

               <div className="sidebar-content" id="sidebar-content">
               <Player {...this.props.finalSong} src={songUrl ? songUrl : null} />
               </div>
            </aside>
            
        )
    }
}

SidebarWrapper.propType = {
   finalSong: PropTypes.object,
   place: PropTypes.string,
   time: PropTypes.string,
}