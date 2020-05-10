import React from "react";

export default (props) => {
    return (
        <button type="box"
                // className="btn btn-danger btn-sm"
                className="sliderButtons"
                id={props.id}
                onClick={props.changeSliderValue}
        >
            {props.symbol}
        </button>
    )
}

