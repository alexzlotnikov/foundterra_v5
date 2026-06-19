import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Code, TrendingUp, Package, ChevronDown } from "lucide-react";
import { useState } from "react";

const Bridge = () => {
  const { content } = useLanguage();
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const stepIcons = [FileText, Code, TrendingUp, Package];
  // Responsive positioning for mobile and desktop
  const cardPositions = ["mt-0", "mt-4 sm:mt-8", "mt-0", "mt-4 sm:mt-8"];

  return (
    <section className="section-padding bg-background relative">
      <div className="container-max">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 gradient-text">
            {content.bridge.title}
          </h2>
          <p className="responsive-text-base text-muted-foreground max-w-3xl mx-auto">
            {content.bridge.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 pb-8 sm:pb-16">
          {content.bridge.steps.map((step, index) => {
            const IconComponent = stepIcons[index];
            const isHovered = hoveredStep === index;
            
            return (
              <div 
                key={step.number} 
                className={`relative ${cardPositions[index]} group z-base`}
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Number circle */}
                <div className="absolute -top-3 sm:-top-4 left-3 sm:left-4 w-6 h-6 sm:w-8 sm:h-8 bg-background border-2 border-primary rounded-full flex items-center justify-center text-xs sm:text-sm font-bold text-primary z-[150]">
                  {step.number}
                </div>
                
                {/* Main blue card */}
                <Card className={`bg-primary text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-lg pt-4 sm:pt-6 relative overflow-visible min-h-[180px] sm:h-[200px] lg:h-[220px] ${
                  isHovered ? 'z-dropdown' : 'z-base'
                }`}>
                  <CardContent className="p-3 sm:p-4 lg:p-6 h-full flex flex-col">
                    {/* Icon */}
                    <div className="flex justify-start mb-2 sm:mb-3 lg:mb-4">
                      <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                    </div>
                    
                    <div className="flex items-start justify-between flex-1">
                      <div className="flex-1 pr-1 sm:pr-2">
                        <h3 className="responsive-text-xs font-semibold mb-1 sm:mb-2 lg:mb-3 leading-tight">
                          {step.title}
                        </h3>
                        {/* Show text until "we" or first sentence */}
                        <p className="text-xs text-primary-foreground/90 mb-1 sm:mb-2 line-clamp-3 lg:line-clamp-4 leading-relaxed">
                          {step.description.split('. ')[0].split(' We ')[0]}.
                        </p>
                      </div>
                      <ChevronDown className={`w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1 transition-transform duration-300 hidden sm:block ${
                        isHovered ? 'rotate-180' : ''
                      }`} />
                    </div>
                  </CardContent>

                  {/* Hover dropdown - Hidden on mobile/tablet, shown on hover for desktop */}
                  <div className={`absolute top-full left-0 right-0 z-dropdown mt-2 transition-all duration-300 ${
                    isHovered ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                  } hidden lg:block`}>
                    <Card className="bg-popover/95 backdrop-blur-sm border border-border shadow-xl">
                      <CardContent className="p-3 lg:p-4">
                        <p className="responsive-text-xs text-success leading-relaxed">
                          {step.description.split('. ').find(sentence => sentence.startsWith('We ')) || 
                           step.description.split('. ').slice(-1)[0]}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </Card>

                {/* Mobile/Tablet expanded content - Always visible on mobile and tablet */}
                <div className="lg:hidden mt-2 sm:mt-3">
                  <Card className="bg-background/50 border border-border/50">
                    <CardContent className="p-2 sm:p-3">
                      <p className="text-xs text-success leading-relaxed">
                        {step.description.split('. ').find(sentence => sentence.startsWith('We ')) || 
                         step.description.split('. ').slice(-1)[0]}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Bridge;