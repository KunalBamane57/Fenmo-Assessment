import { useState } from 'react';
import { PlusCircle, Loader2 } from 'lucide-react';

const ExpenseForm = ({ onAdd }) => {
    const [form, setForm] = useState({
        amount: "",
        category: "",
        description: "",
        date: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!form.amount || parseFloat(form.amount) <= 0) {
            newErrors.amount = "Amount must be greater than 0";
        }
        if (!form.category.trim()) {
            newErrors.category = "Category is required";
        }
        if (!form.date) {
            newErrors.date = "Date is required";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) return;

        setIsSubmitting(true);

        // Simulate async call or wait for real API
        try {
            await onAdd({
                ...form,
                amount: parseFloat(form.amount)
            });

            // Reset form on success
            setForm({
                amount: "",
                category: "",
                description: "",
                date: "",
            });
            setErrors({});
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (field, value) => {
        setForm(prev => ({ ...prev, [field]: value }));
        // Clear error for this field when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: null }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Amount Field */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Amount <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                        <input
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            value={form.amount}
                            className={`w-full pl-8 pr-4 py-2.5 border rounded-lg outline-none transition-shadow ${errors.amount
                                    ? 'border-red-300 ring-2 ring-red-100 focus:border-red-500'
                                    : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                                }`}
                            onChange={(e) => handleChange('amount', e.target.value)}
                        />
                    </div>
                    {errors.amount && <p className="mt-1.5 text-xs text-red-600 flex items-center gap-1">{errors.amount}</p>}
                </div>

                {/* Category Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Category <span className="text-red-500">*</span>
                    </label>
                    <input
                        placeholder="e.g. Food, Travel, Rent"
                        value={form.category}
                        className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-shadow ${errors.category
                                ? 'border-red-300 ring-2 ring-red-100 focus:border-red-500'
                                : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                        onChange={(e) => handleChange('category', e.target.value)}
                    />
                    {errors.category && <p className="mt-1.5 text-xs text-red-600">{errors.category}</p>}
                </div>

                {/* Date Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Date <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="date"
                        value={form.date}
                        className={`w-full px-4 py-2.5 border rounded-lg outline-none transition-shadow ${errors.date
                                ? 'border-red-300 ring-2 ring-red-100 focus:border-red-500'
                                : 'border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                            }`}
                        onChange={(e) => handleChange('date', e.target.value)}
                    />
                    {errors.date && <p className="mt-1.5 text-xs text-red-600">{errors.date}</p>}
                </div>

                {/* Description Field */}
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Description <span className="text-gray-400 text-xs font-normal">(Optional)</span>
                    </label>
                    <input
                        placeholder="What was this for?"
                        value={form.description}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                        onChange={(e) => handleChange('description', e.target.value)}
                    />
                </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Adding Expense...
                        </>
                    ) : (
                        <>
                            <PlusCircle className="w-5 h-5" />
                            Add Expense
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default ExpenseForm;