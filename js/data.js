'use strict';

(function () {
  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;
  var MAX_NUM_OFFERS = 5;
  var numMapOffers;

  var loadedOffers = [];
  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsElement = document.querySelector('.map__pins');

  function addOfferToMap(offers) {
    var fragment = document.createDocumentFragment();

    var currentMapPins = mapPinsElement.querySelectorAll('button[type=button]');
    for (var i = 0; i < currentMapPins.length; i++) {
      mapPinsElement.removeChild(currentMapPins[i]);
    }

    numMapOffers = offers.length < MAX_NUM_OFFERS ? offers.length : MAX_NUM_OFFERS;
    for (i = 0; i < numMapOffers; i++) {
      if (offers[i].offer !== null) {
        fragment.appendChild(renderOffer(offers[i]));
      }
    }

    if (offers[0]) {
      window.card.createOfferCard(offers[0]);
    }

    mapPinsElement.appendChild(fragment);
  }

  function renderOffer(offer) {
    var offerElement = mapPinTemplate.cloneNode(true);

    offerElement.style = 'left: ' + (offer.location.x - MAP_PIN_WIDTH / 2) + 'px; top: ' + (offer.location.y - MAP_PIN_HEIGHT) + 'px;';
    offerElement.querySelector('img').src = offer.author.avatar;
    offerElement.querySelector('img').alt = offer.offer.title;

    return offerElement;
  }

  function onSuccessLoad(data) {
    loadedOffers = data;
    addOfferToMap(data);
  }

  function createOffersMap() {
    window.backend.load(onSuccessLoad);
  }

  function getLoadedData() {
    return loadedOffers;
  }

  window.data = {
    createOffersMap: createOffersMap,
    addOfferToMap: addOfferToMap,
    getLoadedData: getLoadedData
  };

})();
