// Allow developers to disable routing in development
export default function getIsRoutingEnabled(): boolean {
  if (!import.meta.env.DEV) {
    return true;
  }

  const isRoutingEnabledLocalStorage =
    window.localStorage.getItem('isRoutingEnabled');

  const isRoutingEnabled = isRoutingEnabledLocalStorage !== 'false';

  return isRoutingEnabled;
}

export const setIsRoutingEnabled = (isRoutingEnabled: boolean): void => {
  window.localStorage.setItem(
    'isRoutingEnabled',
    isRoutingEnabled ? 'true' : 'false',
  );
  window.location.reload();
};

export const toggleRouting = (): void => {
  const isRoutingEnabled = getIsRoutingEnabled();
  window.localStorage.setItem(
    'isRoutingEnabled',
    isRoutingEnabled ? 'false' : 'true',
  );
  window.location.reload();
};
