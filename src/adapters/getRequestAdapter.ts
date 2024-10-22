/*
 * @Author: youzhao.zhou
 * @Date: 2021-10-19 10:37:50
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2024-10-22 16:23:51
 * @Description 获取不同平台http请求的接口方法
 */
import axios from "axios";
import { getGlobal } from "../helpers/utils";

export default function getRequestAdapter(): any {
  if (typeof wx !== "undefined" || typeof my !== "undefined") {
    return getGlobal().request;
  }

  if (typeof window !== "undefined") {
    return makeFetch;
  }

  throw new TypeError("Unrecognized Platform");
}

function makeFetch() {
  return function myFetch(config: any) {
    axios
      .request({
        ...config,
      })
      .then(function (response) {
        config?.success?.(response);
      })
      .catch(function (error) {
        config?.fail?.(error);
      })
      .finally(() => {
        config?.complete?.();
      });
  };
}
