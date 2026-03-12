import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { 
  FlaskConical, TestTube2, Building2, UserRound, 
  BookHeart, ClipboardList, Activity, PieChart as PieChartIcon
} from 'lucide-react';

// ==========================================
// Mock Data
// ==========================================

const trendData = [
  { date: '4.30', count: 1200 }, { date: '5.01', count: 900 }, { date: '5.02', count: 600 },  { date: '5.03', count: 900 },
  { date: '5.04', count: 800 },  { date: '5.05', count: 1100 }, { date: '5.06', count: 700 },  { date: '5.07', count: 650 },
  { date: '5.08', count: 600 },  { date: '5.09', count: 650 }, { date: '5.10', count: 1500 }, { date: '5.11', count: 1000 },
  { date: '5.12', count: 1300 }, { date: '5.13', count: 1100 }, { date: '5.14', count: 1250 }, { date: '5.15', count: 1350 },
  { date: '5.16', count: 1200 }, { date: '5.17', count: 1400 }, { date: '5.18', count: 1350 }, { date: '5.19', count: 1450 },
  { date: '5.20', count: 1250 }, { date: '5.21', count: 1450 }, { date: '5.22', count: 1300 },
];

const diseaseRankingData = [
  { name: '粥样硬化性心脏病', value: 85 }, { name: '粥样硬化性心脏病', value: 85 },
  { name: 'II型糖尿病', value: 100 }, { name: 'II型糖尿病', value: 100 },
  { name: '高血压病3级（极高危）', value: 65 }, { name: '高血压病3级（极高危）', value: 65 },
  { name: '粥样硬化性心脏病', value: 75 }, { name: '粥样硬化性心脏病', value: 75 },
  { name: 'II型糖尿病', value: 90 }, { name: 'II型糖尿病', value: 90 },
  { name: '高血压病3级（极高危）', value: 55 }, { name: '高血压病3级（极高危）', value: 55 },
];

const ageData = [
  { name: '0-1岁', value: 18.6, fill: '#60a5fa' }, { name: '1-6岁', value: 18.6, fill: '#34d399' },
  { name: '6-12岁', value: 18.6, fill: '#facc15' }, { name: '12-20岁', value: 25.6, fill: '#fbbf24' },
  { name: '20-30岁', value: 28.6, fill: '#fb923c' }, { name: '30-40岁', value: 29.6, fill: '#f472b6' },
  { name: '40-60岁', value: 32.6, fill: '#c084fc' }, { name: '60岁以上', value: 31.9, fill: '#818cf8' },
];

const genderData = [
  { name: '男性', value: 50.48, fill: '#00f6ff' }, { name: '女性', value: 48.91, fill: '#ff4b8b' }, { name: '未知', value: 0.61, fill: '#8b5cf6' },
];

const latestCases = Array(15).fill(0).map((_, i) => ({
  id: '15486235612',
  times: i % 2 === 0 ? 1 : 2,
  name: i % 2 === 0 ? '张塔轩' : '王可可',
  outTime: '2022/04/02 11:12:53',
  recordStatus: i % 2 === 0 ? '已归档' : '待归档',
  collectStatus: i % 2 === 0 ? '采集成功' : '采集失败',
  updateTime: '2022/05/12 16 : 12:53'
}));

const warningList = Array(12).fill(0).map(() => ({
  account: '15486235612',
  msg: '科室采集队列采集错误'
}));


// ==========================================
// Shared Components
// ==========================================

