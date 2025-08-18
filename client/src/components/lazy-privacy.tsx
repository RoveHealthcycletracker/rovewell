import { lazy, Suspense } from 'react';

const PrivacyPageComponent = lazy(() => import('@/pages/privacy'));

const LoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-deep-plum via-ink-dark to-deep-plum flex items-center justify-center">
    <div className="flex items-center space-x-2">
      <div className="w-4 h-4 bg-mint rounded-full animate-pulse"></div>
      <div className="w-4 h-4 bg-blush rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
      <div className="w-4 h-4 bg-rose-gold rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
  </div>
);

export default function LazyPrivacy() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <PrivacyPageComponent />
    </Suspense>
  );
}