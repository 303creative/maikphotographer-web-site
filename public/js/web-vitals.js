/**
 * Core Web Vitals Monitoring
 * Tracks LCP, FID, CLS for performance optimization
 */

(function() {
  const vitals = {};

  // Largest Contentful Paint (LCP)
  if ('PerformanceObserver' in window) {
    try {
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        vitals.lcp = lastEntry.renderTime || lastEntry.loadTime;
        if (vitals.lcp < 2500) {
          console.log('✅ LCP:', vitals.lcp, 'ms (Good)');
        } else {
          console.warn('⚠️ LCP:', vitals.lcp, 'ms (Needs improvement)');
        }
      });
      lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.log('LCP monitoring not available');
    }

    // First Input Delay (FID) / Interaction to Next Paint (INP)
    try {
      const fidObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        entries.forEach((entry) => {
          vitals.fid = entry.processingDuration;
          if (vitals.fid < 100) {
            console.log('✅ FID:', vitals.fid, 'ms (Good)');
          } else {
            console.warn('⚠️ FID:', vitals.fid, 'ms (Needs improvement)');
          }
        });
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.log('FID monitoring not available');
    }

    // Cumulative Layout Shift (CLS)
    try {
      let clsValue = 0;
      const clsObserver = new PerformanceObserver((entryList) => {
        entryList.getEntries().forEach((entry) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
            vitals.cls = clsValue;
            if (clsValue < 0.1) {
              console.log('✅ CLS:', clsValue, '(Good)');
            } else {
              console.warn('⚠️ CLS:', clsValue, '(Needs improvement)');
            }
          }
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.log('CLS monitoring not available');
    }
  }

  // Log vitals on page unload
  window.addEventListener('beforeunload', () => {
    if (Object.keys(vitals).length > 0) {
      console.log('📊 Final Core Web Vitals:', vitals);
    }
  });
})();
