import React from 'react';
import { Card } from '../components/ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, StackedBarChart } from 'recharts';
import { THROUGHPUT_DATA, LATENCY_LOAD_DATA } from '../constants';
import { AlertTriangle, Check, Clock } from 'lucide-react';

interface Props {
  customerName: string;
}

const ConcurrencyScale: React.FC<Props> = ({ customerName }) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap gap-4 items-center bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
        <span className="font-bold text-sm text-gray-500 uppercase tracking-wide">Filters:</span>
        <select className="border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 focus:outline-none focus:border-brand-600 font-medium">
            <option>Concurrency Batch 4</option>
        </select>
        <select className="border border-brand-200 rounded-md px-4 py-2 text-sm bg-brand-600/5 text-brand-700 font-bold focus:outline-none focus:border-brand-600">
            <option>QPS Load: 100</option>
            <option>QPS Load: 50</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Section A: Throughput */}
        <Card title="Throughput vs Concurrency" subtitle="Queries per minute">
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={THROUGHPUT_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" label={{ value: 'Concurrency', position: 'insideBottomRight', offset: -10, fontSize: 10, fill: '#6B7280' }} stroke="#9CA3AF" tickLine={false} axisLine={{ stroke: '#E5E7EB' }} tick={{fill: '#6B7280', fontWeight: 500}} dy={10} />
                <YAxis stroke="#9CA3AF" tickLine={false} axisLine={false} tick={{fill: '#6B7280', fontWeight: 500}} dx={-10} />
                <Tooltip contentStyle={{borderRadius: '8px', border: '1px solid #E5E7EB', fontFamily: 'Roboto Mono'}} />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Line name="e6data" type="monotone" dataKey="e6data" stroke="#4ADE80" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                <Line name="Baseline" type="monotone" dataKey="baseline" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Section B: Latency */}
        <Card title="P95 Latency vs Concurrency" subtitle="Response time stability under load">
          <div className="h-80 w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={LATENCY_LOAD_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#9CA3AF" tickLine={false} axisLine={{ stroke: '#E5E7EB' }} tick={{fill: '#6B7280', fontWeight: 500}} dy={10} />
                <YAxis stroke="#9CA3AF" tickLine={false} axisLine={false} tick={{fill: '#6B7280', fontWeight: 500}} dx={-10} />
                <Tooltip contentStyle={{borderRadius: '8px', border: '1px solid #E5E7EB', fontFamily: 'Roboto Mono'}} />
                <Legend iconType="circle" wrapperStyle={{paddingTop: '20px'}} />
                <Line name="e6data P95" type="monotone" dataKey="e6data" stroke="#4ADE80" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                <Line name="Baseline P95" type="monotone" dataKey="baseline" stroke="#EF4444" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card title="Latency Breakdown @ 100 QPS" className="md:col-span-1">
           <table className="w-full text-sm mt-2">
             <tbody className="divide-y divide-gray-100">
               <tr><td className="py-3 text-gray-500 font-medium">P50</td><td className="py-3 text-right font-semibold text-gray-700">500 ms</td></tr>
               <tr><td className="py-3 text-gray-500 font-medium">P75</td><td className="py-3 text-right font-semibold text-gray-700">900 ms</td></tr>
               <tr><td className="py-3 text-gray-500 font-medium">P90</td><td className="py-3 text-right font-semibold text-gray-700">1200 ms</td></tr>
               <tr><td className="py-3 text-gray-800 font-bold">P95</td><td className="py-3 text-right font-bold text-brand-600">1600 ms</td></tr>
               <tr><td className="py-3 text-gray-500 font-medium">P99</td><td className="py-3 text-right font-semibold text-gray-700">3100 ms</td></tr>
             </tbody>
           </table>
        </Card>

        <Card title="Queue Analysis" className="md:col-span-2">
           <div className="grid grid-cols-3 gap-6 mb-8 mt-4">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center">
                <span className="text-xs text-gray-500 block uppercase font-bold mb-2">Avg Wait Time</span>
                <span className="text-2xl font-bold text-gray-900">45ms</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center">
                <span className="text-xs text-gray-500 block uppercase font-bold mb-2">Max Wait Time</span>
                <span className="text-2xl font-bold text-gray-900">120ms</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center">
                <span className="text-xs text-gray-500 block uppercase font-bold mb-2">Backlog</span>
                <span className="text-2xl font-bold text-semantic-success">0</span>
              </div>
           </div>
           <div className="h-40 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center text-gray-400 text-sm font-medium border-dashed">
              [Stacked Bar Chart: Queue vs Execution Time Placeholder]
           </div>
        </Card>
      </div>

      {/* Failure Analysis Tiles */}
      <div className="mb-4">
         <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-6">Metrics @ Max Concurrency</h3>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center gap-4">
               <div className="p-3 bg-green-50 text-semantic-success rounded-full"><Check size={24} /></div>
               <div>
                  <p className="text-2xl font-bold text-gray-900">98.6%</p>
                  <p className="text-xs text-gray-500 font-bold uppercase mt-1">Success Rate</p>
               </div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center gap-4">
               <div className="p-3 bg-yellow-50 text-semantic-warning rounded-full"><Clock size={24} /></div>
               <div>
                  <p className="text-2xl font-bold text-gray-900">0.8%</p>
                  <p className="text-xs text-gray-500 font-bold uppercase mt-1">Timeout Rate</p>
               </div>
            </div>
            <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex items-center gap-4">
               <div className="p-3 bg-red-50 text-semantic-error rounded-full"><AlertTriangle size={24} /></div>
               <div>
                  <p className="text-2xl font-bold text-gray-900">0.6%</p>
                  <p className="text-xs text-gray-500 font-bold uppercase mt-1">Failure Rate</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ConcurrencyScale;