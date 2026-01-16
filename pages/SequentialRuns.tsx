import React from 'react';
import { Card } from '../components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { SPEEDUP_DISTRIBUTION_DATA, getTopQueries, WORST_QUERIES, PERFORMANCE_TREND_DATA } from '../constants';
import { ArrowUpRight, ArrowDownRight, Search, Download } from 'lucide-react';

interface Props {
  customerName: string;
}

const SequentialRuns: React.FC<Props> = ({ customerName }) => {
  const topQueries = getTopQueries(customerName);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center">
           <span className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-2">Latest Sequential Run</span>
           <span className="text-gray-900 font-bold text-xl">Today, 10:45 AM</span>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center">
           <span className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-2">Total SELECT Queries</span>
           <span className="text-gray-900 font-bold text-xl">2,500</span>
        </div>
        <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col items-center text-center">
           <span className="text-xs text-gray-500 uppercase tracking-wide font-bold mb-2">Unique Analysis Suite</span>
           <span className="text-gray-900 font-bold text-xl">120 Queries</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Section A: Speedup Distribution */}
        <Card title="Speedup Distribution" subtitle="Distribution of performance gains vs Baseline" className="lg:col-span-2">
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={SPEEDUP_DISTRIBUTION_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{fontSize: 12, fill: '#6B7280', fontWeight: 500}} stroke="#9CA3AF" tickLine={false} axisLine={{ stroke: '#E5E7EB' }} dy={10} />
                <YAxis tick={{fontSize: 12, fill: '#6B7280', fontWeight: 500}} stroke="#9CA3AF" tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  cursor={{fill: '#F3F4F6'}}
                  contentStyle={{borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', fontFamily: 'Roboto Mono'}}
                  labelStyle={{color: '#374151', fontWeight: 700, marginBottom: '4px'}}
                />
                <Bar dataKey="count" fill="#4ADE80" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Section D: Outcome Summary */}
        <Card title="Execution Outcome" className="lg:col-span-1">
          <div className="grid grid-cols-2 gap-4 mt-2 h-full content-start">
             <div className="p-5 bg-gray-50 rounded-lg border border-gray-100 flex flex-col justify-center">
                <span className="block text-xs text-gray-500 uppercase font-bold mb-2">Succeeded</span>
                <span className="block text-3xl font-bold text-semantic-success">110</span>
             </div>
             <div className="p-5 bg-gray-50 rounded-lg border border-gray-100 flex flex-col justify-center">
                <span className="block text-xs text-gray-500 uppercase font-bold mb-2">Failed</span>
                <span className="block text-3xl font-bold text-semantic-error">2</span>
             </div>
             <div className="p-5 bg-gray-50 rounded-lg border border-gray-100 flex flex-col justify-center">
                <span className="block text-xs text-gray-500 uppercase font-bold mb-2">Blocked</span>
                <span className="block text-3xl font-bold text-gray-400">8</span>
             </div>
             <div className="p-5 bg-brand-600/5 rounded-lg border border-brand-600/10 flex flex-col justify-center">
                <span className="block text-xs text-brand-700 uppercase font-bold mb-2">Success Rate</span>
                <span className="block text-3xl font-bold text-brand-600">92%</span>
             </div>
          </div>
        </Card>
      </div>

      {/* Section C: Performance Trends */}
      <Card title="Performance Trend Over Runs" subtitle="Latency progression (p50 vs p95)">
        <div className="h-80 w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={PERFORMANCE_TREND_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={{ stroke: '#E5E7EB' }} tick={{fill: '#6B7280', fontWeight: 500}} dy={10} />
              <YAxis stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} tick={{fill: '#6B7280', fontWeight: 500}} label={{ value: 'Latency (ms)', angle: -90, position: 'insideLeft', style: { fill: '#9CA3AF', fontWeight: 500 } }} />
              <Tooltip 
                contentStyle={{borderRadius: '8px', border: '1px solid #E5E7EB', fontFamily: 'Roboto Mono'}}
              />
              <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
              <Line type="monotone" dataKey="p50" stroke="#4ADE80" strokeWidth={3} dot={{r: 4, fill: '#4ADE80', strokeWidth: 2}} activeDot={{r: 6}} name="P50 (ms)" />
              <Line type="monotone" dataKey="p95" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" dot={false} name="P95 (ms)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Section B: Query Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title="Top 5 Best Performing Queries">
          <div className="overflow-hidden border border-gray-200 rounded-lg mt-2 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-bg-muted text-xs uppercase text-gray-500 font-bold tracking-wide">
                <tr>
                  <th className="px-6 py-4 text-left border-b border-gray-200">Query</th>
                  <th className="px-6 py-4 text-right border-b border-gray-200">Base (ms)</th>
                  <th className="px-6 py-4 text-right border-b border-gray-200">e6 (ms)</th>
                  <th className="px-6 py-4 text-right border-b border-gray-200">Speedup</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {topQueries.map((q, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-700">{q.name}</td>
                    <td className="px-6 py-4 text-right text-gray-500 font-medium">{q.baselineTime}</td>
                    <td className="px-6 py-4 text-right text-brand-600 font-bold">{q.e6dataTime}</td>
                    <td className="px-6 py-4 text-right text-semantic-success font-bold flex items-center justify-end gap-1">
                      {q.speedup}x <ArrowUpRight size={16} strokeWidth={2.5} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card title="Top Performing Issues (Slowest / Failures)">
          <div className="overflow-hidden border border-gray-200 rounded-lg mt-2 shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-bg-muted text-xs uppercase text-gray-500 font-bold tracking-wide">
                <tr>
                  <th className="px-6 py-4 text-left border-b border-gray-200">Query</th>
                  <th className="px-6 py-4 text-right border-b border-gray-200">Speedup</th>
                  <th className="px-6 py-4 text-left border-b border-gray-200">Reason Tag</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {WORST_QUERIES.map((q, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-700">{q.name}</td>
                    <td className="px-6 py-4 text-right text-semantic-error font-bold flex items-center justify-end gap-1">
                      {q.speedup}x <ArrowDownRight size={16} strokeWidth={2.5} />
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-semantic-warning/10 text-semantic-warning rounded-full text-xs font-bold border border-semantic-warning/20">
                        {q.reason}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
      
      {/* Full Table Link/Placeholder */}
      <Card>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 border border-gray-300 rounded-md px-4 py-2.5 bg-gray-50 focus-within:ring-1 focus-within:ring-brand-600 focus-within:border-brand-600 focus-within:bg-white transition-colors">
             <Search size={18} className="text-gray-400" />
             <input type="text" placeholder="Search all queries..." className="bg-transparent text-sm outline-none w-full text-gray-700 placeholder:text-gray-400 font-medium" />
          </div>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 rounded-md text-sm font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors shadow-sm">
             <Download size={16} /> Export CSV
          </button>
        </div>
      </Card>
    </div>
  );
};

export default SequentialRuns;