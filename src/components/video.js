import React from 'react';

const BASE_URL = "https://www.youtube.Com/embed/";

const Video = ({ videoId }) => {
    return (
        <div>
            <h2>Film à la une</h2>
            <div className="embed-responsive embed-responsive-16by9 mb-3">
                <iframe className="embed-responsive-item" src={`${BASE_URL}${videoId}`} />
            </div>
        </div>

    );
}

export default Video;