import $ from "jquery";
import "./shareAr.scss";

export function shareArComponent(container) {
  const html = $(`
    <div class="share-ar__container" id="share">
      <div class="share-ar__container-share" >
        <h3 class="share-ar__container-share__title">Share Configurator</h3>

        <div class="share-ar__container-share__close" id="share-close"></div>

         <div class="share-ar__container-share__bottom">
           <input class="share-ar__container-share__bottom__link" id="input" type="text">

           <button class="share-ar__container-share__bottom__button" id="copy"></button>
         </div>
      </div>
    </div>`);
  const htmlAR = $(
    `
    <div class="ar__container" id="ar">
        <div class="ar">

        <h3 class="share-ar__container-share__title">Experience it in AR!</h3>

        <h3 class="ar__title">Scan the QR code with your phone to see this pergola in Augmented Reality.</h3>

        <div class="ar__close" id="ar-close"></div>
        
         <div class="ar__bottom" id="qr-container">

         </div>
        </div>
    </div>
    `
  );

  const copyButton = html.find("#copy");
  const closeButton = html.find("#share-close");
  const closeButtonAR = htmlAR.find("#ar-close");

  const input = html.find("#input");
  input.val(window.location.href);

  copyButton.on("click", () => {
    navigator.clipboard.writeText(window.location.href);
  });

  closeButton.on("click", () => {
    html.hide();
    $(".main-content").removeClass("main-content-bg");

    $(".interface-container").removeClass("interface-container-portal");
  });

  closeButtonAR.on("click", () => {
    htmlAR.hide();
    $(".main-content").removeClass("main-content-bg");

    $(".interface-container").removeClass("interface-container-portal");
  });

  html.hide();
  htmlAR.hide();

  $(container).append(html);
  $(container).append(htmlAR);
}
