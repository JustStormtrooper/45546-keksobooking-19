'use strict';

(function () {

  var OFFER_TYPES = {flat: 'Квартира', bungalo: 'Бунгало', house: 'Дом', palace: 'Дворец'};

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');


  function createOffer(offer) {
    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = offer.offer.title;
    cardElement.querySelector('.popup__text--price').textContent = offer.offer.address;
    cardElement.querySelector('.popup__text--address').innerHTML = offer.offer.price + '&#x20bd;<span>/ночь</span>';
    cardElement.querySelector('.popup__type').textContent = OFFER_TYPES[offer.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до' + offer.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = offer.offer.description;

    var listFeatures = cardElement.querySelector('.popup__features').children;
    var offerFeatures = offer.offer.features;
    for (var i = listFeatures.length - 1; i >= 0; i--) {
      if (!offerFeatures.includes(listFeatures[i].classList[1].slice(16))) {
        listFeatures[i].parentElement.removeChild(listFeatures[i]);
      }
    }

    var offerPhotos = offer.offer.photos;
    var photosElement = cardElement.querySelector('.popup__photos');
    var photoTemplate = photosElement.querySelector('.popup__photo');
    photosElement.innerHTML = '';
    for (i = 0; i < offerPhotos.length; i++) {
      var photoElement = photoTemplate.cloneNode();
      photoElement.src = offerPhotos[i];
      photosElement.appendChild(photoElement);
    }

    cardElement.querySelector('.popup__avatar').src = offer.author.avatar;

    document.querySelector('.map__pins').insertAdjacentElement('afterend', cardElement);
  }

  window.card = {
    createOffer: createOffer
  };

})();
