import { useState } from "react";
import {
  Search,
  ArrowUpDown,
  SlidersHorizontal,
} from "lucide-react";

const ShopHeader = ({
  search,
  setSearch,
  sort,
  setSort,
  filters,
  setFilters,
}) => {
  const [showSort, setShowSort] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 px-4 md:px-6 py-4">

  {/* Left */}
  <div>
    <h2 className="text-3xl md:text-4xl font-bold">
      Explore Our Jerseys
    </h2>

    <p className="text-gray-500 mt-1">
      Discover Premium Football Jerseys
    </p>
  </div>

  {/* Right */}
  <div className="w-full lg:w-auto">

    <div className="flex items-center gap-3">

      {/* Sort */}

      <div className="relative">

        <button
          onClick={()=>{
            setShowSort(!showSort);
            setShowFilter(false);
          }}
          className="w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition flex items-center justify-center"
        >
          <ArrowUpDown size={20}/>
        </button>

        {showSort && (

          <div className="absolute left-0 mt-3 w-52 rounded-2xl border bg-white shadow-xl overflow-hidden z-50">

            {[
              { value:"latest",label:"Newest"},
              { value:"priceLow",label:"Price ↑"},
              { value:"priceHigh",label:"Price ↓"},
              { value:"name",label:"A-Z"},
            ].map(item=>(

              <button
                key={item.value}
                onClick={()=>{
                  setSort(item.value);
                  setShowSort(false);
                }}
                className={`w-full text-left px-5 py-3 transition

                ${
                  sort===item.value
                  ? "bg-black text-white"
                  :"hover:bg-gray-100"
                }`}
              >

                {item.label}

              </button>

            ))}

          </div>

        )}

      </div>

      {/* Search */}

      <div className="relative flex-1 lg:w-80">

        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          placeholder="Search Jerseys..."
          className="w-full h-12 rounded-xl border bg-white pl-11 pr-4 outline-none focus:ring-2 focus:ring-black transition"
        />

      </div>

      {/* Filter */}

      <div className="relative">

        <button
          onClick={()=>{
            setShowFilter(!showFilter);
            setShowSort(false);
          }}
          className="w-12 h-12 rounded-xl border bg-white hover:bg-gray-100 transition flex items-center justify-center"
        >
          <SlidersHorizontal size={20}/>
        </button>

        {showFilter && (

          <div className="absolute right-0 mt-3 w-64 rounded-2xl border bg-white shadow-xl p-5 z-50">

            <h3 className="font-semibold mb-4">
              Category
            </h3>

            {["CLUB","NATIONAL"].map(category=>(

              <label
                key={category}
                className="flex items-center gap-3 py-2 cursor-pointer"
              >

                <input
                  type="checkbox"
                  checked={filters.category===category}
                  onChange={()=>
                    setFilters({
                      ...filters,
                      category:
                        filters.category===category
                        ? ""
                        : category
                    })
                  }
                />

                {category}

              </label>

            ))}

          </div>

        )}

      </div>

    </div>

  </div>

</div>

  );
};

export default ShopHeader;