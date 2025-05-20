import $ from "jquery";
import "./summaryButton.scss";
import { summaryPageComponent } from "../summary-page/summaryPage";
import { ComputeMorphedAttributes, CreateImageList, toggleLoad } from "../../../core/3d-configurator";

export function summaryButtonComponent(container) {
  const summaryButton = $(`
        <button class="summary__button" id="summary">
            Summary
        </button>`);

  summaryButton.on("click", async () => {
    const mainContent = $("#content");
    const summaryPage = $("#summary-content");

    if ($("#summary-content").length) {
      $("#summary-content").remove();
    }

    $("body").addClass("body-overflow-auto");

    // toggleLoad(true);
    summaryPageComponent(mainContent);
    // await CreateImageList();
    // toggleLoad(false);

    $(".portal-container__close").trigger("click");
  });

  $(container).append(summaryButton);
}
