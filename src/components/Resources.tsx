import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, CheckSquare, TrendingUp } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Link } from "react-router-dom";

const Resources = () => {
  const { content } = useLanguage();
  
  const iconMap = {
    FileText,
    Users,
    CheckSquare,
    TrendingUp
  };

  return (
    <section id="resources" className="section-padding scroll-mt-24">
      <div className="container-max">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">
            {content.resources.title} <span className="gradient-text">{content.resources.highlight}</span>
          </h2>
          <p className="text-xl text-muted-foreground font-body">
            {content.resources.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {content.resources.items.map((resource, index) => {
            const IconComponent = iconMap[resource.icon as keyof typeof iconMap];
            return (
                <Card 
                  key={index} 
                  className="card-elevated animate-slide-up cursor-pointer"
                  style={{animationDelay: `${index * 0.1}s`}}
                >
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 icon-glow rounded-lg flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-serif">{resource.title}</CardTitle>
                  <CardDescription className="font-body">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/get-resources">
                    <Button variant="outline" className="w-full">
                      {resource.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Link to="/get-resources">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-8 py-6"
            >
              {content.resources.cta}
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground mt-3 font-body">
            {content.resources.ctaSubtext}
          </p>

          <div className="mt-6 flex justify-center">
            <iframe
              src="https://foundterra.substack.com/embed"
              width="480"
              height="320"
              style={{ border: '1px solid #EEE', background: 'white' }}
              frameBorder="0"
              scrolling="no"
              title="Foundterra Substack subscription"
              className="w-full max-w-[480px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resources;
