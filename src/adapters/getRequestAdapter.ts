/*
 * @Author: youzhao.zhou
 * @Date: 2021-10-19 10:37:50
 * @Last Modified by: youzhao.zhou
 * @Last Modified time: 2021-10-19 10:38:12
 * @Description 获取不同平台http请求的接口方法
 */
import { getGlobal } from "../helpers/utils";

export default function getRequestAdapter(): any {
  if (typeof wx !== "undefined" || typeof my !== "undefined") {
    return getGlobal().request;
  }

  throw new TypeError("Unrecognized Platform");
}
