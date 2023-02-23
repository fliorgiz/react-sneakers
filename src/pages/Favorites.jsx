import Card from "../components/Card";

function Favorites({items}) {
    return (
        <div className="content p-40">
        <div className="d-flex align-center justify-between">
          <h1>
            Мои закладки
          </h1>
          
        </div>

        <div className="d-flex flex-wrap ">
          {items
            .map((item, index) => (
              <Card
                key={index}
                title={item.name}
                price={item.price}
                imageUrl={item.imageUrl}
              />
            ))}
        </div>
      </div>
    );
}


export default Favorites;