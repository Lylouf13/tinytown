export type SliceName = "game" | "town" | "army" | "enemy";

export type SliceAction = {
  sliceName: SliceName;
  actionName: string;
  payload?: any;
};
