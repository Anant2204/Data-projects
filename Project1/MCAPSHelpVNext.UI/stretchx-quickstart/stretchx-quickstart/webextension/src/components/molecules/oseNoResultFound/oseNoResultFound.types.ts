import { IAppContext } from "@msx/platform-services";

export interface IComponentProps {
  parentContext: IAppContext;
}

export interface IComponentAttributes extends IComponentProps {
  title: string;
  description: string;
}

export type IEmptyContainerImageProps = IComponentAttributes;