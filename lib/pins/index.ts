export const MAX_PINS = 3;
export const MIN_COMPARE_PINS = 2;

export function canAddPin(currentCount: number): boolean {
  return currentCount < MAX_PINS;
}

export function canOpenCompare(pinCount: number): boolean {
  return pinCount >= MIN_COMPARE_PINS;
}

export function locationKey(latitude: number, longitude: number): string {
  return `${latitude.toFixed(4)},${longitude.toFixed(4)}`;
}

export interface PinLocation {
  latitude: number;
  longitude: number;
}

/** Returns updated pin list and whether the location was added. */
export function addPinToList<T extends PinLocation>(
  pins: T[],
  loc: T,
): { pins: T[]; added: boolean } {
  if (!canAddPin(pins.length)) {
    return { pins, added: false };
  }
  const key = locationKey(loc.latitude, loc.longitude);
  if (pins.some((p) => locationKey(p.latitude, p.longitude) === key)) {
    return { pins, added: false };
  }
  return { pins: [...pins, loc], added: true };
}
