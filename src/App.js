import React from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import axios from "axios";

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://63e6181b83c0e85a868c89fe.mockapi.io/items")
      .then((res) => {
        setItems(res.data);
      });
    axios
      .get("https://63e6181b83c0e85a868c89fe.mockapi.io/cart")
      .then((res) => {
        setCartItems(res.data);
      });
  }, []);

  const addToCart = (obj) => {
    try {
      if (cartItems.find((item) => item.title === obj.title)) {
        axios.delete(
          `https://63e6181b83c0e85a868c89fe.mockapi.io/cart/${obj.title}`
        );
        setCartItems((prev) => prev.filter((item) => item.title !== obj.title));
      } else {
        axios.post("https://63e6181b83c0e85a868c89fe.mockapi.io/cart", obj);
        setCartItems((prev) => [...prev, obj]);
      }
    } catch (error) {}
  };

  const addToFavorite = (obj) => {
    setFavorites((prev) => [...prev, obj]);
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://63e6181b83c0e85a868c89fe.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          cartItems={cartItems}
          onClickClose={() => setCartOpened(false)}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              addToFavorite={addToFavorite}
              addToCart={addToCart}
              // Sneakers={Sneakers}
            />
          }
        ></Route>

        <Route path="/favorites" element={<Favorites items={items} />}></Route>
      </Routes>
    </div>
  );
}

export default App;
