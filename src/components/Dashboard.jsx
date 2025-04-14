import { useState } from 'react';
import { useSelector } from 'react-redux';

import Navbar from './Navbar';
import PieChartContainer from './PieChartContainer';
import BarGraphContainer from './BarGraphContainer';
import ExpenseDetailedView from './ExpenseDetailedView';


const Dashboard = () => {
  const user = useSelector((state) => state.user.user);

  const [showAnalytics, setShowAnalytics] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800">
      <Navbar />

      <div className="mx-8 my-2">
        <h1 className="text-2xl font-bold text-primary mb-1">Welcome, {user?.name}</h1>
        <p className="text-md text-gray-600">
          Now manage your finances smartly. Track expenses, monitor investments, and grow your wealth!
        </p>
      </div>

      <div className="flex justify-center my-2">
        <div className="w-max flex items-center justify-center gap-1 border border-gray-200 rounded-full bg-gray-50 shadow-sm p-1 relative overflow-hidden">
          <div
            className={`absolute top-0 bottom-0 left-0 w-1/2 rounded-full bg-indigo-500 transition-all duration-500 ease-in-out ${showAnalytics ? 'translate-x-0' : 'translate-x-full'
              }`}
          ></div>

          <button
            className={`relative z-10 cursor-pointer px-6 py-2 rounded-full transition-all duration-300 ${showAnalytics
              ? 'text-white font-medium'
              : 'text-gray-600 hover:text-indigo-400'
              }`}
            onClick={() => setShowAnalytics(true)}
          >
            Analytics
          </button>

          <button
            className={`relative z-10 cursor-pointer px-6 py-2 rounded-full transition-all duration-300 ${!showAnalytics
              ? 'text-white font-medium'
              : 'text-gray-600 hover:text-indigo-400'
              }`}
            onClick={() => setShowAnalytics(false)}
          >
            Expenses
          </button>
        </div>
      </div>

      {showAnalytics ? (<div className="flex flex-wrap gap-6 px-8 justify-evenly">
        <BarGraphContainer />
        <PieChartContainer />
      </div>
      ) : (
        <div>
          <ExpenseDetailedView />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
