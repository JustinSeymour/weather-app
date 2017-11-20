import { Injectable } from "@angular/core";
import { Jsonp } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch'

import { FORECAST_KEY, FORECAST_ROOT } from "../constants/constant";

@Injectable()
export class WeatherService {

    constructor(private jsonp: Jsonp) { }

    getCurrentLocation(): [string,string] {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                console.log("Position: ", pos.coords.latitude, ",", pos.coords.longitude); // TODO: remove
                return [pos.coords.latitude, pos.coords.longitude];
            },
            err => console.error("Unable to get the location - ", err));
        } else {
            console.error("Geolocation is not available");
            return ["0","0"]
        }
    }

    getCurrentWeather(lat: number, long: number): Observable<any> {
        const url = FORECAST_ROOT + FORECAST_KEY + "/" + lat + "," + long;
        const queryParams = "?callback=JSONP_CALLBACK";
        return this.jsonp.get(url + queryParams)
        .map(data => data.json())
        .catch(err => {
            console.error("Unable to get weather data - ", err);
            return Observable.throw(err.json())
        });
    }
 }
