import { ChartDataPoint, QueryMetric } from './types';

// Helper to generate deterministic pseudo-random data based on customer name
const getMultiplier = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return 1 + (Math.abs(hash) % 50) / 100; // Returns 1.0 to 1.5
};

export const getMockDataForCustomer = (customerName: string, environment: string = 'Staging') => {
  // Environmental modifier to simulate data changes
  let envMod = 1;
  if (environment === 'Pre-prod') envMod = 1.15; // Slightly slower/different
  if (environment === 'Prod') envMod = 0.9; // Faster/Optimized

  const m = getMultiplier(customerName) * envMod;
  const baseTotal = Math.floor(15000 * m);
  
  const commonBucketing = (mult: number) => [
    { id: 1, desc: "Total number of view definitions", count: Math.floor(45 * mult) },
    { id: 2, desc: "Total number of SELECT queries", count: Math.floor(2500 * mult) },
    { id: 3, desc: "Total number of unique SELECT queries", count: Math.floor(120 * mult) },
    { id: 4, desc: "Unique SELECT queries with Table/Column not found", count: Math.floor(5 * mult) },
    { id: 5, desc: "Unique SELECT queries with unsupported functions", count: Math.floor(2 * mult) },
    { id: 6, desc: "Unique SELECT queries with underlying data issues", count: 1 },
    { id: 7, desc: "Total executable queries", count: Math.floor(112 * mult) },
    { id: 8, desc: "Total success", count: Math.floor(110 * mult) },
    { id: 9, desc: "Total failures", count: 2 },
  ];

  return {
    'Dashboard': {
      sequential: {
        total: baseTotal,
        success: Math.floor(baseTotal * 0.99),
        failed: Math.floor(baseTotal * 0.01),
        p90_e6: Math.floor(120 / m),
        p90_base: Math.floor(450 * m),
        p95_e6: Math.floor(180 / m),
        p95_base: Math.floor(600 * m),
        p99_e6: Math.floor(350 / m),
        p99_base: Math.floor(1200 * m),
        plannerFailures: Math.floor(12 * m),
        executorFailures: Math.floor(8 * m),
        plannerErrors: `Unsupported functions (${Math.floor(8*m)}), Semantic Analysis (${Math.floor(4*m)})`,
        executorErrors: `Out of Memory (${Math.floor(5*m)}), Timeout (${Math.floor(3*m)})`
      },
      concurrent: {
        '10': {
           total: Math.floor(5000 * m),
           success: Math.floor(4995 * m),
           failed: Math.floor(5 * m),
           p90_e6: Math.floor(150 / m),
           p90_base: Math.floor(500 * m),
           p95_e6: Math.floor(200 / m),
           p95_base: Math.floor(700 * m),
           p99_e6: Math.floor(400 / m),
           p99_base: Math.floor(1400 * m),
           plannerFailures: Math.floor(3 * m),
           executorFailures: Math.floor(2 * m),
           plannerErrors: "Syntax Error (3)",
           executorErrors: "Timeout (2)"
        },
        '100': {
           total: Math.floor(50000 * m),
           success: Math.floor(49850 * m),
           failed: Math.floor(150 * m),
           p90_e6: Math.floor(210 / m),
           p90_base: Math.floor(890 * m),
           p95_e6: Math.floor(340 / m),
           p95_base: Math.floor(1100 * m),
           p99_e6: Math.floor(520 / m),
           p99_base: Math.floor(2400 * m),
           plannerFailures: Math.floor(45 * m),
           executorFailures: Math.floor(105 * m),
           plannerErrors: `Concurrency Limit (${Math.floor(45*m)})`,
           executorErrors: `OOM (${Math.floor(80*m)}), Timeout (${Math.floor(25*m)})`
        }
      },
      bucketing: commonBucketing(m)
    },
    'Ad-hoc': {
      sequential: {
        total: Math.floor(4500 * m),
        success: Math.floor(4350 * m),
        failed: Math.floor(150 * m),
        p90_e6: Math.floor(250 / m),
        p90_base: Math.floor(900 * m),
        p95_e6: Math.floor(400 / m),
        p95_base: Math.floor(1500 * m),
        p99_e6: Math.floor(800 / m),
        p99_base: Math.floor(2500 * m),
        plannerFailures: Math.floor(90 * m),
        executorFailures: Math.floor(60 * m),
        plannerErrors: "Syntax Error, Permission Denied",
        executorErrors: "Spill to disk, Timeout"
      },
      concurrent: {
        '10': {
           total: 1200,
           success: 1180,
           failed: 20,
           p90_e6: 280,
           p90_base: 950,
           p95_e6: 450,
           p95_base: 1600,
           p99_e6: 850,
           p99_base: 2800,
           plannerFailures: 15,
           executorFailures: 5,
           plannerErrors: "Parse Error",
           executorErrors: "Resource Limit"
        },
        '100': {
           total: 12000,
           success: 11400,
           failed: 600,
           p90_e6: 500,
           p90_base: 1800,
           p95_e6: 900,
           p95_base: 3000,
           p99_e6: 1500,
           p99_base: 6000,
           plannerFailures: 200,
           executorFailures: 400,
           plannerErrors: "Queue Full",
           executorErrors: "Worker Crash, Timeout"
        }
      },
      bucketing: commonBucketing(m * 0.6)
    },
    'AI-ML': {
      sequential: {
        total: Math.floor(800 * m),
        success: Math.floor(760 * m),
        failed: Math.floor(40 * m),
        p90_e6: Math.floor(1200 / m),
        p90_base: Math.floor(4500 * m),
        p95_e6: Math.floor(2000 / m),
        p95_base: Math.floor(8000 * m),
        p99_e6: Math.floor(3500 / m),
        p99_base: Math.floor(15000 * m),
        plannerFailures: Math.floor(15 * m),
        executorFailures: Math.floor(25 * m),
        plannerErrors: "Unsupported Model Type",
        executorErrors: "GPU Out of Memory"
      },
      concurrent: {
        '10': {
           total: 400,
           success: 395,
           failed: 5,
           p90_e6: 1500,
           p90_base: 6000,
           p95_e6: 2500,
           p95_base: 9000,
           p99_e6: 4000,
           p99_base: 18000,
           plannerFailures: 2,
           executorFailures: 3,
           plannerErrors: "Model Load Error",
           executorErrors: "Timeout"
        },
        '100': {
           total: 4000,
           success: 3800,
           failed: 200,
           p90_e6: 2800,
           p90_base: 12000,
           p95_e6: 4500,
           p95_base: 20000,
           p99_e6: 7000,
           p99_base: 35000,
           plannerFailures: 50,
           executorFailures: 150,
           plannerErrors: "Queue Full",
           executorErrors: "Resource Exhaustion"
        }
      },
      bucketing: commonBucketing(m * 0.2)
    }
  };
};

