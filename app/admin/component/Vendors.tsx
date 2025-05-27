import React from 'react'

const Vendors = () => {
    
  return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-white">
                Vendor Management
              </h3>
              <ActionButton icon={Plus} label="Add Vendor" variant="primary" onClick={undefined} />
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
              <ActionButton icon={Filter} label="Filter" variant="secondary" />
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
                  render: (status) => <StatusBadge status={status} />,
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
              <ActionButton icon={Plus} label="Add Product" variant="primary" />
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

}

export default Vendors
