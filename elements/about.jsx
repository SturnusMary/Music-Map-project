import React from 'react';
import PropTypes from 'prop-types';
//import male from "../img/male.svg";
import aboutBG from "../img/about-head.jpg";
import s from './about.scss'

export class Aboute extends React.Component {
    constructor() {
        super()
        this.usersList = ['SturnusMary', 'VlasenkoErroga'];
        this.users = [];
        // this.getDataGit = this
        //     .getDataGit
        //     .bind(this)
        // this.statusSuccsess = this
        //     .statusSuccsess
        //     .bind(this)
        // this.getUser()
    }

    // getDataGit(user) {
    //     fetch(`https://api.github.com/users/${user}`)
    //         .then(
    //             response => this.statusSuccsess(response)
    //         )
    //         .then(response => this.getUserData(response))
    //         .catch(error => console.log(error))
    //     }

    // statusSuccsess(response) {
    //     if (response.status != 200) {
    //         return console.log(response)
    //     } else {
    //         return response.json()
    //     }
    // }

    // getUser() {
    //     for (let i = 0; i < this.usersList.length; i++) {
    //         this.getDataGit(this.usersList[i])
    //     }
    //     return
    // }

    // getUserData(data) {
    //     console
    //         .log
    //         this
    //         .users
    //         .push(data)
    //     console.group(this.users)
    // }

    ModalClose(){
        document.getElementById('modal-about').classList.remove('show');
      setTimeout(()=>{
        document.getElementById('modal-about').classList.add('d-none');
      }, 1000)
        
    }

    render() {
        return (
            <React.Fragment>
                <div className="about-wrapper d-none" id="modal-about">
                    <div className="about-modal">
                        <div className="about-close">&times;</div>

                        <div className="about-header">
                            <div className="about-header-logo">
                                <img src={aboutBG} alt="Music map"/>
                            </div>
                        </div>

                        <div className="about-body">
                            <div className="about-body-wrapper">

                            <button className="about-close" onClick={this.ModalClose}>&times;</button>

                                <div className="about-body-wrapper-cut">
                                <div className="about-repos">
                                    <div className="about-repos-title">
                                        <a href="https://github.com/SturnusMary/Music-Map-project" target="blank">About project</a>
                                    </div>
                                    <div className="about-repos-description">
                                        <p>You can choose a random country and a decade and as a result hear music
                                            suitable for the selected criteria and find out information about it.</p>
                                    </div>
                                </div>

                                <div className="user-contacts">
                                  <div className="user-contacts-title">
                                  Contacts
                                  </div>

                                    <div className="user-wrapper">

                                        <div className="user">
                                            <div className="user-avatar">
                                                <img src='https://avatars1.githubusercontent.com/u/13038323?s=460&v=4'/>
                                            </div>
                                            <div className="user-name">
                                                <a href="https://github.com/VlasenkoErroga" target="blank">VlasenkoErroga</a>
                                            </div>
                                            <div className="user-contact">
                                                <a href={`mailto:vlasenko.erroga@gmail.com`}>vlasenko.erroga@gmail.com</a>
                                            </div>
                                        </div>

                                        <div className="user">
                                            <div className="user-avatar">
                                                <img src='https://avatars1.githubusercontent.com/u/50712899?s=460&v=4'/>
                                            </div>
                                            <div className="user-name">
                                                <a href="https://github.com/SturnusMary" target="blank">SturnusMary</a>
                                            </div>
                                            <div className="user-contact">
                                                <a href={`mailto:dp280793sms@gmail.com`}>dp280793sms@gmail.com</a>
                                            </div>
                                        </div>
                                    </div>
                               
                                </div>
                            </div>
                                </div>
                                
                                

                            <div className="about-footer">
        <div className="copyrught">copiright © {new Date().getFullYear()} year</div>
                            </div>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        )
    }
}

Aboute.propType = {}