import { t } from "@/lib/i18n";
import { selectFooterJoke } from "@/lib/jokes";

interface WeatherFooterProps {
  locationName?: string;
}

export function WeatherFooter({ locationName = "Ukraine" }: WeatherFooterProps) {
  const today = new Date().toISOString().slice(0, 10);
  const joke = selectFooterJoke({ date: today, locationName });

  return (
    <footer className="border-t border-border px-4 py-6 text-center text-sm text-muted-foreground">
      <p className="mb-2 italic">{joke}</p>
      <p>
        {t("footer.credits")}{" "}
        <a
          href="https://open-meteo.com/"
          className="text-primary underline-offset-2 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t("footer.openMeteo")}
        </a>
        {" · "}
        {t("footer.mapData")}{" "}
        <a
          href="https://www.openstreetmap.org/copyright"
          className="text-primary underline-offset-2 hover:underline"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t("footer.openStreetMap")}
        </a>
      </p>
    </footer>
  );
}
