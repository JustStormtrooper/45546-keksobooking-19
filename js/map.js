'use strict';

(function () {
  var Y_LOCATION_RANGE = [130, 630];

  var mapElement = document.querySelector('.map');
  var mapFiltersElement = mapElement.querySelector('.map__filters');
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
    window.utils.setElementsState(mapFiltersElement, true);
  }

  function hideOfferMap() {
    mapElement.classList.add('map--faded');
    window.utils.setElementsState(mapFiltersElement, false);
  }

  function resetMapPinMainCoords() {
    mapPinMainElement.style.left = mapPinMainLeft + 'px';
    mapPinMainElement.style.top = mapPinMainTop + 'px';
    window.form.fillAddressField(mapPinMainLeft, mapPinMainTop, false);
  }

  function showOffers() {
    window.data.createOffersMap();
    showOfferMap();
  }

  function setPageInactive() {
    window.form.disableAd();
    window.filter.reset();
    resetMapPinMainCoords();
    hideOfferMap();
    window.card.deleteOffer();
    window.data.removeOfferFromMap();
    var errorLoadElement = mapFiltersElement.nextElementSibling;
    if (errorLoadElement !== null) {
      errorLoadElement.parentElement.removeChild(errorLoadElement);
    }
    mapPinMainElement.addEventListener('mousedown', onMapPinMainMouseDown);
    mapPinMainElement.addEventListener('click', onMapPinMainClick);
  }

  function setPageActive(evt) {
    if ((evt.type === 'mousedown' && !evt.button) || evt.type === 'click') {
      window.form.fillAddressField(mapPinMainLeft, mapPinMainTop, true);
      showOffers();
      window.form.enableAd();
      window.form.checkRoomsGuestsCorrespondence();
      mapPinMainElement.removeEventListener('mousedown', onMapPinMainMouseDown);
      mapPinMainElement.removeEventListener('click', onMapPinMainClick);
    }
  }

  mapPinMainElement.addEventListener('mousedown', function (evt) {

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var shift = {
      x: startCoords.x,
      y: startCoords.y
    };

    function onDocumentMouseMove(moveEvt) {
      updateMapPinMainCoords(moveEvt.clientX, moveEvt.clientY);
    }

    function onDocumentMouseUp(upEvt) {
      updateMapPinMainCoords(upEvt.clientX, upEvt.clientY);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('mouseup', onDocumentMouseUp);
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

    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('mouseup', onDocumentMouseUp);

  });

  function onMapPinMainMouseDown(evt) {
    setPageActive(evt);
  }

  function onMapPinMainClick(evt) {
    setPageActive(evt);
  }

  setPageInactive();

  window.map = {
    setPageInactive: setPageInactive
  };

})();
