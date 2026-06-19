import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RelatedServices from "@/components/RelatedServices";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Users, DollarSign, BarChart3 } from "lucide-react";

const Referral = () => {
  const { content } = useLanguage();
  const referral = content.pages.referral;
  
  const benefitIcons = [DollarSign, Users, BarChart3, Share2];

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Founder Referral Program | Foundterra</title>
        <meta name="description" content="Refer founders to Foundterra and earn rewards for successful introductions to our pitch deck and fundraising advisory services." />
        <link rel="canonical" href="https://www.foundterra.com/referral" />
      </Helmet>
      <Header />
      <main className="pt-16">
        <div className="section-padding">
          <div className="container-max">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-center mb-4 gradient-text">
                {referral.title}
              </h1>
              <p className="text-xl text-center text-muted-foreground mb-12">
                {referral.subtitle}
              </p>
              
              {/* How It Works */}
              {referral.how && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-center mb-8">{referral.how.title}</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {referral.how.steps.map((step, index) => (
                      <Card key={index} className="card-elevated text-center">
                        <CardHeader>
                          <div className="w-12 h-12 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-primary-foreground font-bold text-lg">{index + 1}</span>
                          </div>
                          <CardTitle className="text-lg">{step.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{step.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {referral.benefits && (
                <div className="mb-16">
                  <h2 className="text-2xl font-bold text-center mb-8">{referral.benefits.title}</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {referral.benefits.items.map((item, index) => {
                      const IconComponent = benefitIcons[index % benefitIcons.length];
                      return (
                        <Card key={index} className="card-elevated">
                          <CardHeader className="flex flex-row items-center gap-4">
                            <div className="w-12 h-12 hero-gradient rounded-lg flex items-center justify-center flex-shrink-0">
                              <IconComponent className="w-6 h-6 text-primary-foreground" />
                            </div>
                            <div>
                              <CardTitle className="text-lg">{item.title}</CardTitle>
                              <CardDescription>{item.description}</CardDescription>
                            </div>
                          </CardHeader>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* CTA */}
              {referral.cta && (
                <Card className="card-elevated">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{referral.cta.title}</CardTitle>
                    <CardDescription className="text-base">
                      {referral.cta.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-col items-center gap-4">
                    <Button
                      variant="hero"
                      size="lg"
                      onClick={() => window.location.href = 'mailto:info@foundterra.com'}
                      className="text-lg px-8"
                    >
                      {referral.cta.button}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      {referral.cta.terms}
                    </p>
                  </CardContent>
                </Card>
              )}

              {/* Legacy sections format */}
              {referral.sections && referral.sections.length > 0 && (
                <div className="space-y-8">
                  {referral.sections.map((section, index) => (
                    <div key={index} className="bg-card rounded-lg p-6 border">
                      <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                      <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <RelatedServices />
      <Footer />
    </div>
  );
};

export default Referral;
