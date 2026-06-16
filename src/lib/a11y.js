/**
 * Build a `keydown` handler that activates `handler` on Enter or Space,
 * so a non-native clickable element (e.g. a `<div role="button">`) behaves
 * like a real button for keyboard users.
 *
 * @param {(event: KeyboardEvent) => void} handler - the activation callback
 * @returns {(event: KeyboardEvent) => void} a keydown listener
 */
export function onActivate(handler) {
  return (event) => {
    if (event.key === "Enter" || event.key === " ") {
      handler(event);
    }
  };
}
