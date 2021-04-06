import weappRequestSuccess from "./wechat/requestSuccess";
import alipayRequestSuccess from "./alipay/requestSuccess";

export default function getRequestSuccess(requestRes: any): any {
  if (typeof wx !== "undefined") {
    return weappRequestSuccess(requestRes);
  }

  if (typeof my !== "undefined") {
    return alipayRequestSuccess(requestRes);
  }
  return requestRes;
}
