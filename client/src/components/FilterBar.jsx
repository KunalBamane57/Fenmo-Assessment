import { Search, ArrowUpDown, X } from 'lucide-react';

const FilterBar = ({ category, setCategory, sort, setSort }) => {
    return (
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Filter & Sort</h2>
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search / Filter Input */}
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        placeholder="Search by category..."
                        value={category}
                        className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    {category && (
                        <button
                            onClick={() => setCategory('')}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            aria-label="Clear filter"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Sort Select */}
                <div className="relative sm:w-56">
                    <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                    <select
                        value={sort}
                        className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg bg-white appearance-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none cursor-pointer"
                        onChange={(e) => setSort(e.target.value)}
                    >
                        <option value="date_desc">Newest First</option>
                        <option value="date_asc">Oldest First</option>
                        {/* <option value="amount_desc">Highest Amount</option>
                        <option value="amount_asc">Lowest Amount</option> */}
                    </select>
                </div>
            </div>

            {/* Active Filter Badge */}
            {category && (
                <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-gray-500">Active filter:</span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                        Category: {category}
                        <button onClick={() => setCategory('')} className="hover:text-blue-900 ml-1">
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                </div>
            )}
        </div>
    );
};

export default FilterBar;