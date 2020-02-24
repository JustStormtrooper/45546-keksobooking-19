'use strict';

var OFFER_NUM = 8;
var Y_LOCATION_RANGE = [130, 630];
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MAX_PHOTO_NUM = 10;
var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;
var MAP_PIN_MAIN_HEIGHT_ADD = 22;

var mapElement = document.querySelector('.map');
var mapPinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPinsElement = document.querySelector('.map__pins');
var mapFiltersElement = mapElement.querySelector('.map__filters');
var adFormElement = document.querySelector('.ad-form');
var mapPinMainElement = mapElement.querySelector('.map__pin--main');
var adFormAddressElement = adFormElement.querySelector('input[name=address]');
var adFormRoomsElement = adFormElement.querySelector('select[name=rooms]');
var adFormGuestsElement = adFormElement.querySelector('select[name=capacity]');

var mapPinMainLeft = parseInt(mapPinMainElement.style.left, 10);
var mapPinMainTop = parseInt(mapPinMainElement.style.top, 10);
var mapPinsFieldWidth = mapPinsElement.offsetWidth;
var mapPinMainWidth = mapPinMainElement.offsetWidth;
var mapPinMainHeight = mapPinMainElement.offsetHeight;
var mapPinMainHeightActive = mapPinMainHeight + MAP_PIN_MAIN_HEIGHT_ADD;
var addressOffsetY = mapPinMainHeight / 2;

adFormAddressElement.readOnly = true;

function showOfferMap() {
  mapElement.classList.remove('map--faded');
}

function enableAdForm() {
  adFormElement.classList.remove('ad-form--disabled');
}

function generateOffers() {
  var rentalOffers = [];

  for (var i = 0; i < OFFER_NUM; i++) {
    var authorAvatar = {};
    authorAvatar.avatar = 'img/avatars/user0' + (i + 1) + '.png';

    var offerLocation = {};
    offerLocation.x = Math.round(Math.random() * mapPinsFieldWidth);
    offerLocation.y = Math.round(Math.random() * (Y_LOCATION_RANGE[1] - Y_LOCATION_RANGE[0]) + Y_LOCATION_RANGE[0]);

    var offerInfo = {};
    offerInfo.title = 'Lorem ipsum dolor';
    offerInfo.address = offerLocation.x + ', ' + offerLocation.y;
    offerInfo.price = Math.round(Math.random() * 100000);
    offerInfo.type = OFFER_TYPE[Math.floor(Math.random() * OFFER_TYPE.length)];
    offerInfo.rooms = Math.floor(Math.random() * 3);
    offerInfo.quests = Math.floor(Math.random() * 5);
    offerInfo.checkin = OFFER_CHECK_IN_OUT[Math.floor(Math.random() * OFFER_CHECK_IN_OUT.length)];
    offerInfo.checkout = OFFER_CHECK_IN_OUT[Math.floor(Math.random() * OFFER_CHECK_IN_OUT.length)];
    offerInfo.features = OFFER_FEATURES.slice(0, Math.round(Math.random() * OFFER_FEATURES.length));
    offerInfo.description = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Metus aliquam eleifend mi in nulla posuere sollicitudin. Enim eu turpis egestas pretium aenean pharetra magna.';
    offerInfo.photos = getRandomPhotos(Math.floor(Math.random() * MAX_PHOTO_NUM));

    var rentalOffer = {};
    rentalOffer.author = authorAvatar;
    rentalOffer.offer = offerInfo;
    rentalOffer.location = offerLocation;

    rentalOffers.push(rentalOffer);
  }

  return rentalOffers;
}

function getRandomPhotos(photoAmount) {
  var photos = [];

  for (var i = 0; i < photoAmount; i++) {
    photos.push(OFFER_PHOTOS[Math.floor(Math.random() * OFFER_PHOTOS.length)]);
  }

  return photos;
}

function addOfferToMap(offers) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < OFFER_NUM; i++) {
    fragment.appendChild(renderOffer(offers[i]));
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

function setFormElementsState(formElement, formItemState) {
  var formChildren = formElement.children;
  for (var i = 0; i < formChildren.length; i++) {
    formChildren[i].disabled = !formItemState;
  }
}

function setPageInactive() {
  setFormElementsState(mapFiltersElement, false);
  setFormElementsState(adFormElement, false);
  fillAddressField(mapPinMainLeft, mapPinMainTop);
}

function setPageActive(evt) {
  if ((evt.type === 'mousedown' && !evt.button) || evt.type === 'click') {
    addressOffsetY = mapPinMainHeightActive;
    setFormElementsState(mapFiltersElement, true);
    setFormElementsState(adFormElement, true);
    fillAddressField(mapPinMainLeft, mapPinMainTop);
    showOffers();
    checkRoomsGuestsCorrespondence();
    mapPinMainElement.removeEventListener('mousedown', setPageActive);
    mapPinMainElement.removeEventListener('click', setPageActive);
  }
}

function showOffers() {
  showOfferMap();
  enableAdForm();
  var offers = generateOffers();
  addOfferToMap(offers);
}

function fillAddressField(x, y) {
  var newX = Math.round(x + mapPinMainWidth / 2);
  var newY = Math.round(y + addressOffsetY);

  if (newX < 0) {
    newX = 0;
  } else if (newX > mapPinsFieldWidth) {
    newX = mapPinsFieldWidth;
  }

  if (newY < Y_LOCATION_RANGE[0]) {
    newY = Y_LOCATION_RANGE[0];
  } else if (newY > Y_LOCATION_RANGE[1]) {
    newY = Y_LOCATION_RANGE[1];
  }

  adFormAddressElement.value = newX + ', ' + newY;
}

function checkRoomsGuestsCorrespondence() {
  var rooms = +adFormRoomsElement.value;
  var guests = +adFormGuestsElement.value;

  if (rooms === 1 && guests !== 1) {
    adFormGuestsElement.setCustomValidity('Только для одного гостя.');
  } else if (rooms === 2 && (guests > 2 || !guests)) {
    adFormGuestsElement.setCustomValidity('Один или два гостя.');
  } else if (rooms === 3 && (guests > 3 || !guests)) {
    adFormGuestsElement.setCustomValidity('От одного до трех гостей.');
  } else if (rooms === 100 && guests !== 0) {
    adFormGuestsElement.setCustomValidity('Не предназначено для гостей.');
  } else {
    adFormGuestsElement.setCustomValidity('');
  }
}

// Listeners
mapPinMainElement.addEventListener('mousedown', setPageActive);

mapPinMainElement.addEventListener('click', setPageActive);

adFormRoomsElement.addEventListener('change', function () {
  checkRoomsGuestsCorrespondence();
});

adFormGuestsElement.addEventListener('change', function () {
  checkRoomsGuestsCorrespondence();
});

setPageInactive();
