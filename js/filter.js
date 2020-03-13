'use strict';

(function () {
  var mapFilterElement = document.querySelector('.map__filters');
  var houseTypeElement = mapFilterElement.querySelector('select[name=housing-type');

  houseTypeElement.addEventListener('change', function () {

    window.data.addOfferToMap(getSimilarOfferType(houseTypeElement.value, 'type'));
  });

  function getSimilarOfferType(selectedValue, filteredValue) {
    return window.data.getLoadedData().filter(function (it) {
      return it.offer !== null && (selectedValue === 'any' ? true : it.offer[filteredValue] === selectedValue);
    });
  }

})();
