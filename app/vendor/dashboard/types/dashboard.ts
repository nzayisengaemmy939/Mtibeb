export interface VendorStats {
  totalProducts: number;
  totalSales: number;
  averageRating: number;
  pendingOrders: number;
}

export interface Product {
  id: string;
  Name: string;
  Price: number;
  stock: number;
  rating: number;
  sales: number;
 
ImageURL
: string;
}

export interface RecentOrder {
  id: string;
  customer: string;
  amount: number;
  status: string;
  date: string;
}

export interface SidebarItem {
  id: string;
  name: string;
  icon: React.ElementType;
  href: string; // <-- add this
}
