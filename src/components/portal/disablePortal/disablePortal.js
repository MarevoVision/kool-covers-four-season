import $ from "jquery";
import "./disablePortal.scss";
import disablePortalHTML from "./disablePortal.html";

export function disablePortalComponent(container) {
  $(container).append(disablePortalHTML);
}
