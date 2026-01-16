export enum PageTab {
  EXECUTIVE = 'Executive Scorecard',
  SEQUENTIAL = 'Sequential Runs',
  CONCURRENCY = 'Concurrency & Scale',
  SOAK = 'Soak Runs',
  COST = 'Cost Analysis'
}

export interface MetricTileProps {
  label: string;
  value: string | number;
  subValue?: string;
  trend?: 'up' | 'down' | 'neutral';
  color?: 'default' | 'success' | 'danger' | 'warning';
}

export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export enum EngineType {
  E6DATA = 'e6data',
  BASELINE = 'Baseline'
}

export interface QueryMetric {
  name: string;
  baselineTime: number;
  e6dataTime: number;
  speedup: number;
  status: 'Pass' | 'Fail';
  reason?: string;
}
