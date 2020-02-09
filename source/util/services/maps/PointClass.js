import { CoordinatesClass } from '../../../models/util/CoordinatesClass.js'
import {} from '..'

export class PointClass{
    constructor(name, description, coordinates){
        this.name = name
        this.description = description
        this.coordinates = new CoordinatesClass(coordinates)
    }
}