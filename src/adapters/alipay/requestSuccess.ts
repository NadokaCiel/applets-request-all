import { dataParser, isUndefined } from "../../helpers/utils";

interface IResolveOptions {
  headers: Record<string, any>;
  status: number;
  data: any;
  response?: any;
}

export default function requestSuccess(res: any): IResolveOptions {
  if (isUndefined(res) || res === null) {
    return {
      headers: {},
      status: 200,
      data: {},
      response: res,
    };
  }

  return {
    headers: res.headers,
    status: res.status,
    data: dataParser(res.data),
    response: res,
  };
}
