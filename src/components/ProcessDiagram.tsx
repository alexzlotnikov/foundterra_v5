import { ArrowDown, ArrowRight, CheckCircle, Target, Rocket, Lightbulb, Users, TrendingUp } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const ProcessDiagram = () => {
  const { content } = useLanguage();
  
  const iconMapping = [Lightbulb, Target, CheckCircle, Users, TrendingUp, Rocket];
  const colorMapping = ["bg-primary", "bg-secondary", "bg-success", "bg-accent", "bg-primary", "bg-success"];
  
  const steps = content.process.steps.map((step, index) => ({
    ...step,
    icon: iconMapping[index],
    color: colorMapping[index]
  }));

  return (
    <div className="max-w-6xl mx-auto my-16">
      {/* Desktop Vertical Flow */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-success transform -translate-x-0.5"></div>
          
          <div className="space-y-24">
            {steps.map((step, index) => (
              <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-12`}>
                {/* Content Side */}
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="card-elevated p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-primary">{step.number}</span>
                      <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center`}>
                        <step.icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                    <p className="text-sm font-medium text-muted-foreground mb-3">{step.subtitle}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="relative z-10">
                  <div className={`w-6 h-6 ${step.color} rounded-full border-4 border-background shadow-lg`}></div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tablet Horizontal Flow */}
      <div className="hidden md:block lg:hidden">
        <div className="relative">
          <div className="flex items-start justify-between">
            {steps.slice(0, 3).map((step, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-4 relative z-10 shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-center mb-4">
                  <div className="text-lg font-bold text-primary mb-1">{step.number}</div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{step.subtitle}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                {index < 2 && (
                  <ArrowRight className="absolute top-8 w-8 h-8 text-primary" style={{ left: `${(index + 1) * 33 - 4}%` }} />
                )}
              </div>
            ))}
          </div>
          
          <div className="flex justify-center my-8">
            <ArrowDown className="w-8 h-8 text-primary animate-bounce" />
          </div>
          
          <div className="flex items-start justify-between">
            {steps.slice(3).map((step, index) => (
              <div key={index + 3} className="flex flex-col items-center flex-1">
                <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mb-4 relative z-10 shadow-lg`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-primary mb-1">{step.number}</div>
                  <h4 className="font-semibold mb-2">{step.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{step.subtitle}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                {index < 2 && (
                  <ArrowRight className="absolute top-8 w-8 h-8 text-primary" style={{ left: `${(index + 1) * 33 - 4}%` }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Vertical Flow */}
      <div className="md:hidden space-y-8">
        {steps.map((step, index) => (
          <div key={index} className="relative">
            <div className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                {index < steps.length - 1 && (
                  <div className="w-0.5 h-16 bg-gradient-to-b from-primary to-secondary mt-4"></div>
                )}
              </div>
              <div className="flex-1 pb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-primary">{step.number}</span>
                  <h4 className="font-semibold">{step.title}</h4>
                </div>
                <p className="text-sm font-medium text-muted-foreground mb-2">{step.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessDiagram;