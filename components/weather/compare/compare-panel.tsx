"use client";

import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWeather } from "@/components/weather/state/weather-context";
import {
  fetchWeekendCompare,
  type WeekendCompareResponse,
} from "@/lib/api/client";
import { t, uk } from "@/lib/i18n";

export function ComparePanel() {
  const { pins, compareOpen, setCompareOpen, setLocation } = useWeather();
  const [data, setData] = useState<WeekendCompareResponse | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadCompare = useCallback(() => {
    if (!compareOpen || pins.length < 2) return;
    setLoading(true);
    setError(false);
    void fetchWeekendCompare(pins)
      .then(setData)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [compareOpen, pins]);

  useEffect(() => {
    if (compareOpen && pins.length < 2) {
      setCompareOpen(false);
      setData(null);
      setError(false);
      setLoading(false);
      return;
    }
    if (!compareOpen || pins.length < 2) return;
    loadCompare();
  }, [compareOpen, pins, setCompareOpen, loadCompare]);

  if (!compareOpen || pins.length < 2) return null;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{t("pins.compare")}</CardTitle>
        <Button type="button" variant="outline" size="sm" onClick={() => setCompareOpen(false)}>
          ×
        </Button>
      </CardHeader>
      <CardContent>
        {loading && <p className="text-sm text-muted-foreground">{t("forecast.loading")}</p>}
        {error && (
          <div className="flex flex-col items-center gap-3 text-sm text-muted-foreground">
            <p>{t("forecast.providerUnavailable")}</p>
            <Button type="button" variant="outline" size="sm" onClick={loadCompare}>
              {t("search.retry")}
            </Button>
          </div>
        )}
        {data && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr>
                  {data.columns.map((col) => (
                    <th key={col.location.name} className="sticky top-0 bg-card p-2">
                      <div className="font-semibold">{col.location.name}</div>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="mt-1"
                        onClick={() => setLocation(col.location)}
                      >
                        {t("pins.makeActive")}
                      </Button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  {data.columns.map((col) => (
                    <td key={`sat-${col.location.name}`} className="p-2 align-top">
                      <div className="text-xs text-muted-foreground">
                        {uk.weekdays.Saturday}
                      </div>
                      <div>
                        {Math.round(col.saturday.temperature_max_c)}° /{" "}
                        {Math.round(col.saturday.temperature_min_c)}°C
                      </div>
                      <div>{col.saturday.precipitation_probability_percent}%</div>
                      <div>{col.saturday.comfort.value}</div>
                    </td>
                  ))}
                </tr>
                <tr>
                  {data.columns.map((col) => (
                    <td key={`sun-${col.location.name}`} className="p-2 align-top">
                      <div className="text-xs text-muted-foreground">
                        {uk.weekdays.Sunday}
                      </div>
                      <div>
                        {Math.round(col.sunday.temperature_max_c)}° /{" "}
                        {Math.round(col.sunday.temperature_min_c)}°C
                      </div>
                      <div>{col.sunday.precipitation_probability_percent}%</div>
                      <div>{col.sunday.comfort.value}</div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
