"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import { t } from "@/lib/i18n";

const MapInner = dynamic(
  () => import("./weather-map-inner").then((m) => m.WeatherMapInner),
  {
    ssr: false,
    loading: () => (
      <Skeleton className="h-[280px] w-full rounded-xl" aria-label={t("map.loading")} />
    ),
  },
);

export function WeatherMap() {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <MapInner />
    </div>
  );
}
