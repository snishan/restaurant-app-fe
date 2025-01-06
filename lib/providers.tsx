'use client';

import { Provider } from 'mobx-react';
import stores from '@/mobXstore';

export function Providers({ children }: { children: React.ReactNode }) {
  return <Provider {...stores}>{children}</Provider>;
}