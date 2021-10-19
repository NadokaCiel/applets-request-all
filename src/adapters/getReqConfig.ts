/*
 * @Author: youzhao.zhou
 * @Date: 2021-10-19 10:37:01
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-10-19 10:37:42
 * @Description 获取不同平台的http请求接口的配置
 */
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
