"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWeather } from "@/components/weather/state/weather-context";
import {
  fetchGeocodeSuggestions,
  type ActiveLocation,
} from "@/lib/api/client";
import { t } from "@/lib/i18n";
import {
  classifySearchOutcome,
  type SearchState,
} from "@/lib/ui/search-state";

export function CitySearch() {
  const { setLocation } = useWeather();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<ActiveLocation[]>([]);
  const [state, setState] = useState<SearchState>("idle");
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const runSearch = useCallback(async (q: string) => {
    if (q.trim().length < 2) {
      setSuggestions([]);
      setState("idle");
      return;
    }
    setState("loading");
    try {
      const result = await fetchGeocodeSuggestions(q);
      setSuggestions(result.items);
      setState(classifySearchOutcome(result.items.length, false));
    } catch {
      setSuggestions([]);
      setState(classifySearchOutcome(0, true));
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => void runSearch(query), 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, runSearch]);

  const selectSuggestion = (item: ActiveLocation) => {
    setLocation(item);
    setQuery(item.name);
    setSuggestions([]);
    setState("idle");
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && suggestions.length === 1) {
      selectSuggestion(suggestions[0]);
    }
  };

  return (
    <div className="relative w-full">
      <label htmlFor="city-search" className="sr-only">
        {t("search.placeholder")}
      </label>
      <Input
        id="city-search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={t("search.placeholder")}
        autoComplete="off"
        aria-expanded={suggestions.length > 0}
        aria-controls="city-suggestions"
      />

      {state === "empty" && (
        <p className="mt-2 text-sm text-muted-foreground" role="status">
          {t("search.nothingFound")}
        </p>
      )}

      {state === "error" && (
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground" role="alert">
          <span>{t("search.providerUnavailable")}</span>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => void runSearch(query)}
          >
            {t("search.retry")}
          </Button>
        </div>
      )}

      {suggestions.length > 0 && (
        <ul
          id="city-suggestions"
          className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-border bg-card shadow-lg"
          role="listbox"
        >
          {suggestions.map((item) => (
            <li key={`${item.latitude}-${item.longitude}`}>
              <button
                type="button"
                className="flex w-full items-center gap-2 px-3 py-2 text-left text-sm hover:bg-muted"
                onClick={() => selectSuggestion(item)}
                role="option"
                aria-selected={false}
              >
                {item.flag_emoji && <span aria-hidden>{item.flag_emoji}</span>}
                <span>
                  {item.name}
                  {item.admin_region ? `, ${item.admin_region}` : ""}
                  {item.country ? `, ${item.country}` : ""}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
