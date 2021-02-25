import weappConfig from "./wechat/config";
import alipayConfig from "./alipay/config";

export default function getReqConfig(config: IAppletsRequest.IHttpConfig): any {
  if (typeof wx !== "undefined") {
    return weappConfig(config);
  }

  if (typeof my !== "undefined") {
    return alipayConfig(config);
  }
  return config;
}
