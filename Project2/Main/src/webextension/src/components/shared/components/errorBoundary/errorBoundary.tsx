import React from "react";
import Somethingwent from "../../../../images/somethingwent wrong.svg";
import { IStyle, Link, PrimaryButton } from "@fluentui/react";
import { logException } from "../../../../utils";

type MyProps = { parentContext: any };
type MyState = { hasError: boolean };
const root = {
  display: "flex",
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  "flex-direction": "column",
};
const header = {
  fontSize: 28,
  fontWeight: "600",
  margin: "24px 0 16px 0",
};
const para = {
  marginBottom: 50,
  width: 500,
  "text-align": "center",
};
class ErrorBoundary extends React.Component<MyProps, MyState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.handleReload = this.handleReload.bind(this);
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error) {
    logException(this.props.parentContext, window.location.href, error);
  }
  handleReload() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={root}>
          <Somethingwent />
          <h1 style={header}>Uh oh, something went wrong :(</h1>
          <p style={para}>
            Please try reloading the page by clicking the button below. If this
            continues,{" "}
            <Link href="" underline>
              please contact support for help.
            </Link>
          </p>
          <PrimaryButton text="Reload page" onClick={this.handleReload} />
        </div>
      );
    }

    return this.props.children;
  }
}
export default ErrorBoundary;
