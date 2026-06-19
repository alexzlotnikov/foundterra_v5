import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Cookie, Shield, Settings } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { safeStorage } from "@/utils/storage";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always required
    analytics: false,
    marketing: false,
    functional: false,
  });
  const { content } = useLanguage();

  useEffect(() => {
    const consent = safeStorage.getItem('localStorage', 'cookie-consent');
    if (consent) return;

    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true,
    };
    safeStorage.setItem('localStorage', 'cookie-consent', JSON.stringify(allAccepted));
    setIsVisible(false);
  };

  const handleAcceptSelected = () => {
    safeStorage.setItem('localStorage', 'cookie-consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const essentialOnly = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false,
    };
    safeStorage.setItem('localStorage', 'cookie-consent', JSON.stringify(essentialOnly));
    setIsVisible(false);
  };

  const handlePreferenceChange = (key: keyof typeof preferences) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-fade-in-up">
      <Card className="bg-card border shadow-xl">
        <div className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Cookie className="w-4 h-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Cookie Preferences</h3>
                <p className="text-xs text-muted-foreground">We value your privacy</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="hover:bg-destructive/10 hover:text-destructive"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mb-4">
            We use cookies to enhance your experience. By clicking "Accept All", you consent to our use of cookies.{" "}
            <a href="/cookies" className="text-primary hover:underline">
              Cookie Policy
            </a>.
          </p>

          {showSettings && (
            <div className="space-y-3 mb-4 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-xs font-medium">Essential Cookies</p>
                    <p className="text-xs text-muted-foreground">Required for website functionality</p>
                  </div>
                </div>
                <div className="text-xs text-green-600 font-medium">Always Active</div>
              </div>

              {[
                {
                  key: 'analytics' as const,
                  title: 'Analytics Cookies',
                  description: 'Help us understand how you use our website'
                },
                {
                  key: 'functional' as const,
                  title: 'Functional Cookies',
                  description: 'Remember your preferences and settings'
                },
                {
                  key: 'marketing' as const,
                  title: 'Marketing Cookies',
                  description: 'Used to deliver relevant advertisements'
                }
              ].map(({ key, title, description }) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-medium">{title}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences[key]}
                      onChange={() => handlePreferenceChange(key)}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                  </label>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="flex items-center gap-1 text-xs"
            >
              <Settings className="w-4 h-4" />
              {showSettings ? 'Hide Settings' : 'Customize'}
            </Button>
            <div className="flex gap-2">
              {showSettings ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRejectAll}
                    className="flex-1 text-xs"
                  >
                    Reject All
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAcceptSelected}
                    className="flex-1 text-xs"
                  >
                    Accept Selected
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRejectAll}
                    className="flex-1 text-xs"
                  >
                    Reject All
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleAcceptAll}
                    className="flex-1 bg-primary hover:bg-primary/90 text-xs"
                  >
                    Accept All
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;