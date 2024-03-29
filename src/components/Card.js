export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleLikeClick,
    handleDeleteSubmit
  ) {
    this._name = data.name;
    this._link = data.link;
    this.id = data._id;
    this.cardData = data.cardData;
    this.isLiked = data.isLiked;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteSubmit = handleDeleteSubmit;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteSubmit(this.id, this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  _renderLikes() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  updateLikes(isLiked) {
    this.isLiked = isLiked;
    this._renderLikes();
  }

  removeCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  generateCard() {
    this._cardElement = this._getTemplate();

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    this._setEventListeners();
    this._renderLikes();

    this._cardTitle.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    return this._cardElement;
  }
}
