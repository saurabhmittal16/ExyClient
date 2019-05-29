import React from 'react';

const NoData = props => {
    return (
        <div className="loading">
            No {props.title}
        </div>
    );
};

export default NoData;