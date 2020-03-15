'use strict';

(function () {

  var Y_LOCATION_RANGE = [130, 630];
  var MAP_PIN_MAIN_HEIGHT_ADD = 22;
  var OFFER_TYPES_MIN_PRICE = {flat: 1000, bungalo: 0, house: 5000, palace: 10000};

  var mapElement = document.querySelector('.map');
  var mapPinsElement = document.querySelector('.map__pins');
  var adFormElement = document.querySelector('.ad-form');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');
  var adFormAddressElement = adFormElement.querySelector('input[name=address]');
  var adFormRoomsElement = adFormElement.querySelector('select[name=rooms]');
  var adFormGuestsElement = adFormElement.querySelector('select[name=capacity]');
  var adFormTypeElement = adFormElement.querySelector('select[name=type]');
  var adFormPriceElement = adFormElement.querySelector('input[name=price]');
  var adFormTimeinElement = adFormElement.querySelector('select[name=timein]');
  var adFormTimeoutElement = adFormElement.querySelector('select[name=timeout]');
  var mapPinsFieldWidth = mapPinsElement.offsetWidth;
  var mapPinMainWidth = mapPinMainElement.offsetWidth;
  var mapPinMainHeight = mapPinMainElement.offsetHeight;
  var mapPinMainHeightActive = mapPinMainHeight + MAP_PIN_MAIN_HEIGHT_ADD;

  adFormAddressElement.readOnly = true;

  function enableAd() {
    adFormElement.classList.remove('ad-form--disabled');
  }

  function setElementsState(formElement, formItemState) {
    var formChildren = formElement.children;
    for (var i = 0; i < formChildren.length; i++) {
      formChildren[i].disabled = !formItemState;
    }
  }

  function fillAddressField(x, y, pageState) {
    var newX = Math.round(x + mapPinMainWidth / 2);
    var newY = Math.round(y + (pageState ? mapPinMainHeightActive : mapPinMainHeight / 2));

    if (newX < 0) {
      newX = 0;
    } else if (newX > mapPinsFieldWidth) {
      newX = mapPinsFieldWidth;
    }

    if (newY < Y_LOCATION_RANGE[0]) {
      newY = Y_LOCATION_RANGE[0];
    } else if (newY > Y_LOCATION_RANGE[1]) {
      newY = Y_LOCATION_RANGE[1];
    }

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
    var minPrice = OFFER_TYPES_MIN_PRICE[adFormTypeElement.value];
    adFormPriceElement.placeholder = minPrice;
    adFormPriceElement.min = minPrice;
  });

  adFormTimeinElement.addEventListener('change', function () {
    adFormTimeoutElement.value = adFormTimeinElement.value;
  });

  adFormTimeoutElement.addEventListener('change', function () {
    adFormTimeinElement.value = adFormTimeoutElement.value;
  });

  window.form = {
    enableAd: enableAd,
    setElementsState: setElementsState,
    fillAddressField: fillAddressField,
    checkRoomsGuestsCorrespondence: checkRoomsGuestsCorrespondence
  };

})();
