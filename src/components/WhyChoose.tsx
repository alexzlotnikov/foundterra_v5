import { CheckCircle, Zap, FileText, Heart } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const WhyChoose = () => {
  const { content } = useLanguage();
  const reasons = [
    {
      icon: CheckCircle,
      title: "VC-Standard Deliverables",
      description: "Everything built to venture capital standards and expectations"
    },
    {
      icon: Zap,
      title: "Execution Speed",
      description: "6-8 weeks vs months of traditional development timelines"
    },
    {
      icon: FileText,
      title: "Built for Due Diligence",
      description: "All documentation and processes ready for investor scrutiny"
    },
    {
      icon: Heart,
      title: "No Equity Taken",
      description: "You own 100% of your startup - we don't take any equity"
    }
  ];

  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose <span className="gradient-text">Foundterra</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            We help you build like a founder, but think like an investor
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className="text-center animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                <reason.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-bold mb-3">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;