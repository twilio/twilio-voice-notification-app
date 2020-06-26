import React, { Component } from 'react';
import { Alert, AlertType } from '@/components/common/alert';

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<{}, ErrorBoundaryState> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <Alert
          alert={{
            message:
              "Sorry, something went wrong and we're experiencing some issues. Please try again.",
            type: AlertType.ERROR,
          }}
          showReload
        />
      );
    }

    return this.props.children;
  }
}
