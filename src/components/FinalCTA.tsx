import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const FinalCTA = () => {
  const { content, language } = useLanguage();
  const isHebrew = language === "he";

  return (
    <section id="final-cta" className="section-padding scroll-mt-24 relative">
      <div className="container-max">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 font-serif">
            {content.finalCTA.title}
            {content.finalCTA.highlight && (
              <span className="gradient-text"> {content.finalCTA.highlight}</span>
            )}
            ?
          </h2>
        </div>

        <Card className="max-w-2xl mx-auto card-elevated animate-slide-up">
          <CardHeader className="text-center">
            {content.finalCTA.cardTitle && (
              <CardTitle className="text-2xl sm:text-3xl mb-4 font-serif">
                {content.finalCTA.cardTitle}
              </CardTitle>
            )}
            <CardDescription className="text-lg font-body">
              {content.finalCTA.cardSubtitle}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button 
              variant="hero" 
              size="lg" 
              className="w-full text-lg py-6 mb-4"
              onClick={() => window.open(content.cta.calendlyLink, '_blank')}
            >
              {content.finalCTA.primaryButton}
              <ArrowRight className={`w-5 h-5 ${isHebrew ? "mr-2 rotate-180" : "ml-2"}`} />
            </Button>
            
            <p className="text-sm text-muted-foreground italic font-body">
              {content.finalCTA.alternativeText}
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FinalCTA;
