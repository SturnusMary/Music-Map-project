import React from 'react';

let youTubePlayer;

export class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({valueTime: '0', valueVolume: ''});
        // this.currentTimeSliding = false;
        this.youTubePlayerCurrentTimeChange = this.youTubePlayerCurrentTimeChange.bind(this);
        this.youTubePlayerVolumeChange = this.youTubePlayerVolumeChange.bind(this);
        this.youTubePlayerDisplayInfos = this.youTubePlayerDisplayInfos.bind(this);
        
        // this.personalPlayer = {currentTimeSliding: false};
        this.youTubePlayerPause = this.youTubePlayerPause.bind(this);
        this.youTubePlayerPlay = this.youTubePlayerPlay.bind(this);

        this.valueDuration = 0;
     
    }
    componentDidMount() {
        if (!youTubePlayer) {
            youTubePlayer = new Promise((resolve) => {
                const tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag
                    .parentNode
                    .insertBefore(tag, firstScriptTag);
                window.onYouTubeIframeAPIReady = () => resolve(window.YT);
            })
            
        }
       
        youTubePlayer.then((YT) => {
            youTubePlayer = new YT.Player('YouTube-player', {
                videoId: `N_QZNtflyJA`,
                height: 300,
                width: 400,
                playerlets: {
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
            // this.personalPlayer = {currentTimeSliding: false};
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
            youTubePlayer.loadVideoById(
                {suggestedQuality: 'tiny', videoId: `${this.props.src}`}
            );
           this.buttonDisabled()
            // this.setState({valueTime: youTubePlayer.getCurrentTime() && youTubePlayer.getDuration() ? youTubePlayer.getCurrentTime() * 100 / youTubePlayer.getDuration() : 0})
        }
        this.lastVideoId = this.props.src;
        
    }
    onReady(event) {
        let player = event.target;
        player.loadVideoById({suggestedQuality: 'tiny', videoId: `${this.props.src}`});
        player.pauseVideo();
    }
    onStateChange(event) {
        let volume = Math.round(event.target.getVolume());
        let volumeItem = document.getElementById('YouTube-player-volume');

        if (volumeItem && (Math.round(volumeItem.value) != volume)) {
            volumeItem.value = volume;
        }
    }
    
    youTubePlayerActive() {
        return youTubePlayer && youTubePlayer.hasOwnProperty('getPlayerState');
    }

    youTubePlayerPause() {
        if (this.youTubePlayerActive()) {
            youTubePlayer.pauseVideo();
        }
        this.buttonEnabled()
    }

    youTubePlayerPlay() {
        if (this.youTubePlayerActive()) {
            youTubePlayer.playVideo();
        }
        this.buttonDisabled()
    }
    
    youTubePlayerCurrentTimeChange(event) {
        console.log(youTubePlayer.getDuration());
        console.log(youTubePlayer.getCurrentTime());
       
        // this.personalPlayer.currentTimeSliding = false;

        this.setState({valueTime: event.target.value})
        if (this.youTubePlayerActive()) {
            youTubePlayer.seekTo(this.state.valueTime * youTubePlayer.getDuration() / 100, true);
        }
        document.getElementById('icon-play').style.display ='none';
        document.getElementById('icon-pause').style.display ='block';
    }
    // youTubePlayerCurrentTimeSlide() {
    //     this.personalPlayer.currentTimeSliding = true;
    // }


    youTubePlayerVolumeChange(event) {

        this.setState({valueVolume: event.target.value})

        if (this.youTubePlayerActive()) {
            youTubePlayer.setVolume(this.state.valueVolume);
        }
    }
   
     youTubePlayerDisplayInfos() {
        
        if (this.youTubePlayerActive) {
            let current = youTubePlayer.getCurrentTime() || 0;
            let duration = youTubePlayer.getDuration();
            let currentPercent = (current && duration
                                  ? current * 100 / duration
                                  : 0);
          
            // if (!this.personalPlayer.currentTimeSliding) {
                this.setState({
                    valueTime: currentPercent,
                })
            // }
            console.log(`current${current}, duration${duration}, currentPercent${currentPercent}, this.state.valueTime${this.state.valueTime}`)
        }

    }
    
    render() {
        return (
            <div className="wrapper-player">
                    <div className="player">
                        <div id="YouTube-player" style={{display: 'none'}}></div>
                        <div className="player__top">
                            <div className="player-cover">
                                <transition-group classNameName="transitionName">
                                    <div className="player-cover__item"></div>
                                </transition-group>
                            </div>
                            <div className="player-controls">
                                <div >
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
                             
                            </div>
                        </div>
                        <div className="progress">
                            <div className="progress__top">
                                <div className="album-info">
                                    <div className="album-info__name"></div>
                                    <div className="album-info__track"></div>
                                </div>
                                <div className="progress__duration"></div>
                            </div>
                        
                            <div className="progress__time"><div>
                        
                            
                            <div>
                                <input
                                    id="YouTube-player-progress"
                                    type="range"
                                    value={this.state.valueTime}
                                    min="0"
                                    max="100"
                                    step="any"
                                    onChange={this.youTubePlayerCurrentTimeChange}
                                    onInput={this.youTubePlayerDisplayInfos}  
                                    />
                            </div>
                        </div>
                        </div>
                    </div>
                    <div ></div>
                </div>
            </div>
        )
    }
}

