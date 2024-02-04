// Allow developers to disable routing in development
export default function getIsRoutingEnabled(): boolean {
  if (!import.meta.env.DEV) {
    return true;
  }

  const isRoutingEnabledLocalStorage =
    window.localStorage.getItem('isRoutingEnabled');

  const isRoutingEnabled =
    isRoutingEnabledLocalStorage === 'true' ||
    isRoutingEnabledLocalStorage === null;

  return isRoutingEnabled;
}

export const toggleRouting = (): void => {
  const isRoutingEnabled = getIsRoutingEnabled();
  window.localStorage.setItem(
    'isRoutingEnabled',
    isRoutingEnabled ? 'false' : 'true',
  );
  window.location.reload();
};
