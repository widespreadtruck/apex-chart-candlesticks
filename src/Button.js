import React from 'react';

const Button = ({ children, period, setPeriodToDisplay }) => {
    const handleClick = () => {
        setPeriodToDisplay(period)
    };

    return (
        <button
            onClick={handleClick}
            period={period}>
            {children}
        </button>
    )
}

export default Button;
