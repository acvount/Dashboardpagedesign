import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import { 
  FlaskConical, TestTube2, Building2, UserRound, 
  BookHeart, ClipboardList, Activity, PieChart as PieChartIcon
} from 'lucide-react';

const trendData = [
  { date: '4.30', count: 1200 }, { date: '5.01', count: 900 },
  { date: '5.02', count: 600 },  { date: '5.03', count: 900 },
  { date: '5.04', count: 800 },  { date: '5.05', count: 1100 },
  { date: '5.06', count: 700 },  { date: '5.07', count: 650 },
  { date: '5.08', count: 600 },  { date: '5.09', count: 650 },
  { date: '5.10', count: 1500 }, { date: '5.11', count: 1000 },
  { date: '5.12', count: 1300 }, { date: '5.13', count: 1100 },
  { date: '5.14', count: 1250 }, { date: '5.15', count: 1350 },
  { date: '5.16', count: 1200 }, { date: '5.17', count: 1400 },
  { date: '5.18', count: 1350 }, { date: '5.19', count: 1450 },
  { date: '5.20', count: 1250 }, { date: '5.21', count: 1450 },
  { date: '5.22', count: 1300 },
];

const diseaseRankingData = [
  { name: '粥样硬化性心脏病', value: 85 }, { name: '粥样硬化性心脏病', value: 85 },
  { name: 'II型糖尿病', value: 100 }, { name: 'II型糖尿病', value: 100 },
  { name: '高血压病3级（极高危）', value: 65 }, { name: '高血压病3级（极高危）', value: 65 },
  { name: '粥样硬化性心脏病', value: 75 }, { name: '粥样硬化性心脏病', value: 75 },
  { name: 'II型糖尿病', value: 90 }, { name: 'II型糖尿病', value: 90 },
  { name: '高血压病3级（极高危）', value: 55 }, { name: '高血压病3级（极高危）', value: 55 },
];

const surgeryRankingData = [
  { name: '粥样硬化性心脏病', value: 85 }, { name: '粥样硬化性心脏病', value: 85 },
  { name: 'II型糖尿病', value: 100 }, { name: 'II型糖尿病', value: 100 },
  { name: '高血压病3级（极高危）', value: 65 }, { name: '高血压病3级（极高危）', value: 65 },
  { name: '粥样硬化性心脏病', value: 75 }, { name: '粥样硬化性心脏病', value: 75 },
  { name: 'II型糖尿病', value: 90 }, { name: 'II型糖尿病', value: 90 },
  { name: '高血压病3级（极高危）', value: 55 }, { name: '高血压病3级（极高危）', value: 55 },
];

const ageData = [
  { name: '0-1岁', value: 18.6, fill: '#60a5fa' },
  { name: '1-6岁', value: 18.6, fill: '#34d399' },
  { name: '6-12岁', value: 18.6, fill: '#facc15' },
  { name: '12-20岁', value: 25.6, fill: '#fbbf24' },
  { name: '20-30岁', value: 28.6, fill: '#fb923c' },
  { name: '30-40岁', value: 29.6, fill: '#f472b6' },
  { name: '40-60岁', value: 32.6, fill: '#c084fc' },
  { name: '60岁以上', value: 31.9, fill: '#818cf8' },
];

const genderData = [
  { name: '男性', value: 50.48, fill: '#00f6ff' },
  { name: '女性', value: 48.91, fill: '#ff4b8b' },
  { name: '未知', value: 0.61, fill: '#8b5cf6' },
];

