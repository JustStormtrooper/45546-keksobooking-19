'use strict';

(function () {
  var mapFilterElement = document.querySelector('.map__filters');
  var houseTypeElement = mapFilterElement.querySelector('select[name=housing-type');

  houseTypeElement.addEventListener('change', function () {
    window.card.deleteOffer();
    window.data.addOfferToMap(getSimilarOfferType(houseTypeElement.value, 'type'));
  });

  function getSimilarOfferType(selectedValue, filteredValue) {
    return window.data.getLoadedOffers().filter(function (it) {
      return it.offer !== null && (selectedValue === 'any' ? true : it.offer[filteredValue] === selectedValue);
    });
  }

  function reset() {
    mapFilterElement.reset();
  }

  window.filter = {
    reset: reset
  };

})();
