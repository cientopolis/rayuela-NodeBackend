import { Polygon } from 'geojson';
import { point } from '@turf/helpers';
import { booleanPointInPolygon } from '@turf/boolean-point-in-polygon';

export class GeoUtils {
  static isPointInPolygon(
    longitude: number,
    latitude: number,
    polygonGeoJSON: Polygon,
  ): boolean {
    // Crear un punto con las coordenadas proporcionadas
    const mapPoint = point([longitude, latitude]);

    // Verificar si el punto está dentro del polígono
    return booleanPointInPolygon(mapPoint, polygonGeoJSON, {
      ignoreBoundary: false,
    });
  }
}