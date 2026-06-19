import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
import { Loader2, CheckCircle } from "lucide-react";
import { handleError, checkRateLimit, ERROR_MESSAGES } from "@/utils/errorHandler";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type EmailFormData = z.infer<typeof emailSchema>;

interface EmailCollectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const EmailCollectionDialog = ({ open, onOpenChange, onSuccess }: EmailCollectionDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const { toast } = useToast();
  const { content, language } = useLanguage();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
  });

  const redirectToResources = () => {
    handleClose();
    window.location.href = '/resources';
  };

  const onSubmit = async (data: EmailFormData) => {
    // Rate limiting per email - max 5 submissions per hour
    const rateLimitCheck = checkRateLimit({
      key: `email_submission_${data.email}`,
      maxAttempts: 5,
      windowMs: 60 * 60 * 1000 // 1 hour
    });

    if (!rateLimitCheck.allowed) {
      toast({
        title: "Too Many Attempts",
        description: `Please wait ${Math.ceil((rateLimitCheck.timeRemaining || 0) / 60)} minutes before trying again.`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const webhookUrl = import.meta.env.VITE_MAKE_WEBHOOK_URL;
      
      // Try to submit to webhook if configured, otherwise just proceed
      if (webhookUrl) {
        try {
          const response = await fetch(webhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: data.email,
              timestamp: new Date().toISOString(),
              language: language,
              source: "foundterra_resources",
            }),
          });

          if (!response.ok) {
            console.warn(`Webhook request failed with status: ${response.status}`);
          }
        } catch (webhookError) {
          console.warn('Webhook submission failed:', webhookError);
        }
      }

      setIsSuccess(true);
      
      // Start countdown timer
      const timer = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            redirectToResources();
            return 3;
          }
          return prev - 1;
        });
      }, 1000);

      toast({
        title: content.resources.emailDialog.success.title,
        description: content.resources.emailDialog.success.description,
      });

    } catch (error) {
      const { code, userMessage } = handleError(
        error instanceof Error ? error.message : 'Unknown error occurred',
        'email_submission'
      );
      
      toast({
        title: "Submission Failed",
        description: userMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onOpenChange(false);
    reset();
    setIsSuccess(false);
    setCountdown(3);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md mx-4">
        <DialogHeader className="text-center">
          <DialogTitle className="text-xl sm:text-2xl font-bold">
            {isSuccess ? (
              <div className="flex items-center justify-center gap-2 text-success">
                <CheckCircle className="w-6 h-6" />
                {content.resources.emailDialog.success.title}
              </div>
            ) : (
              content.resources.emailDialog.title
            )}
          </DialogTitle>
          <DialogDescription className="text-center">
            {isSuccess 
              ? content.resources.emailDialog.success.description
              : content.resources.emailDialog.description
            }
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="space-y-4 text-center py-4">
            <p className="text-muted-foreground">
              {content.resources.emailDialog.success.redirectMessage.replace('{countdown}', countdown.toString())}
            </p>
            <Button onClick={redirectToResources} className="w-full" variant="hero">
              {content.resources.emailDialog.success.accessButton}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{content.resources.emailDialog.form.emailLabel}</Label>
              <Input
                id="email"
                type="email"
                placeholder={content.resources.emailDialog.form.emailPlaceholder}
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
                variant="hero"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {content.resources.emailDialog.form.submitting}
                  </>
                ) : (
                  content.resources.emailDialog.form.submit
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                className="sm:w-auto"
              >
                {content.resources.emailDialog.form.cancel}
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              {content.resources.emailDialog.form.privacy}
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EmailCollectionDialog;