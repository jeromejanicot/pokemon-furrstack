import { SearchComponent } from "./search";

export default function Nav() {
  return (
    <>
      <div className="nav_container">
        <div className="max_width nav_item_container">
          <div>this is header</div>
          <SearchComponent />
          <div>this is login</div>
        </div>
      </div>
    </>
  );
}
