import React from 'react';
import VideoListItem from "../components/video-list-item";

const VideoList = (props) => {
    const {moviesList} = props;

    function receiveCallBack(movie) {
        props.callback(movie);
    }

    return (
        <div>

            <h2 className="mb-3">Films les plus populaires</h2>
            <ul className="list-unstyled">
                {
                    moviesList.map(movie => {
                        return <VideoListItem key={movie.id.toString()} movie={movie} callback={receiveCallBack}/>;
                    })
                }
            </ul>
        </div>
    );
}
export default VideoList;