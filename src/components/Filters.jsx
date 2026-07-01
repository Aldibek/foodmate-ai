import { Clock, MapPin, SlidersHorizontal, Utensils } from "lucide-react";

const CUISINES = [
  ["all", "All cuisines"],
  ["asian", "Asian"],
  ["cafe", "Cafe"],
  ["chinese", "Chinese"],
  ["coffee", "Coffee"],
  ["contemporary", "Contemporary"],
  ["doner", "Doner"],
  ["eastern", "Eastern"],
  ["european", "European"],
  ["fusion-asian", "Fusion Asian"],
  ["georgian", "Georgian"],
  ["greek", "Greek"],
  ["home-cooking", "Home Cooking"],
  ["international", "International"],
  ["italian", "Italian"],
  ["japanese", "Japanese"],
  ["kazakh", "Kazakh"],
  ["kazakh-fast", "Kazakh fast-food"],
  ["korean", "Korean"],
  ["mediterranean", "Mediterranean"],
  ["middle-eastern", "Middle Eastern"],
  ["pan-asian", "Pan-Asian"],
  ["pizza", "Pizza"],
  ["pub", "Pub"],
  ["seafood", "Seafood"],
  ["steakhouse", "Steakhouse"],
  ["turkish", "Turkish"],
  ["turkish-fast", "Turkish fast-food"],
  ["uzbek", "Uzbek"]
];

export function Filters({ filters, onChange }) {
  const update = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <section className="filters" aria-label="Restaurant filters">
      <label>
        <Utensils size={17} />
        <select value={filters.cuisine} onChange={(event) => update("cuisine", event.target.value)}>
          {CUISINES.map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </label>
      <label>
        <MapPin size={17} />
        <select value={filters.city} onChange={(event) => update("city", event.target.value)}>
          <option value="all">All cities</option>
          <option value="Almaty">Almaty</option>
          <option value="Astana">Astana</option>
          <option value="Shymkent">Shymkent</option>
        </select>
      </label>
      <label className="range-control">
        <Clock size={17} />
        <span>{filters.maxDelivery} min</span>
        <input
          type="range"
          min="20"
          max="60"
          step="5"
          value={filters.maxDelivery}
          onChange={(event) => update("maxDelivery", event.target.value)}
        />
      </label>
      <div className="filter-status">
        <SlidersHorizontal size={17} />
        Smart filters active
      </div>
    </section>
  );
}
