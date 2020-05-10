import React from "react";

export default (props) => {
    return (
        <button type="box"
                className="btn btn-danger btn-sm"
                onClick={props.changeSliderValue}
        >
            {props.symbol}
        </button>
    )
}

