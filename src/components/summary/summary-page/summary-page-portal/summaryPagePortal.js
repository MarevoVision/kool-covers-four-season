import $ from "jquery";
import "./summaryPagePortal.scss";
import "jquery-validation";
import { createPDF } from "../../../../core/customFunctions/createPDF";
import { toggleLoad } from "../../../../core/3d-configurator";

function saveFormData() {
  const formData = {
    firstname: $("#firstname").val(),
    phoneNumber: $("#phoneNumber").val(),
    email: $("#email").val(),
    zipCode: $("#zip-code").val(),
    comment: $("#comment").val() || "",
    agree: $("#agree").is(":checked"),
  };
  localStorage.setItem("summaryFormData", JSON.stringify(formData));
}

export function loadFormData(container) {
  const savedData = JSON.parse(localStorage.getItem("summaryFormData"));

  if (savedData) {
    $(`${container} #firstname`).val(savedData.firstname);
    $(`${container} #phoneNumber`).val(savedData.phoneNumber);
    $(`${container} #email`).val(savedData.email);
    $(`${container} #zip-code`).val(savedData.zipCode);
    $(`${container} #comment`).val(savedData.comment);
    $(`${container} #agree`).prop("checked", savedData.agree);
  }
}

export function summaryPagePortalComponent(container, downloadPDF = true) {
  const html = $(`
    <div class='summary-portal' id='${
      downloadPDF ? "sum-portal-with-comment" : "sum-portal"
    }'>
      <div class="form-container">
        <form class="form" id="form">
          <div class="form__header">
            <h2 class="form__header__title">${
              downloadPDF
                ? "Fill in details below to Request a quote:"
                : "Fill in details below to Download PDF:"
            }</h2>

            <button type="button" id="closeForm" class="form__header__close"></button>
          </div>
          
          ${
            downloadPDF
              ? `
          <div class="form__top">
              <div class="form__group">
                <input class="form__input" type="text" id="firstname" name="firstname" class="form-control" placeholder="First & Last name*">
              </div>

              <div class="form__group">
                <input class="form__input" type="text" id="phoneNumber" name="phoneNumber" class="form-control" placeholder="Telephone">
              </div>
          </div>

            <div class="form__group">
              <input class="form__input" type="email" id="email" name="email" class="form-control" placeholder="Email*">
            </div>

            <div class="form__group">
              <input class="form__input" type="text" id="adress" name="adress" class="form-control" placeholder="Address*">
            </div>
          
          <div class="form__top">
            <div class="form__group">
              <input class="form__input" type="text" id="zip-code" name="zip-code" class="form-control" placeholder="Zip-code">
            </div>

            <div class="form__group">
              <input class="form__input" type="text" id="city" name="city" class="form-control" placeholder="City*">
            </div>
          </div>`
              : `
              <div class="form__group">
                <input class="form__input" type="text" id="firstname" name="firstname" class="form-control" placeholder="First & Last name*">
              </div>

              <div class="form__group">
                <input class="form__input" type="email" id="email" name="email" class="form-control" placeholder="Email*">
              </div>
          `
          }
     

          <div class="form__check">
            <input type="checkbox" id="agree" name="agree" class="form__check-input">
            <label for="agree" class="form__check__label">
I consent to Chaya Outdoors LLC using my personal information for sales, marketing, research, and targeting purposes and agree to the Terms & Conditions.
            </label>
          </div>

          <div class="form__buttons">
            <button type="button" id="cancelButton" class="form__buttons__button form__buttons__button--back">Cancel</button>
            <button type="submit" class="form__buttons__button">${
              downloadPDF ? "Request Quote" : "Download PDF"
            }</button>
          </div>
        </form>
      </div>
    </div>
  `);

  html.hide();
  const form = html.find("#form");

  $(container).append(html);

  $.validator.addMethod(
    "phoneNumber",
    function (value, element) {
      const regex = /^[0-9]{10}$/;
      return this.optional(element) || regex.test(value);
    },
    "Please enter a valid phone number (10 digits)."
  );

  $.validator.addMethod(
    "adress",
    function (value, element) {
      return this.optional(element) || value.length > 4;
    },
    "Please enter a valid address."
  );

  $.validator.addMethod(
    "zipCode",
    function (value, element) {
      return this.optional(element) || /^[0-9]{4,10}$/.test(value);
    },
    "Please enter a valid zip code."
  );

  form.validate({
    rules: {
      firstname: {
        required: true,
        minlength: 2,
      },
      phoneNumber: {
        required: true,
        phoneNumber: true,
      },
      email: {
        required: true,
        email: true,
      },
      adress: {
        required: true,
        adress: true,
      },
      "zip-code": {
        required: true,
        zipCode: true,
      },
      city: {
        required: true,
        minlength: 2,
      },
      agree: {
        required: true,
      },
      comment: {
        required: false,
      },
    },
    messages: {
      firstname: {
        required: "Please enter your first name",
        minlength: "Your name must be at least 2 characters long",
      },
      phoneNumber: {
        required: "Please enter your phone number",
        phoneNumber: "Phone number must be 10 digits",
      },
      email: {
        required: "Please enter your email",
        email: "Please enter a valid email address",
      },
      adress: {
        required: "Please enter your address",
        adress: "Address must be more than 4 characters",
      },
      "zip-code": {
        required: "Please enter your zip code",
        zipCode: "Zip code must be 4 to 10 digits",
      },
      city: {
        required: "Please enter your city",
        minlength: "City name must be at least 2 characters long",
      },
      agree: {
        required: "You must agree to the terms and conditions",
      },
    },
    submitHandler: async function (form, event) {
      event.preventDefault();

      saveFormData();

      // sendFormDataToGoogleSheets();

      if (!downloadPDF) {
        console.log("dowloan PDF");

        toggleLoad(true);
        await createPDF("download");

        toggleLoad(false);

        html.hide();
      } else {
        alert("Form has been submitted without redirect!");

        html.hide();
      }
    },
  });

  const cancelButton = html.find("#cancelButton");
  const closeButton = html.find("#closeForm");

  closeButton.on("click", function () {
    if (false) {
      toggleLoad(true);
      $("html, body").animate({ scrollTop: 0 }, "fast", () => {
        $("#summary-content").hide();
        $("body").removeClass("body-overflow-auto");
      });
      toggleLoad(false);
      html.hide();
    } else {
      html.hide();
      $("body").addClass("body-overflow-auto");
    }
  });

  cancelButton.on("click", function () {
    if (false) {
      toggleLoad(true);
      $("html, body").animate({ scrollTop: 0 }, "fast", () => {
        $("#summary-content").hide();
        $("body").removeClass("body-overflow-auto");
      });
      toggleLoad(false);
      html.hide();
    } else {
      $("#form")[0].reset();
      form.validate().resetForm();
      html.hide();
      $("body").addClass("body-overflow-auto");
    }
  });
}

function sendFormDataToGoogleSheets() {
  // SCRIPT_ID
  const scriptDeploymentId =
    "AKfycbxr6i6fQrKJYaYsAckHRKdk1Rp9zVTkcHcA7UJ0oI0764oJKl_nMe_w-AqvVoeUDhMf8Q";

  let uri = window.location.href;

  // if (isSquarespace) {
  //   uri = MAIN_SITE_URL + "?config=" + GetURLWithParameters("", true);
  // }

  $.ajax({
    url: `https://script.google.com/macros/s/${scriptDeploymentId}/exec`,
    method: "POST",
    data: {
      name: $("#firstname").val(),
      phone: $("#phoneNumber").val(),
      email: $("#email").val(),
      configuration: uri,
    },
    success: function (response) {
      console.log("Data sent successfully:", response);
    },
    error: function (error) {
      console.error("Error:", error);
    },
  });
}
