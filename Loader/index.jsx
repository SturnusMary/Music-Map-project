import React from 'react';
import s from './stylesheet.scss';

export class Loader extends React.Component {
    
    render() {
        return (
            <div  className='loader-wrapper' style={{ display: this.props.isLoading ? 'block' : 'none'}}>
                <div className="record_case">
                    <div className="record recorddefault">
                        <div className="front">
                            <img src="https://images-na.ssl-images-amazon.com/images/I/519S4-MWr5L.jpg" height="269"/>
                            <div className="cover"></div>
                            <div className="cover-back"></div>
                        </div>
                        <div className="vinyl"></div>
                        <div className="back">
                            <img src="https://i3.cdn.hhv.de/catalog/shop_detail_zoom/00601/601243.jpg" height="269"/>
                        </div>
                        <div className="right"></div>
                        <div className="left"></div>
                        <div className="top"></div>
                        <div className="bottom"></div>
                    </div>
                </div>
            </div>
        )
    }
}