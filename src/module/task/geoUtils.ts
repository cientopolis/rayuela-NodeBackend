import * as turf from '@turf/turf';
import { Polygon } from 'geojson';

export class GeoUtils {
  static isPointInPolygon(longitude: number, latitude: number, polygonGeoJSON: Polygon): boolean {
    // Crear un punto con las coordenadas proporcionadas
    const point = turf.point([longitude, latitude]);

    // Verificar si el punto está dentro del polígono
    return turf.booleanPointInPolygon(point, polygonGeoJSON);
  }
}
