import Card from "../components/Card";

function Home({items, 
    searchValue, 
    setSearchValue,
    onChangeSearchInput,
    addToFavorite,
    addToCart}) {
    return (
        <div className="content p-40">
        <div className="d-flex align-center justify-between">
          <h1>
            {!searchValue
              ? "Все кроссовки"
              : `Поиск по запросу: "${searchValue}"`}
          </h1>
          <div className="searchBlock d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input
              onChange={onChangeSearchInput}
              value={searchValue}
              placeholder="Поиск..."
            />
            {searchValue && (
              <img
                className="removeBtn cu-p"
                src="/img/btn-remove.svg"
                alt="Clear"
                onClick={() => setSearchValue('')}
              />
            )}
          </div>
        </div>

        <div className="d-flex flex-wrap ">
          {items
            .filter((item) =>
              item.name.toLowerCase().includes(`${searchValue.toLowerCase()}`)
            )
            .map((item, index) => (
              <Card
                key={index}
                title={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
                onClickPlus={(obj) => addToCart(obj)}
                onClickFavorite={(obj) => addToFavorite(obj)}
              />
            ))}
        </div>
      </div>
    );
}


export default Home;