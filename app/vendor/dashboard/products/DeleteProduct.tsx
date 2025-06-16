import toast from "react-hot-toast";
import { deleteProduct } from "./api";
import { useState } from "react";

type DeleteProductProps = {
  onClose: () => void;
  onConfirm: (productId: string) => void;
  product?: {
    ID: string;
    Name: string;
    Category: string;
    Material: string;
    Price: number;
  };
};

export default function DeleteProduct({ onClose, onConfirm, product }: DeleteProductProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  // Provide default values if product is undefined
  const productData = {
    ID: product?.ID || "unknown",
    Name: product?.Name || "Unknown Product",
    Category: product?.Category || "Unknown Category",
    Material: product?.Material || "Unknown Material",
    Price: product?.Price || 0,
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    
if (product) {
  try {
    await deleteProduct(product.ID);
    onConfirm(productData.ID);
    onClose();
  } catch (error) {
    console.error("Delete failed:", error);
    toast.error("Failed to delete product. Please try again.");
  } finally {
    setIsDeleting(false);
  }
}
    }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(26, 31, 58, 0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(4px)",
        zIndex: 9999,
      }}
    >
      <div
        style={{
          backgroundColor: "#1a1f3a",
          padding: "2rem",
          borderRadius: "16px",
          width: "450px",
          maxWidth: "90%",
          border: "2px solid #ef4444",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <div
            style={{
              width: "60px",
              height: "60px",
              backgroundColor: "#fecaca",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem",
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18" />
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
              <path d="M8 6V4c0-1 1-2 2-2h4c0 1 1 2 2 2v2" />
              <line x1="10" y1="11" x2="10" y2="17" />
              <line x1="14" y1="11" x2="14" y2="17" />
            </svg>
          </div>
          
          <h2 
            style={{ 
              fontSize: "1.5rem", 
              marginBottom: "0.5rem", 
              color: "#ef4444",
              fontWeight: "700",
              letterSpacing: "0.5px"
            }}
          >
            Delete Product
          </h2>
          
          <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: "1.5" }}>
            Are you sure you want to delete this product? This action cannot be undone.
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#374151",
            padding: "1.25rem",
            borderRadius: "12px",
            border: "1px solid #4b5563",
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ marginBottom: "0.75rem" }}>
            <span style={{ color: "#fbbf24", fontWeight: "600", fontSize: "0.9rem" }}>
              Product Name:
            </span>
            <span style={{ color: "#f9fafb", marginLeft: "0.5rem", fontSize: "0.9rem" }}>
              {productData.Name}
            </span>
          </div>
          
          <div style={{ marginBottom: "0.75rem" }}>
            <span style={{ color: "#fbbf24", fontWeight: "600", fontSize: "0.9rem" }}>
              Category:
            </span>
            <span style={{ color: "#f9fafb", marginLeft: "0.5rem", fontSize: "0.9rem" }}>
              {productData.Category}
            </span>
          </div>
          
          <div style={{ marginBottom: "0.75rem" }}>
            <span style={{ color: "#fbbf24", fontWeight: "600", fontSize: "0.9rem" }}>
              Material:
            </span>
            <span style={{ color: "#f9fafb", marginLeft: "0.5rem", fontSize: "0.9rem" }}>
              {productData.Material}
            </span>
          </div>
          
          <div>
            <span style={{ color: "#fbbf24", fontWeight: "600", fontSize: "0.9rem" }}>
              Price:
            </span>
            <span style={{ color: "#f9fafb", marginLeft: "0.5rem", fontSize: "0.9rem" }}>
              ${productData.Price}
            </span>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
          <button 
            type="button" 
            onClick={onClose}
            disabled={isDeleting}
            style={{ 
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              border: "2px solid #6b7280",
              backgroundColor: "transparent",
              color: isDeleting ? "#4b5563" : "#9ca3af",
              fontSize: "0.9rem",
              fontWeight: "600",
              cursor: isDeleting ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              opacity: isDeleting ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isDeleting) {
                e.currentTarget.style.backgroundColor = "#6b7280";
                e.currentTarget.style.color = "#f9fafb";
              }
            }}
            onMouseLeave={(e) => {
              if (!isDeleting) {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#9ca3af";
              }
            }}
          >
            Cancel
          </button>
          
          <button 
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            style={{ 
              padding: "0.75rem 1.5rem",
              borderRadius: "8px",
              border: "2px solid #ef4444",
              backgroundColor: "#ef4444",
              color: "#ffffff",
              fontSize: "0.9rem",
              fontWeight: "700",
              cursor: isDeleting ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              opacity: isDeleting ? 0.7 : 1,
            }}
            onMouseEnter={(e) => {
              if (!isDeleting) {
                e.currentTarget.style.backgroundColor = "#dc2626";
                e.currentTarget.style.borderColor = "#dc2626";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 8px 12px -1px rgba(0, 0, 0, 0.15)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isDeleting) {
                e.currentTarget.style.backgroundColor = "#ef4444";
                e.currentTarget.style.borderColor = "#ef4444";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
              }
            }}
          >
            {isDeleting && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  animation: "spin 1s linear infinite",
                }}
              >
                <path d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
            )}
            {isDeleting ? "Deleting..." : "Delete Product"}
          </button>
        </div>
      </div>
      
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}