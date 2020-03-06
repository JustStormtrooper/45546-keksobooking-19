'use strict';

(function () {
  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;

  var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPinsElement = document.querySelector('.map__pins');

  function addOfferToMap(offers) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < offers.length; i++) {
      if (offers[i].offer !== null) {
        fragment.appendChild(renderOffer(offers[i]));
      }
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

  function createOffersMap() {
    window.backend.load(addOfferToMap);
  }

  window.data = {
    createOffersMap: createOffersMap
  };

})();
