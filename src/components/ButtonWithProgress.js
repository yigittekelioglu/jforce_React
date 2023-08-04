import React from 'react';

const ButtonWithProgress = (props) => {

    const {onClick, pendingApiCall, disabled} = props;

    return (
        <button className="mt-3 btn btn-secondary" onClick={onClick} disabled={disabled}> {pendingApiCall && <span className="spinner-border spinner-border-sm"></span> } 
            Sign Up
        </button>
    );
};

export default ButtonWithProgress;