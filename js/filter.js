'use strict';

(function () {
  var OFFER_PRICE_FILTER_RANGES = {low: [0, 9999], middle: [10000, 50000], high: [50001, Number.MAX_SAFE_INTEGER]};

  var mapFilterElement = document.querySelector('.map__filters');
  var houseTypeElement = mapFilterElement.querySelector('select[name=housing-type]');
  var housePriceElement = mapFilterElement.querySelector('select[name=housing-price]');
  var houseRoomElement = mapFilterElement.querySelector('select[name=housing-rooms]');
  var houseGuestsElement = mapFilterElement.querySelector('select[name=housing-guests]');
  var houseFeaturesElement = mapFilterElement.querySelector('#housing-features');
  var loadedOffers = [];
  var filteredOffers = [];

  mapFilterElement.addEventListener('change', function () {
    window.utils.debounce(apply);
  });

  function getSimilarOfferType(offer) {
    return checkDataCorrespondance(offer, houseTypeElement.value, 'type');
  }

  function getSimilarOfferPrice(offer) {
    var selectedPriceRange = OFFER_PRICE_FILTER_RANGES[housePriceElement.value];
    return housePriceElement.value === 'any' ? true : selectedPriceRange[0] <= offer.offer.price && offer.offer.price <= selectedPriceRange[1];
  }

  function getSimilarOfferRooms(offer) {
    return checkDataCorrespondance(offer, houseRoomElement.value, 'rooms');
  }

  function getSimilarOfferGuests(offer) {
    return checkDataCorrespondance(offer, houseGuestsElement.value, 'guests');
  }

  function getSimilarOfferFeatures(offer) {
    var selectedFeatures = [];
    var offerFeatures = offer.offer.features;
    houseFeaturesElement.querySelectorAll('input').forEach(function (item) {
      if (item.checked) {
        selectedFeatures.push(item.value);
      }
    });
    return selectedFeatures.every(function (item) {
      return offerFeatures.includes(item);
    });
  }

  function getFilteredData() {
    loadedOffers = window.data.getLoadedOffers();
    filteredOffers = loadedOffers.filter(checkIfOfferEmpty)
      .filter(getSimilarOfferType)
      .filter(getSimilarOfferPrice)
      .filter(getSimilarOfferRooms)
      .filter(getSimilarOfferGuests)
      .filter(getSimilarOfferFeatures);

    return filteredOffers;
  }

  function checkDataCorrespondance(it, selectedValue, filteredValue) {
    return selectedValue === 'any' ? true : it.offer[filteredValue].toString() === selectedValue;
  }

  function checkIfOfferEmpty(it) {
    return it.offer !== null;
  }

  function apply() {
    window.card.deleteOffer();
    window.data.addOfferToMap(getFilteredData());
  }

  function reset() {
    mapFilterElement.reset();
  }

  window.filter = {
    reset: reset,
    apply: apply
  };

})();
