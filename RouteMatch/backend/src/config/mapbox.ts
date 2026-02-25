interface MapboxConfig {
  accessToken: string;
}

let mapboxConfig: MapboxConfig | null = null;

export const initializeMapbox = (): void => {
  const token = process.env.MAPBOX_ACCESS_TOKEN;
  mapboxConfig = token ? { accessToken: token } : null;
};

export const getMapboxConfig = (): MapboxConfig | null => mapboxConfig;
