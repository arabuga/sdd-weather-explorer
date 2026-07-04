"use client";

import { useCallback, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import { Button } from "@/components/ui/button";
import { useWeather } from "@/components/weather/state/weather-context";
import {
  fetchReverseGeocode,
  ApiClientError,
} from "@/lib/api/client";
import { t } from "@/lib/i18n";

const defaultCenter: [number, number] = [49.0, 31.0];

const markerIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapClickHandler({
  onClick,
}: {
  onClick: (lat: number, lon: number) => void;
}) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

function RecenterMap({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export function WeatherMapInner() {
  const { location, setLocation } = useWeather();
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [lastClick, setLastClick] = useState<[number, number] | null>(null);
  const [markerPos, setMarkerPos] = useState<[number, number] | null>(
    location ? [location.latitude, location.longitude] : null,
  );

  useEffect(() => {
    if (location) {
      setMarkerPos([location.latitude, location.longitude]);
    }
  }, [location]);

  const handleMapClick = useCallback(
    async (lat: number, lon: number) => {
      setLastClick([lat, lon]);
      setPending(true);
      setError(null);
      try {
        const place = await fetchReverseGeocode(lat, lon);
        setLocation(place);
        setMarkerPos([lat, lon]);
      } catch (err) {
        setError(
          err instanceof ApiClientError && err.status === 422
            ? t("map.reverseFailed")
            : t("search.providerUnavailable"),
        );
      } finally {
        setPending(false);
      }
    },
    [setLocation],
  );

  const center: [number, number] = markerPos ?? defaultCenter;
  const zoom = location ? 8 : 6;

  return (
    <div className="relative">
      <MapContainer
        center={center}
        zoom={zoom}
        className="h-[280px] w-full z-0"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <RecenterMap center={center} zoom={zoom} />
        <MapClickHandler onClick={(lat, lon) => void handleMapClick(lat, lon)} />
        {markerPos && location && (
          <Marker position={markerPos} icon={markerIcon}>
            <Popup>{location.name}</Popup>
          </Marker>
        )}
      </MapContainer>
      <p className="bg-card px-2 py-1 text-xs text-muted-foreground">
        {t("map.attribution")}
      </p>
      {error && lastClick && (
        <div className="absolute bottom-10 left-2 right-2 rounded-lg bg-card/95 p-2 text-sm shadow">
          <p>{error}</p>
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="mt-1"
            disabled={pending}
            onClick={() => void handleMapClick(lastClick[0], lastClick[1])}
          >
            {t("search.retry")}
          </Button>
        </div>
      )}
    </div>
  );
}
