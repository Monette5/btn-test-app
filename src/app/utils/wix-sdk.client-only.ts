'use client';
import { dashboard, SDK } from '@wix/dashboard';
import { useMemo } from 'react';
import { createClient } from '@wix/sdk/client';

function inIframe() {
    try {
      return window.self !== window.top;
    } catch (e) {
      console.error('Error checking if in iframe:', e);
      return true;
    }
  }
  
  export const useSDK = () => {
    const isWindowDefined = typeof window !== 'undefined'; // Extracted to a variable
  
    const sdk = useMemo(
      () =>
        !isWindowDefined || !inIframe()
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
      [isWindowDefined], // Use the extracted variable in the dependency array
    );
  
    return sdk;
  };