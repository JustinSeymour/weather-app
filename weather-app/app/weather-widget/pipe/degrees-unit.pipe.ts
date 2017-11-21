import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name: 'degreeUnit'
})

export class DegreeUnit implements PipeTransform {

    transform(degrees: number, unitType: string ) {
        if(unitType == "celcius") {
            const celciusValue = (degrees  - 32) * 0.5556;
            return celciusValue;
        } else {
            return degrees;
        }
    }

}