function Card({ title, children, className = '' }: { title?: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative border border-[#00f6ff]/40 bg-[#041227]/80 shadow-[inset_0_0_20px_rgba(0,246,255,0.08)] flex flex-col ${className}`}>
      <div className="absolute top-0 left-0 w-4 h-4 border-t-[3px] border-l-[3px] border-[#00f6ff]" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-[3px] border-r-[3px] border-[#00f6ff]" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[3px] border-l-[3px] border-[#00f6ff]" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[3px] border-r-[3px] border-[#00f6ff]" />
      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#00f6ff]/50" />
      <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#00f6ff]/50" />
      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#00f6ff]/50" />
      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#00f6ff]/50" />

      {title && (
        <div className="flex items-center gap-2 pt-4 px-5">
          <div className="text-[#00f6ff] text-sm italic font-bold tracking-tighter transform -skew-x-12">//////</div>
          <h2 className="text-white text-sm font-semibold tracking-wide">{title}</h2>
        </div>
      )}
      <div className="w-full flex-1 p-4 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}

function StatCard({ 
  leftIcon, leftLabel, leftValue, leftColor = "text-[#f3d321]",
  rightIcon, rightLabel, rightValue, rightColor = "text-[#f3d321]"
}: any) {
  return (
    <div className="flex-1 relative border border-[#00f6ff]/40 bg-[#041227]/90 p-5 shadow-[inset_0_0_20px_rgba(0,246,255,0.1)] flex items-center justify-between">
      <div className="absolute top-[-2px] left-[-2px] w-6 h-6 border-t-[3px] border-l-[3px] border-[#00f6ff]" />
      <div className="absolute top-[-2px] right-[-2px] w-6 h-6 border-t-[3px] border-r-[3px] border-[#00f6ff]" />
      <div className="absolute bottom-[-2px] left-[-2px] w-6 h-6 border-b-[3px] border-l-[3px] border-[#00f6ff]" />
      <div className="absolute bottom-[-2px] right-[-2px] w-6 h-6 border-b-[3px] border-r-[3px] border-[#00f6ff]" />
      
      <div className="flex-1 flex items-center justify-center gap-6">
        <div className={`p-2 rounded ${leftColor}`}>{leftIcon}</div>
        <div className="flex flex-col">
          <div className="text-gray-300 text-xs mb-1">{leftLabel}</div>
          <div className={`text-3xl font-bold font-mono tracking-wider ${leftColor} drop-shadow-[0_0_10px_currentColor]`}>{leftValue}</div>
        </div>
      </div>
      
      <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#00f6ff]/50 to-transparent"></div>
      
      <div className="flex-1 flex items-center justify-center gap-6">
        <div className={`p-2 rounded ${rightColor}`}>{rightIcon}</div>
        <div className="flex flex-col">
          <div className="text-gray-300 text-xs mb-1">{rightLabel}</div>
          <div className={`text-3xl font-bold font-mono tracking-wider ${rightColor} drop-shadow-[0_0_10px_currentColor]`}>{rightValue}</div>
        </div>
      </div>
    </div>
  );
}

function NavButton({ children, active, onClick }: { children: React.ReactNode, active?: boolean, onClick: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={`
        relative h-9 px-8 flex items-center justify-center transform skew-x-[-20deg] border
        ${active ? 'bg-gradient-to-b from-[#00f6ff]/40 to-transparent border-[#00f6ff] text-white shadow-[inset_0_0_15px_rgba(0,246,255,0.3)]' : 'bg-[#041227]/50 border-[#0088aa] text-gray-400 hover:text-[#00f6ff] hover:border-[#00f6ff]'}
        transition-colors cursor-pointer backdrop-blur-sm
      `}
    >
      <span className="transform skew-x-[20deg] font-medium tracking-widest text-sm drop-shadow-md">
        {children}
      </span>
    </div>
  );
}

// ==========================================
// Tab Views
// ==========================================

function TabTrendAnalysis() {
  const trendOption = {
    tooltip: { trigger: 'axis', backgroundColor: 'rgba(4, 18, 39, 0.9)', borderColor: '#00f6ff', textStyle: { color: '#fff' }, axisPointer: { type: 'shadow' } },
    grid: { top: '15%', left: '2%', right: '2%', bottom: '5%', containLabel: true },
    xAxis: { type: 'category', data: trendData.map(d => d.date), axisLine: { lineStyle: { color: '#1e3a5f' } }, axisTick: { show: false }, axisLabel: { color: '#8b9bb4', fontSize: 10, margin: 12 } },
    yAxis: { type: 'value', min: 0, max: 1800, interval: 300, splitLine: { lineStyle: { type: 'dotted', color: '#1e3a5f' } }, axisLabel: { color: '#8b9bb4', fontSize: 10 } },
    series: [
      {
        name: '病案数(柱)', type: 'bar', barWidth: '30%',
        itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#00f6ff' }, { offset: 1, color: '#0066ff' }]), borderRadius: [2, 2, 0, 0] },
        data: trendData.map(d => d.count)
      },
      {
        name: '病案数(线)', type: 'line', smooth: false, symbol: 'circle', symbolSize: 6,
        itemStyle: { color: '#f3d321', borderColor: '#fff', borderWidth: 1 }, lineStyle: { width: 2, color: '#f3d321' },
        areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(243, 211, 33, 0.4)' }, { offset: 1, color: 'rgba(243, 211, 33, 0.0)' }]) },
        data: trendData.map(d => d.count)
      }
    ]
  };

  const ageOption = {
    tooltip: { trigger: 'item', backgroundColor: 'rgba(4, 18, 39, 0.9)', borderColor: '#00f6ff', textStyle: { color: '#fff' } },
    series: [{
      type: 'pie', radius: ['15%', '70%'], center: ['50%', '50%'], roseType: 'area', itemStyle: { borderRadius: 0 },
      label: { color: '#e5e7eb', fontSize: 10, formatter: '{b} ({d}%)' },
      labelLine: { lineStyle: { color: '#6b7280', width: 1 }, length: 10, length2: 15 },
      data: ageData.map(d => ({ value: d.value, name: d.name, itemStyle: { color: d.fill } }))
    }]
  };

  const genderOption = {
    tooltip: { trigger: 'item', backgroundColor: 'rgba(4, 18, 39, 0.9)', borderColor: '#00f6ff', textStyle: { color: '#fff' } },
    legend: { bottom: '10%', right: '10%', orient: 'vertical', textStyle: { color: '#e5e7eb', fontSize: 11 }, icon: 'rect', itemWidth: 12, itemHeight: 8, itemGap: 12 },
    series: [{
      type: 'pie', radius: ['50%', '75%'], center: ['45%', '50%'],
      itemStyle: { borderColor: '#041227', borderWidth: 2 },
      label: { show: true, position: 'outside', formatter: '{d}%', color: '#e5e7eb', fontSize: 11 },
      labelLine: { show: true, length: 15, length2: 15, lineStyle: { color: '#6b7280' } },
      data: genderData.map(d => ({ value: d.value, name: d.name, itemStyle: { color: d.fill } }))
    }]
  };

  return (
    <>
      <div className="flex gap-5 h-28 w-full shrink-0">
        <StatCard 
          leftIcon={<FlaskConical className="w-10 h-10" />} leftLabel="已归档病案数" leftValue="568"
          rightIcon={<TestTube2 className="w-10 h-10" />} rightLabel="待归档病案数" rightValue="1238"
        />
        <StatCard 
          leftIcon={<Building2 className="w-10 h-10" />} leftLabel="质控通过病案数" leftValue="22" leftColor="text-[#00f6ff]"
          rightIcon={<UserRound className="w-10 h-10" />} rightLabel="质控不通过病案数" rightValue="12" rightColor="text-[#00f6ff]"
        />
        <StatCard 
          leftIcon={<BookHeart className="w-10 h-10" />} leftLabel="30日归档病案脱低率" leftValue="76.23%" leftColor="text-[#ff3333]"
          rightIcon={<ClipboardList className="w-10 h-10" />} rightLabel="30日归档病案脱低率增长率" rightValue="12.45%" rightColor="text-[#ff3333]"
        />
      </div>

      <div className="flex gap-5 flex-1 min-h-0">
        <div className="flex flex-col gap-5 w-[55%]">
          <Card title="30日病房增长趋势" className="flex-1">
            <div className="absolute top-2 right-6 flex gap-10 z-10">
              <div className="flex items-center gap-3">
                <Activity className="w-6 h-6 text-[#00f6ff]" />
                <div>
                  <div className="text-2xl font-bold text-[#00f6ff] leading-none drop-shadow-[0_0_5px_currentColor]">1975</div>
                  <div className="text-xs text-gray-400 mt-1">30日病案数</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <PieChartIcon className="w-6 h-6 text-[#c084fc]" />
                <div>
                  <div className="text-2xl font-bold text-[#c084fc] leading-none drop-shadow-[0_0_5px_currentColor]">171.3%</div>
                  <div className="text-xs text-gray-400 mt-1">30日同比环比增长率</div>
                </div>
              </div>
            </div>
            <div className="w-full h-full mt-4">
              <ReactECharts option={trendOption} style={{ height: '100%', width: '100%' }} />
            </div>
          </Card>
          <div className="flex gap-5 h-[40%]">
            <Card title="30日内病案年龄分布" className="flex-1">
              <ReactECharts option={ageOption} style={{ height: '100%', width: '100%' }} />
            </Card>
            <Card title="30日内病案性别分布" className="flex-1">
              <ReactECharts option={genderOption} style={{ height: '100%', width: '100%' }} />
            </Card>
          </div>
        </div>
        <div className="flex flex-col gap-5 w-[45%]">
          <Card title="30日内数据疾病排行" className="flex-1">
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 h-full content-start px-2 mt-2">
              {diseaseRankingData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4">
                  <div className="text-xs text-gray-300 w-32 text-right truncate">{item.name}</div>
                  <div className="flex-1 bg-gray-800/40 h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#0066ff] to-[#00f6ff]" style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card title="30日内数据手术排行" className="flex-1">
            <div className="grid grid-cols-2 gap-x-12 gap-y-4 h-full content-start px-2 mt-2">
              {diseaseRankingData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4">
                  <div className="text-xs text-gray-300 w-32 text-right truncate">{item.name}</div>
                  <div className="flex-1 bg-gray-800/40 h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-[#0066ff] to-[#00f6ff]" style={{ width: `${item.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
}

function TabLatestCases() {
  return (
    <Card title="最新病案" className="flex-1 min-h-0">
      <div className="flex flex-col h-full mt-2">
        <div className="flex text-[#00f6ff] text-sm font-medium border-b border-[#00f6ff]/30 pb-3 px-4 text-center">
          <div className="flex-1">住院号</div>
          <div className="flex-1">住院次数</div>
          <div className="flex-1">患者姓名</div>
          <div className="flex-1">出院时间</div>
          <div className="flex-1">病案状态</div>
          <div className="flex-1">采集状态</div>
          <div className="flex-1">状态最新更改时间</div>
        </div>
        <div className="flex-1 overflow-auto mt-2 custom-scrollbar">
          {latestCases.map((row, i) => (
            <div key={i} className="flex text-sm text-gray-300 py-3 px-4 text-center border-b border-gray-800/50 hover:bg-[#00f6ff]/5 transition-colors">
              <div className="flex-1 text-[#00f6ff]">{row.id}</div>
              <div className="flex-1">{row.times}</div>
              <div className="flex-1">{row.name}</div>
              <div className="flex-1">{row.outTime}</div>
              <div className={`flex-1 ${row.recordStatus === '待归档' ? 'text-gray-500' : 'text-gray-300'}`}>{row.recordStatus}</div>
              <div className={`flex-1 ${row.collectStatus === '采集成功' ? 'text-[#00f6ff]' : 'text-[#ff3333]'}`}>{row.collectStatus}</div>
              <div className="flex-1">{row.updateTime}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}

function TabIndicatorAnalysis() {
  const getAreaOption = (colorHex: string, data: number[]) => ({
    grid: { top: '20%', left: '5%', right: '5%', bottom: '15%', containLabel: true },
    xAxis: { type: 'category', data: ['5.12', '5.13', '5.14', '5.15', '5.16', '5.17', '5.18', '5.19'], axisLine: { lineStyle: { color: '#1e3a5f' } }, axisLabel: { color: '#8b9bb4', fontSize: 10 } },
    yAxis: { type: 'value', min: 0, max: 5000, splitLine: { show: false }, axisLabel: { color: '#8b9bb4', fontSize: 10 } },
    series: [{
      data, type: 'line', smooth: true, symbol: 'none',
      lineStyle: { color: colorHex, width: 2 },
      areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: `${colorHex}80` }, { offset: 1, color: `${colorHex}00` }]) }
    }]
  });

  const getBarOption = () => ({
    grid: { top: '20%', left: '5%', right: '5%', bottom: '15%', containLabel: true },
    legend: { top: '0', right: '0', itemWidth: 10, itemHeight: 10, textStyle: { color: '#8b9bb4', fontSize: 10 } },
    xAxis: { type: 'category', data: ['CCU', '产科', '骨科', '儿科', '耳鼻喉科'], axisLine: { lineStyle: { color: '#1e3a5f' } }, axisLabel: { color: '#8b9bb4', fontSize: 10 } },
    yAxis: { type: 'value', min: 0, max: 100, axisLabel: { formatter: '{value}%', color: '#8b9bb4', fontSize: 10 }, splitLine: { show: false } },
    series: [
      { name: '前日', type: 'bar', data: [70, 60, 65, 75, 55], itemStyle: { color: '#0066ff' } },
      { name: '昨日', type: 'bar', data: [85, 95, 80, 65, 65], itemStyle: { color: '#00f6ff' } },
      { name: '今日', type: 'bar', data: [50, 85, 55, 40, 70], itemStyle: { color: '#c084fc' } }
    ]
  });

  return (
    <>
      <div className="flex gap-5 h-28 w-full shrink-0">
        <StatCard 
          leftIcon={<FlaskConical className="w-10 h-10" />} leftLabel="已归档病案数" leftValue="568"
          rightIcon={<TestTube2 className="w-10 h-10" />} rightLabel="待归档病案数" rightValue="1238"
        />
        <StatCard 
          leftIcon={<Building2 className="w-10 h-10" />} leftLabel="质控通过病案数" leftValue="22" leftColor="text-[#00f6ff]"
          rightIcon={<UserRound className="w-10 h-10" />} rightLabel="质控不通过病案数" rightValue="12" rightColor="text-[#00f6ff]"
        />
        <StatCard 
          leftIcon={<BookHeart className="w-10 h-10" />} leftLabel="30日归档病案脱低率" leftValue="76.23%" leftColor="text-[#ff3333]"
          rightIcon={<ClipboardList className="w-10 h-10" />} rightLabel="30日归档病案脱低率增长率" rightValue="12.45%" rightColor="text-[#ff3333]"
        />
      </div>
      
      <div className="flex-1 flex flex-col gap-5 min-h-0">
        <div className="grid grid-cols-4 gap-5 h-1/2">
          <Card title="病案三日归档率"><ReactECharts option={getAreaOption('#c084fc', [2800, 3800, 4200, 3500, 2000, 1500, 2000, 3500])} style={{ height: '100%', width: '100%' }} /></Card>
          <Card title="病案五日归档率"><ReactECharts option={getAreaOption('#60a5fa', [1800, 3200, 3800, 1800, 2800, 1800, 1500, 2500])} style={{ height: '100%', width: '100%' }} /></Card>
          <Card title="病案七日归档率"><ReactECharts option={getAreaOption('#34d399', [2200, 3200, 1500, 4000, 2200, 3000, 2000, 3500])} style={{ height: '100%', width: '100%' }} /></Card>
          <Card title="病案总体归档率"><ReactECharts option={getAreaOption('#facc15', [2500, 3200, 1800, 4000, 2500, 3200, 2000, 3500])} style={{ height: '100%', width: '100%' }} /></Card>
        </div>
        <div className="grid grid-cols-4 gap-5 h-1/2">
          <Card title="30日内七日归档率前5科室"><ReactECharts option={getBarOption()} style={{ height: '100%', width: '100%' }} /></Card>
          <Card title="30日内七日归档率后5科室"><ReactECharts option={getBarOption()} style={{ height: '100%', width: '100%' }} /></Card>
          <Card title="30日病案脱纸率前5科室"><ReactECharts option={getBarOption()} style={{ height: '100%', width: '100%' }} /></Card>
          <Card title="30日病案脱纸率后5科室"><ReactECharts option={getBarOption()} style={{ height: '100%', width: '100%' }} /></Card>
        </div>
      </div>
    </>
  );
}

function TabCollectionOverview() {
  const getSpikeOption = () => {
    let data = [];
    for (let i = 0; i < 100; i++) data.push([i, Math.random() * 100 + (Math.random() > 0.8 ? 100 : 0)]);
    return {
      grid: { top: '10%', left: '5%', right: '5%', bottom: '15%', containLabel: true },
      xAxis: { type: 'value', show: false },
      yAxis: { type: 'value', splitLine: { show: false }, axisLabel: { color: '#8b9bb4', fontSize: 10 } },
      series: [{ type: 'line', data: data, symbol: 'none', lineStyle: { color: '#34d399', width: 1 } }]
    };
  };

  const getRealtimeOption = () => ({
    grid: { top: '15%', left: '5%', right: '5%', bottom: '15%', containLabel: true },
    xAxis: { type: 'category', data: ['06:00-08:00', '08:00-10:00', '10:00-12:00', '12:00-14:00', '06:00-08:00'], axisLine: { lineStyle: { color: '#1e3a5f' } }, axisLabel: { color: '#00f6ff', fontSize: 10, rotate: 45 } },
    yAxis: { type: 'value', show: false },
    series: [{
      data: [3216, 5216, 2216, 2658, 2564], type: 'line', symbol: 'circle', symbolSize: 6,
      label: { show: true, position: 'top', color: '#00f6ff', fontSize: 10 },
      itemStyle: { color: '#00f6ff' }, areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: 'rgba(0, 246, 255, 0.3)' }, { offset: 1, color: 'rgba(0, 246, 255, 0)' }]) }
    }]
  });

  const getBarSysOption = () => ({
    grid: { top: '15%', left: '5%', right: '5%', bottom: '15%', containLabel: true },
    xAxis: { type: 'category', data: ['门诊部', '住院部', '门诊', '住院部', '外采'], axisLine: { lineStyle: { color: '#1e3a5f' } }, axisLabel: { color: '#8b9bb4', fontSize: 10 } },
    yAxis: { type: 'value', splitLine: { show: false }, axisLabel: { color: '#8b9bb4', fontSize: 10 } },
    series: [{ type: 'bar', data: [5, 10, 35, 18, 40], barWidth: '40%', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#60a5fa' }, { offset: 1, color: '#3b82f6' }]) } }]
  });

  const getMultiLineOption = () => {
    const dates = ['2.10', '2.20', '2.28', '3.00', '3.10', '3.20', '4.10', '3.30', '4.20', '4.30', '5.20', '5.30'];
    const genData = (base: number) => dates.map(() => base + Math.random() * 1000 - 500);
    return {
      grid: { top: '15%', left: '5%', right: '5%', bottom: '15%', containLabel: true },
      xAxis: { type: 'category', data: dates, axisLine: { lineStyle: { color: '#1e3a5f' } }, axisLabel: { color: '#8b9bb4', fontSize: 10 } },
      yAxis: { type: 'value', min: 0, max: 2000, splitLine: { show: false }, axisLabel: { color: '#8b9bb4', fontSize: 10 } },
      series: [
        { type: 'line', data: genData(1500), symbol: 'none', lineStyle: { color: '#00f6ff' } },
        { type: 'line', data: genData(1200), symbol: 'none', lineStyle: { color: '#c084fc' } },
        { type: 'line', data: genData(1000), symbol: 'none', lineStyle: { color: '#60a5fa' } },
        { type: 'line', data: genData(800), symbol: 'none', lineStyle: { color: '#f472b6' } },
      ]
    };
  };

  return (
    <>
      <div className="flex gap-5 h-28 w-full shrink-0">
        <StatCard 
          leftIcon={<Building2 className="w-10 h-10" />} leftLabel="今日已采集数量" leftValue="183" leftColor="text-[#00f6ff]"
          rightIcon={<UserRound className="w-10 h-10" />} rightLabel="今日待采集数量" rightValue="436" rightColor="text-[#00f6ff]"
        />
        <StatCard 
          leftIcon={<FlaskConical className="w-10 h-10" />} leftLabel="总采集数量(页)" leftValue="568"
          rightIcon={<TestTube2 className="w-10 h-10" />} rightLabel="当月采集数量(页)" rightValue="3"
        />
        <StatCard 
          leftIcon={<BookHeart className="w-10 h-10" />} leftLabel="总住院数(人)" leftValue="623" leftColor="text-[#ff3333]"
          rightIcon={<ClipboardList className="w-10 h-10" />} rightLabel="当月住院数(人)" rightValue="562" rightColor="text-[#ff3333]"
        />
      </div>

      <div className="flex-1 grid grid-cols-4 gap-5 min-h-0">
        <div className="flex flex-col gap-5">
          <Card title="今日各系统采集情况" className="flex-1"><ReactECharts option={getSpikeOption()} style={{ height: '100%', width: '100%' }} /></Card>
          <Card title="今日各系统采集占比" className="flex-1"><ReactECharts option={getBarSysOption()} style={{ height: '100%', width: '100%' }} /></Card>
        </div>
        <div className="flex flex-col gap-5 col-span-2">
          <Card title="实时采集情况" className="h-[40%]"><ReactECharts option={getRealtimeOption()} style={{ height: '100%', width: '100%' }} /></Card>
          <Card title="今日采集情况" className="flex-1"><ReactECharts option={getMultiLineOption()} style={{ height: '100%', width: '100%' }} /></Card>
        </div>
        <Card title="异常提醒" className="flex flex-col">
          <div className="flex text-[#00f6ff] text-sm border-b border-[#00f6ff]/30 pb-2 mb-2 px-2">
            <div className="flex-1">账户</div>
            <div className="flex-1 text-right">总票数</div>
          </div>
          <div className="flex-1 overflow-auto custom-scrollbar pr-2">
            {warningList.map((item, i) => (
              <div key={i} className="flex text-sm py-3 px-2 border-b border-gray-800/50 hover:bg-[#00f6ff]/5">
                <div className="text-[#facc15] flex-1">{item.account}</div>
                <div className="text-gray-300 flex-1 text-right">{item.msg}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

// ==========================================
// Main App Shell
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState('趋势分析');

  const renderContent = () => {
    switch (activeTab) {
      case '采集概况': return <TabCollectionOverview />;
      case '指标分析': return <TabIndicatorAnalysis />;
      case '趋势分析': return <TabTrendAnalysis />;
      case '最新病案列表': return <TabLatestCases />;
      default: return <TabTrendAnalysis />;
    }
  };

  return (
    <div 
      className="h-screen w-screen bg-[#020b1a] text-white p-6 overflow-hidden flex flex-col font-sans"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 246, 255, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 246, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    >
      <style dangerouslySetContent={{__html: `
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #0088aa; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #00f6ff; }
      `}} />
      
      <div className="w-full h-full max-w-[1920px] mx-auto flex flex-col gap-5">
        
        {/* Header Section */}
        <div className="relative h-16 flex justify-between items-start shrink-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00f6ff]/50 to-transparent"></div>
          
          <div className="flex gap-4 z-10 ml-4 mt-2">
            <NavButton active={activeTab === '采集概况'} onClick={() => setActiveTab('采集概况')}>采集概况</NavButton>
            <NavButton active={activeTab === '指标分析'} onClick={() => setActiveTab('指标分析')}>指标分析</NavButton>
          </div>
          
          <div className="absolute left-1/2 top-0 -translate-x-1/2 z-20 flex items-center">
            <div className="flex gap-1 mr-6 transform skew-x-[-30deg]">
              {[...Array(6)].map((_, i) => (<div key={i} className="w-2 h-4 bg-[#00f6ff]/60"></div>))}
            </div>
            
            <div className="relative">
              <div 
                className="h-16 px-24 flex items-center justify-center bg-gradient-to-b from-[#00f6ff]/20 to-[#041227] border-b-2 border-x border-[#00f6ff] shadow-[0_5px_20px_rgba(0,246,255,0.2)]"
                style={{ clipPath: 'polygon(10% 0, 90% 0, 100% 100%, 0% 100%)' }}
              >
                <h1 className="text-3xl font-bold text-white tracking-widest drop-shadow-[0_0_10px_rgba(0,246,255,0.8)] pb-1">
                  无纸化病案数据展示
                </h1>
              </div>
            </div>

            <div className="flex gap-1 ml-6 transform skew-x-[30deg]">
              {[...Array(6)].map((_, i) => (<div key={i} className="w-2 h-4 bg-[#00f6ff]/60"></div>))}
            </div>
          </div>

          <div className="flex gap-4 z-10 mr-4 mt-2">
            <NavButton active={activeTab === '趋势分析'} onClick={() => setActiveTab('趋势分析')}>趋势分析</NavButton>
            <NavButton active={activeTab === '最新病案列表'} onClick={() => setActiveTab('最新病案列表')}>最新病案列表</NavButton>
          </div>
        </div>

        {/* Dynamic Content Area */}
        {renderContent()}

      </div>
    </div>
  );
}
