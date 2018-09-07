import React, { Component } from "react";
import SearchBar from "../components/search-bar";
import VideoList from "./video-list";
import VideoDetail from "../components/video-detail";
import Video from "../components/video";

import axios from "axios";

const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false";
const API_KEY = "api_key=d8e0f9289def1449a63123baab64e6fc";
const SEARCH_URL = "search/movie?language=fr&include_adulte=false";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moviesList: [],
            currentMovie: null
        };
    }

    componentDidMount() {
        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
            .then(response => {
                this.setState({ moviesList: response.data.results.slice(1, 6), currentMovie: response.data.results[0] },function () {
                        this.applyVideoToCurrentMovie();
                    }
                );
            });
    }

    applyVideoToCurrentMovie() {
        axios.get(
                `${API_END_POINT}movie/${
                this.state.currentMovie.id
                }?${API_KEY}&append_to_response=videos&include_adult=false`
            )
            .then(response => {
                const youtubeKey = response.data.videos.results[0].key;
                let newCurrentMovieState = this.state.currentMovie;
                newCurrentMovieState.videoId = youtubeKey;
                this.setState({ currentMovie: newCurrentMovieState });
            });
    }

    onClickListItem(movie) {
        this.setState({ currentMovie: movie }, function () {
            this.applyVideoToCurrentMovie();
            this.setRecommandation();
        });
    }

    setRecommandation() {
        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`)
            .then(response => {
                this.setState({moviesList: response.data.results.slice(0, 5) });
            });
    }

    onClickSearch(searchText) {
        if (searchText) {
            axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`)
                .then(response => {
                    if (response.data && response.data.results[0]) {
                        if (response.data.results[0].id != this.state.currentMovie.id) {
                            this.setState({currentMovie : response.data.results[0]}, ()=> {
                                this.applyVideoToCurrentMovie();
                                this.setRecommandation();
                            });
                        }
                    }
                });
        }
    }

    render() {
        const renderMovieList = () => {
            if (this.state.moviesList.length > 0) {
                return <VideoList moviesList={this.state.moviesList} callback={this.onClickListItem.bind(this)} />;
            }
        };

        const renderCurrentMovie = () => {
            if (this.state.currentMovie != null) {
                return (
                    <VideoDetail
                        title={this.state.currentMovie.title}
                        description={this.state.currentMovie.overview}
                    />
                );
            }
        };

        const renderCurrentVideo = () => {
            if (this.state.currentMovie != null) {
                return <Video videoId={this.state.currentMovie.videoId} />;
            }
        };

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <SearchBar callback={this.onClickSearch.bind(this)} />
                    </div>
                    <div className="col-lg-8">
                        {renderCurrentVideo()}
                        {renderCurrentMovie()}
                    </div>
                    <div className="col-lg-4">
                        {renderMovieList()}
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
