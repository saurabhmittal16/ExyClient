import React from 'react';

const LoadingOverlay = (props) => {
    return (
        <div
            style={{
                position: 'fixed',
                width: '100%',
                height: '100%', 
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0,0.3)', 
                zIndex: '2',
                color: 'white',
                display: props.active ? 'table' : 'none'
            }}
        >
            <p 
                style={{
                    textAlign: 'center',
                    verticalAlign: 'middle',
                    display: 'table-cell'
                }}
            >
                Please wait...
            </p>
        </div>
    )
}

export default LoadingOverlay;