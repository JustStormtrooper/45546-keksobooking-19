'use strict';

(function () {

  var mapElement = document.querySelector('.map');
  var mapFiltersElement = mapElement.querySelector('.map__filters');
  var adFormElement = document.querySelector('.ad-form');
  var mapPinMainElement = mapElement.querySelector('.map__pin--main');
  var mapPinMainLeft = parseInt(mapPinMainElement.style.left, 10);
  var mapPinMainTop = parseInt(mapPinMainElement.style.top, 10);

  function showOfferMap() {
    mapElement.classList.remove('map--faded');
  }

  function showOffers() {
    window.data.createOffersMap();
    showOfferMap();
    window.form.enableAdForm();
  }

  function setPageInactive() {
    window.form.setFormElementsState(mapFiltersElement, false);
    window.form.setFormElementsState(adFormElement, false);
    window.form.fillAddressField(mapPinMainLeft, mapPinMainTop, false);
  }

  function setPageActive(evt) {
    if ((evt.type === 'mousedown' && !evt.button) || evt.type === 'click') {
      window.form.setFormElementsState(mapFiltersElement, true);
      window.form.setFormElementsState(adFormElement, true);
      window.form.fillAddressField(mapPinMainLeft, mapPinMainTop, true);
      showOffers();
      window.form.checkRoomsGuestsCorrespondence();
      mapPinMainElement.removeEventListener('mousedown', setPageActive);
      mapPinMainElement.removeEventListener('click', setPageActive);
    }
  }

  mapPinMainElement.addEventListener('mousedown', setPageActive);
  mapPinMainElement.addEventListener('click', setPageActive);

  setPageInactive();

})();
