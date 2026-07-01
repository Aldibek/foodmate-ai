import { MapPin, ShoppingBag, Trash2, X } from "lucide-react";
import { useState } from "react";

export function Cart({ items, onRemove, onCheckout, order }) {
  const [command, setCommand] = useState("");
  const [commandError, setCommandError] = useState("");
  const [isAddressOpen, setIsAddressOpen] = useState(false);
  const [customer, setCustomer] = useState({ name: "", phone: "", address: "", note: "" });
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const canCreateOrder = items.length > 0 && command.trim().toLowerCase() === "create order";
  const canSubmitAddress = canCreateOrder && customer.address.trim().length >= 6;

  function openAddressForm() {
    if (!items.length) return;
    setCommandError("");
    setIsAddressOpen(true);
  }

  async function submitOrder(event) {
    event.preventDefault();
    if (!canSubmitAddress) return;
    await onCheckout(customer);
    setCommand("");
    setCustomer({ name: "", phone: "", address: "", note: "" });
    setIsAddressOpen(false);
  }

  const updateCustomer = (key, value) => setCustomer((current) => ({ ...current, [key]: value }));

  function updateCommand(value) {
    setCommand(value);
    if (value.trim().toLowerCase() === "create order") {
      setCommandError("");
    }
  }

  function handleCommandKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  }

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
      <label className="command-field">
        <span>Order command</span>
        <input
          type="text"
          value={command}
          placeholder="create order"
          onChange={(event) => updateCommand(event.target.value)}
          onKeyDown={handleCommandKeyDown}
        />
      </label>
      <button className="checkout" type="button" disabled={!items.length} onClick={openAddressForm}>
        Create order
      </button>
      {order && (
        <p className="success">
          Order {order.id} is {order.status}. Address: {order.customer.address}
        </p>
      )}

      {isAddressOpen && (
        <div className="modal-backdrop" role="presentation">
          <form className="address-modal" onSubmit={submitOrder}>
            <div className="modal-head">
              <div>
                <MapPin size={19} />
                <h3>Delivery address</h3>
              </div>
              <button type="button" onClick={() => setIsAddressOpen(false)} aria-label="Close address form">
                <X size={18} />
              </button>
            </div>
            <label>
              <span>Type create order *</span>
              <input
                required
                value={command}
                onChange={(event) => updateCommand(event.target.value)}
                onKeyDown={handleCommandKeyDown}
                placeholder="create order"
              />
            </label>
            {!canCreateOrder && command && <p className="command-error">Type create order exactly.</p>}
            <label>
              <span>Name</span>
              <input value={customer.name} onChange={(event) => updateCustomer("name", event.target.value)} placeholder="Your name" />
            </label>
            <label>
              <span>Phone</span>
              <input value={customer.phone} onChange={(event) => updateCustomer("phone", event.target.value)} placeholder="+7 ..." />
            </label>
            <label>
              <span>Address *</span>
              <input
                required
                value={customer.address}
                onChange={(event) => updateCustomer("address", event.target.value)}
                placeholder="Almaty, street, house, apartment"
              />
            </label>
            <label>
              <span>Courier note</span>
              <textarea value={customer.note} onChange={(event) => updateCustomer("note", event.target.value)} placeholder="Entrance, floor, landmark" />
            </label>
            <button className="checkout" type="submit" disabled={!canSubmitAddress}>
              Confirm order
            </button>
          </form>
        </div>
      )}
    </aside>
  );
}
