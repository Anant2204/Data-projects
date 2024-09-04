import { IDashboardTile } from "@msx/platform-services";

export interface ITilesOrder extends IDashboardTile {
  isVisible?: boolean;
}

export interface IUserProfile {
  isFirstTimeUser?: boolean,
  userPreference: {
    tilesOrder: ITilesOrder[], 
    locale: string,
    theme: string,
  };
}