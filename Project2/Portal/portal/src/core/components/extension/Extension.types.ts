import { RouteComponentProps } from "react-router";
import { InjectedIntlProps } from 'react-intl';

export const enum ExtensionTypes {
  Search,
  Page,
  Dashboard,
}

interface OwnProps extends InjectedIntlProps {
  componentKey: string;
  ignoreWrapControl: boolean;
  searchText?: string;
  componentType?: ExtensionTypes;
  suggestionBoxWidth?: number;
  slimLayout: boolean;
}

export type ExtensionProps = OwnProps & RouteComponentProps;