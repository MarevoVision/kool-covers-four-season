import $ from "jquery";
import { state } from "../../../../core/settings";
import "./interfaceGroup.scss";

export function interfaceGroupComponent(title = "empty", param = "empty") {
  const componentContent = $(`
        <div class="interface__group">
           <div class="interface__group__head">
             <h2 class="interface__group__head__name">${title}</h2>
             <h2  class="interface__group__head__param">${param}</h2>
           </div>
        </div>
    `);

  componentContent.find(".interface__group__head").on("click", function () {
    const clickedGroup = $(this).closest(".interface__group");
    const relativeItem = clickedGroup.find(".interface__group__inputs");
    const arrowIcon = clickedGroup.find(".interface__group__head__param");

    $(".interface__group").each(function () {
      const relativeItem = $(this).find(".interface__group__inputs");
      const arrowIcon = $(this).find(".interface__group__head__param");
      relativeItem.slideUp(300);
      arrowIcon.removeClass("interface__group__head__param-rotated");
    });

    // Відкриваємо або закриваємо поточний елемент
    if (relativeItem.is(":visible")) {
      relativeItem.slideUp(300);
      arrowIcon.removeClass("interface__group__head__param-rotated");
    } else {
      relativeItem.slideDown(300);
      arrowIcon.addClass("interface__group__head__param-rotated");
    }
  });

  //HIDE GROUP IF NEEDED
  if (title === "Dimensions") {
    setTimeout(() => {
      componentContent.find(".interface__group__inputs").append(`
        <div class="select-inputs">
               <div class="type_interface_checkbox-wall_item option" id="steel"> 
                  <div class="type_interface_checkbox-wall_bottom">
                    <input class="type_interface_checkbox-wall_option" type="checkbox">
                    <label for="back">Steel Inserts</label>
                  </div> 
                </div>
              </div>
             </div>
        `);

      const activeClass = "active";

      //INIT STEEL HEADER
      componentContent.find("#steel").each(function () {
        if (state.ab) {
          $(this).addClass(activeClass);
        }
      });

      //HANDLE STEEL HEADER
      componentContent.find("#steel").on("click", function () {
        $(this).toggleClass(activeClass);
        state.ab = !state.ab;

        pergola.update();
        pergola.checkSystemsInScene();
      });
    }, 500);
  }

  // //INIT ROOF GROUP
  // if (
  //   title === "Roof Type" &&
  //   state.model &&
  //   state.moodLight === "Screens"
  // ) {
  //   componentContent.show();
  // }

  return componentContent;
}