export const getTopQueries = (name: string): QueryMetric[] => {
  const m = getMultiplier(name);
  return [
    { name: 'Q_Analytics_01', baselineTime: Math.floor(4500*m), e6dataTime: Math.floor(150/m), speedup: Number((30.0 * m * m).toFixed(1)), status: 'Pass' },
    { name: 'Q_Dashboard_Agg', baselineTime: Math.floor(3200*m), e6dataTime: Math.floor(200/m), speedup: Number((16.0 * m * m).toFixed(1)), status: 'Pass' },
    { name: 'Q_User_Profile', baselineTime: Math.floor(1200*m), e6dataTime: Math.floor(100/m), speedup: Number((12.0 * m * m).toFixed(1)), status: 'Pass' },
    { name: 'Q_Sales_Report', baselineTime: Math.floor(8000*m), e6dataTime: Math.floor(800/m), speedup: Number((10.0 * m * m).toFixed(1)), status: 'Pass' },
    { name: 'Q_Inventory_Join', baselineTime: Math.floor(5000*m), e6dataTime: Math.floor(600/m), speedup: Number((8.3 * m * m).toFixed(1)), status: 'Pass' },
  ];
};

export const SPEEDUP_DISTRIBUTION_DATA: ChartDataPoint[] = [
  { name: '<1x', count: 2 },
  { name: '1-2x', count: 15 },
  { name: '2-5x', count: 45 },
  { name: '5-10x', count: 30 },
  { name: '10x+', count: 20 },
];

export const PERFORMANCE_TREND_DATA: ChartDataPoint[] = [
  { name: 'Run 1', p50: 250, p95: 800 },
  { name: 'Run 2', p50: 240, p95: 750 },
  { name: 'Run 3', p50: 200, p95: 600 },
  { name: 'Run 4', p50: 180, p95: 550 },
  { name: 'Run 5', p50: 150, p95: 450 },
];

export const WORST_QUERIES: QueryMetric[] = [
  { name: 'Q_Complex_Window', baselineTime: 4000, e6dataTime: 4500, speedup: 0.88, status: 'Pass', reason: 'Spill to disk' },
  { name: 'Q_Legacy_Join', baselineTime: 2000, e6dataTime: 1900, speedup: 1.05, status: 'Pass', reason: 'Data Skew' },
];

export const THROUGHPUT_DATA: ChartDataPoint[] = [
  { name: '1', e6data: 60, baseline: 50 },
  { name: '10', e6data: 600, baseline: 400 },
  { name: '25', e6data: 1500, baseline: 800 },
  { name: '50', e6data: 2800, baseline: 1200 },
  { name: '75', e6data: 4100, baseline: 1500 },
  { name: '100', e6data: 5200, baseline: 1600 },
];

export const LATENCY_LOAD_DATA: ChartDataPoint[] = [
  { name: '1', e6data: 150, baseline: 150 },
  { name: '10', e6data: 180, baseline: 250 },
  { name: '25', e6data: 220, baseline: 600 },
  { name: '50', e6data: 300, baseline: 1500 },
  { name: '75', e6data: 450, baseline: 3500 },
  { name: '100', e6data: 600, baseline: 8000 },
];

export const SOAK_DEMAND_CAPACITY: ChartDataPoint[] = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  const baseDemand = hour > 8 && hour < 18 ? 80 : 20;
  const demand = baseDemand + Math.random() * 20;
  const baselineCapacity = demand > 50 ? 120 : 40;
  const e6Capacity = demand + 10; 
  return {
    name: `${hour}:00`,
    demand: Math.floor(demand),
    baselineCapacity: baselineCapacity,
    e6Capacity: Math.floor(e6Capacity),
  };
});