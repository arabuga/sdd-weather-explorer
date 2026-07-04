export const uk = {
  app: {
    title: "Weather Explorer",
    tagline: "Чи варто їхати у вихідні за погодою",
    heroEmpty: "Введіть місто, щоб побачити прогноз на тиждень",
  },
  search: {
    placeholder: "Пошук міста",
    nothingFound: "Нічого не знайдено",
    providerUnavailable: "Пошук тимчасово недоступний. Спробуйте ще раз.",
    retry: "Повторити",
  },
  theme: {
    day: "День",
    night: "Ніч",
  },
  forecast: {
    weekendHighlight: "Вихідні",
    loading: "Завантаження прогнозу",
    providerUnavailable: "Прогноз тимчасово недоступний. Спробуйте ще раз.",
    sunrise: "Схід",
    sunset: "Захід",
  },
  map: {
    loading: "Завантаження карти",
    reverseFailed: "Не вдалося визначити назву місця. Спробуйте ще раз.",
    attribution: "© OpenStreetMap contributors",
  },
  geolocation: {
    useMyLocation: "Моє місцезнаходження",
    denied: "Доступ до геолокації не надано. Місце не змінено.",
  },
  pins: {
    pin: "Закріпити",
    unpin: "Відкріпити",
    compare: "Порівняти вихідні",
    compareDisabled: "Потрібно щонайменше два закріплені міста",
    tooMany: "Можна порівняти щонайбільше три міста",
    makeActive: "Зробити активним",
  },
  footer: {
    openMeteo: "Open-Meteo",
    openStreetMap: "OpenStreetMap",
    credits: "Дані погоди від",
    mapData: "Карта від",
  },
  weekdays: {
    Monday: "Понеділок",
    Tuesday: "Вівторок",
    Wednesday: "Середа",
    Thursday: "Четвер",
    Friday: "П'ятниця",
    Saturday: "Субота",
    Sunday: "Неділя",
  },
} as const;

export type UkCatalogue = typeof uk;
