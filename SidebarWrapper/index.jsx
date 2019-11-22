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
      console.log('asd')
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

         <React.Fragment>
            <svg class="arrow-animate arrow-top" width="18px" height="17px" viewBox="-1 0 18 17" version="1.1">
               <g>
               <polygon class="arrow arrow-color" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596" />
               <polygon class="arrow-fixed arrow-color" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596" />
              </g>
              </svg>
              
            <aside id="aside"  className={ localStorage.getItem('hint')  ? 'sidebar-wrapper' : 'blur sidebar-wrapper'}>
               {/* id ="sidebar-wrapper" */}
               <svg className="sidebar" id='sidebar' viewBox="0 0 50 800" >
                  <path
                        className="s-path"
                        id="path"
                        fill="#fff"
                        d="M0,0 50,0 a0,250 0 1,1 0,800 L0,800"/>
                  </svg>

               <div className="sidebar-content" id="sidebar-content">
                  <Player {...this.props.finalSong} src={songUrl ? songUrl : null} />
               </div>
            </aside>

            <svg class="arrow-animate arrow-bottom" width="18px" height="17px" viewBox="-1 0 18 17" version="1.1">
               <g>
               <polygon class="arrow arrow-color" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596" />
               <polygon class="arrow-fixed arrow-color" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596" />
              </g>
              </svg>
            </React.Fragment>
        )
    }
}

SidebarWrapper.propType = {
   finalSong: PropTypes.object,
}