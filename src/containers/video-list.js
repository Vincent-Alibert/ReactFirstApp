import React from 'react';
import VideoListItem from "../components/video-list-item";

const VideoList = () => {
    const movies = ["film 1", "film 2", "film 3", "film 4"];

    return (
        <div id="list-item">
            <ul>
                {
                    movies.map(movie => {
                        return <VideoListItem key={movie.toString()} name={movie} />;
                    })
                }
            </ul>
        </div>
    );
}
export default VideoList;