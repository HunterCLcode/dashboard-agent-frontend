import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { interpolateBlues } from 'd3-scale-chromatic';

const GEO_URL =
  'https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/brazil-states.geojson';

interface MapChartProps {
  data: Record<string, unknown>[];
  x_key: string;
  y_key: string;
}

export function MapChart({ data, x_key, y_key }: MapChartProps) {
  const valueMap = new Map<string, number>(
    data.map(row => [String(row[x_key]), Number(row[y_key])])
  );
  const values = [...valueMap.values()];
  const min = Math.min(...values);
  const max = Math.max(...values);

  function getColor(stateCode: string) {
    const v = valueMap.get(stateCode);
    if (v === undefined) return '#e2e8f0';
    const t = (v - min) / (max - min || 1);
    return interpolateBlues(0.2 + t * 0.8);
  }

  return (
    <div style={{ height: 240 }}>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [-54, -15], scale: 680 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map(geo => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={getColor(geo.properties.sigla)}
                stroke="#fff"
                strokeWidth={0.5}
                style={{
                  default: { outline: 'none' },
                  hover: { outline: 'none', opacity: 0.85 },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
