import React from "react";

//dinamik bir input alma fonksiyonu

export const Input = (props) => {
    const {label, error, name, onChange, type} = props;
    const className = error ? "form-control is-invalid" : "form-control";
    return (
        <div className="mt-3">
            <label>{label}</label>
            <input className={className} name={name} onChange={onChange} type={type}></input>
            <div className="invalid-feedback">{error}</div>
        </div>
    );
}