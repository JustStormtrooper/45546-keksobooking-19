'use strict';

(function () {
  var OfferType = {
    FLAT: 'Квартира',
    BUNGALO: 'Бунгало',
    HOUSE: 'Дом',
    PALACE: 'Дворец'
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

  function createOffer(offer) {
    deleteOffer();

    var cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.popup__title').textContent = offer.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = offer.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = offer.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = OfferType[offer.offer.type.toUpperCase()];
    cardElement.querySelector('.popup__text--capacity').textContent = offer.offer.rooms + ' комнаты для ' + offer.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + offer.offer.checkin + ', выезд до' + offer.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = offer.offer.description;

    var listFeatures = cardElement.querySelector('.popup__features');
    listFeatures.innerHTML = '';
    offer.offer.features.forEach(function (it) {
      var featureElement = document.createElement('li');
      featureElement.className = 'popup__feature popup__feature--' + it;
      listFeatures.appendChild(featureElement);
    });

    var photosElement = cardElement.querySelector('.popup__photos');
    var photoTemplate = photosElement.querySelector('.popup__photo');
    photosElement.innerHTML = '';
    offer.offer.photos.forEach(function (it) {
      var photoElement = photoTemplate.cloneNode();
      photoElement.src = it;
      photosElement.appendChild(photoElement);
    });

    cardElement.querySelector('.popup__avatar').src = offer.author.avatar;

    cardElement.querySelector('.popup__close').addEventListener('click', onPopupCloseClick);
    document.addEventListener('keydown', onEscCardClose);

    document.querySelector('.map__pins').insertAdjacentElement('afterend', cardElement);
  }

  function deleteOffer() {
    var openedOfferCard = document.querySelector('.map__card');
    if (openedOfferCard !== null) {
      openedOfferCard.parentElement.removeChild(openedOfferCard);
      window.data.removePinActive();
      document.removeEventListener('keydown', onEscCardClose);
    }
  }

  function onEscCardClose(evt) {
    window.utils.onEscPress(evt, deleteOffer);
  }

  function onPopupCloseClick() {
    deleteOffer();
  }

  window.card = {
    createOffer: createOffer,
    deleteOffer: deleteOffer
  };

})();
