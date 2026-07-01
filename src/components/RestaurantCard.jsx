import { Clock, Plus, Star } from "lucide-react";

export function RestaurantCard({ restaurant, onAdd }) {
  return (
    <article className="restaurant-card">
      <img src={restaurant.image} alt={`${restaurant.name} dishes`} />
      <div className="restaurant-content">
        <div className="restaurant-head">
          <div>
            <h3>{restaurant.name}</h3>
            <p>{restaurant.cuisine} cuisine · {restaurant.city} · {restaurant.district}</p>
          </div>
          <span className="rating"><Star size={15} fill="currentColor" />{restaurant.rating}</span>
        </div>
        <div className="meta-row">
          <span><Clock size={15} />{restaurant.deliveryMinutes} min</span>
          <span>{restaurant.priceLevel}</span>
          {restaurant.tags.map((tag) => <span key={tag}>{tag}</span>)}
        </div>
        <div className="menu-list">
          {restaurant.menu.map((dish) => (
            <div className="dish-row" key={dish.id}>
              <div>
                <strong>{dish.name}</strong>
                <small>{dish.calories} kcal · {dish.category}</small>
              </div>
              <button type="button" onClick={() => onAdd(restaurant, dish)} aria-label={`Add ${dish.name}`}>
                <Plus size={16} />
                {dish.price.toLocaleString("ru-RU")} KZT
              </button>
            </div>
          ))}
        </div>
        <a className="source-link" href={restaurant.sourceUrl} target="_blank" rel="noreferrer">
          Menu source
        </a>
      </div>
    </article>
  );
}
