import React from 'react'
import ExpenseTable from './ExpenseTable'

const ExpenseDetailedView = () => {
    return (
        <div className='flex flex-col items-center bg-gray-100'>
            <div className='flex items-center gap-4'>
                <div>
                    <label htmlFor="">filter by date</label><input type="date" />
                    <label htmlFor="">filter by category
                        <select name="" id="">
                            <option value=""></option>
                        </select>
                    </label>
                </div>
                <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
                >Add Expense</button>
            </div>
            <ExpenseTable />
        </div>
    )
}

export default ExpenseDetailedView