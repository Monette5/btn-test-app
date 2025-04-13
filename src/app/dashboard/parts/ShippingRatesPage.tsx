'use client';
import '@wix/design-system/styles.global.css';
import { AppProviders } from '@/app/utils/client-providers';
import { ShippingRatesPageContent } from '@/app/dashboard/parts/ShippingRatesPageContent';
import { Suspense } from 'react';

export const ShippingRatesPage = ({}: Record<string, never>) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
    <AppProviders>
      <ShippingRatesPageContent />
    </AppProviders>
    </Suspense>
  );
};