import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const Redirecting = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/resources");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="text-center animate-fade-in">
        <div className="mb-8 flex justify-center">
          <Loader2 className="w-16 h-16 text-primary animate-spin" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
          Thank You!
        </h1>
        <p className="text-xl text-muted-foreground mb-2">
          Preparing your resources...
        </p>
        <p className="text-sm text-muted-foreground">
          You'll be redirected in a few seconds
        </p>
      </div>
    </div>
  );
};

export default Redirecting;
