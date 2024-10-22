export default function getRequestOptions(
  config: IAppletsRequest.IHttpConfig
): IAppletsRequestWx.RequestOption {
  const reqConfig: IAppletsRequestWx.RequestOption = {
    url: config.url || "",
    method: config.method,
    data: config.data,
    params: config.params,
    headers: config.headers,
    dataType: "json",
    timeout: config.timeout,
  } as IAppletsRequestWx.RequestOption;

  const dataType = config.dataType || "json";
  reqConfig.dataType = dataType;

  if (config.responseType && config.responseType !== "json") {
    reqConfig.dataType = "其他";
  }

  return reqConfig;
}