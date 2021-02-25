import { getGlobal, isUndefined } from "../helpers/utils";

export default function getRequestAdapter(): any {
  if (!isUndefined(wx) || !isUndefined(my)) {
    return getGlobal().request;
  }

  throw new TypeError("Unrecognized Platform");
}
