import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';
import ExpenseTable from './ExpenseTable';

const categories = [
  'Food & Groceries',
  'Transport',
  'Lifestyle',
  'Utilities & Bills',
  'Health',
  'Others',
];

const ExpenseDetailedView = () => {
  const expenseData = useSelector((state) => state.expense.expenseData);

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredData = useMemo(() => {
    return expenseData.filter((expense) => {
      const expenseDate = new Date(expense.date);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      const matchesDate =
        (!from || expenseDate >= from) && (!to || expenseDate <= to);
      const matchesCategory =
        !selectedCategory || expense.category === selectedCategory;

      return matchesDate && matchesCategory;
    });
  }, [expenseData, fromDate, toDate, selectedCategory]);

  return (
    <div className='flex flex-col items-center bg-gray-100 p-4'>
      <div className='flex flex-wrap gap-4 items-end mb-4'>
        <div className='flex flex-col'>
          <label htmlFor="from-date">From Date</label>
          <input
            id="from-date"
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="to-date">To Date</label>
          <input
            id="to-date"
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border rounded p-2"
          />
        </div>
        <div className='flex flex-col'>
          <label htmlFor="category">Filter by Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded p-2"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Add Expense
        </button>
      </div>
      <ExpenseTable data={filteredData} />
    </div>
  );
};

export default ExpenseDetailedView;
