"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  fetchForecast,
  type ActiveLocation,
  type ForecastBundle,
} from "@/lib/api/client";
import { addPinToList, locationKey } from "@/lib/pins";
import {
  decodeLocation,
  encodeLocationSearchParams,
} from "@/lib/url-state";

export type ForecastStatus = "idle" | "loading" | "ready" | "error";

export interface WeatherContextValue {
  location: ActiveLocation | null;
  setLocation: (loc: ActiveLocation | null) => void;
  forecast: ForecastBundle | null;
  forecastStatus: ForecastStatus;
  reloadForecast: () => Promise<void>;
  pins: ActiveLocation[];
  addPin: (loc: ActiveLocation) => boolean;
  removePin: (name: string) => void;
  clearPins: () => void;
  compareOpen: boolean;
  setCompareOpen: (open: boolean) => void;
}

const WeatherContext = createContext<WeatherContextValue | null>(null);

export function WeatherProvider({ children }: { children: ReactNode }) {
  const [location, setLocationState] = useState<ActiveLocation | null>(null);
  const [forecast, setForecast] = useState<ForecastBundle | null>(null);
  const [forecastStatus, setForecastStatus] = useState<ForecastStatus>("idle");
  const [pins, setPins] = useState<ActiveLocation[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const cacheKeyRef = useRef<string | null>(null);
  const initializedRef = useRef(false);

  const syncUrl = useCallback((loc: ActiveLocation | null) => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    if (loc) {
      const params = encodeLocationSearchParams(loc);
      url.search = params.toString();
    } else {
      url.search = "";
    }
    window.history.replaceState(null, "", url.toString());
  }, []);

  const loadForecast = useCallback(async (loc: ActiveLocation) => {
    const key = locationKey(loc.latitude, loc.longitude);

    setForecastStatus("loading");
    setForecast(null);
    cacheKeyRef.current = key;

    try {
      const bundle = await fetchForecast(loc);
      if (cacheKeyRef.current === key) {
        setForecast(bundle);
        setForecastStatus("ready");
      }
    } catch {
      if (cacheKeyRef.current === key) {
        setForecastStatus("error");
      }
    }
  }, []);

  const setLocation = useCallback(
    (loc: ActiveLocation | null) => {
      setLocationState(loc);
      syncUrl(loc);
      if (loc) {
        void loadForecast(loc);
      } else {
        setForecast(null);
        setForecastStatus("idle");
        cacheKeyRef.current = null;
      }
    },
    [loadForecast, syncUrl],
  );

  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    const params = new URLSearchParams(window.location.search);
    const decoded = decodeLocation(params);
    if (decoded.ok) {
      setLocationState(decoded.location);
      void loadForecast(decoded.location);
    }
  }, [loadForecast]);

  const reloadForecast = useCallback(async () => {
    if (!location) return;
    cacheKeyRef.current = null;
    await loadForecast(location);
  }, [location, loadForecast]);

  const addPin = useCallback((loc: ActiveLocation): boolean => {
    let added = false;
    setPins((prev) => {
      const result = addPinToList(prev, loc);
      added = result.added;
      return result.pins;
    });
    return added;
  }, []);

  const removePin = useCallback((name: string) => {
    setPins((prev) => prev.filter((p) => p.name !== name));
  }, []);

  const clearPins = useCallback(() => {
    setPins([]);
    setCompareOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      location,
      setLocation,
      forecast,
      forecastStatus,
      reloadForecast,
      pins,
      addPin,
      removePin,
      clearPins,
      compareOpen,
      setCompareOpen,
    }),
    [
      location,
      setLocation,
      forecast,
      forecastStatus,
      reloadForecast,
      pins,
      addPin,
      removePin,
      clearPins,
      compareOpen,
    ],
  );

  return (
    <WeatherContext.Provider value={value}>{children}</WeatherContext.Provider>
  );
}

export function useWeather(): WeatherContextValue {
  const ctx = useContext(WeatherContext);
  if (!ctx) throw new Error("useWeather must be used within WeatherProvider");
  return ctx;
}
