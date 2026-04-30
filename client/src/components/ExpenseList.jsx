const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
    :root {
        --blue: #1a6fd4;
        --blue-dark: #1258b0;
        --blue-light: #e8f1fc;
        --blue-mid: #b5d4f4;
        --white: #ffffff;
        --surface: #f5f8fe;
        --border: #d0e2f7;
        --text: #0d1b2e;
        --text-muted: #4a6180;
        --text-hint: #7a97b8;
        --ff: 'Inter', system-ui, sans-serif;
    }
    .el * { box-sizing: border-box; }
    .el { font-family: var(--ff); }

    /* ── Summary banner ── */
    .el-summary {
        display: flex; align-items: center; justify-content: space-between;
        background: var(--blue); color: #fff;
        padding: 14px 18px; border-radius: 12px; margin-bottom: 14px;
    }
    .el-s-label { font-size: 12px; opacity: .8; font-weight: 500; margin-bottom: 2px; }
    .el-s-amt   { font-size: 22px; font-weight: 700; letter-spacing: -.5px; font-variant-numeric: tabular-nums; }
    .el-s-right { display: flex; flex-direction: column; align-items: flex-end; gap: 4px; }
    .el-s-count {
        font-size: 12px; background: rgba(255,255,255,.18);
        padding: 3px 10px; border-radius: 20px; white-space: nowrap;
    }
    .el-s-page  { font-size: 11px; opacity: .7; }

    /* ── Expense cards ── */
    .el-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 9px; }
    .el-card {
        display: flex; align-items: center; gap: 13px;
        padding: 13px 15px; border-radius: 13px;
        border: 1px solid var(--border); background: var(--white);
        transition: border-color .15s, box-shadow .15s;
    }
    .el-card:hover { border-color: var(--blue-mid); box-shadow: 0 2px 12px rgba(26,111,212,0.08); }
    .el-icon {
        width: 42px; height: 42px; border-radius: 10px;
        background: var(--blue-light); display: flex; align-items: center;
        justify-content: center; font-size: 18px; flex-shrink: 0; line-height: 1;
    }
    .el-body { flex: 1; min-width: 0; }
    .el-r1 { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 3px; }
    .el-cat { font-size: 14px; font-weight: 600; color: var(--text); }
    .el-amt { font-size: 15px; font-weight: 700; color: var(--blue-dark); white-space: nowrap; font-variant-numeric: tabular-nums; }
    .el-r2  { display: flex; align-items: center; justify-content: space-between; gap: 8px; }
    .el-desc { font-size: 12.5px; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1; }
    .el-date { font-size: 11.5px; color: var(--text-hint); white-space: nowrap; font-weight: 500; }

    /* ── Pagination ── */
    .el-pagination {
        display: flex; align-items: center; justify-content: space-between;
        margin-top: 16px; padding-top: 14px;
        border-top: 1px solid var(--border);
        gap: 12px;
        flex-wrap: wrap;
    }
    .el-page-info { font-size: 13px; color: var(--text-muted); font-weight: 500; }
    .el-page-info strong { color: var(--text); }
    .el-page-btns { display: flex; align-items: center; gap: 4px; }
    .el-page-btn {
        min-width: 34px; height: 34px; padding: 0 10px;
        display: flex; align-items: center; justify-content: center;
        border-radius: 8px; border: 1.5px solid var(--border);
        background: var(--white); font-family: var(--ff);
        font-size: 13px; font-weight: 500; color: var(--text-muted);
        cursor: pointer; transition: all .15s; line-height: 1;
    }
    .el-page-btn:hover:not(:disabled) { border-color: var(--blue); color: var(--blue); background: var(--blue-light); }
    .el-page-btn.active { background: var(--blue); border-color: var(--blue); color: #fff; font-weight: 600; }
    .el-page-btn:disabled { opacity: .4; cursor: not-allowed; }
    .el-page-btn.arrow { font-size: 15px; }

    /* ── Empty state ── */
    .el-empty { text-align: center; padding: 48px 20px; }
    .el-empty-icon {
        width: 48px; height: 48px; border-radius: 14px; background: var(--blue-light);
        margin: 0 auto 14px; display: flex; align-items: center; justify-content: center;
    }
    .el-empty-icon svg { width: 24px; height: 24px; stroke: var(--blue); fill: none; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
    .el-empty-title { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
    .el-empty-sub   { font-size: 13px; color: var(--text-muted); }
`;

const CATS = [
    { name: "Food & Dining", icon: "🍽" },
    { name: "Transport", icon: "🚌" },
    { name: "Shopping", icon: "🛍" },
    { name: "Entertainment", icon: "🎬" },
    { name: "Health", icon: "💊" },
    { name: "Utilities", icon: "💡" },
    { name: "Travel", icon: "✈" },
    { name: "Education", icon: "📚" },
    { name: "Other", icon: "📌" },
];

function catIcon(name) {
    return (CATS.find((c) => c.name === name) || { icon: "💰" }).icon;
}

function fmtDate(d) {
    if (!d) return "";
    return new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function fmtAmt(n) {
    return Number(n).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

const EmptyIcon = () => (
    <svg viewBox="0 0 24 24">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
);

/**
 * Generates a compact page number array like: [1, 2, '...', 7, 8, 9, '...', 15]
 */
function getPageNumbers(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages = [];
    pages.push(1);
    if (current > 3) pages.push("...");
    for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) {
        pages.push(p);
    }
    if (current < total - 2) pages.push("...");
    pages.push(total);
    return pages;
}

/**
 * Props
 * ─────
 * expenses      – the CURRENT PAGE slice (already sliced in App.jsx)
 * currentPage   – active page number (1-based)
 * setCurrentPage – setter from App.jsx
 * startIndex    – (currentPage - 1) * itemsPerPage
 * itemsPerPage  – how many rows per page (5 in App.jsx)
 * totalCount    – TOTAL number of expenses across all pages (pass `expenses.length` from the full array in App.jsx)
 * totalAmount   – sum of ALL expenses, not just this page (computed in App.jsx as `total`)
 */
const ExpenseList = ({
    expenses = [],
    currentPage = 1,
    setCurrentPage,
    startIndex = 0,
    itemsPerPage = 5,
    totalCount = 0,
    totalAmount = 0,
}) => {
    const totalPages = Math.ceil(totalCount / itemsPerPage);

    // Empty state – no expenses at all
    if (totalCount === 0) {
        return (
            <div className="el">
                <style>{styles}</style>
                <div className="el-empty">
                    <div className="el-empty-icon"><EmptyIcon /></div>
                    <p className="el-empty-title">No expenses yet</p>
                    <p className="el-empty-sub">Add your first expense using the form above</p>
                </div>
            </div>
        );
    }

    // Empty page after filter (totalCount > 0 but this page slice is empty)
    if (expenses.length === 0) {
        return (
            <div className="el">
                <style>{styles}</style>
                <div className="el-empty">
                    <div className="el-empty-icon"><EmptyIcon /></div>
                    <p className="el-empty-title">No results on this page</p>
                    <p className="el-empty-sub">Try going back to page 1</p>
                </div>
            </div>
        );
    }

    const rangeStart = startIndex + 1;
    const rangeEnd = Math.min(startIndex + expenses.length, totalCount);
    const pageNums = getPageNumbers(currentPage, totalPages);

    return (
        <div className="el">
            <style>{styles}</style>

            {/* Summary — always shows FULL totals, not just this page */}
            <div className="el-summary">
                <div>
                    <div className="el-s-label">Total spending</div>
                    <div className="el-s-amt">₹{fmtAmt(totalAmount)}</div>
                </div>
                <div className="el-s-right">
                    <div className="el-s-count">{totalCount} expense{totalCount !== 1 ? "s" : ""}</div>
                    {totalPages > 1 && (
                        <div className="el-s-page">Page {currentPage} of {totalPages}</div>
                    )}
                </div>
            </div>

            {/* Expense cards for the current page */}
            <ul className="el-list">
                {expenses.map((e) => (
                    <li key={e.id} className="el-card">
                        <div className="el-icon">{catIcon(e.category)}</div>
                        <div className="el-body">
                            <div className="el-r1">
                                <span className="el-cat">{e.category || "Uncategorized"}</span>
                                <span className="el-amt">₹{fmtAmt(e.amount)}</span>
                            </div>
                            <div className="el-r2">
                                <span className="el-desc">
                                    {e.description
                                        ? e.description
                                        : <span style={{ opacity: .55, fontStyle: "italic" }}>No description</span>
                                    }
                                </span>
                                <span className="el-date">{fmtDate(e.date)}</span>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Pagination controls — only render when there is more than one page */}
            {totalPages > 1 && (
                <div className="el-pagination">
                    <div className="text-white">
                        Showing <strong>{rangeStart}–{rangeEnd}</strong> of <strong>{totalCount}</strong>
                    </div>

                    <div className="el-page-btns">
                        {/* Previous */}
                        <button
                            className="el-page-btn arrow"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            aria-label="Previous page"
                        >
                            ‹
                        </button>

                        {/* Page numbers */}
                        {pageNums.map((p, i) =>
                            p === "..." ? (
                                <span
                                    key={`ellipsis-${i}`}
                                    style={{ padding: "0 4px", color: "var(--text-hint)", fontSize: 13, userSelect: "none" }}
                                >
                                    …
                                </span>
                            ) : (
                                <button
                                    key={p}
                                    className={`el-page-btn${currentPage === p ? " active" : ""}`}
                                    onClick={() => setCurrentPage(p)}
                                    aria-label={`Page ${p}`}
                                    aria-current={currentPage === p ? "page" : undefined}
                                >
                                    {p}
                                </button>
                            )
                        )}

                        {/* Next */}
                        <button
                            className="el-page-btn arrow"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            aria-label="Next page"
                        >
                            ›
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExpenseList;