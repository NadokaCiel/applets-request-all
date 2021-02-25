import { isUndefined } from "../helpers/utils";
import weappRequest from "./wechat/request";

export default function getAdapter(
  config: IAppletsRequest.IHttpConfig
): IAppletsRequestPromise {
  if (!isUndefined(wx)) {
    return weappRequest(config);
  }
  throw new TypeError("Unrecognized Platform");
}
