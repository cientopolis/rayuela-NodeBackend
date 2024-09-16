import { Polygon } from 'geojson';
import { GeoUtils } from './geoUtils';

jest.mock('@turf/turf');

describe('GeoUtils', () => {
  let polygonGeoJSON: Polygon;
  let featureGeoJSON: any;

  beforeEach(() => {
    featureGeoJSON = {
      type: 'FeatureCollection',
      features: [
        {
          id: '0',
          type: 'Feature',
          properties: {
            cid: '0',
            pos: 'left',
            gid: '264890',
            source_object: 'Acueducto',
            source_gna: 'Acueducto',
          },
          geometry: {
            type: 'Polygon',
            coordinates: [
              [
                [-81, 41],
                [-81, 47],
                [-72, 47],
                [-72, 41],
                [-81, 41],
              ],
            ],
          },
        },
      ],
    };

    polygonGeoJSON = featureGeoJSON.features[0].geometry;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return true if the point is inside the polygon', () => {
    const result = GeoUtils.isPointInPolygon(-77, 44, polygonGeoJSON);

    expect(result).toBe(true);
  });

  it('should return false if the point is outside the polygon', () => {
    const result = GeoUtils.isPointInPolygon(-69.9555, 48.0032, polygonGeoJSON);

    expect(result).toBe(false);
  });

  it('should handle edge cases where the point is on the boundary', () => {
    const result = GeoUtils.isPointInPolygon(-81, 47, polygonGeoJSON);

    expect(result).toBe(true);
  });
});
