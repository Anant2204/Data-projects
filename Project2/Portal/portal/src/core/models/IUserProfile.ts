import { IDashboardTile } from "@msx/platform-services";

export interface IUserProfile {
  userPreference: {
    tilesOrder: IDashboardTile[],
    locale: string,
    theme: string,
  };
}