interface FireEventOptions {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

/**
 * Dispatch a composed, bubbling `CustomEvent` from `node` (Home Assistant's
 * standard event convention). The `detail` payload is readable by listeners
 * via `event.detail`.
 */
export const fireEvent = <T = unknown>(
  node: EventTarget,
  type: string,
  detail: T = {} as T,
  options: FireEventOptions = {},
): CustomEvent<T> => {
  const event = new CustomEvent<T>(type, {
    bubbles: options.bubbles ?? true,
    cancelable: Boolean(options.cancelable),
    composed: options.composed ?? true,
    detail,
  });
  node.dispatchEvent(event);
  return event;
};
