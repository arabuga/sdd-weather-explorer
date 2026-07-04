"use client";

import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { useWeather } from "@/components/weather/state/weather-context";
import { ApiClientError, fetchReverseGeocode } from "@/lib/api/client";
import { t } from "@/lib/i18n";

export function GeolocationControl() {
  const { setLocation } = useWeather();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastCoords, setLastCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  const resolvePlace = useCallback(
    async (latitude: number, longitude: number) => {
      setLoading(true);
      setMessage(null);
      setLastCoords({ latitude, longitude });
      try {
        const place = await fetchReverseGeocode(latitude, longitude);
        setLocation(place);
        setLastCoords(null);
      } catch (err) {
        setMessage(
          err instanceof ApiClientError && err.status === 503
            ? t("search.providerUnavailable")
            : t("map.reverseFailed"),
        );
      } finally {
        setLoading(false);
      }
    },
    [setLocation],
  );

  const handleClick = () => {
    if (!navigator.geolocation) {
      setMessage(t("geolocation.denied"));
      return;
    }
    setLoading(true);
    setMessage(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        void resolvePlace(pos.coords.latitude, pos.coords.longitude);
      },
      () => {
        setMessage(t("geolocation.denied"));
        setLastCoords(null);
        setLoading(false);
      },
    );
  };

  return (
    <div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={handleClick}
        disabled={loading}
      >
        {t("geolocation.useMyLocation")}
      </Button>
      {message && (
        <div className="mt-2 space-y-2">
          <p className="text-sm text-muted-foreground" role="status">
            {message}
          </p>
          {lastCoords && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={loading}
              onClick={() =>
                void resolvePlace(lastCoords.latitude, lastCoords.longitude)
              }
            >
              {t("search.retry")}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
