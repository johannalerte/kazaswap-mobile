import { useEffect } from 'react';
import { toast } from 'sonner';

export const usePWA = () => {
  useEffect(() => {
    // Check if service workers are supported
    if ('serviceWorker' in navigator) {
      let refreshing = false;

      // Register service worker
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          console.log('✅ Service Worker registered:', registration.scope);

          // Force update check on page load
          registration.update();

          // Check for updates more frequently (every 5 minutes)
          setInterval(() => {
            console.log('🔍 Checking for service worker updates...');
            registration.update();
          }, 5 * 60 * 1000);

          // Listen for updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing;

            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New service worker is available
                  console.log('🔄 New version available! Auto-reloading in 2 seconds...');

                  // Auto-reload after 2 seconds to ensure users get the new version
                  toast.success('New version detected!', {
                    description: 'Updating to the latest version...',
                    duration: 2000,
                  });

                  setTimeout(() => {
                    newWorker.postMessage({ type: 'SKIP_WAITING' });
                    // The reload will happen via controllerchange event
                  }, 2000);
                }
              });
            }
          });
        })
        .catch((error) => {
          console.error('❌ Service Worker registration failed:', error);
        });

      // Handle controller change (new SW activated) - force reload
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (refreshing) return;
        console.log('🔄 Service Worker controller changed - reloading page...');
        refreshing = true;
        window.location.reload();
      });
    }
  }, []);

  // Check if app is already installed
  useEffect(() => {
    const checkIfInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        console.log('📱 App running in standalone mode (PWA installed)');
        return true;
      }
      return false;
    };

    checkIfInstalled();
  }, []);
};
