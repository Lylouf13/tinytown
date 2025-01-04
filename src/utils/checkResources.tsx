import { RESOURCES } from "enums/Resources";

export const checkResources = (resources: { [key in RESOURCES]: number }, cost: { [key in RESOURCES]: number }) => {
    return Object.keys(resources).every((key) => {
        return resources[key as keyof typeof resources] >= cost[key as keyof typeof cost];
    });
};