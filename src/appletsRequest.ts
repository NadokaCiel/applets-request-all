import appletsRequest, {
  AppletsRequest,
  createAppletsRequestInstance,
  getDefaults as getAppletsRequestDefaults,
} from "applets-request";
import getAdapter from "./adapters";

appletsRequest.defaults.adapter = getAdapter;

export default appletsRequest;

export { AppletsRequest as AppletsRequest };

export { createAppletsRequestInstance as createAppletsRequestInstance };

export function getDefaults(): IAppletsRequestConfig {
  const defaults = getAppletsRequestDefaults();
  defaults.adapter = getAdapter;

  return defaults;
}
