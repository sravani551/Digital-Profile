/** Lets any button open the AI assistant without shared state between components. */
export const OPEN_CHAT_EVENT = "portfolio:open-chat";

export function openChat(prompt?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_CHAT_EVENT, { detail: { prompt } }));
}
