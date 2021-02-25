import request from "./request";

export default function getAdapter(
  config: IAppletsRequest.IHttpConfig
): IAppletsRequestPromise {
  return request(config);
}
