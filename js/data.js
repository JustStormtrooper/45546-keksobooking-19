'use strict';

(function () {
  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;

  var loadedOffers = [];
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsElement = document.querySelector('.map__pins');

  function addOfferToMap(offers) {
    var fragment = document.createDocumentFragment();

    removeOfferFromMap();
    offers.forEach(function (it) {
      var offerElement = renderOffer(it);
      fragment.appendChild(offerElement);
      addMapPinListeners(offerElement, it);
    });

    mapPinsElement.appendChild(fragment);
  }

  function removeOfferFromMap() {
    var currentMapPins = mapPinsElement.querySelectorAll('button[type=button]');
    currentMapPins.forEach(function (it) {
      mapPinsElement.removeChild(it);
    });
  }

  function renderOffer(offer) {
    var offerElement = mapPinTemplate.cloneNode(true);

    offerElement.style = 'left: ' + (offer.location.x - MAP_PIN_WIDTH / 2) + 'px; top: ' + (offer.location.y - MAP_PIN_HEIGHT) + 'px;';
    offerElement.querySelector('img').src = offer.author.avatar;
    offerElement.querySelector('img').alt = offer.offer.title;

    return offerElement;
  }

  function addMapPinListeners(mapPinElement, offer) {
    mapPinElement.addEventListener('click', function () {
      window.card.createOffer(offer);
      mapPinElement.classList.add('map__pin--active');
    });
  }

  function removePinActive() {
    document.querySelector('.map__pin--active').classList.remove('map__pin--active');
  }

  function onSuccessLoad(data) {
    loadedOffers = data;
    window.filter.apply();
  }

  function createOffersMap() {
    window.backend.load(onSuccessLoad);
  }

  function getLoadedOffers() {
    return loadedOffers;
  }

  window.data = {
    createOffersMap: createOffersMap,
    addOfferToMap: addOfferToMap,
    removeOfferFromMap: removeOfferFromMap,
    getLoadedOffers: getLoadedOffers,
    removePinActive: removePinActive
  };

})();
