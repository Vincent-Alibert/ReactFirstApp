import React, { Component } from "react";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            placeHolder: "Tapez votre film ..."
        };
    }

    handleChange(evt) {
        this.setState({ searchText: evt.target.value });
    }

    handleOnClick(evt){
        this.props.callback(this.state.searchText);      
    }

    render() {
        return (
            <div className="row">
                <div className="mt-5 mb-3 col-12 input-group">
                    <input
                        className="form-control" onChange={this.handleChange.bind(this)} placeholder={this.state.placeHolder} />
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" onClick={this.handleOnClick.bind(this)} type="button">Rechercher</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchBar;
