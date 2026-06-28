import { Component, type ErrorInfo, type ReactNode } from "react";
import { recordStartupError } from "@/utils/startupDiagnostics";

interface Props {
  children: ReactNode;
  name: string;
}

interface State {
  failed: boolean;
}

export default class OptionalErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    recordStartupError("optional-component", error, {
      component: this.props.name,
      componentStack: errorInfo.componentStack?.slice(0, 300),
    });
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}
