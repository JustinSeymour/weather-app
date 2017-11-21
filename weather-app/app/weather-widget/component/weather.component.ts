import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../service/weather.service';

import { Weather } from '../model/weather';

declare var Skycons: any;

@Component({
    moduleId: module.id,
    selector: 'weather-widget',
    templateUrl: 'weather.component.html',
    styleUrls: ['weather.component.css'],
    providers: [WeatherService]
})

export class WeatherComponent implements OnInit {

    pos: Position;
    weatherData = new Weather(null,null,null,null,null);
    currentSpeedUnit = "kph";
    currentTempUnit = "celcius";
    currentLocation = "";
    icons = new Skycons({ "color": "#FFF" });



    constructor(private service: WeatherService) {
        
    }

    ngOnInit() {
        this.getCurrentLocation();
    }

    getCurrentLocation() {
        this.service.getCurrentLocation()
        .subscribe(position => {
            this.pos = position;
            this.getCurrentWeather();
            this.getLocationName();
        },
        err => console.error(err));
    }

    getCurrentWeather() {
        this.service.getCurrentWeather(this.pos.coords.latitude, this.pos.coords.longitude)
        .subscribe(weather => {
            this.weatherData.temp = weather["currently"]["temperature"],
            this.weatherData.summary = weather["currently"]["summary"],
            this.weatherData.wind = weather["currently"]["windSpeed"],
            this.weatherData.humidity = weather["currently"]["humidity"],
            this.weatherData.icon = weather["currently"]["icon"]
            console.log("Weather: ", this.weatherData);
            this.setIcon();
        },
        err => console.error(err));
    }

    getLocationName() {
        this.service.getLocationName(this.pos.coords.latitude, this.pos.coords.longitude)
            .subscribe(location => {
                this.currentLocation = location["results"][2]["formatted_address"];
            });
    }

    toggleUnits() {
        this.toggleSpeedUnits();
        this.toggleTempUnits();
    }

    toggleTempUnits() {
        if(this.currentTempUnit == "fahrenheit" ) {
            this.currentTempUnit = "celcius";
        } else {
            this.currentTempUnit = "fahrenheit";
        }
    }

    toggleSpeedUnits() {
        if(this.currentSpeedUnit == "kph") {
            this.currentSpeedUnit = "mph";
        } else {
            this.currentSpeedUnit = "kph";
        }
    }

    setIcon() {
        this.icons.add("icon", this.weatherData.icon);
        this.icons.play();
    }
 }