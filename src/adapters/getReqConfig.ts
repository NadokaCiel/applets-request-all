import { isUndefined } from "../helpers/utils";
import weappConfig from "./wechat/config";
import alipayConfig from "./alipay/config";

export default function getReqConfig(config: IAppletsRequest.IHttpConfig): any {
  if (!isUndefined(wx)) {
    return weappConfig(config);
  }

  if (!isUndefined(my)) {
    return alipayConfig(config);
  }
  return config;
}
