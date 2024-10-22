/*
 * @Author: youzhao.zhou
 * @Date: 2021-10-19 10:37:50
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2024-10-22 16:23:51
 * @Description 获取不同平台http请求的接口方法
 */
import { getGlobal } from "../helpers/utils";

export default function getRequestAdapter(): any {
  if (typeof wx !== "undefined" || typeof my !== "undefined") {
    return getGlobal().request;
  }

  if (typeof window !== "undefined") {
    return fetch;
  }

  throw new TypeError("Unrecognized Platform");
}
