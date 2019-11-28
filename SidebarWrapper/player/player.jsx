import React from 'react';
import PropTypes from 'prop-types';
import './stylesheet.scss';
import db from '../../db.json';
import {getDataId} from '../../elements/getDataId';
import  vinyl from '../../img/vinyl2.jpg'

let randomObj;
let songUrl;
export class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({valueTime: '0', valueVolume: '', duration: '', });
        this.youTubePlayerCurrentTimeChange = this.youTubePlayerCurrentTimeChange.bind(this);
        this.youTubePlayerVolumeChange = this.youTubePlayerVolumeChange.bind(this);
        this.youTubePlayerDisplayInfos = this.youTubePlayerDisplayInfos.bind(this);
        this.lastVideoId;

        this.youTubePlayerPause = this.youTubePlayerPause.bind(this);
        this.youTubePlayerPlay = this.youTubePlayerPlay.bind(this);
        this.onStateChange =  this.onStateChange.bind(this);
        this.transitionName = null;
        this.changeStatePage = this.changeStatePage.bind(this);

        this.dbOfSongs = db.songs;
        this.youTubePlayerRandom = this.youTubePlayerRandom.bind(this);
        this.random = false;
    }
    
    componentDidMount() {
        if (!this.youTubePlayer) {
            this.youTubePlayer = new Promise((resolve) => {
                const tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag
                    .parentNode
                    .insertBefore(tag, firstScriptTag);
                window.onYouTubeIframeAPIReady = () => resolve(window.YT);
            })   
        }
        
        this.youTubePlayer.then((YT) => {
            this.youTubePlayer = new YT.Player('YouTube-player', {
                videoId: `bS3uSzk4VwY`,
                height: 300,
                width: 400,
                playerlets: {
                    'enablejsapi': 1,
                    'autohide': 0,
                    'cc_load_policy': 0,
                    'controls': 2,
                    'disablekb': 1,
                    'iv_load_policy': 3,
                    'modestbranding': 1,
                    'rel': 0,
                    'showinfo': 0,
                    'start': 3
                },
                events: {
                    'onError': this.onError,
                    'onReady': this.onReady,
                    'onStateChange': this.onStateChange
                }
            })
        });
    }

    onError(event) {
        console.log("onError Call: " + event + " data: " + event.data);
    }

    buttonDisabled(){
        document.getElementById('icon-play').style.display ='none';
        document.getElementById('icon-pause').style.display ='block';
    }

    buttonEnabled(){
        document.getElementById('icon-play').style.display ='block';
        document.getElementById('icon-pause').style.display ='none';
    }

    componentDidUpdate() {
        if (this.props.src !== this.lastVideoId) {
            this.random = false;
            this.youTubePlayer.loadVideoById(
                {suggestedQuality: 'tiny', videoId: `${this.props.src}`}
            );
           this.buttonDisabled()
           this.setState({
            duration: this.youTubePlayer.getDuration(),
          })
        }
        this.lastVideoId = this.props.src; 
    }

    onReady(event) {
        let player = event.target;
        player.loadVideoById({suggestedQuality: 'tiny', videoId: ``});
        player.pauseVideo();
    }
    
    onStateChange(event) {
        if (event.data == '1') {
            this.timerId = setInterval(this.youTubePlayerDisplayInfos, 500);
        } else {
            clearInterval(this.timerId);
        }

        if (event.data == '0') {
            this.buttonEnabled();
            this.setState({valueTime: 0});
           
        }

        let volume = Math.round(event.target.getVolume());
        let volumeItem = document.getElementById('YouTube-player-volume');

        if (volumeItem && (Math.round(volumeItem.value) != volume)) {
            volumeItem.value = volume;
        }
    }
    
    youTubePlayerActive() {
        return this.youTubePlayer && this.youTubePlayer.hasOwnProperty('getPlayerState');
    }

    youTubePlayerPause() {
        if (this.youTubePlayerActive()) {
            this.youTubePlayer.pauseVideo();
        }
        this.buttonEnabled()
    }

    youTubePlayerPlay() {
        if (this.youTubePlayerActive()) {
            this.youTubePlayer.playVideo();
        }
        this.buttonDisabled()
    }
    
    youTubePlayerCurrentTimeChange(event) {
        this.setState({valueTime: event.target.value})
        
        if (this.youTubePlayerActive()) {
            this.youTubePlayer.seekTo(event.target.value * this.youTubePlayer.getDuration() / 100, true);

            this.youTubePlayer.playVideo();
        }
        this.buttonDisabled()
    }
    
    youTubePlayerVolumeChange(event) {
        this.setState({valueVolume: event.target.value})

        if (this.youTubePlayerActive()) {
            this.youTubePlayer.setVolume(this.state.valueVolume);
        }
    }
  
     youTubePlayerDisplayInfos() {
        
        if (this.youTubePlayerActive) {
            let current = this.youTubePlayer.getCurrentTime() || 0;
            let duration = this.youTubePlayer.getDuration();
            let currentPercent = (current && duration
                                  ? current * 100 / duration
                                  : 0);
                this.setState({
                    valueTime: currentPercent,
                })
            this.duration = ('0'+(duration -(duration %= 60)) / 60 + (9<duration?':':':0') + duration).split('.')[0];
            this.currentTime = ('0'+(current -(current %= 60)) / 60 + (10<current?':':':0') + current).split('.')[0];
            
            if( this.duration  == this.currentTime || this.duration - 1  == this.currentTime){
            this.currentTime = '00:00';
            }
        }
    }

    openDetail(){
        document.getElementById('descriptionSong').classList.toggle('show');
    }

    changeStatePage(){
        this.pageState = !this.props.state;
        this.props.getStatePage(this.pageState)

        document.getElementById('descriptionSong').classList.remove('show');
    }

    youTubePlayerRandom(){
        let rand = Math.floor(Math.random() * this.dbOfSongs.length);
        randomObj = this.dbOfSongs[rand];
        songUrl = getDataId(randomObj);
        this.random = true;
       
        if (this.youTubePlayerActive()) {
            this.youTubePlayer.loadVideoById(
                {suggestedQuality: 'tiny', videoId: `${songUrl}`}
            );
        }

        this.buttonDisabled();
        this.imageUrl = randomObj.imageUrl;
        this.artist = randomObj.artist;
        this.title = randomObj.title;
        this.country = randomObj.country;
        this.releaseDate = randomObj.releaseDate;
        this.album = randomObj.album;
        this.authorComposer = randomObj.authorComposer;
        this.details = randomObj.details;
    }

    render() {
        return (
            <div className="wrapper-player">
                    <div className="player">
                        <div id="YouTube-player" style={{display: 'none'}}></div>
                        <div className="player__top">
                            <div className="player-cover">
                            <div id="button-back" style={{display: this.props.width < 960 ? 'flex': 'none'}}>
                            <div id='buttonBack' onClick={this.changeStatePage}>
                                <div className="wrapperButtonBack">
                                    <svg className="arrow-animate arrow-left" width="18px" height="17px" viewBox="-1 0 18 17" version="1.1">
                                        <g>
                                            <polygon className="arrow" points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596" />
                                            <polygon className="arrow-fixed " points="16.3746667 8.33860465 7.76133333 15.3067621 6.904 14.3175671 14.2906667 8.34246869 6.908 2.42790698 7.76 1.43613596" />
                                        </g>
                                    </svg>
                                </div>
                            </div>
                        </div>
                                <transition-group name="transitionName">
                                    <div className="player-cover__item" style={{ backgroundImage: !this.random ? (this.props.imageUrl ? `url(${this.props.imageUrl})` : `url(${vinyl})`) : `url(${this.imageUrl})` }}></div>
                                </transition-group>
                            </div>
                            <div className="player-controls">
                                <div className="player-controls-range">
                                    <input
                                        id="YouTube-player-volume"
                                        type="range"
                                        value={this.state.valueVolume}
                                        min="0"
                                        max="100"
                                        onChange={this.youTubePlayerVolumeChange} />
                                </div>
                                <div className="player-controls__item -xl js-play">
                                    <svg style={{display: 'none'}} onClick={this.youTubePlayerPause} className="icon" id="icon-pause" viewBox="0 0 32 32">
                                        <title>icon-pause</title>
                                        <path d="M16 0.32c-8.64 0-15.68 7.040-15.68 15.68s7.040 15.68 15.68 15.68 15.68-7.040 15.68-15.68-7.040-15.68-15.68-15.68zM16 29.216c-7.296 0-13.216-5.92-13.216-13.216s5.92-13.216 13.216-13.216 13.216 5.92 13.216 13.216-5.92 13.216-13.216 13.216z"></path>
                                        <path d="M16 32c-8.832 0-16-7.168-16-16s7.168-16 16-16 16 7.168 16 16-7.168 16-16 16zM16 0.672c-8.448 0-15.328 6.88-15.328 15.328s6.88 15.328 15.328 15.328c8.448 0 15.328-6.88 15.328-15.328s-6.88-15.328-15.328-15.328zM16 29.568c-7.488 0-13.568-6.080-13.568-13.568s6.080-13.568 13.568-13.568c7.488 0 13.568 6.080 13.568 13.568s-6.080 13.568-13.568 13.568zM16 3.104c-7.104 0-12.896 5.792-12.896 12.896s5.792 12.896 12.896 12.896c7.104 0 12.896-5.792 12.896-12.896s-5.792-12.896-12.896-12.896z"></path>
                                        <path d="M12.16 22.336v0c-0.896 0-1.6-0.704-1.6-1.6v-9.472c0-0.896 0.704-1.6 1.6-1.6v0c0.896 0 1.6 0.704 1.6 1.6v9.504c0 0.864-0.704 1.568-1.6 1.568z"></path>
                                        <path d="M19.84 22.336v0c-0.896 0-1.6-0.704-1.6-1.6v-9.472c0-0.896 0.704-1.6 1.6-1.6v0c0.896 0 1.6 0.704 1.6 1.6v9.504c0 0.864-0.704 1.568-1.6 1.568z"></path>
                                    </svg>
                                    <svg onClick={this.youTubePlayerPlay} className="icon" id="icon-play" viewBox="0 0 32 32">
                                        <title>icon-play</title>
                                        <path d="M21.216 15.168l-7.616-5.088c-0.672-0.416-1.504 0.032-1.504 0.832v10.176c0 0.8 0.896 1.248 1.504 0.832l7.616-5.088c0.576-0.416 0.576-1.248 0-1.664z"></path>
                                        <path d="M13.056 22.4c-0.224 0-0.416-0.064-0.608-0.16-0.448-0.224-0.704-0.672-0.704-1.152v-10.176c0-0.48 0.256-0.928 0.672-1.152s0.928-0.224 1.344 0.064l7.616 5.088c0.384 0.256 0.608 0.672 0.608 1.088s-0.224 0.864-0.608 1.088l-7.616 5.088c-0.192 0.16-0.448 0.224-0.704 0.224zM13.056 10.272c-0.096 0-0.224 0.032-0.32 0.064-0.224 0.128-0.352 0.32-0.352 0.576v10.176c0 0.256 0.128 0.48 0.352 0.576 0.224 0.128 0.448 0.096 0.64-0.032l7.616-5.088c0.192-0.128 0.288-0.32 0.288-0.544s-0.096-0.416-0.288-0.544l-7.584-5.088c-0.096-0.064-0.224-0.096-0.352-0.096z"></path>
                                        <path d="M16 0.32c-8.64 0-15.68 7.040-15.68 15.68s7.040 15.68 15.68 15.68 15.68-7.040 15.68-15.68-7.040-15.68-15.68-15.68zM16 29.216c-7.296 0-13.216-5.92-13.216-13.216s5.92-13.216 13.216-13.216 13.216 5.92 13.216 13.216-5.92 13.216-13.216 13.216z"></path>
                                        <path d="M16 32c-8.832 0-16-7.168-16-16s7.168-16 16-16 16 7.168 16 16-7.168 16-16 16zM16 0.672c-8.448 0-15.328 6.88-15.328 15.328s6.88 15.328 15.328 15.328c8.448 0 15.328-6.88 15.328-15.328s-6.88-15.328-15.328-15.328zM16 29.568c-7.488 0-13.568-6.080-13.568-13.568s6.080-13.568 13.568-13.568c7.488 0 13.568 6.080 13.568 13.568s-6.080 13.568-13.568 13.568zM16 3.104c-7.104 0-12.896 5.792-12.896 12.896s5.792 12.896 12.896 12.896c7.104 0 12.896-5.792 12.896-12.896s-5.792-12.896-12.896-12.896z"></path>
                                    </svg>
                                </div>

                                <div className="player-controls__item1 ">
                                    <svg  onClick={this.youTubePlayerRandom} className="icon1" viewBox="0 0 512 512"><path d="M490.667 384h-85.333c-70.693 0-128-57.307-128-128s57.307-128 128-128h33.83l-27.582 27.582c-8.331 8.331-8.331 21.839 0 30.17 8.331 8.331 21.839 8.331 30.17 0l64-64 .011-.012c.492-.493.959-1.012 1.402-1.551.203-.247.379-.507.568-.76.227-.304.463-.601.674-.917.203-.303.379-.618.565-.93.171-.286.35-.565.508-.86.17-.318.314-.645.467-.969.145-.307.298-.609.428-.923.13-.315.235-.636.35-.956.121-.337.25-.67.355-1.015.097-.32.168-.645.249-.968.089-.351.187-.698.258-1.056.074-.375.118-.753.172-1.13.044-.311.104-.618.135-.933.138-1.4.138-2.811 0-4.211-.031-.315-.09-.621-.135-.932-.054-.378-.098-.756-.173-1.13-.071-.358-.169-.704-.258-1.055-.081-.324-.152-.649-.249-.969-.104-.344-.233-.677-.354-1.013-.115-.32-.22-.642-.35-.957-.13-.314-.283-.616-.428-.922-.153-.325-.297-.652-.467-.97-.157-.294-.337-.573-.507-.859-.186-.312-.362-.627-.565-.931-.211-.315-.446-.612-.673-.915-.19-.254-.367-.515-.57-.762a21.46 21.46 0 00-1.402-1.551l-.011-.012-64-64c-8.331-8.331-21.839-8.331-30.17 0-8.331 8.331-8.331 21.839 0 30.17l27.582 27.582h-33.83c-64.264 0-120.222 35.525-149.333 88.002-29.111-52.477-85.069-88.002-149.333-88.002H21.333C9.551 85.333 0 94.885 0 106.667S9.551 128 21.333 128h85.333c70.693 0 128 57.307 128 128s-57.307 128-128 128h-33.83l27.582-27.582c8.331-8.331 8.331-21.839 0-30.17-8.331-8.331-21.839-8.331-30.17 0l-64 64-.01.011c-.493.494-.96 1.012-1.403 1.552-.203.247-.379.507-.569.761-.227.303-.462.6-.673.916-.203.304-.379.619-.565.931-.171.286-.35.565-.508.859-.17.318-.314.644-.467.969-.145.307-.298.609-.429.923-.13.315-.236.637-.35.957-.121.337-.25.669-.355 1.014-.097.32-.168.645-.249.968-.089.351-.187.698-.258 1.056-.074.375-.118.753-.172 1.13-.044.311-.104.618-.135.933a21.468 21.468 0 000 4.211c.031.315.09.621.135.932.054.378.098.756.173 1.13.071.358.169.704.258 1.055.081.324.152.649.249.969.104.344.233.677.354 1.013.115.32.22.642.35.957.131.315.284.617.429.924.153.324.296.65.466.968.158.295.338.575.509.861.186.311.362.626.565.929.212.316.447.614.675.918.19.253.365.512.567.759.446.544.916 1.067 1.413 1.564l64 64c8.331 8.331 21.839 8.331 30.17 0s8.331-21.839 0-30.17l-27.582-27.582h33.83c64.264 0 120.222-35.525 149.333-88.002 29.111 52.477 85.07 88.002 149.333 88.002h85.333c11.782 0 21.333-9.551 21.333-21.333C512 393.551 502.449 384 490.667 384z"/></svg>
                                </div>
                            </div>
                        </div>
                        <div className="progress">
                            <div className="progress__top">
                                <div className="album-info">
                                    <div className="album-info__name">{!this.random ? this.props.artist : this.artist}</div>
                                    <div className="album-info__track">{!this.random ? this.props.title : this.title}</div>
                                </div>
                                <div className="progress__duration">{this.duration}</div>
                            </div>
                        
                            <div className="progress__time"><div>
                                <input
                                    id="YouTube-player-progress"
                                    type="range"
                                    value={this.state.valueTime}
                                    min="0"
                                    max="100"
                                    step="any"
                                    onChange={this.youTubePlayerCurrentTimeChange}/>
                            <div className="current-time">{this.currentTime}</div>
                        </div>
                        </div>
                    </div>
                    <div ></div>
                </div>           
                <span onClick={this.openDetail} className="titleDetail">More detail</span>
                <div className="descriptionSong" id='descriptionSong'>
                    <div><span>Country:</span> {!this.random ? (this.props.country ? this.props.country : 'no information') : (this.country ? this.country : 'no information')},</div>
                    <div><span>Release:</span> {!this.random ? (this.props.releaseDate? this.props.releaseDate: 'no information') : (this.releaseDate? this.releaseDate: 'no information')},</div>
                    <div><span>Album:</span> {!this.random ? (this.props.album? this.props.album: 'no information') : (this.album? this.album: 'no information')},</div>
                    <div><span>Author/Composer:</span> {!this.random ? (this.props.authorComposer? this.props.authorComposer: 'no information') : (this.authorComposer? this.authorComposer: 'no information')},</div>
                    <div><span>Details:</span>{!this.random ? (this.props.details? this.props.details: 'no information') : (this.details? this.details: 'no information')}.</div>
                </div>
            </div>
        )
    }
}

Player.propType = {
    src: PropTypes.string,
    imageUrl: PropTypes.string,
    artist: PropTypes.string,
    title: PropTypes.string,
    country: PropTypes.string,
    releaseDate: PropTypes.string,
    album: PropTypes.string,
    authorComposer: PropTypes.string,
    details: PropTypes.string,
    getStatePage: PropTypes.func,
    state: PropTypes.bool,
}