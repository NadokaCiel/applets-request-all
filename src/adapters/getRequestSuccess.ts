/*
 * @Author: youzhao.zhou
 * @Date: 2021-10-19 10:38:26
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2024-10-22 16:24:40
 * @Description 获取不同平台处理http返回值的处理对象
 */
import weappRequestSuccess from "./wechat/requestSuccess";
import alipayRequestSuccess from "./alipay/requestSuccess";
import browserRequestSuccess from "./browser/requestSuccess";

export default function getRequestSuccess(requestRes: any): any {
  if (typeof wx !== "undefined") {
    return weappRequestSuccess(requestRes);
  }

  if (typeof my !== "undefined") {
    return alipayRequestSuccess(requestRes);
  }

  if (typeof window !== "undefined") {
    return browserRequestSuccess(requestRes);
  }
  return requestRes;
}
