import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Presentation, Code, TrendingUp, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/hooks/useLanguage";

// ===== PRICE VISIBILITY CONTROL =====
// Set to false to hide all prices in dropdown sub-services
const SHOW_PRICES = true;
// ====================================

const Services = () => {
  const { content, language } = useLanguage();
  const [openService, setOpenService] = useState<number | null>(null);

  const services = [
    {
      icon: Presentation,
      title: content.services.pitchDecks.title,
      description: content.services.pitchDecks.description,
      price: content.services.pitchDecks.price,
      features: content.services.pitchDecks.features,
      subServices: content.services.pitchDecks.subServices
    },
    {
      icon: Code,
      title: content.services.mvpDevelopment.title,
      description: content.services.mvpDevelopment.description,
      price: content.services.mvpDevelopment.price,
      features: content.services.mvpDevelopment.features,
      subServices: content.services.mvpDevelopment.subServices
    },
    {
      icon: TrendingUp,
      title: content.services.earlyTraction.title,
      description: content.services.earlyTraction.description,
      price: content.services.earlyTraction.price,
      features: content.services.earlyTraction.features,
      subServices: content.services.earlyTraction.subServices
    }
  ];

  return (
    <section id="services" className="section-padding scroll-mt-20 sm:scroll-mt-24">
      <div className="container-max">
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            {content.services.title}
          </h2>
          <p className="responsive-text-base text-muted-foreground max-w-3xl mx-auto mb-6 sm:mb-8">
            {content.services.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <Card key={index} className="card-elevated animate-slide-up" style={{animationDelay: `${index * 0.2}s`}}>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 sm:w-16 sm:h-16 hero-gradient rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                  <service.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                </div>
                <CardTitle className="responsive-text-sm mb-2 text-center">{service.title}</CardTitle>
                <CardDescription className="responsive-text-xs text-center">{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="responsive-text-lg font-bold gradient-text mb-3 sm:mb-4 text-center">{service.price}</div>
                <ul className="space-y-2 sm:space-y-3 mb-4">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className={`flex items-start gap-2 sm:gap-3 ${language === 'he' ? 'text-right flex-row-reverse' : 'text-left'}`}>
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-success rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-success-foreground text-xs">✓</span>
                      </div>
                      <span className="responsive-text-xs text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Collapsible open={openService === index} onOpenChange={() => setOpenService(openService === index ? null : index)}>
                  <CollapsibleTrigger className="flex items-center justify-center gap-2 w-full p-2 sm:p-3 text-primary hover:text-primary-dark transition-colors border border-border rounded-lg">
                    <span className="responsive-text-xs font-medium">View Service Options</span>
                    <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform ${openService === index ? 'rotate-180' : ''}`} />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 sm:mt-3">
                    <div className="bg-muted/50 rounded-lg p-3 sm:p-4 space-y-2">
                      {service.subServices?.map((subService, subIndex) => (
                        <div key={subIndex} className={`flex ${SHOW_PRICES ? 'justify-between' : 'justify-start'} items-center py-1.5 sm:py-2 border-b border-border/30 last:border-0`}>
                          <span className="responsive-text-xs font-medium">{subService.name}</span>
                          {SHOW_PRICES && <span className="responsive-text-xs font-bold text-primary">{subService.price}</span>}
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;