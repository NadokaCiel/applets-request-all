import { getGlobal } from "../helpers/utils";

export default function getRequestAdapter(): any {
  if (typeof wx !== "undefined" || typeof my !== "undefined") {
    return getGlobal().request;
  }

  throw new TypeError("Unrecognized Platform");
}
