import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw, Mail } from 'lucide-react';
import { handleError } from '@/utils/errorHandler';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorCode?: string;
  errorMessage?: string;
  technicalMessage?: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    try {
      const { code, userMessage } = handleError(error.message, 'react_error_boundary');
      return {
        hasError: true,
        errorCode: code,
        errorMessage: userMessage,
        technicalMessage: error.message
      };
    } catch {
      return {
        hasError: true,
        errorCode: 'ERR-UNHANDLED-BOUNDARY',
        errorMessage: 'Something went wrong. Please screenshot this error code and contact support.',
        technicalMessage: 'Unknown runtime error'
      };
    }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    handleError(
      `React Error Boundary: ${error.message}\nStack: ${error.stack}\nComponent Stack: ${errorInfo.componentStack}`,
      'react_error_boundary'
    );
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleContactSupport = () => {
    const subject = encodeURIComponent(`Error Report - ${this.state.errorCode}`);
    const body = encodeURIComponent(
      `I encountered an error on your website.\n\nError Code: ${this.state.errorCode}\nTechnical Error: ${this.state.technicalMessage ?? 'Unknown'}\nTime: ${new Date().toISOString()}\nPage: ${window.location.href}\n\nPlease include a screenshot of this error.`
    );
    window.open(`mailto:info@foundterra.com?subject=${subject}&body=${body}`, '_blank');
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-background">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-destructive" />
              </div>
              <CardTitle className="text-xl text-destructive">
                Something went wrong
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-mono text-muted-foreground">
                  Error Code: {this.state.errorCode}
                </p>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Please screenshot this error code and contact our support team.
              </p>

              {this.state.technicalMessage && (
                <div className="p-3 bg-muted rounded-lg text-left">
                  <p className="text-xs font-semibold text-foreground mb-1">Technical details</p>
                  <p className="text-xs font-mono break-all text-muted-foreground">
                    {this.state.technicalMessage}
                  </p>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button 
                  onClick={this.handleReload}
                  variant="outline"
                  className="flex-1"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reload Page
                </Button>
                <Button 
                  onClick={this.handleContactSupport}
                  variant="default"
                  className="flex-1"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;