import { RESOURCES } from "enums/Resources";

// Returns a normalized resource object for cost check
export const normalizeResources = (resources: { [key:string]: number }) => {
    var newResources: { [key in RESOURCES]: number } = {
        [RESOURCES.HUMANS]: resources.humans || 0,
        [RESOURCES.GOLD]: resources.gold || 0,
        [RESOURCES.SCAVENGED]: resources.scavenged || 0,
        [RESOURCES.SOULS]: resources.souls || 0,
    }
    return newResources
    }
