import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, Users, Target, Rocket, DollarSign, TrendingUp, BookOpen, CheckSquare, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

interface Resource {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  ctaLabel?: string;
  ctaClassName?: string;
}

/* 
╔══════════════════════════════════════════════════════════════════════╗
║                    📚 ADD YOUR RESOURCES HERE                        ║
╠══════════════════════════════════════════════════════════════════════╣
║  To add a new resource card:                                         ║
║  1. Copy one of the resource objects below                           ║
║  2. Change the title, description, and link                          ║
║  3. Pick an icon from the AVAILABLE ICONS list                       ║
║                                                                      ║
║  AVAILABLE ICONS:                                                    ║
║  FileText, Users, Target, Rocket, DollarSign, TrendingUp,           ║
║  BookOpen, CheckSquare                                               ║
║                                                                      ║
║  Example:                                                            ║
║  {                                                                   ║
║    title: "Your Resource Title",                                    ║
║    description: "Brief description of the resource",                ║
║    icon: Rocket,                                                     ║
║    link: "https://your-link-here.com"                               ║
║  },                                                                  ║
╚══════════════════════════════════════════════════════════════════════╝
*/

const Resources = () => {
  const { language } = useLanguage();
  const isHebrew = language === "he";
  const t = isHebrew
    ? {
        metaTitle: "משאבי סטארטאפים - Foundterra",
        metaDescription: "גישה למשאבי סטארטאפ: מדריכים, תבניות וכלי גיוס מעשיים.",
        heading: "כל המשאבים שאתם צריכים למסע",
        headingHighlight: "הסטארטאפ",
        subtitle: "מדריכים, תבניות ופריימוורקים שיעזרו לכם לבנות, להשיק ולצמוח בצורה חכמה.",
        ctaLabel: "פתחו משאב",
        footerText: "צריכים ליווי אישי לסטארטאפ שלכם?",
        footerButton: "צרו קשר",
      }
    : {
        metaTitle: "Startup Resources - Foundterra",
        metaDescription: "Access exclusive startup resources including MVP guides, pitch deck templates, and fundraising roadmaps.",
        heading: "The Only Resources You Need for Your",
        headingHighlight: "Startup Journey",
        subtitle: "Curated guides, templates, and frameworks to help you build, launch, and grow your startup successfully.",
        ctaLabel: "Access Resource",
        footerText: "Need personalized guidance for your startup?",
        footerButton: "Get in Touch",
      };

  const resources: Resource[] = [
    {
      title: "Tools for Your Startup",
      description: "Essential tools and resources to build and grow your startup",
      icon: Wrench,
      link: "/startup-deals",
      ctaLabel: "Free Startup Credits",
      ctaClassName: "bg-green-600 text-white border-green-600 hover:bg-green-700 hover:border-green-700"
    },
    {
      title: "Pre-Seed Checklist",
      description: "Essential checklist to prepare your startup before seeking funding",
      icon: CheckSquare,
      link: "/resources/pre-seed-checklist"
    },
    {
      title: "Pitch Deck Templates",
      description: "Professional pitch deck templates to impress investors",
      icon: FileText,
      link: "https://drive.google.com/drive/folders/1zvWFXpvHzi0eEAEhOLgxczkZ5GFYB5cL?usp=sharing"
    },
    {
      title: "VC List",
      description: "Comprehensive database of venture capital firms",
      icon: DollarSign,
      link: "/resources/vc-list"
    },
    {
      title: "Accelerators Database",
      description: "Find the right accelerator program for your startup",
      icon: Rocket,
      link: "https://docs.google.com/spreadsheets/d/12AV2yMV2QHu52WBMNA5Af6UMXZDxuW6R84HIzvUm68c/edit?usp=sharing"
    },
    {
      title: "Investors Investing in Israel",
      description: "Directory of investors focused on the Israeli startup ecosystem",
      icon: Target,
      link: "https://docs.google.com/spreadsheets/d/1UfhozWDpxY80I7jvY4tY-utN6wxz0-FnF0JA7dPjEz8/edit?usp=sharing"
    },
    {
      title: "How to Cold Reach Investors",
      description: "Proven strategies for reaching out to investors effectively",
      icon: Users,
      link: "/resources/how-to-cold-reach-investors"
    },
    {
      title: "Viral Startup Launch Checklist",
      description: "Step-by-step guide to launching your startup with maximum impact",
      icon: Rocket,
      link: "/resources/viral-startup-launch-checklist"
    },
    {
      title: "Platforms to Promote Your Startup",
      description: "Best platforms and communities to gain visibility and traction",
      icon: TrendingUp,
      link: "https://docs.google.com/spreadsheets/d/1fxgy7HeJRHNp7jPjRHQr6hHfHGupfzipzWAduVHHU1k/edit?usp=sharing"
    },
    {
      title: "Early Traction Metrics That Matter",
      description: "Key metrics to track in your startup's early stages",
      icon: TrendingUp,
      link: "/resources/early-traction-metrics"
    },
    {
      title: "Customer Interview Script Framework",
      description: "Structured framework for conducting effective customer interviews",
      icon: Users,
      link: "/resources/customer-interview-script-framework"
    },
    {
      title: "How to Estimate Market Size",
      description: "Calculate and validate your total addressable market",
      icon: Target,
      link: "/resources/how-to-estimate-market-size"
    },
    {
      title: "Startup Competitive Analysis",
      description: "Framework for analyzing and positioning against competitors",
      icon: Target,
      link: "/resources/startup-competitive-analysis"
    },
    {
      title: "Cap Table Template",
      description: "Track equity distribution and ownership in your startup",
      icon: FileText,
      link: "https://docs.google.com/spreadsheets/d/1fy_mHr3I5gf9Q2Gb3whnSz4yAEl7e0RB/edit?usp=sharing&ouid=102122802749869815811&rtpof=true&sd=true"
    },
    {
      title: "How to Calculate Cash Runway",
      description: "Understand how long your startup can operate with current funds",
      icon: DollarSign,
      link: "/resources/how-to-calculate-cash-runway"
    },
    {
      title: "Feature Prioritization Framework",
      description: "Prioritize product features based on impact and resources",
      icon: CheckSquare,
      link: "/resources/feature-prioritization-framework"
    },
    {
      title: "Startup Data Room",
      description: "Organize critical documents for due diligence and investors",
      icon: BookOpen,
      link: "/resources/startup-data-room"
    },

    {
      title: "Investors Update System",
      description: "Framework and template for monthly/quarterly investor updates",
      icon: FileText,
      link: "/resources/investors-update-system"
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <link rel="canonical" href="https://www.foundterra.com/resources" />
      </Helmet>

      <div className="min-h-screen flex flex-col bg-gradient-to-b from-background via-primary/5 to-background" dir={isHebrew ? "rtl" : "ltr"}>
        <Header />
        
        <main className="flex-1">
          <section className="section-padding">
            <div className="container-max">
              {/* Header */}
              <div className="text-center mb-16 animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  {t.heading}{" "}
                  <span className="gradient-text">{t.headingHighlight}</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  {t.subtitle}
                </p>
              </div>

              {/* Resource Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {resources.map((resource, index) => {
                  const IconComponent = resource.icon;
                  return (
                    <Card
                      key={index}
                      className="card-elevated animate-slide-up hover:scale-105 transition-all duration-300 group"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <CardHeader className="pb-4 flex flex-col items-center text-center">
                        <div className="w-14 h-14 hero-gradient rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                          <IconComponent className="w-7 h-7 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl mb-2">{resource.title}</CardTitle>
                        <CardDescription className="text-sm">
                          {resource.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button
                          variant="outline"
                          className={`w-full transition-colors ${resource.ctaClassName ?? "group-hover:bg-primary group-hover:text-primary-foreground"}`}
                          asChild
                        >
                          <a
                            href={resource.link}
                            target={resource.link.startsWith("/") ? undefined : "_blank"}
                            rel={resource.link.startsWith("/") ? undefined : "noopener noreferrer"}
                            className="flex items-center justify-center gap-2"
                          >
                            {resource.ctaLabel ?? t.ctaLabel}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Footer CTA */}
              <div className="text-center mt-16 animate-fade-in">
                <p className="text-muted-foreground mb-4">
                  {t.footerText}
                </p>
                <Button
                  variant="hero"
                  size="lg"
                  className="text-lg px-8 py-6"
                  onClick={() => window.open('https://calendly.com/foundterra/30min', '_blank')}
                >
                  {t.footerButton}
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Resources;
