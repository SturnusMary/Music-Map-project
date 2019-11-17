import React from 'react';
import s from './stylesheet.scss';
import PropTypes from 'prop-types';

export function Loader(props) {
    return (
        <div
            className='loader-wrapper'
            style={{
                display: props.isLoading
                    ? 'block'
                    : 'none'
            }}>
            <div className="loader">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    )
}

Loader.propType = {
    isLoading: PropTypes.bool
}