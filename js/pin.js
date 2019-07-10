'use strict';
(function () {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var card = document.querySelector('#card').content;
  var popupPhoto = document.querySelector('template').content.querySelector('.popup__photo');
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var MapType = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  window.createPin = function (data) {
    var element = pin.cloneNode(true);
    element.style.left = data.location.x + 'px';
    element.style.top = data.location.y + 'px';
    element.querySelector('img').src = data.author.avatar;
    element.querySelector('img').alt = data.offer.title;

    var onPinClick = function () {
      var mapCard = document.querySelector('.map__card');
      if (mapCard) {
        mapCard.remove();
      }
      addInformToCard(data);
    }
    
    element.addEventListener('click', onPinClick);
    return element;
  };

  var addInformToCard = function (data) {
    var cardAdd = card.querySelector('.map__card').cloneNode(true);

    cardAdd.querySelector('.map__card img').src = data.author.avatar;
    cardAdd.querySelector('.popup__title').textContent = data.offer.title;
    cardAdd.querySelector('.popup__text--price').textContent = data.offer.price + ' ₽/ночь';

    cardAdd.querySelector('.popup__type').textContent = MapType[data.offer.type.toUpperCase()];
    cardAdd.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardAdd.querySelector('.popup__text--time').textContent = 'Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    cardAdd.querySelector('.popup__features').innerHTML = '';
    cardAdd.querySelector('.popup__features').appendChild(createFeatureFragment(data));
    cardAdd.querySelector('.popup__description').textContent = data.offer.description;
    cardAdd.querySelector('.popup__photos').removeChild(cardAdd.querySelector('.popup__photo'));
    cardAdd.querySelector('.popup__photos').appendChild(createPhotosFragment(data));
    mapFiltersContainer.insertAdjacentElement('beforebegin', cardAdd);

    var btnClose = cardAdd.querySelector('.popup__close');

    var closeCard = function () {
      cardAdd.remove();

      btnClose.removeEventListener('click', closeCard)
      document.removeEventListener('keydown', onCardAddEsc);
    };
  
    var onCardAddEsc = function (evt) {
      if (evt.keyCode === 27) {
        cardAdd.remove();
      }
    }

    btnClose.addEventListener('click', closeCard);
    document.addEventListener('keydown', onCardAddEsc);

    return cardAdd;
  }

  var createFeatureFragment = function (data) {
    var featureFragment = document.createDocumentFragment();
    data.offer.features.forEach(function (it) {
      var featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + it;
      featureFragment.appendChild(featureItem);
    });
    return featureFragment;
  };

  var createPhotosFragment = function (data) {
    var photosFragment = document.createDocumentFragment();
    data.offer.photos.forEach(function (it) {
      var popupPhotoItem = popupPhoto.cloneNode(true);
      popupPhotoItem.src = it;
      photosFragment.appendChild(popupPhotoItem);
    });
    return photosFragment;
  };

  window.renderPins = function (data) {
    for (var i = 0; i < data.slice(0, 5).length; i++) {
      window.mapPins.appendChild(window.createPin(data[i]));  
    }
  };

  window.onErrorHandler = function () {
    var mainBlock = document.querySelector('main');
    var error = document.querySelector('#error').content;
    error.cloneNode(true);
    mainBlock.appendChild(error.cloneNode(true));

    var errorButton = document.querySelector('.error__button');

    errorButton.addEventListener('click', function () {
      mainBlock.removeChild(document.querySelector('.error'));
      document.removeEventListener('keydown', onErrorEsc);
    });

    var onErrorEsc = function (evt) {
      if (evt.keyCode === 27) {
        mainBlock.removeChild(document.querySelector('.error'));
      }
      document.removeEventListener('keydown', onErrorEsc);
    };
    document.addEventListener('keydown', onErrorEsc);
  };
})();
