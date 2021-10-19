/*
 * @Author: youzhao.zhou
 * @Date: 2021-10-19 10:38:26
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-10-19 10:39:05
 * @Description 获取不同平台处理http返回值的处理对象
 */
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
