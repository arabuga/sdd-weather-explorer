"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useWeather } from "@/components/weather/state/weather-context";
import { fetchReverseGeocode } from "@/lib/api/client";
import { t } from "@/lib/i18n";

export function GeolocationControl() {
  const { setLocation } = useWeather();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (!navigator.geolocation) {
      setMessage(t("geolocation.denied"));
      return;
    }
    setLoading(true);
    setMessage(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const place = await fetchReverseGeocode(
            pos.coords.latitude,
            pos.coords.longitude,
          );
          setLocation(place);
        } catch {
          setMessage(t("map.reverseFailed"));
        } finally {
          setLoading(false);
        }
      },
      () => {
        setMessage(t("geolocation.denied"));
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
        <p className="mt-2 text-sm text-muted-foreground" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
