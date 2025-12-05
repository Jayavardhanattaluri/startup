// This file initializes Mapbox for backend services, exporting the configuration needed to use Mapbox APIs.

import MapboxClient from '@mapbox/mapbox-sdk';

const mapboxAccessToken = process.env.MAPBOX_ACCESS_TOKEN;

if (!mapboxAccessToken) {
    throw new Error('Mapbox access token is not defined in the environment variables.');
}

const mapboxClient = MapboxClient({ accessToken: mapboxAccessToken });

export { mapboxClient };