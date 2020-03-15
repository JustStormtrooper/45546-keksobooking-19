'use strict';

(function () {
  var Y_LOCATION_RANGE = [130, 630];

  var mapElement = document.querySelector('.map');
  var mapFiltersElement = mapElement.querySelector('.map__filters');
  var adFormElement = document.querySelector('.ad-form');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');
  var mapPinMainLeft = parseInt(mapPinMainElement.style.left, 10);
  var mapPinMainTop = parseInt(mapPinMainElement.style.top, 10);
  var mapPinsFieldWidth = mapElement.offsetWidth;

  var mapPinMainCoordLimits = {
    x: [-window.constants.MAP_PIN_MAIN_WIDTH / 2, mapPinsFieldWidth - window.constants.MAP_PIN_MAIN_WIDTH / 2],
    y: [Y_LOCATION_RANGE[0] - window.constants.MAP_PIN_MAIN_HEIGHT_ACTIVE, Y_LOCATION_RANGE[1] - window.constants.MAP_PIN_MAIN_HEIGHT_ACTIVE]
  };

  function showOfferMap() {
    mapElement.classList.remove('map--faded');
  }

  function showOffers() {
    window.data.createOffersMap();
    showOfferMap();
    window.form.enableAd();
  }

  function setPageInactive() {
    window.form.setElementsState(mapFiltersElement, false);
    window.form.setElementsState(adFormElement, false);
    window.form.fillAddressField(mapPinMainLeft, mapPinMainTop, false);
  }

  function setPageActive(evt) {
    if ((evt.type === 'mousedown' && !evt.button) || evt.type === 'click') {
      window.form.setElementsState(mapFiltersElement, true);
      window.form.setElementsState(adFormElement, true);
      window.form.fillAddressField(mapPinMainLeft, mapPinMainTop, true);
      showOffers();
      window.form.checkRoomsGuestsCorrespondence();
      mapPinMainElement.removeEventListener('mousedown', setPageActive);
      mapPinMainElement.removeEventListener('click', setPageActive);
    }
  }

  mapPinMainElement.addEventListener('mousedown', setPageActive);
  mapPinMainElement.addEventListener('click', setPageActive);

  mapPinMainElement.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var shift = {
      x: startCoords.x,
      y: startCoords.y
    };

    function onMouseMove(moveEvt) {
      updateMapPinMainCoords(moveEvt.clientX, moveEvt.clientY);
    }

    function onMouseUp(upEvt) {
      updateMapPinMainCoords(upEvt.clientX, upEvt.clientY);// ?????
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    function updateMapPinMainCoords(x, y) {
      trackMouseMovement(x, y);

      var mapPinMainNewX = mapPinMainElement.offsetLeft - shift.x;
      var mapPinMainNewY = mapPinMainElement.offsetTop - shift.y;

      if (mapPinMainNewX < mapPinMainCoordLimits.x[0]) {
        mapPinMainNewX = mapPinMainCoordLimits.x[0];
      } else if (mapPinMainNewX > mapPinMainCoordLimits.x[1]) {
        mapPinMainNewX = mapPinMainCoordLimits.x[1];
      }

      if (mapPinMainNewY < mapPinMainCoordLimits.y[0]) {
        mapPinMainNewY = mapPinMainCoordLimits.y[0];
      } else if (mapPinMainNewY > mapPinMainCoordLimits.y[1]) {
        mapPinMainNewY = mapPinMainCoordLimits.y[1];
      }

      mapPinMainElement.style.left = mapPinMainNewX + 'px';
      mapPinMainElement.style.top = mapPinMainNewY + 'px';
      window.form.fillAddressField(mapPinMainNewX, mapPinMainNewY, true);
    }

    function trackMouseMovement(newMouseX, newMouseY) {
      shift = {
        x: startCoords.x - newMouseX,
        y: startCoords.y - newMouseY
      };

      startCoords = {
        x: newMouseX,
        y: newMouseY
      };
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

  setPageInactive();

})();
