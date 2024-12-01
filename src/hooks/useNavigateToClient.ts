import { useCallback } from 'react';

export function useNavigateToClient() {
  return useCallback((clientId: string) => {
    // Get the ClientsPage component's setSelectedClientId function
    const event = new CustomEvent('navigateToClient', { detail: clientId });
    window.dispatchEvent(event);
  }, []);
}