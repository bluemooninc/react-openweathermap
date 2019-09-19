import React from 'react';
import axios from "axios";

const GEOCODE_ENDPOINT = 'http://api.openweathermap.org/data/2.5/forecast';

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiKey : '888396efbfb7afd76d04294acddbf3b6',
            place : 'Tokyo,jp',
            city: '',
            response : []
        };
    }
    handleGetLatAndLng(){
        // Google Maps APIが指定した必須パラメータ(この場合はaddress)をparamsに渡す。
        axios
            .get(GEOCODE_ENDPOINT, {
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
                    value="経度・緯度を検索"
                    onClick={() => this.handleGetLatAndLng()}
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