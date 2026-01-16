import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { KPITile } from '../components/ui/KPITile';
import { getMockDataForCustomer } from '../constants';
import { ChevronDown, CheckCircle } from 'lucide-react';

interface Props {
  customerName: string;
}

const ExecutiveScorecard: React.FC<Props> = ({ customerName }) => {
  const [caseType, setCaseType] = useState<'Dashboard' | 'Ad-hoc' | 'AI-ML'>('Dashboard');
  const [queryBatch, setQueryBatch] = useState('Dashboard 1');
  const [environment, setEnvironment] = useState('Staging');
  const [qps, setQps] = useState<'10' | '100'>('100');

  // Accordion States
  const [openSections, setOpenSections] = useState({
    sequential: true,
    concurrent: true,
    soak: true,
    correctness: true,
  });

  const toggleSection = (key: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Derive Data based on filters
  const mockData = getMockDataForCustomer(customerName, environment);
  const currentData = mockData[caseType];
  const seqData = currentData.sequential;
  const concData = currentData.concurrent[qps];
  const bucketingData = currentData.bucketing;

  const SectionHeader = ({ 
    title, 
    isOpen, 
    onClick,
    extra 
  }: { 
    title: string; 
    isOpen: boolean; 
    onClick: () => void;
    extra?: React.ReactNode;
  }) => (
    <div className="flex items-center justify-between w-full py-4 border-b border-transparent hover:bg-gray-50/80 rounded-lg px-3 transition-colors cursor-pointer" onClick={onClick}>
      <div className="flex items-center gap-3">
        <div className={`p-1 rounded bg-gray-100 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
           <ChevronDown size={20} />
        </div>
        <span className="font-bold text-lg text-brand-700 tracking-tight">{title}</span>
      </div>
      {extra && <div onClick={e => e.stopPropagation()}>{extra}</div>}
    </div>
  );

  const RunTimestamps = () => (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 text-[11px] sm:text-xs text-gray-500 font-medium">
      <div className="flex items-center gap-1.5">
         <div className="w-1.5 h-1.5 rounded-full bg-brand-600"></div>
         <span className="uppercase font-bold tracking-wider text-gray-400">Seq:</span> 
         <span className="text-gray-700 font-mono">24 Dec 2025</span>
      </div>
      <div className="flex items-center gap-1.5">
         <div className="w-1.5 h-1.5 rounded-full bg-cta-600"></div>
         <span className="uppercase font-bold tracking-wider text-gray-400">Conc:</span> 
         <span className="text-gray-700 font-mono">29 Dec 2025</span>
      </div>
      <div className="flex items-center gap-1.5">
         <div className="w-1.5 h-1.5 rounded-full bg-semantic-info"></div>
         <span className="uppercase font-bold tracking-wider text-gray-400">Soak:</span> 
         <span className="text-gray-700 font-mono">05 Jan 2026</span>
      </div>
    </div>
  );

  const PercentileTile = ({ data }: { data: any }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-brand-300 transition-all duration-300 hover:-translate-y-1">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-4">Perf Percentiles (ms)</p>
        
        {/* Legend */}
        <div className="flex justify-between items-center text-[10px] uppercase font-bold text-gray-400 mb-3 border-b border-gray-100 pb-2">
            <span>Metric</span>
            <div className="flex gap-3">
                <span className="text-brand-600">e6data</span>
                <span className="text-gray-500">Baseline</span>
            </div>
        </div>

        <div className="space-y-3.5 text-sm">
        <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">P90</span>
            <div className="flex gap-3 items-center">
                <span className="font-bold text-brand-600 text-base min-w-[3rem] text-right">{data.p90_e6}</span>
                <span className="text-gray-400 text-xs min-w-[3rem] text-right">{data.p90_base}</span>
            </div>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">P95</span>
            <div className="flex gap-3 items-center">
                <span className="font-bold text-brand-600 text-base min-w-[3rem] text-right">{data.p95_e6}</span>
                <span className="text-gray-400 text-xs min-w-[3rem] text-right">{data.p95_base}</span>
            </div>
        </div>
        <div className="flex justify-between items-center">
            <span className="text-gray-500 font-medium">P99</span>
            <div className="flex gap-3 items-center">
                <span className="font-bold text-brand-600 text-base min-w-[3rem] text-right">{data.p99_e6}</span>
                <span className="text-gray-400 text-xs min-w-[3rem] text-right">{data.p99_base}</span>
            </div>
        </div>
        </div>
    </div>
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Page Filters */}
      <div className="flex flex-wrap gap-4 bg-white p-5 rounded-lg border border-gray-200 shadow-sm items-center">
        <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">Filters:</span>
        
        {/* Case Type */}
        <div className="relative">
            <select 
            value={caseType}
            onChange={(e) => setCaseType(e.target.value as any)}
            className="text-sm bg-gray-50 border border-gray-200 rounded-md px-4 py-2 pr-8 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 text-gray-700 font-medium appearance-none cursor-pointer hover:border-gray-300"
            >
            <option value="Dashboard">Case: Dashboard</option>
            <option value="Ad-hoc">Case: Ad-hoc</option>
            <option value="AI-ML">Case: AI-ML</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown size={14} />
            </div>
        </div>

        {/* Query Batch */}
        <div className="relative">
            <select 
            value={queryBatch}
            onChange={(e) => setQueryBatch(e.target.value)}
            className="text-sm bg-gray-50 border border-gray-200 rounded-md px-4 py-2 pr-8 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 text-gray-700 font-medium appearance-none cursor-pointer hover:border-gray-300"
            >
            <option value="Dashboard 1">Batch: Dashboard 1</option>
            <option value="Dashboard 2">Batch: Dashboard 2</option>
            <option value="Dashboard 3">Batch: Dashboard 3</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown size={14} />
            </div>
        </div>

        {/* Environment */}
        <div className="relative">
            <select 
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
            className="text-sm bg-gray-50 border border-gray-200 rounded-md px-4 py-2 pr-8 focus:outline-none focus:border-brand-600 focus:ring-1 focus:ring-brand-600 text-gray-700 font-medium appearance-none cursor-pointer hover:border-gray-300"
            >
            <option value="Staging">Env: Staging</option>
            <option value="Pre-prod">Env: Pre-prod</option>
            <option value="Prod">Env: Prod</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown size={14} />
            </div>
        </div>
      </div>

      <Card title="Execution Summary" action={<RunTimestamps />}>
        <div className="divide-y divide-gray-100">
          
          {/* 1. Sequential Run Overview */}
          <div className="py-2">
            <SectionHeader 
              title="Sequential Run Overview" 
              isOpen={openSections.sequential} 
              onClick={() => toggleSection('sequential')} 
            />
            
            {openSections.sequential && (
              <div className="mt-8 mb-8 space-y-8 px-2 animate-fadeIn">
                {/* Tiles */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <KPITile label="Total Queries" value={seqData.total.toLocaleString()} />
                  <KPITile label="Successful Queries" value={seqData.success.toLocaleString()} highlight trend="better" />
                  <KPITile label="Failed Queries" value={seqData.failed} trend={seqData.failed > 0 ? 'worse' : 'neutral'} />
                  
                  {/* Percentiles Tile */}
                  <PercentileTile data={seqData} />
                </div>

                {/* Table */}
                <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-bg-muted text-gray-600 font-bold uppercase text-xs tracking-wide">
                      <tr>
                        <th className="px-6 py-4 border-b border-gray-200">Component</th>
                        <th className="px-6 py-4 border-b border-gray-200">Failure Count</th>
                        <th className="px-6 py-4 border-b border-gray-200">Detailed Error Bucketing</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-800">Planner</td>
                        <td className="px-6 py-4 font-bold text-semantic-error">{seqData.plannerFailures}</td>
                        <td className="px-6 py-4 text-gray-600 font-medium">{seqData.plannerErrors}</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-800">Executor</td>
                        <td className="px-6 py-4 font-bold text-semantic-error">{seqData.executorFailures}</td>
                        <td className="px-6 py-4 text-gray-600 font-medium">{seqData.executorErrors}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* 2. Concurrent Run Overview */}
          <div className="py-2">
            <SectionHeader 
              title="Concurrent Run Overview" 
              isOpen={openSections.concurrent} 
              onClick={() => toggleSection('concurrent')}
              extra={
                openSections.concurrent && (
                  <div className="flex items-center gap-3">
                     <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">QPS Filter:</span>
                     <select 
                       value={qps}
                       onChange={(e) => setQps(e.target.value as '10' | '100')}
                       className="text-xs border border-gray-300 rounded bg-white px-2 py-1.5 focus:outline-none focus:border-brand-600 text-gray-700 font-medium"
                       onClick={(e) => e.stopPropagation()}
                     >
                       <option value="10">10 QPS</option>
                       <option value="100">100 QPS</option>
                     </select>
                  </div>
                )
              }
            />
            
            {openSections.concurrent && (
              <div className="mt-8 mb-8 space-y-8 px-2 animate-fadeIn">
                {/* Tiles */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <KPITile label="Total Queries" value={concData.total.toLocaleString()} />
                  <KPITile label="Successful Queries" value={concData.success.toLocaleString()} highlight trend="better" />
                  <KPITile label="Failed Queries" value={concData.failed} trend={concData.failed > 0 ? 'worse' : 'neutral'} />
                  
                  {/* Percentiles Tile */}
                  <PercentileTile data={concData} />
                </div>

                {/* Table */}
                <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-bg-muted text-gray-600 font-bold uppercase text-xs tracking-wide">
                      <tr>
                        <th className="px-6 py-4 border-b border-gray-200">Component</th>
                        <th className="px-6 py-4 border-b border-gray-200">Failure Count</th>
                        <th className="px-6 py-4 border-b border-gray-200">Detailed Error Bucketing</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-800">Planner</td>
                        <td className="px-6 py-4 font-bold text-semantic-error">{concData.plannerFailures}</td>
                        <td className="px-6 py-4 text-gray-600 font-medium">{concData.plannerErrors}</td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-800">Executor</td>
                        <td className="px-6 py-4 font-bold text-semantic-error">{concData.executorFailures}</td>
                        <td className="px-6 py-4 text-gray-600 font-medium">{concData.executorErrors}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* 3. Soak Run Overview */}
          <div className="py-2">
             <SectionHeader 
               title="Soak Run Overview (Latest Status)" 
               isOpen={openSections.soak} 
               onClick={() => toggleSection('soak')} 
             />
             {openSections.soak && (
               <div className="mt-8 mb-6 px-2 grid grid-cols-2 gap-6 max-w-2xl animate-fadeIn">
                 <div className="bg-white p-6 rounded-lg text-center border border-gray-200 hover:shadow-lg transition-all duration-300">
                    <p className="text-xs text-gray-500 uppercase font-bold mb-2 tracking-wide">Duration</p>
                    <p className="text-3xl font-bold text-gray-900">24 Hours</p>
                 </div>
                 <div className="bg-brand-600/5 p-6 rounded-lg text-center border border-brand-600/10 hover:bg-brand-600/10 hover:border-brand-600/20 transition-all duration-300">
                    <p className="text-xs text-brand-700 uppercase font-bold mb-2 tracking-wide">Stability</p>
                    <p className="text-3xl font-bold text-brand-700">100%</p>
                 </div>
               </div>
             )}
          </div>

          {/* 4. Result Correctness */}
          <div className="py-2">
             <SectionHeader 
               title="Result Correctness" 
               isOpen={openSections.correctness} 
               onClick={() => toggleSection('correctness')} 
             />
             {openSections.correctness && (
               <div className="mt-8 mb-6 px-2 flex flex-col md:flex-row gap-8 items-start animate-fadeIn">
                 <div className="flex items-center gap-8 bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300">
                    <div className="text-center">
                       <CheckCircle className="w-12 h-12 text-semantic-success mx-auto mb-4" />
                       <div className="text-4xl font-bold text-gray-900 tracking-tight">47 <span className="text-gray-400 text-2xl font-normal">/ 50</span></div>
                       <div className="text-xs text-gray-500 uppercase font-bold mt-2 tracking-wide">Queries Validated</div>
                    </div>
                    <div className="w-px h-20 bg-gray-200"></div>
                    <div className="text-center">
                       <div className="text-4xl font-bold text-brand-600 tracking-tight">94%</div>
                       <div className="text-xs text-gray-500 uppercase font-bold mt-2 tracking-wide">Match Rate</div>
                    </div>
                 </div>
                 <div className="text-sm text-gray-600 max-w-md p-6 bg-semantic-warning/5 rounded-lg border border-semantic-warning/20 leading-relaxed">
                    <span className="font-bold text-semantic-warning block mb-2 text-xs uppercase tracking-wide">Validation Note</span> 
                    3 Queries excluded due to non-deterministic ordering in baseline results.
                 </div>
               </div>
             )}
          </div>
          
        </div>
      </Card>

      {/* Query History Bucketing */}
      <Card title="Query History Bucketing">
        <div className="overflow-hidden border border-gray-200 rounded-lg shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-bg-muted text-xs uppercase text-gray-500 font-bold tracking-wide">
               <tr>
                 <th className="px-6 py-4 text-left w-20 border-b border-gray-200">#</th>
                 <th className="px-6 py-4 text-left border-b border-gray-200">Bucket Description</th>
                 <th className="px-6 py-4 text-right border-b border-gray-200">Count</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {bucketingData.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-400 font-bold">{row.id}</td>
                  <td className="px-6 py-4 text-gray-700 font-medium">{row.desc}</td>
                  <td className="px-6 py-4 text-right font-bold text-gray-900">{row.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ExecutiveScorecard;