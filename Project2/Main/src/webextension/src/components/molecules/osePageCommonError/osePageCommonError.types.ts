import { IAppContext } from "@msx/platform-services";
import { InjectedIntlProps } from "react-intl";

export interface IComponentProps {
  parentContext: IAppContext;
}

export interface IComponentAttributes extends IComponentProps {
  title?: string;
  description: string;
}

export type IEmptyContainerImageProps = IComponentAttributes &
  InjectedIntlProps;