function Card({ title, children, className = '' }: { title?: string, children: React.ReactNode, className?: string }) {
  return (
    <div className={`relative border border-[#00f6ff]/40 bg-[#041227]/80 shadow-[inset_0_0_20px_rgba(0,246,255,0.08)] flex flex-col ${className}`}>
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-[3px] border-l-[3px] border-[#00f6ff]" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-[3px] border-r-[3px] border-[#00f6ff]" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-[3px] border-l-[3px] border-[#00f6ff]" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-[3px] border-r-[3px] border-[#00f6ff]" />
      
      {/* Inner subtle glow corners */}
      <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#00f6ff]/50" />
      <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#00f6ff]/50" />
      <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-[#00f6ff]/50" />
      <div className="absolute bottom-1 right-1 w-1.5 h-1.5 bg-[#00f6ff]/50" />

      {title && (
        <div className="flex items-center gap-2 pt-4 px-5">
          <div className="text-[#00f6ff] text-sm italic font-bold tracking-tighter transform -skew-x-12">
            //////
          </div>
          <h2 className="text-white text-base font-semibold tracking-wide">{title}</h2>
        </div>
      )}
      <div className="w-full flex-1 p-4 overflow-hidden relative">
        {children}
      </div>
    </div>
  );
}

function StatCard({ 
  leftIcon, leftLabel, leftValue, leftColor = "text-[#f3d321]", leftBorder = "border-[#f3d321]/30",
  rightIcon, rightLabel, rightValue, rightColor = "text-[#f3d321]", rightBorder = "border-[#f3d321]/30",
}: any) {
  return (
    <div className="flex-1 relative border border-[#00f6ff]/40 bg-[#041227]/90 p-5 shadow-[inset_0_0_20px_rgba(0,246,255,0.1)] flex items-center justify-between">
      {/* Corner decorations */}
      <div className="absolute top-[-2px] left-[-2px] w-6 h-6 border-t-[3px] border-l-[3px] border-[#00f6ff]" />
      <div className="absolute top-[-2px] right-[-2px] w-6 h-6 border-t-[3px] border-r-[3px] border-[#00f6ff]" />
      <div className="absolute bottom-[-2px] left-[-2px] w-6 h-6 border-b-[3px] border-l-[3px] border-[#00f6ff]" />
      <div className="absolute bottom-[-2px] right-[-2px] w-6 h-6 border-b-[3px] border-r-[3px] border-[#00f6ff]" />
      
      {/* Left Stat */}
      <div className="flex-1 flex items-center justify-center gap-6">
        <div className={`p-2 rounded ${leftColor}`}>
          {leftIcon}
        </div>
        <div className="flex flex-col">
          <div className="text-gray-300 text-sm mb-1">{leftLabel}</div>
          <div className={`text-4xl font-bold font-mono tracking-wider ${leftColor} drop-shadow-[0_0_10px_currentColor]`}>
            {leftValue}
          </div>
        </div>
      </div>
      
      {/* Divider */}
      <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#00f6ff]/50 to-transparent"></div>
      
      {/* Right Stat */}
      <div className="flex-1 flex items-center justify-center gap-6">
        <div className={`p-2 rounded ${rightColor}`}>
          {rightIcon}
        </div>
        <div className="flex flex-col">
          <div className="text-gray-300 text-sm mb-1">{rightLabel}</div>
          <div className={`text-4xl font-bold font-mono tracking-wider ${rightColor} drop-shadow-[0_0_10px_currentColor]`}>
            {rightValue}
          </div>
        </div>
      </div>
    </div>
  );
}

function RankingGrid({ data }: { data: { name: string, value: number }[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-12 gap-y-5 h-full content-start px-2">
      {data.map((item, idx) => (
        <div key={idx} className="flex items-center justify-between gap-4">
          <div className="text-xs text-gray-300 w-32 text-right truncate">{item.name}</div>
          <div className="flex-1 bg-gray-800/40 h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#0066ff] to-[#00f6ff]" 
              style={{ width: `${item.value}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Button({ children, active }: { children: React.ReactNode, active?: boolean }) {
  return (
    <div className={`
      relative h-9 px-8 flex items-center justify-center transform skew-x-[-20deg] border
      ${active ? 'bg-gradient-to-b from-[#00f6ff]/40 to-transparent border-[#00f6ff] text-white shadow-[inset_0_0_15px_rgba(0,246,255,0.3)]' : 'bg-[#041227] border-[#0088aa] text-gray-300 hover:text-[#00f6ff]'}
      transition-colors cursor-pointer
    `}>
      <span className="transform skew-x-[20deg] font-medium tracking-widest text-sm drop-shadow-md">
        {children}
      </span>
    </div>
  );
}

export default function App() {
  const trendOption = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(4, 18, 39, 0.9)',
      borderColor: '#00f6ff',
      textStyle: { color: '#fff' },
      axisPointer: { type: 'shadow' }
    },
    grid: { top: '15%', left: '2%', right: '2%', bottom: '5%', containLabel: true },
    xAxis: {
      type: 'category',
      data: trendData.map(d => d.date),
      axisLine: { lineStyle: { color: '#1e3a5f' } },
      axisTick: { show: false },
      axisLabel: { color: '#8b9bb4', fontSize: 10, margin: 12 }
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 1800,
      interval: 300,
      splitLine: { lineStyle: { type: 'dotted', color: '#1e3a5f' } },
      axisLine: { show: false },
      axisLabel: { color: '#8b9bb4', fontSize: 10 }
    },
    series: [
      {
        name: '病案数(柱)',
        type: 'bar',
        barWidth: '30%',
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00f6ff' },
            { offset: 1, color: '#0066ff' }
          ]),
          borderRadius: [2, 2, 0, 0]
        },
        data: trendData.map(d => d.count)
      },
      {
        name: '病案数(线)',
        type: 'line',
        smooth: false,
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#f3d321', borderColor: '#fff', borderWidth: 1 },
        lineStyle: { width: 2, color: '#f3d321' },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(243, 211, 33, 0.4)' },
            { offset: 1, color: 'rgba(243, 211, 33, 0.0)' }
          ])
        },
        data: trendData.map(d => d.count)
      }
    ]
  };

  const ageOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(4, 18, 39, 0.9)',
      borderColor: '#00f6ff',
      textStyle: { color: '#fff' }
    },
    series: [
      {
        name: '年龄分布',
        type: 'pie',
        radius: ['15%', '70%'],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: { borderRadius: 0 },
        label: {
          color: '#e5e7eb',
          fontSize: 10,
          formatter: '{b} ({d}%)'
        },
        labelLine: {
          lineStyle: { color: '#6b7280', width: 1 },
          length: 15,
          length2: 20
        },
        data: ageData.map(d => ({ 
          value: d.value, 
          name: d.name, 
          itemStyle: { color: d.fill } 
        }))
      }
    ]
  };

  const genderOption = {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(4, 18, 39, 0.9)',
      borderColor: '#00f6ff',
      textStyle: { color: '#fff' }
    },
    legend: {
      bottom: '10%',
      right: '10%',
      orient: 'vertical',
      textStyle: { color: '#e5e7eb', fontSize: 11 },
      icon: 'rect',
      itemWidth: 12,
      itemHeight: 8,
      itemGap: 12
    },
    series: [
      {
        name: '性别分布',
        type: 'pie',
        radius: ['50%', '75%'],
        center: ['45%', '50%'],
        avoidLabelOverlap: true,
        itemStyle: {
          borderColor: '#041227',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{d}%',
          color: '#e5e7eb',
          fontSize: 11
        },
        labelLine: {
          show: true,
          length: 15,
          length2: 15,
          lineStyle: { color: '#6b7280' }
        },
        data: genderData.map(d => ({ 
          value: d.value, 
          name: d.name, 
          itemStyle: { color: d.fill } 
        }))
      }
    ]
  };

  return (
    <div 
      className="min-h-screen bg-[#020b1a] text-white p-6 overflow-hidden flex flex-col font-sans"
      style={{
        backgroundImage: `
          linear-gradient(to right, rgba(0, 246, 255, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 246, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }}
    >
      <div className="w-full max-w-[1800px] mx-auto flex flex-col h-full gap-5">
        
        {/* Header Section */}
        <div className="relative h-20 flex justify-between items-start pt-2">
          {/* Header Lines Decor */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00f6ff]/50 to-transparent"></div>
          
          {/* Left Buttons */}
          <div className="flex gap-4 z-10 ml-4">
            <Button active>采集概况</Button>
            <Button>指标分析</Button>
          </div>
          
          {/* Center Title */}
          <div className="absolute left-1/2 -top-2 -translate-x-1/2 z-20 flex items-center">
            {/* Left Decor */}
            <div className="flex gap-1 mr-6 transform skew-x-[-30deg]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-4 bg-[#00f6ff]/60"></div>
              ))}
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

            {/* Right Decor */}
            <div className="flex gap-1 ml-6 transform skew-x-[30deg]">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-2 h-4 bg-[#00f6ff]/60"></div>
              ))}
            </div>
          </div>

          {/* Right Buttons */}
          <div className="flex gap-4 z-10 mr-4">
            <Button>趋势分析</Button>
            <Button active>最新病案列表</Button>
          </div>
        </div>

        {/* Top KPIs Row */}
        <div className="flex gap-5 h-32 w-full mt-2">
          <StatCard 
            leftIcon={<FlaskConical className="w-12 h-12" />} leftLabel="已归档病案数" leftValue="568"
            rightIcon={<TestTube2 className="w-12 h-12" />} rightLabel="待归档病案数" rightValue="1238"
          />
          <StatCard 
            leftIcon={<Building2 className="w-12 h-12" />} leftLabel="质控通过病案数" leftValue="22" 
            leftColor="text-[#00f6ff]" leftBorder="border-[#00f6ff]/30"
            rightIcon={<UserRound className="w-12 h-12" />} rightLabel="质控不通过病案数" rightValue="12" 
            rightColor="text-[#00f6ff]" rightBorder="border-[#00f6ff]/30"
          />
          <StatCard 
            leftIcon={<BookHeart className="w-12 h-12" />} leftLabel="30日归档病案脱低率" leftValue="76.23%" 
            leftColor="text-[#ff3333]" leftBorder="border-[#ff3333]/30"
            rightIcon={<ClipboardList className="w-12 h-12" />} rightLabel="30日归档病案脱低率增长率" rightValue="12.45%" 
            rightColor="text-[#ff3333]" rightBorder="border-[#ff3333]/30"
          />
        </div>

        {/* Main Content Grid */}
        <div className="flex gap-5 flex-1 min-h-0">
          
          {/* Left Column (Charts) */}
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

          {/* Right Column (Rankings) */}
          <div className="flex flex-col gap-5 w-[45%]">
            <Card title="30日内数据疾病排行" className="flex-1">
              <RankingGrid data={diseaseRankingData} />
            </Card>
            <Card title="30日内数据手术排行" className="flex-1">
              <RankingGrid data={surgeryRankingData} />
            </Card>
          </div>

        </div>

      </div>
    </div>
  );
}
