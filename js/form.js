'use strict';

(function () {
  var OfferTypeMinPrice = {
    FLAT: 1000,
    BUNGALO: 0,
    HOUSE: 5000,
    PALACE: 10000
  };

  var adFormElement = document.querySelector('.ad-form');
  var adFormAddressElement = adFormElement.querySelector('input[name=address]');
  var adFormRoomsElement = adFormElement.querySelector('select[name=rooms]');
  var adFormGuestsElement = adFormElement.querySelector('select[name=capacity]');
  var adFormTypeElement = adFormElement.querySelector('select[name=type]');
  var adFormPriceElement = adFormElement.querySelector('input[name=price]');
  var adFormTimeinElement = adFormElement.querySelector('select[name=timein]');
  var adFormTimeoutElement = adFormElement.querySelector('select[name=timeout]');
  var adFormResetElement = adFormElement.querySelector('.ad-form__reset');

  adFormAddressElement.readOnly = true;

  function enableAd() {
    adFormElement.classList.remove('ad-form--disabled');
    window.utils.setElementsState(adFormElement, true);
  }

  function disableAd() {
    adFormElement.classList.add('ad-form--disabled');
    window.utils.setElementsState(adFormElement, false);
  }

  function fillAddressField(x, y, pageState) {
    var newX = Math.round(x + window.constants.MAP_PIN_MAIN_WIDTH / 2);
    var newY = Math.round(y + (pageState ? window.constants.MAP_PIN_MAIN_HEIGHT_ACTIVE : window.constants.MAP_PIN_MAIN_HEIGHT / 2));
    adFormAddressElement.value = newX + ', ' + newY;
  }

  function checkRoomsGuestsCorrespondence() {
    var rooms = +adFormRoomsElement.value;
    var guests = +adFormGuestsElement.value;

    if (rooms === 1 && guests !== 1) {
      adFormGuestsElement.setCustomValidity('Только для одного гостя.');
    } else if (rooms === 2 && (guests > 2 || !guests)) {
      adFormGuestsElement.setCustomValidity('Один или два гостя.');
    } else if (rooms === 3 && (guests > 3 || !guests)) {
      adFormGuestsElement.setCustomValidity('От одного до трех гостей.');
    } else if (rooms === 100 && guests !== 0) {
      adFormGuestsElement.setCustomValidity('Не предназначено для гостей.');
    } else {
      adFormGuestsElement.setCustomValidity('');
    }
  }

  adFormRoomsElement.addEventListener('change', function () {
    checkRoomsGuestsCorrespondence();
  });

  adFormGuestsElement.addEventListener('change', function () {
    checkRoomsGuestsCorrespondence();
  });

  adFormTypeElement.addEventListener('change', function () {
    var minPrice = OfferTypeMinPrice[adFormTypeElement.value.toUpperCase()];
    adFormPriceElement.placeholder = minPrice;
    adFormPriceElement.min = minPrice;
  });

  adFormTimeinElement.addEventListener('change', function () {
    adFormTimeoutElement.value = adFormTimeinElement.value;
  });

  adFormTimeoutElement.addEventListener('change', function () {
    adFormTimeinElement.value = adFormTimeoutElement.value;
  });

  adFormElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(adFormElement), resetAdForm);
    evt.preventDefault();
  });

  adFormResetElement.addEventListener('click', onResetButtonClick);

  function resetAdForm() {
    adFormElement.reset();
    window.map.setPageInactive();
  }

  function onResetButtonClick() {
    resetAdForm();
  }

  window.form = {
    enableAd: enableAd,
    disableAd: disableAd,
    fillAddressField: fillAddressField,
    checkRoomsGuestsCorrespondence: checkRoomsGuestsCorrespondence
  };

})();
