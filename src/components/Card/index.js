import styles from "./Card.module.scss";
import React from "react";

function Card({ id, title, price, imageUrl, onClickPlus, onClickFavorite }) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(false);

  const onPlus = () => {
    onClickPlus({ id, title, price, imageUrl });
    setIsAdded(!isAdded);
  };

  const onFavorite = () => {
    onClickFavorite({ title, price, imageUrl });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img
          src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}
          alt="Unliked"
          onClick={onFavorite}
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneaker pic" />
      <h5>{title}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column ">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onPlus}
          src={isAdded ? "img/btn-checked.svg" : "img/plus.svg"}
        />
      </div>
    </div>
  );
}

export default Card;
