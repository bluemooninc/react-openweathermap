import React from 'react';
import axios from "axios";

const API_ENDPOINT = 'http://api.openweathermap.org/data/2.5/forecast';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey : 'YOUR_API_KEY',
            place : 'Tokyo,jp',
            city: '',
            response : []
        };
    }
    handleGetWeather(){
        axios
            .get(API_ENDPOINT, {
                params: {
                    q: this.state.place,
                    APPID: this.state.apiKey
                } })
            .then(res => {
                console.log(res);
                this.setState({
                    response: res.data.list,
                    city: res.data.city.name
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        console.log(this.state.response);
        return (
            <div>
                <h1 className="app-title">Weather report</h1>
                <input
                    type="button"
                    value="Search"
                    onClick={() => this.handleGetWeather()}
                />
                <p> Location: {this.state.city} </p>
                {Object.keys(this.state.response).map(key => (
                    <li key={key}>
                        {this.state.response[key].dt_txt}
                        ,
                        {this.state.response[key].weather[0].main}
                    </li>
                ))}
            </div>
        );
    }
}
