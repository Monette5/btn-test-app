'use client';
import { dashboard, SDK } from '@wix/dashboard';
import { useMemo } from 'react';
import { createClient } from '@wix/sdk/client';

function inIframe() {
try {
  return window.self !== window.top;
 } catch (e) {
  return true;
 }
}

export const useSDK = () => {
const sdk = useMemo(
  () =>
    typeof window === 'undefined' || !inIframe()
      ? {
          dashboard: {} as SDK,
        }
      : createClient({
          host: dashboard.host(),
          auth: dashboard.auth(),
          modules: {
            dashboard,
          },
        }),
    [typeof window],
  );
  return sdk;
};
