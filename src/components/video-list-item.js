import React from 'react';

const IMG_PATH = "https://image.tmdb.org/t/p/w500/";

const VideoListItem = (props) => {
    const { movie } = props;

    function handleOnClick() {
        props.callback(movie);        
    }

    return (
        <li className="list-group-item" onClick={handleOnClick}>
            <div className="media">
                <img className="rounded" width="100px" src={`${IMG_PATH}${movie.poster_path}`} alt={movie.title} />
                <div className="media-body m-auto">
                    <h5 className="ml-5">{movie.title}</h5>
                </div>
            </div>
        </li>
    )
}

export default VideoListItem;