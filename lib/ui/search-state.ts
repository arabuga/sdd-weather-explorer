/** Pure search combobox state classification (AC-02 vs AC-02b). */

export type SearchState = "idle" | "loading" | "empty" | "error" | "results";

export function classifySearchOutcome(
  itemCount: number,
  failed: boolean,
): SearchState {
  if (failed) return "error";
  return itemCount === 0 ? "empty" : "results";
}
