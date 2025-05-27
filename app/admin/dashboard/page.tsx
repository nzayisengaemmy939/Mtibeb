"use client";
import { useState, useEffect, useRef } from "react";
import {
  BarChart3,
  Users,
  Settings,
  TrendingUp,
  Plus,
  Search,
  Filter,
  Download,
} from "lucide-react";

import {
  AreaChart,
  Area,
  Pie,
  Cell,
  Line,
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Bar,
  LineChart,
} from "recharts";
import { stats } from "./data";
import Header from "../component/Header";
import { revenueData } from "./data";
import { categoryData } from "./data";
import { vendorPerformanceData } from "./data";
import { clientGrowthData } from "./data";
import { vendors } from "./data";
import { products } from "./data";
import { clients } from "./data";
import { sidebarItems } from "./data";
import DataTable from "./DataTable";
import StatusBadge from "./StatusBadge";
interface CustomTooltipProps {
  active?: boolean;
  payload?: {
    name: string;
    value: number | string;
    color: string;
    dataKey?: string;
  }[];
  label?: string;
}
interface ActionButtonProps {
  icon: React.ElementType;
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  variant?: string;
}

interface Column<T> {
  key: keyof T;
  label: string;
  render?: (value: any, row: T) => React.ReactNode;
}


export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("stats");
  const [searchTerm, setSearchTerm] = useState("");

  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  const drawBarChart = (
    canvas: HTMLCanvasElement,
    data: { month: string; revenue: number; profit: number }[]
  ) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Chart dimensions
    const margin = { top: 40, right: 40, bottom: 60, left: 80 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Data processing
    const maxRevenue = Math.max(...data.map((d) => d.revenue));
    const maxProfit = Math.max(...data.map((d) => d.profit));
    const maxValue = Math.max(maxRevenue, maxProfit);

    const barWidth = chartWidth / (data.length * 2.5);
    const barSpacing = barWidth * 0.3;

    // Draw grid lines
    ctx.strokeStyle = "#374151";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = margin.top + (i * chartHeight) / 5;
      ctx.beginPath();
      ctx.moveTo(margin.left, y);
      ctx.lineTo(margin.left + chartWidth, y);
      ctx.stroke();
    }

    // Draw bars
    data.forEach((item, index) => {
      const x =
        margin.left + index * (barWidth * 2 + barSpacing * 3) + barSpacing;

      // Revenue bar
      const revenueHeight = (item.revenue / maxValue) * chartHeight;
      const revenueY = margin.top + chartHeight - revenueHeight;
      const revenueGradient = ctx.createLinearGradient(
        0,
        revenueY,
        0,
        revenueY + revenueHeight
      );
      revenueGradient.addColorStop(0, "#FFD700");
      revenueGradient.addColorStop(1, "#FFA500");

      ctx.fillStyle = revenueGradient;
      ctx.fillRect(x, revenueY, barWidth, revenueHeight);

      // Profit bar
      const profitHeight = (item.profit / maxValue) * chartHeight;
      const profitY = margin.top + chartHeight - profitHeight;
      const profitGradient = ctx.createLinearGradient(
        0,
        profitY,
        0,
        profitY + profitHeight
      );
      profitGradient.addColorStop(0, "#32CD32");
      profitGradient.addColorStop(1, "#228B22");

      ctx.fillStyle = profitGradient;
      ctx.fillRect(x + barWidth + barSpacing, profitY, barWidth, profitHeight);

      // Month label
      ctx.fillStyle = "#9CA3AF";
      ctx.font = "12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(item.month, x + barWidth, height - 20);
    });

    // Y-axis labels
    ctx.fillStyle = "#9CA3AF";
    ctx.font = "10px Arial";
    ctx.textAlign = "right";
    for (let i = 0; i <= 5; i++) {
      const value = (maxValue / 5) * (5 - i);
      const y = margin.top + (i * chartHeight) / 5 + 4;
      ctx.fillText(`${(value / 1000).toFixed(0)}k`, margin.left - 10, y);
    }

    // Legend
    ctx.fillStyle = "#FFD700";
    ctx.fillRect(margin.left, 20, 15, 15);
    ctx.fillStyle = "#9CA3AF";
    ctx.font = "12px Arial";
    ctx.textAlign = "left";
    ctx.fillText("Revenue", margin.left + 20, 32);

    ctx.fillStyle = "#32CD32";
    ctx.fillRect(margin.left + 100, 20, 15, 15);
    ctx.fillText("Profit", margin.left + 120, 32);
  };

  const drawPieChart = (
    canvas: HTMLCanvasElement,
    data: { name: string; value: number }[]
  ) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;

    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2 - 20;
    const radius = Math.min(width, height) / 3;

    const total = data.reduce((sum, item) => sum + item.value, 0);
    let currentAngle = -Math.PI / 2;

    const colors = ["#FFD700", "#32CD32", "#FF6B6B", "#4ECDC4", "#A55EEA"];

    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      const gradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        radius
      );
      gradient.addColorStop(0, colors[index]);
      gradient.addColorStop(1, colors[index] + "80");

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(
        centerX,
        centerY,
        radius,
        currentAngle,
        currentAngle + sliceAngle
      );
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
      ctx.strokeStyle = "#374151";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      const labelAngle = currentAngle + sliceAngle / 2;
      const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
      const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 12px Arial";
      ctx.textAlign = "center";
      ctx.fillText(`${item.value}%`, labelX, labelY);

      currentAngle += sliceAngle;
    });

    // Legend
    const legendY = height - 100;
    data.forEach((item, index) => {
      const legendX = 20 + index * 120;

      ctx.fillStyle = colors[index];
      ctx.fillRect(legendX, legendY, 15, 15);

      ctx.fillStyle = "#9CA3AF";
      ctx.font = "11px Arial";
      ctx.textAlign = "left";
      ctx.fillText(item.name, legendX + 20, legendY + 12);
    });
  };

  useEffect(() => {
    if (barChartRef.current) {
      drawBarChart(barChartRef.current, revenueData);
    }
    if (pieChartRef.current) {
      drawPieChart(pieChartRef.current, [
        { name: "North America", value: 35 },
        { name: "Europe", value: 28 },
        { name: "Asia Pacific", value: 22 },
        { name: "Latin America", value: 10 },
        { name: "Middle East & Africa", value: 5 },
      ]);
    }
  }, []);

  const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-yellow-500/30 rounded-lg p-3 shadow-lg">
          <p className="text-yellow-400 font-semibold">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}:{" "}
              {typeof entry.value === "number"
                ? entry.dataKey === "revenue" ||
                  entry.dataKey === "expenses" ||
                  entry.dataKey === "profit"
                  ? `${entry.value.toLocaleString()}`
                  : entry.value
                : entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const StatCard = ({ stat }: { stat: any }) => (
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-500/20 hover:border-yellow-500/40 transition-all duration-300 hover:transform hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-lg ${
            stat.positive ? "bg-green-500/20" : "bg-red-500/20"
          }`}
        >
          <stat.icon
            className={`w-6 h-6 ${
              stat.positive ? "text-green-400" : "text-red-400"
            }`}
          />
        </div>
        <span
          className={`text-sm font-medium ${
            stat.positive ? "text-green-400" : "text-red-400"
          }`}
        >
          {stat.change}
        </span>
      </div>
      <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
      <p className="text-gray-400 text-sm">{stat.title}</p>
    </div>
  );

  const ActionButton: React.FC<ActionButtonProps> = ({
    icon: Icon,
    label,
    onClick,
    variant = "default",
  }) => {
    return (
      <button
        onClick={onClick}
        className={`flex items-center gap-2 px-4 py-2 rounded ${
          variant === "danger"
            ? "bg-red-500 text-white"
            : "bg-blue-500 text-white"
        }`}
      >
        <Icon />
        <span>{label}</span>
      </button>
    );
  };
  <>
    <DataTable data={[]} columns={[]}></DataTable>
    <StatusBadge status={""}></StatusBadge>
  </>;

  const renderContent = () => {
    switch (activeSection) {
      case "stats":
        return (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <StatCard key={idx} stat={stat} />
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Revenue Trend Chart */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-500/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-yellow-400" />
                    Revenue Trend
                  </h3>
                  <div className="flex space-x-2">
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium">
                      6 Months
                    </span>
                  </div>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient
                        id="revenueGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#FFD700"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#FFD700"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="profitGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#32CD32"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#32CD32"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      content={
                        <CustomTooltip
                          active={undefined}
                          payload={undefined}
                          label={undefined}
                        />
                      }
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#FFD700"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#revenueGradient)"
                      name="Revenue"
                    />
                    <Area
                      type="monotone"
                      dataKey="profit"
                      stroke="#32CD32"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#profitGradient)"
                      name="Profit"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Product Categories Pie Chart */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-500/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-green-400" />
                    Product Categories
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Vendor Performance Bar Chart */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-500/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-yellow-400" />
                    Top Vendors Performance
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart
                    data={vendorPerformanceData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="name"
                      stroke="#9CA3AF"
                      angle={-45}
                      textAnchor="end"
                      height={80}
                      fontSize={12}
                    />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      content={
                        <CustomTooltip
                          active={undefined}
                          payload={undefined}
                          label={undefined}
                        />
                      }
                    />
                    <Legend />
                    <Bar
                      dataKey="orders"
                      fill="#FFD700"
                      name="Orders"
                      radius={[4, 4, 0, 0]}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="#32CD32"
                      name="Revenue ($)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Client Growth Line Chart */}
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-500/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <LineChart className="w-5 h-5 mr-2 text-green-400" />
                    Client Growth
                  </h3>
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={clientGrowthData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    {/* <XAxis dataKey="month" stroke="#9CA3AF" /> */}
                    {/* <YAxis stroke="#9CA3AF" /> */}
                    <Tooltip
                      content={
                        <CustomTooltip
                          active={undefined}
                          payload={undefined}
                          label={undefined}
                        />
                      }
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="newClients"
                      stroke="#FFD700"
                      strokeWidth={3}
                      dot={{ fill: "#FFD700", strokeWidth: 2, r: 6 }}
                      name="New Clients"
                    />
                    <Line
                      type="monotone"
                      dataKey="totalClients"
                      stroke="#32CD32"
                      strokeWidth={3}
                      dot={{ fill: "#32CD32", strokeWidth: 2, r: 6 }}
                      name="Total Clients"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-500/20">
              <h3 className="text-xl font-bold text-white mb-4">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-4">
                <ActionButton
                  icon={Plus}
                  onClick={() => {
                    console.log("Add Product clicked");
                  }}
                  label="Add Product"
                  variant="primary"
                />
                <ActionButton
                  icon={Users}
                  onClick={() => {
                    console.log("Add Product clicked");
                  }}
                  label="New Vendor"
                  variant="success"
                />
                <ActionButton
                  onClick={() => {
                    console.log("Add Product clicked");
                  }}
                  icon={Download}
                  label="Export Data"
                  variant="secondary"
                />
                <ActionButton
                  icon={Filter}
                  label="Filter Reports"
                  variant="secondary"
                  onClick={() => {
                    console.log("Add Product clicked");
                  }}
                />
              </div>
            </div>
          </div>
        );

      case "vendors":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">
                Vendor Management
              </h3>
              <ActionButton
                icon={Plus}
                label="Add Vendor"
                variant="primary"
                onClick={() => {
                  console.log("Add Product clicked");
                }}
              />
            </div>

            <div className="flex gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search vendors..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <ActionButton
                icon={Filter}
                label="Filter"
                variant="secondary"
                onClick={() => {
                  // Your action here, e.g., open a modal or navigate
                  console.log("Add Product clicked");
                }}
              />
            </div>

            <DataTable
              data={vendors}
              columns={[
                { key: "name", label: "Vendor Name" },
                { key: "email", label: "Email" },
                { key: "products", label: "Products" },
                {
                  key: "status",
                  label: "Status",
                  render: (status) => <StatusBadge status={String(status)} />,
                },
                { key: "revenue", label: "Revenue" },
              ]}
            />
          </div>
        );

      case "products":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">Product Catalog</h3>
              <ActionButton
                icon={Plus}
                label="Add Product"
                variant="primary"
                onClick={() => {
                  console.log("Add Product clicked");
                }}
              />
            </div>

            <DataTable
              data={products}
              columns={[
                { key: "name", label: "Product Name" },
                { key: "category", label: "Category" },
                { key: "price", label: "Price" },
                { key: "stock", label: "Stock" },
                { key: "vendor", label: "Vendor" },
              ]}
            />
          </div>
        );

      case "clients":
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">
                Client Management
              </h3>
              <ActionButton
                icon={Plus}
                label="Add Client"
                variant="primary"
                onClick={() => {
                  console.log("Add Product clicked");
                }}
              />
            </div>

            <DataTable
              data={clients}
              columns={[
                { key: "name", label: "Client Name" },
                { key: "email", label: "Email" },
                { key: "orders", label: "Orders" },
                { key: "totalSpent", label: "Total Spent" },
                {
                  key: "status",
                  label: "Status",
                  render: (status) => <StatusBadge status={String(status)} />,
                },
              ]}
            />
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-white">Settings</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-500/20">
                <h4 className="text-lg font-semibold text-white mb-4">
                  General Settings
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      defaultValue="Your Company"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
                      defaultValue="admin@company.com"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-yellow-500/20">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Notifications
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Email Notifications</span>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">SMS Alerts</span>
                    <input type="checkbox" className="toggle" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Push Notifications</span>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <ActionButton
                icon={Download}
                label="Save Settings"
                variant="success"
                onClick={() => {
                  console.log("Add Product clicked");
                }}
              />
              <ActionButton
                icon={Settings}
                label="Reset to Default"
                variant="secondary"
                onClick={() => {
                  console.log("Add Product clicked");
                }}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#111529] via-[#1a1f3a] to-[#111529]">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-gradient-to-b from-[#111529] to-[#0d1022] shadow-2xl h-screen">
          <div className="p-6">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">
                InnovaDash
              </h1>
              <div className="w-full h-1 bg-gradient-to-r from-yellow-400 to-green-400 rounded-full mt-2"></div>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg text-left transition-all duration-200 group ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-yellow-400 to-green-400 text-gray-900 font-semibold shadow-lg"
                      : "text-gray-300 hover:bg-yellow-500/10 hover:text-yellow-400"
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                  {activeSection === item.id && (
                    <div className="ml-auto w-2 h-2 bg-gray-900 rounded-full"></div>
                  )}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header */}
          <Header></Header>

          {/* Main Content Area */}
          <main className="p-8">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
}
