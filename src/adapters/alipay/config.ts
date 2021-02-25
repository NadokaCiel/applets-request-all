export default function getRequestOptions(
  config: IAppletsRequest.IHttpConfig
): any {
  const reqConfig: any = {
    url: config.url || "",
    method: config.method,
    data: config.data,
    headers: config.headers,
    dataType: "json",
    timeout: config.timeout,
  };

  const dataType = config.dataType || "json";
  reqConfig.dataType = dataType;

  if (config.responseType && config.responseType !== "json") {
    reqConfig.dataType = "其他";
  }

  return reqConfig;
}
