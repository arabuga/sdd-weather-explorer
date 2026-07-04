"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useWeather } from "@/components/weather/state/weather-context";
import { t } from "@/lib/i18n";
import { canOpenCompare } from "@/lib/pins";

export function PinChips() {
  const { location, pins, addPin, removePin, setCompareOpen } = useWeather();
  const [message, setMessage] = useState("");

  const handlePin = () => {
    if (!location) return;
    const ok = addPin(location);
    if (!ok) {
      setMessage(t("pins.tooMany"));
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const compareAvailable = canOpenCompare(pins.length);

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {location && (
          <Button type="button" variant="outline" size="sm" onClick={handlePin}>
            {t("pins.pin")} {location.name}
          </Button>
        )}
        {pins.map((pin) => (
          <span
            key={`${pin.latitude}-${pin.longitude}`}
            className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-3 py-1 text-xs"
          >
            {pin.flag_emoji} {pin.name}
            <button
              type="button"
              className="ml-1 text-muted-foreground hover:text-foreground"
              onClick={() => removePin(pin.name)}
              aria-label={`${t("pins.unpin")} ${pin.name}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      {message && <p className="text-xs text-amber-600">{message}</p>}
      {!compareAvailable && pins.length > 0 && (
        <p className="text-xs text-muted-foreground" role="status">
          {t("pins.compareDisabled")}
        </p>
      )}
      <Button
        type="button"
        size="sm"
        disabled={!compareAvailable}
        onClick={() => setCompareOpen(true)}
      >
        {t("pins.compare")}
      </Button>
    </div>
  );
}
