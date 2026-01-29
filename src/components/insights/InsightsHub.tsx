import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, TrendingDown, DollarSign, Calendar, Users, 
  Star, Home, BarChart3, PieChart, Activity, ArrowUpRight,
  ArrowDownRight, Eye, Percent, Clock, Target, Zap,
  ChevronDown, Filter, Download, RefreshCw
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Types
interface MetricCard {
  id: string;
  label: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ElementType;
  color: string;
}

interface ChartData {
  label: string;
  value: number;
}

// Mock data
const metrics: MetricCard[] = [
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: '$12,450',
    change: 12.5,
    changeLabel: 'vs last month',
    icon: DollarSign,
    color: 'from-emerald-500/20 to-emerald-500/5',
  },
  {
    id: 'occupancy',
    label: 'Occupancy Rate',
    value: '78%',
    change: 5.2,
    changeLabel: 'vs last month',
    icon: Percent,
    color: 'from-blue-500/20 to-blue-500/5',
  },
  {
    id: 'adr',
    label: 'Avg Daily Rate',
    value: '$245',
    change: -2.1,
    changeLabel: 'vs last month',
    icon: Target,
    color: 'from-violet-500/20 to-violet-500/5',
  },
  {
    id: 'bookings',
    label: 'Bookings',
    value: '24',
    change: 18.3,
    changeLabel: 'vs last month',
    icon: Calendar,
    color: 'from-gold/20 to-gold/5',
  },
];

const revenueData: ChartData[] = [
  { label: 'Jan', value: 8500 },
  { label: 'Feb', value: 9200 },
  { label: 'Mar', value: 7800 },
  { label: 'Apr', value: 10500 },
  { label: 'May', value: 11200 },
  { label: 'Jun', value: 12450 },
];

const bookingSourceData = [
  { label: 'Airbnb', value: 45, color: '#FF5A5F' },
  { label: 'VRBO', value: 25, color: '#3B5998' },
  { label: 'Direct', value: 20, color: '#D4AF37' },
  { label: 'Booking.com', value: 10, color: '#003580' },
];

const recentBookings = [
  { id: 1, property: 'Sunset Beach Villa', guest: 'John Smith', dates: 'Jun 15-20', amount: '$1,225', status: 'confirmed' },
  { id: 2, property: 'Downtown Loft', guest: 'Emily Brown', dates: 'Jun 18-22', amount: '$780', status: 'pending' },
  { id: 3, property: 'Sunset Beach Villa', guest: 'Mike Johnson', dates: 'Jun 25-30', amount: '$1,470', status: 'confirmed' },
];

const insights = [
  {
    id: 1,
    type: 'opportunity',
    title: 'Increase weekend rates',
    description: 'Your weekend occupancy is 95%. Consider raising rates by 15% on Fri-Sat.',
    impact: '+$320/mo',
    icon: TrendingUp,
  },
  {
    id: 2,
    type: 'alert',
    title: 'Low weekday bookings',
    description: 'Weekday occupancy dropped to 45%. Try offering a midweek discount.',
    impact: 'Action needed',
    icon: Activity,
  },
  {
    id: 3,
    type: 'success',
    title: 'Great review streak',
    description: 'Your last 5 reviews were 5 stars! Keep up the excellent service.',
    impact: '5.0 rating',
    icon: Star,
  },
];

// Metric Card Component
function MetricCardComponent({ metric, index }: { metric: MetricCard; index: number }) {
  const Icon = metric.icon;
  const isPositive = metric.change >= 0;

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-xl p-5",
        "bg-gradient-to-br", metric.color,
        "border border-white/5"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <div className={cn(
          "flex items-center gap-1 text-sm font-medium",
          isPositive ? "text-emerald-400" : "text-red-400"
        )}>
          {isPositive ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
          {Math.abs(metric.change)}%
        </div>
      </div>
      <p className="text-2xl font-bold text-white mb-1">{metric.value}</p>
      <p className="text-sm text-gray-400">{metric.label}</p>
      <p className="text-xs text-gray-500 mt-1">{metric.changeLabel}</p>
    </motion.div>
  );
}

