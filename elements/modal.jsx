import React from 'react';
import PropTypes from 'prop-types';

export class PopUp extends React.Component {
    displayNone(){
        let PopUpElement = document.querySelector('.pop-up-explanation');
        PopUpElement.style.display = 'none'
    }
    
    componentDidUpdate(){
      clearTimeout(this.timerID);
        let PopUpElement = document.querySelector('.pop-up-explanation');
        if( !this.props.finalSong && this.props.stateForPopUp ) {
            PopUpElement.style.display = 'flex';
            this.timerID = setTimeout(this.displayNone, 3000);
        }
    }

  render(){
    return(
        <React.Fragment>
            <div style={{ display: !this.props.finalSong && this.props.stateForPopUp  ? 'flex' : 'none'}} className="pop-up-explanation">
              <svg id="modal" xmlns="http://www.w3.org/2000/svg" width='500' height='500' version="1.1" x="0" y="0" viewBox="0 0 120 120" enableBackground="new 0 0 120 120" xmlSpace="preserve">
                <defs>
                  <clipPath id="circle-clip">
                    <path className="clip" d="M101.807,123.37c10-0.352,18.193,5.401,18.193,5.401V0H0v128.771c0,0,9.701-5.227,17.069-5.227s10.464,6.314,20.877,6.314
                      c10.175,0,12.703-4.209,22.053-4.209s11.981,5.438,20.578,5.438S91.807,123.722,101.807,123.37z">
                      <animate id="morph-one" dur="1" begin="0" repeatCount="indefinite" attributeName="d" from="M101.807,123.37c10-0.352,18.193,5.401,18.193,5.401V0H0v128.771c0,0,9.701-5.227,17.069-5.227s10.464,6.314,20.877,6.314
                        c10.175,0,12.703-4.209,22.053-4.209s11.981,5.438,20.578,5.438S91.807,123.722,101.807,123.37z" to="M101.807,123.37c10-0.352,18.193,5.401,18.193,5.401V0H0v128.771c0,0,9.701-5.227,17.069-5.227s10.464,6.314,20.877,6.314
                        c10.175,0,12.703-4.209,22.053-4.209s11.981,5.438,20.578,5.438S91.807,123.722,101.807,123.37z" values="M101.807,123.37c10-0.352,18.193,5.401,18.193,5.401V0H0v128.771c0,0,9.701-5.227,17.069-5.227s10.464,6.314,20.877,6.314
                        c10.175,0,12.703-4.209,22.053-4.209s11.981,5.438,20.578,5.438S91.807,123.722,101.807,123.37z;M101.807,135.303c10-0.352,18.193-6.531,18.193-6.531V0H0v128.771c0,0,9.701,4.952,17.069,4.952s10.464-9.299,20.877-9.299
                        c10.175,0,12.703,9.299,22.053,9.299s11.981-9.123,20.578-9.123S91.807,135.654,101.807,135.303z
                        ;M101.807,123.37c10-0.352,18.193,5.401,18.193,5.401V0H0v128.771c0,0,9.701-5.227,17.069-5.227s10.464,6.314,20.877,6.314
                        c10.175,0,12.703-4.209,22.053-4.209s11.981,5.438,20.578,5.438S91.807,123.722,101.807,123.37z" />
                    </path>
                  </clipPath>
                </defs>
                <g clipPath="url(#circle-clip)">
                  <path fill="#fff" d="M19.21 18.36h77.98V67.9H19.21z"/>
                  <path fill="#d24a43" d="M18.89 67.89h77.98v24.77H18.89z"/>
                  <path className="logo" d="M60.66 71.9h-2.78v4.63h2.71a2.64 2.64 0 001.83-.53 2 2 0 00.64-1.62 2.46 2.46 0 00-.64-1.75 2.43 2.43 0 00-1.76-.73z"/>
                  <path className="logo" d="M58.2 0a58.2 58.2 0 1058.2 58.2A58.2 58.2 0 0058.2 0zm-9 32.09h3v6h5.92v-6h3v14.73h-3V40.5h-5.87v6.32h-3zM34.91 84.18H25V69.45h9.86v2.45h-6.79v3.52h5.83v2.37h-5.83v3.95h6.84zm.57-52.09h12v2.45H43v12.28h-3V34.54h-4.52zm16.71 52.09h-3v-4l.31-7-4 11h-2.11l-4-11 .3 6.94v4h-3V69.45h4l3.79 10.68 3.72-10.68h4zm1.16-18.68h-3V50.77h3zm11.29 12.24a6.2 6.2 0 01-4.1 1.26h-2.66v5.19h-3V69.45h5.75a6.74 6.74 0 012.92.6 4.46 4.46 0 011.93 1.73 4.71 4.71 0 01.68 2.54 4.23 4.23 0 01-1.52 3.42zM59.76 55.9a8.82 8.82 0 002.13.91 9.21 9.21 0 013.78 1.93 3.85 3.85 0 011.18 2.87 3.52 3.52 0 01-1.45 3 6.28 6.28 0 01-3.89 1.09 7.63 7.63 0 01-3.1-.62 5 5 0 01-2.13-1.71 4.34 4.34 0 01-.73-2.51h3c0 1.63 1 2.44 2.92 2.44a2.8 2.8 0 001.69-.44 1.44 1.44 0 00.61-1.23 1.58 1.58 0 00-.61-1.32 8.33 8.33 0 00-2.19-1 15.79 15.79 0 01-2.5-1A4.08 4.08 0 0156 54.68a3.58 3.58 0 01.68-2.13 4.41 4.41 0 011.93-1.46 7.28 7.28 0 012.83-.53 6.62 6.62 0 012.81.57 4.57 4.57 0 011.92 1.62 4.24 4.24 0 01.68 2.37h-3a2 2 0 00-.64-1.58 2.65 2.65 0 00-1.82-.54 2.8 2.8 0 00-1.73.47 1.5 1.5 0 00-.66 1.22 1.44 1.44 0 00.76 1.21zm7.32-9.08h-3V32.09h3zM79.3 71.9h-4.52v12.28h-3V71.9H67.3v-2.45h12zm-.17-26a6.28 6.28 0 01-3.89 1.1 7.63 7.63 0 01-3.1-.62A4.9 4.9 0 0170 44.69a4.34 4.34 0 01-.73-2.51h3c0 1.63 1 2.44 2.91 2.44a2.8 2.8 0 001.69-.44 1.44 1.44 0 00.67-1.18 1.58 1.58 0 00-.61-1.32 8.17 8.17 0 00-2.19-1 14.89 14.89 0 01-2.5-1A4.08 4.08 0 0169.73 36a3.58 3.58 0 01.68-2.13 4.41 4.41 0 011.93-1.46 7.28 7.28 0 012.83-.53 6.48 6.48 0 012.81.58 4.48 4.48 0 011.92 1.61 4.24 4.24 0 01.68 2.37h-3a2 2 0 00-.64-1.58 2.65 2.65 0 00-1.79-.56 2.82 2.82 0 00-1.73.47 1.5 1.5 0 00-.65 1.23 1.44 1.44 0 00.72 1.21 8.82 8.82 0 002.13.91 9.21 9.21 0 013.78 1.93 3.85 3.85 0 011.18 2.87 3.52 3.52 0 01-1.45 3.01zm8.69 32.91v5.34h-3.09v-5.31l-4.84-9.39h3.33l3 6.63 3.06-6.63h3.32z"/>
                 </g>
              </svg>
            </div>
        </React.Fragment>
    )
  }
}

PopUp.propType = {
    finalSong: PropTypes.object,
    stateForPopUp: PropTypes.string,
}