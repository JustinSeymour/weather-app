import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JsonpModule, HttpModule } from "@angular/http";

import { AppComponent } from './app.component';
import { WeatherComponent } from "./weather-widget/component/weather.component";

import { SpeedUnitPipe } from './weather-widget/pipe/speed-unit.pipe';
import { DegreeUnit } from './weather-widget/pipe/degrees-unit.pipe';

@NgModule({ 
    imports: [ BrowserModule, JsonpModule, HttpModule ],
    declarations: [ AppComponent, WeatherComponent, SpeedUnitPipe, DegreeUnit ],
    bootstrap: [ AppComponent ]
})

export class AppModule { }