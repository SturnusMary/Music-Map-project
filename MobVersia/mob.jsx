import React from 'react';
import './stylesheet';
import {Noise} from './noise';
import AutoCompleteText from './AutoCompleteText';
import {countries} from './countries';
import {Map} from './map.jsx';
import db from '../db.json';
import {FilterByTime} from '../elements/filterByTime';
import {FilterByPlace} from '../elements/filterByPlace';
import {Conclusion} from './conclusion';
import {SidebarWrapper} from '../SidebarWrapper/index';

export class Mob extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            countryName: '',
            decade: '',
            displayPage: false,
        }
        this.items = [1900, 1910, 1920, 1930, 1940, 1950, 1960, 1970, 1980, 1990, 2000, 2010];
        this.handleCountryName = this.handleCountryName.bind(this);
        this.handleDecade = this.handleDecade.bind(this);
        this.handlerDisplayPage = this.handlerDisplayPage.bind(this);
        this.dbOfSongs = db.songs;
    }
    componentDidMount(){
        Noise();
    }
    
    handlerDisplayPage(displayPage){this.setState({displayPage,})}
    handleCountryName(countryName){this.setState({countryName,})}
    handleDecade(decade){this.setState({decade,})}

    render(){
        const songs  = FilterByTime(this.state.decade || null);
        let finalSong = FilterByPlace(this.state.countryName || null, songs);
        return (
            <React.Fragment >
               <div id='inputData' style={{display: this.state.displayPage ? 'none': 'flex'}}>
                    <div id="title">LET THE MUSIC <span>PLAY</span></div>
                    <div className="App-Component ComponentFirst" >
                        <AutoCompleteText text='dynamic text' id='country' htmlFor='country' suggestions={countries} getInformation={this.handleCountryName}>
                        Enter the name of the country
                        </AutoCompleteText>
                    </div>
                    <div className="App-Component">
                        <AutoCompleteText text='dynamic text'  id='decade' htmlFor='decade' suggestions={this.items} getInformation={this.handleDecade}>
                        Enter the decade
                        </AutoCompleteText>
                    </div>
                    <div id="contSvg">
                        <svg 
                            version="1.1"
                            viewBox="0 0 1009.7 666" preserveAspectRatio="xMinYMid meet" id='posSVG'>
                            <g  id="pathOne"></g>
                        </svg>
                    </div>
                    <Map getInformation = {this.state.countryName}/>
                    <Conclusion getStatePage={this.handlerDisplayPage} finalSong={finalSong} getCountry= {this.state.countryName} getDecade= {this.state.decade}/>
                    <canvas id="noise" className="noise" />
                </div> 
                <div id='mobPlayer' style={{display: this.state.displayPage ? 'flex': 'none'}}>
                {/* */}
                    <SidebarWrapper getStatePage={this.handlerDisplayPage} state={this.state.displayPage} finalSong={finalSong} width={this.props.width}/>
                </div>
            </React.Fragment>
        )
    }
}


{/* <div id="signin">
	
	<div class="input-field">
		<input type="email" id="email" autocomplete="off"/>
		<i class="material-icons">email</i>
		<label for="email">Email</label>
	</div>
	 */}



// html,
// body {
// 	height: 100%;
// }
// body {
// 	background: #283593;
// 	display: flex;
// 	justify-content: center;
// 	align-items: center;
// 	max-width: 1200px;
// 	margin: 0 auto;
// }
// #signin {
// 	width: 40%;
// 	background: #3f51b5;
// 	margin: 100px 50px;
// 	box-shadow: 0 0 64px rgba(0, 0, 0, 0.5);
// 	padding: 100px;
// 	position: relative;
// 	overflow: hidden;
// }


// #signin .input-field {
// 	position: relative;
// 	height: 50px;
// 	margin: 35px 0;
// 	transition: all 300ms;
// }
// #signin .input-field i {
// 	position: absolute;
// 	bottom: 28px;
// 	left: 15px;
// 	color: #bbbbbb;
// 	height: 0;
// 	visibility: hidden;
// 	font-size: 100%;
// 	transition: height 250ms;
// }
// #signin .input-field label {
// 	width: 100%;
// 	height: 100%;
// 	position: absolute;
// 	margin-top: 20px;
// 	left: 4px;
// 	font: 400 16px/1 "Roboto", sans-serif;
// 	color: #fff;
// 	opacity: 1;
// 	transition: all 300ms;
// }
// #signin .input-field input {
// 	width: calc(100% - 70px);
// 	height: 4px;
// 	font: 500 16px/1 "Roboto", sans-serif;
// 	padding: 0 20px 0 50px;
// 	border: none;
// 	box-shadow: 0 10px 10px rgba(0, 0, 0, 0.25);
// 	color: #606060;
// 	border-radius: 6px;
// 	outline: 0;
// 	overflow: hidden;
// 	position: absolute;
// 	bottom: 0;
// 	left: 0;
// 	transition: all 300ms;
// }


// #signin .input-field input:focus {
// 	color: #333;
// }
// #signin .input-field input:focus,
// #signin .input-field input.not-empty {
// 	height: auto;
// 	padding: 14px 20px 14px 50px;
// }
// #signin .input-field input:focus + i,
// #signin .input-field input.not-empty + i {
// 	font-size: 24px;
// 	bottom: 26px;
// 	height: 10px;
// 	visibility: visible;
// }
// #signin .input-field input:focus + i + label,
// #signin .input-field input.not-empty + i + label {
// 	font-size: 12px;
// 	margin-top: -15px;
// 	opacity: 0.7;
// 	animation: label 300ms 1;
// }

// @keyframes label {
// 	0% {
// 		margin-top: -15px;
// 	}
// 	50% {
// 		margin-top: -25px;
// 	}
// 	100% {
// 		margin-top: -15px;
// 	}
// }

// #gif {
// 	width: 50%;
// }
// #gif a img {
// 	max-width: 100%;
// 	box-shadow: 0 0 64px rgba(0, 0, 0, 0.5);
// }



// $("input").on('focusout', function(){
// 	$(this).each(function(i, e){
// 		if($(e).val() != ""){
// 			$(e).addClass('not-empty');
// 		}else{
// 			$(e).removeClass('not-empty');
// 		}
// 	});
// });
