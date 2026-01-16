import React from 'react';
import { Card } from '../components/ui/Card';
import { ResponsiveContainer, ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { SOAK_DEMAND_CAPACITY } from '../constants';
import { Zap, DollarSign, Server, Info } from 'lucide-react';

interface Props {
  customerName: string;
}

const SoakRuns: React.FC<Props> = ({ customerName }) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Context Strip */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-wrap items-center justify-between gap-6">
         <div className="flex gap-12">
            <div>
               <span className="block text-xs text-gray-500 uppercase font-bold tracking-wide mb-1.5">Shadow Window</span>
               <span className="font-bold text-lg text-gray-900">Jan 7, 00:00 - 23:59 UTC</span>
            </div>
            <div>
               <span className="block text-xs text-gray-500 uppercase font-bold tracking-wide mb-1.5">Replay Method</span>
               <span className="font-medium text-lg text-gray-900">Scaled to 1.2x</span>
            </div>
            <div>
               <span className="block text-xs text-gray-500 uppercase font-bold tracking-wide mb-1.5">e6 Run ID</span>
               <span className="font-bold text-brand-600 text-lg">#RUN-8992</span>
            </div>
         </div>
         <div className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-200">
            <div className="w-2.5 h-2.5 rounded-full bg-semantic-success animate-pulse"></div>
            <span className="text-xs font-bold text-gray-600 uppercase tracking-wide">Soak Test Complete</span>
         </div>
      </div>

      {/* 24h Executive Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         <Card className="flex flex-row items-center gap-5 justify-center">
            <div className="p-3.5 bg-brand-50 text-brand-600 rounded-full border border-brand-100"><Zap size={28} /></div>
            <div>
               <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">Total Queries</p>
               <h3 className="text-2xl font-bold text-gray-900">1.2M</h3>
            </div>
         </Card>
         <Card className="flex flex-row items-center gap-5 justify-center">
            <div className="p-3.5 bg-gray-50 text-gray-600 rounded-full border border-gray-200"><Server size={28} /></div>
            <div>
               <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">Compute Hours</p>
               <h3 className="text-2xl font-bold text-gray-900">248 vCPU-h</h3>
            </div>
         </Card>
         <Card className="flex flex-row items-center gap-5 justify-center">
            <div className="p-3.5 bg-gray-50 text-gray-600 rounded-full border border-gray-200"><DollarSign size={28} /></div>
            <div>
               <p className="text-xs text-gray-500 uppercase font-bold tracking-wide mb-1">Est. Cost</p>
               <h3 className="text-2xl font-bold text-gray-900">$145.20</h3>
            </div>
         </Card>
         <div className="bg-cta-600 rounded-lg p-6 text-white flex flex-col justify-center items-center shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-cta-600 relative overflow-hidden group">
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <p className="text-xs font-bold opacity-90 text-cta-text uppercase tracking-wide relative z-10 mb-2">Cost Savings vs Baseline</p>
            <h3 className="text-4xl font-bold text-cta-text relative z-10">+42%</h3>
         </div>
      </div>

      {/* Hero Chart: Demand vs Capacity */}
      <Card title="Demand vs. Provisioned Capacity (24h)" subtitle="Demonstrating Granular Scaling Efficiency">
         <div className="h-96 w-full mt-6">
            <ResponsiveContainer width="100%" height="100%">
               <ComposedChart data={SOAK_DEMAND_CAPACITY}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" fontSize={11} stroke="#9CA3AF" interval={3} tickLine={false} axisLine={{ stroke: '#E5E7EB' }} tick={{fill: '#6B7280', fontWeight: 500}} dy={10} />
                  
                  {/* Left Axis: Demand */}
                  <YAxis yAxisId="left" label={{ value: 'Concurrency / Demand', angle: -90, position: 'insideLeft', style:{ fill: '#9CA3AF', fontSize: 11, fontWeight: 500 } }} stroke="#9CA3AF" tickLine={false} axisLine={false} tick={{fill: '#6B7280', fontSize: 11, fontWeight: 500}} dx={-10} />
                  
                  {/* Right Axis: Capacity */}
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Provisioned Slots', angle: 90, position: 'insideRight', style:{ fill: '#9CA3AF', fontSize: 11, fontWeight: 500 } }} stroke="#9CA3AF" tickLine={false} axisLine={false} tick={{fill: '#6B7280', fontSize: 11, fontWeight: 500}} dx={10} />
                  
                  <Tooltip 
                     contentStyle={{borderRadius: '6px', border: '1px solid #E5E7EB', padding: '12px', fontFamily: 'Roboto Mono'}}
                     labelStyle={{color: '#374151', fontWeight: 700, marginBottom: '4px'}}
                     itemStyle={{padding: 0}}
                     formatter={(value, name) => [value, name === 'e6Capacity' ? 'e6data Capacity' : name === 'baselineCapacity' ? 'Baseline Capacity' : 'Actual Demand']}
                  />
                  <Legend wrapperStyle={{paddingTop: '20px'}} iconType="circle" />

                  {/* Demand Area - Subtle Purple or Gray */}
                  <Area yAxisId="left" type="monotone" dataKey="demand" fill="#F3F4F6" stroke="#D1D5DB" name="Demand" fillOpacity={0.8} />
                  
                  {/* e6data: Smooth Line - CTA Green */}
                  <Line yAxisId="right" type="monotone" dataKey="e6Capacity" stroke="#4ADE80" strokeWidth={3} name="e6data Capacity" dot={false} activeDot={{r: 6}} />
                  
                  {/* Baseline: Step Line - Gray */}
                  <Line yAxisId="right" type="stepAfter" dataKey="baselineCapacity" stroke="#9CA3AF" strokeWidth={2} strokeDasharray="4 4" name="Baseline Capacity" dot={false} />
               </ComposedChart>
            </ResponsiveContainer>
         </div>
         <div className="mt-6 px-6 py-5 bg-brand-50 rounded-lg border border-brand-100 text-sm text-brand-700 flex items-start gap-3">
            <Info size={20} className="mt-0.5 shrink-0 text-brand-600" />
            <p className="leading-relaxed font-medium"><strong className="font-bold text-brand-800 uppercase tracking-wide">Differentiation:</strong> e6data's granular scaling (Green Line) tracks the actual demand curve closely, avoiding the massive over-provisioning gaps seen in the Baseline step-scaling (Gray Dashed Line). This directly correlates to the 42% cost savings.</p>
         </div>
      </Card>

      <Card title="Resource Utilization Efficiency">
         <div className="h-64 flex items-center justify-center text-gray-400 bg-bg-muted/50 rounded-lg border border-dashed border-gray-300">
            [Chart Placeholder: Utilization % over time]
         </div>
      </Card>
    </div>
  );
};

export default SoakRuns;