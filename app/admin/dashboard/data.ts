 import {
  BarChart3,
  Users,
  Package,
  Settings,
  TrendingUp,
  UserCheck,
  Activity,
  Plus,
  Search,
  Filter,
  Download,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
 
export  const stats = [
    {
      title: "Total Revenue",
      value: "$124,563",
      change: "+12.5%",
      icon: TrendingUp,
      positive: true,
    },
    {
      title: "Active Vendors",
      value: "48",
      change: "+3",
      icon: Users,
      positive: true,
    },
    {
      title: "Total Products",
      value: "1,247",
      change: "+24",
      icon: Package,
      positive: true,
    },
    {
      title: "Active Clients",
      value: "892",
      change: "-2",
      icon: UserCheck,
      positive: false,
    },
  ];

  export const revenueData = [
    { month: "Jan", revenue: 65000, expenses: 28000, profit: 37000 },
    { month: "Feb", revenue: 72000, expenses: 31000, profit: 41000 },
    { month: "Mar", revenue: 68000, expenses: 29000, profit: 39000 },
    { month: "Apr", revenue: 85000, expenses: 35000, profit: 50000 },
    { month: "May", revenue: 92000, expenses: 38000, profit: 54000 },
    { month: "Jun", revenue: 124563, expenses: 42000, profit: 82563 },
  ];

   export const categoryData = [
    { name: "Electronics", value: 45, color: "#FFD700" },
    { name: "Furniture", value: 25, color: "#32CD32" },
    { name: "Appliances", value: 20, color: "#FF6B6B" },
    { name: "Clothing", value: 10, color: "#4ECDC4" },
  ];


 export  const vendorPerformanceData = [
    { name: "Tech Solutions Inc", orders: 85, revenue: 45230 },
    { name: "Green Supply Co", orders: 65, revenue: 32100 },
    { name: "Digital Dynamics", orders: 42, revenue: 18900 },
    { name: "Premium Parts Ltd", orders: 98, revenue: 67800 },
    { name: "Smart Devices Co", orders: 73, revenue: 54200 },
  ];

  export  const clientGrowthData = [
    { month: "Jan", newClients: 15, totalClients: 750 },
    { month: "Feb", newClients: 22, totalClients: 772 },
    { month: "Mar", newClients: 18, totalClients: 790 },
    { month: "Apr", newClients: 28, totalClients: 818 },
    { month: "May", newClients: 35, totalClients: 853 },
    { month: "Jun", newClients: 39, totalClients: 892 },
  ];

   export const vendors = [
    {
      id: 1,
      name: "Tech Solutions Inc",
      email: "contact@techsol.com",
      products: 23,
      status: "Active",
      revenue: "$45,230",
    },
    {
      id: 2,
      name: "Green Supply Co",
      email: "info@greensupply.com",
      products: 12,
      status: "Active",
      revenue: "$32,100",
    },
    {
      id: 3,
      name: "Digital Dynamics",
      email: "hello@digitaldyn.com",
      products: 8,
      status: "Pending",
      revenue: "$18,900",
    },
    {
      id: 4,
      name: "Premium Parts Ltd",
      email: "sales@premiumparts.com",
      products: 35,
      status: "Active",
      revenue: "$67,800",
    },
  ];

 export  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      category: "Electronics",
      price: "$199",
      stock: 45,
      vendor: "Tech Solutions Inc",
    },
    {
      id: 2,
      name: "Ergonomic Chair",
      category: "Furniture",
      price: "$299",
      stock: 12,
      vendor: "Green Supply Co",
    },
    {
      id: 3,
      name: "Smart Watch",
      category: "Electronics",
      price: "$399",
      stock: 28,
      vendor: "Digital Dynamics",
    },
    {
      id: 4,
      name: "Coffee Machine",
      category: "Appliances",
      price: "$599",
      stock: 8,
      vendor: "Premium Parts Ltd",
    },
  ];
  

  export const clients = [
      {
        id: 1,
        name: "ABC Corporation",
        email: "admin@abccorp.com",
        orders: 15,
        totalSpent: "$12,450",
        status: "Premium",
      },
      {
        id: 2,
        name: "XYZ Enterprises",
        email: "contact@xyz.com",
        orders: 8,
        totalSpent: "$8,900",
        status: "Regular",
      },
      {
        id: 3,
        name: "Global Tech",
        email: "info@globaltech.com",
        orders: 22,
        totalSpent: "$18,750",
        status: "Premium",
      },
      {
        id: 4,
        name: "StartUp Hub",
        email: "hello@startuphub.com",
        orders: 5,
        totalSpent: "$3,200",
        status: "New",
      },
    ];
  
   export  const sidebarItems = [
      { id: "stats", label: "Statistics", icon: Activity },
      { id: "vendors", label: "Vendors", icon: Users },
      { id: "products", label: "Products", icon: Package },
      { id: "clients", label: "Clients", icon: UserCheck },
      { id: "settings", label: "Settings", icon: Settings },
    ];