// Revenue Chart Component
function RevenueChart() {
  const maxValue = Math.max(...revenueData.map(d => d.value));

  return (
    <motion.div
      className="bg-[#2b2d31] rounded-xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
          <p className="text-sm text-gray-400">Last 6 months</p>
        </div>
        <select className="bg-[#1e1f22] text-sm text-gray-300 rounded-lg px-3 py-2 outline-none border border-white/5">
          <option>Last 6 months</option>
          <option>Last 12 months</option>
          <option>This year</option>
        </select>
      </div>

      <div className="flex items-end gap-4 h-48">
        {revenueData.map((data, i) => (
          <div key={data.label} className="flex-1 flex flex-col items-center gap-2">
            <motion.div
              className="w-full bg-gradient-to-t from-gold to-amber-500 rounded-t-lg"
              initial={{ height: 0 }}
              animate={{ height: `${(data.value / maxValue) * 100}%` }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            />
            <span className="text-xs text-gray-500">{data.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Booking Sources Chart
function BookingSourcesChart() {
  const total = bookingSourceData.reduce((acc, d) => acc + d.value, 0);

  return (
    <motion.div
      className="bg-[#2b2d31] rounded-xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-lg font-semibold text-white mb-6">Booking Sources</h3>
      
      <div className="flex items-center gap-6">
        {/* Pie chart visualization */}
        <div className="relative w-32 h-32">
          <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
            {bookingSourceData.reduce((acc, data, i) => {
              const offset = acc.offset;
              const percentage = (data.value / total) * 100;
              acc.elements.push(
                <circle
                  key={data.label}
                  cx="18"
                  cy="18"
                  r="15.915"
                  fill="none"
                  stroke={data.color}
                  strokeWidth="3"
                  strokeDasharray={`${percentage} ${100 - percentage}`}
                  strokeDashoffset={-offset}
                  className="transition-all duration-500"
                />
              );
              acc.offset += percentage;
              return acc;
            }, { elements: [] as React.ReactNode[], offset: 0 }).elements}
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-white">{total}%</span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          {bookingSourceData.map((data) => (
            <div key={data.label} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: data.color }} />
                <span className="text-sm text-gray-300">{data.label}</span>
              </div>
              <span className="text-sm font-medium text-white">{data.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Recent Bookings Table
function RecentBookings() {
  return (
    <motion.div
      className="bg-[#2b2d31] rounded-xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Recent Bookings</h3>
        <a href="/bookings" className="text-sm text-gold hover:underline">View all</a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-xs text-gray-500 uppercase">
              <th className="pb-3 font-medium">Property</th>
              <th className="pb-3 font-medium">Guest</th>
              <th className="pb-3 font-medium">Dates</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {recentBookings.map((booking) => (
              <tr key={booking.id} className="hover:bg-white/5">
                <td className="py-3 text-sm text-white">{booking.property}</td>
                <td className="py-3 text-sm text-gray-300">{booking.guest}</td>
                <td className="py-3 text-sm text-gray-400">{booking.dates}</td>
                <td className="py-3 text-sm font-medium text-white">{booking.amount}</td>
                <td className="py-3">
                  <span className={cn(
                    "px-2 py-1 rounded text-xs font-medium",
                    booking.status === 'confirmed' 
                      ? "bg-emerald-500/20 text-emerald-400"
                      : "bg-amber-500/20 text-amber-400"
                  )}>
                    {booking.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

// AI Insights Component
function AIInsights() {
  return (
    <motion.div
      className="bg-[#2b2d31] rounded-xl p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Zap className="w-5 h-5 text-gold" />
        <h3 className="text-lg font-semibold text-white">AI Insights</h3>
      </div>

      <div className="space-y-3">
        {insights.map((insight) => {
          const Icon = insight.icon;
          return (
            <div
              key={insight.id}
              className={cn(
                "p-4 rounded-lg border",
                insight.type === 'opportunity' && "bg-emerald-500/5 border-emerald-500/20",
                insight.type === 'alert' && "bg-amber-500/5 border-amber-500/20",
                insight.type === 'success' && "bg-blue-500/5 border-blue-500/20"
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  insight.type === 'opportunity' && "bg-emerald-500/20",
                  insight.type === 'alert' && "bg-amber-500/20",
                  insight.type === 'success' && "bg-blue-500/20"
                )}>
                  <Icon className={cn(
                    "w-4 h-4",
                    insight.type === 'opportunity' && "text-emerald-400",
                    insight.type === 'alert' && "text-amber-400",
                    insight.type === 'success' && "text-blue-400"
                  )} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-white">{insight.title}</h4>
                    <span className={cn(
                      "text-xs font-medium",
                      insight.type === 'opportunity' && "text-emerald-400",
                      insight.type === 'alert' && "text-amber-400",
                      insight.type === 'success' && "text-blue-400"
                    )}>
                      {insight.impact}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">{insight.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

// Main Component
export function InsightsHub() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-white">Insights</h1>
          <p className="text-gray-400">Track your performance and discover opportunities</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2b2d31] text-gray-300 hover:bg-[#35373c] transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#2b2d31] text-gray-300 hover:bg-[#35373c] transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gold text-black font-medium hover:bg-gold/90 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">Refresh</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, i) => (
          <MetricCardComponent key={metric.id} metric={metric} index={i} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart />
        <BookingSourcesChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentBookings />
        <AIInsights />
      </div>
    </div>
  );
}

export default InsightsHub;


