import React from 'react';

const VideoDetail = ({ title, description }) => (
    <div className="row">
        <div className="col-12 ">
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    </div>
);

export default VideoDetail;