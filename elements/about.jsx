import React from 'react';
import PropTypes from 'prop-types';


export class Aboute extends React.Component {
    constructor(){
        super()
        this.getDataGit()

    }

    getDataGit(){
        fetch('https://api.github.com/users/:SturnusMary')
        .then(response => {
            successResponse => {
                if (successResponse.status != 200) {
                  return null;
                } else {
                  return successResponse.json();
                }
              },
              failResponse => {
                return null;
              }
            })
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }




  render(){
    return(
        <React.Fragment>
        <div className="aboute" id="modal-aboute">
            <div className="wrapper-modal">
                <div className="user">
                <div className="git-logo">
                    <img src="#" alt=""/>
                </div>
                <span className="name"></span>

                </div>
               
               

            </div>
        </div>
        </React.Fragment>
    )
  }
}

Aboute.propType = {

}