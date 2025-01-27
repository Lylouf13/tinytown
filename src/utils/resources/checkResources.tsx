import { RESOURCES } from "enums/Resources";

export const checkResources = (resources: { [key: string]: number }, cost: { [key: string]: number }) => {
  const resourcesKeys: string[] = Object.keys(RESOURCES);
  for (const key in cost) {
    if (resources[key] === undefined || !resourcesKeys.includes(key) || resources[key] < cost[key]) {
      return false;
    }
  }
  return true;
};
