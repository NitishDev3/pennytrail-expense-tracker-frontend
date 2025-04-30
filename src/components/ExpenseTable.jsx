import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, Edit, Trash } from 'lucide-react';

const ITEMS_PER_PAGE = 20;

const ExpenseTable = ({ data }) => {
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = useMemo(() => {
    if (!sortField) return data;

    const sorted = [...data].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === 'amount') {
        aVal = parseFloat(aVal);
        bVal = parseFloat(bVal);
      } else if (sortField === 'date') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      }

      return sortOrder === 'asc' ? aVal > bVal ? 1 : -1 : aVal < bVal ? 1 : -1;
    });

    return sorted;
  }, [data, sortField, sortOrder]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return sortedData.slice(start, start + ITEMS_PER_PAGE);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow-md p-4 max-w-6xl">
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-left">
            {['date', 'amount', 'category', 'description'].map((field) => (
              <th key={field} className="p-3 cursor-pointer" onClick={() => handleSort(field)}>
                <div className="flex items-center gap-1 capitalize">
                  {field}
                  {sortField === field ? (
                    sortOrder === 'asc' ? <ChevronUp size={16} /> : <ChevronDown size={16} />
                  ) : (
                    <ChevronUp size={16} className="opacity-20" />
                  )}
                </div>
              </th>
            ))}
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-4">
                No expenses found.
              </td>
            </tr>
          ) : (
            paginatedData.map((expense, index) => (
              <tr key={index} className="border-t hover:bg-gray-50">
                <td className="p-3">{new Date(expense.date).toLocaleDateString()}</td>
                <td className="p-3">₹{expense.amount}</td>
                <td className="p-3">{expense.category}</td>
                <td className="p-3">{expense.description}</td>
                <td className="p-3 flex gap-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Edit size={16} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash size={16} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <button
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Prev
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseTable;
