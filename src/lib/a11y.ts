/**
 * Build a `keydown` handler that activates `handler` on Enter or Space,
 * so a non-native clickable element (e.g. a `<div role="button">`) behaves
 * like a real button for keyboard users.
 *
 * @param handler - the activation callback
 * @returns a keydown listener
 */
export function onActivate(handler: (event: KeyboardEvent) => void): (event: KeyboardEvent) => void {
  return (event: KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      handler(event);
    }
  };
}
