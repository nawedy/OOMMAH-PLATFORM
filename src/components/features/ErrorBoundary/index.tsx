import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import logger from '@/lib/logger';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    logger.error('Uncaught error:', { error, errorInfo });
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
          <div className="rounded-lg bg-white p-8 shadow-xl">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Something went wrong</h2>
            <p className="mb-4 text-gray-600">
              We apologize for the inconvenience. Our team has been notified of this issue.
            </p>
            <Button onClick={this.handleReset}>Try again</Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

