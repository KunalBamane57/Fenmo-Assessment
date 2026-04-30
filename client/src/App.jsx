import { useEffect, useState } from "react";
import { getExpenses, createExpense } from "./services/api";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import FilterBar from "./components/FilterBar";
import { IndianRupee, TrendingUp, Wallet, Receipt, Loader2 } from 'lucide-react';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("date_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Pagination math — derived from the full expenses array
  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedExpenses = expenses.slice(startIndex, startIndex + itemsPerPage);

  const fetchExpenses = async () => {
    setLoading(true);
    try {
      const res = await getExpenses({
        category: category || undefined,
        sort: sort,
      });
      setExpenses(res.data);
    } catch (err) {
      alert("Error fetching expenses");
    }
    setLoading(false);
  };

  // Reset to page 1 whenever filter/sort changes so we never land on a
  // non-existent page after the list shrinks.
  useEffect(() => {
    setCurrentPage(1);
    fetchExpenses();
  }, [category, sort]);

  // Also clamp currentPage if the total shrinks (e.g. after adding/deleting)
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  const handleAdd = async (data) => {
    try {
      await createExpense(data);
      fetchExpenses();
    } catch {
      alert("Error adding expense");
    }
  };

  // Full-list totals — used in stat cards AND passed down to ExpenseList
  const total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
  const averageExpense = expenses.length > 0 ? total / expenses.length : 0;

  const formatCurrency = (amount) =>
    new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Abstract Background Layer */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px',
          }} />
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
                <div className="p-2 bg-white/10 backdrop-blur-lg rounded-xl">
                  <Wallet className="w-8 h-8 text-white" />
                </div>
                Expense Tracker
              </h1>
              <p className="text-gray-300 ml-14">Manage your finances with elegance</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm font-medium">Total Balance</h3>
              <div className="p-2 bg-green-500/20 rounded-lg">
                <IndianRupee className="w-5 h-5 text-green-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">₹{formatCurrency(total)}</p>
            <p className="text-gray-400 text-sm mt-2">Lifetime expenses</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm font-medium">Average Expense</h3>
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">₹{formatCurrency(averageExpense)}</p>
            <p className="text-gray-400 text-sm mt-2">Per transaction</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-300 text-sm font-medium">Transactions</h3>
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Receipt className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{expenses.length}</p>
            <p className="text-gray-400 text-sm mt-2">Total entries</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left — Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ExpenseForm onAdd={handleAdd} />
            </div>
          </div>

          {/* Right — Filters + List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-xl">
              <FilterBar
                category={category}
                setCategory={setCategory}
                sort={sort}
                setSort={setSort}
              />
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Recent Expenses</h2>
                {!loading && expenses.length > 0 && (
                  <span className="text-sm text-gray-400">
                    {expenses.length} {expenses.length === 1 ? 'item' : 'items'}
                  </span>
                )}
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-white animate-spin mb-3" />
                  <p className="text-gray-300">Loading your expenses...</p>
                </div>
              ) : (
                <ExpenseList
                  expenses={paginatedExpenses}   // current page slice
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  startIndex={startIndex}
                  itemsPerPage={itemsPerPage}
                  totalCount={expenses.length}   // ← full list length for page math
                  totalAmount={total}            // ← full list total for the summary banner
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%   { transform: translate(0px,   0px)  scale(1);   }
          33%  { transform: translate(30px, -50px) scale(1.1); }
          66%  { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px,   0px)  scale(1);   }
        }
        .animate-blob           { animation: blob 7s infinite; }
        .animation-delay-2000   { animation-delay: 2s; }
        .animation-delay-4000   { animation-delay: 4s; }
      `}</style>
    </div>
  );
}

export default App;