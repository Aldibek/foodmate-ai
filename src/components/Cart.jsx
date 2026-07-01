import { ShoppingBag, Trash2 } from "lucide-react";

export function Cart({ items, onRemove, onCheckout, order }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside className="cart-panel">
      <div className="panel-title">
        <ShoppingBag size={19} />
        <h2>Cart</h2>
      </div>
      {items.length === 0 ? (
        <p className="empty">Add dishes to create a test order.</p>
      ) : (
        <div className="cart-list">
          {items.map((item) => (
            <div className="cart-row" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <small>{item.restaurantName} · x{item.quantity}</small>
              </div>
              <button type="button" onClick={() => onRemove(item.id)} aria-label={`Remove ${item.name}`}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="cart-total">
        <span>Total</span>
        <strong>{total.toLocaleString("ru-RU")} KZT</strong>
      </div>
      <button className="checkout" type="button" disabled={!items.length} onClick={onCheckout}>
        Create order
      </button>
      {order && <p className="success">Order {order.id} is {order.status}.</p>}
    </aside>
  );
}
