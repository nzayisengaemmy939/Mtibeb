import { useEffect, useState } from "react";
import { editProduct } from "./api";

type EditProductProps = {
  onClose: () => void;
  product: {
    ID?: string;
    Name: string;
    Category: string;
    Material: string;
    Price: number;
  };
};

export default function EditProduct({ onClose, product }: EditProductProps) {
  const [formData, setFormData] = useState({
    image: null as File | null,
    Name: "",
    Category: "",
    Material: "",
    Price: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        image: null,
        Name: product.Name || "",
        Category: product.Category || "",
        Material: product.Material || "",
        Price: product.Price?.toString() || "",
      });
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const form = new FormData();
  if (formData.image) form.append("image", formData.image);
 
  form.append("Name", formData.Name);
  form.append("Category", formData.Category);
  form.append("Material", formData.Material);
  form.append("Price", String(formData.Price)); 

  console.log("Submitting form data:", Object.fromEntries(form.entries()));

  if (!product.ID) {
    console.error("Product ID is missing!");
    return;
  }

  try {
    await editProduct(product.ID, form); 
    onClose(); 
  } catch (error) {
    console.error("Edit product failed:", error);
  }
};



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
          border: "2px solid #fbbf24",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
      >
        <h2 
          style={{ 
            fontSize: "1.5rem", 
            marginBottom: "1.5rem", 
            color: "#fbbf24",
            fontWeight: "700",
            textAlign: "center",
            letterSpacing: "0.5px"
          }}
        >
          Edit Product
        </h2>
        
        <div onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label 
              htmlFor="image" 
              style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: "#fbbf24", 
                fontWeight: "600",
                fontSize: "0.9rem"
              }}
            >
              Product Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "2px solid #374151",
                backgroundColor: "#374151",
                color: "#f9fafb",
                fontSize: "0.9rem",
                transition: "all 0.2s ease"
              }}
            />
          </div>

          <div>
            <label 
              htmlFor="name" 
              style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: "#fbbf24", 
                fontWeight: "600",
                fontSize: "0.9rem"
              }}
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.Name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "2px solid #374151",
                backgroundColor: "#374151",
                color: "#f9fafb",
                fontSize: "0.9rem",
                transition: "all 0.2s ease",
                outline: "none"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#fbbf24";
                e.target.style.boxShadow = "0 0 0 3px rgba(251, 191, 36, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#374151";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div>
            <label 
              htmlFor="category" 
              style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: "#fbbf24", 
                fontWeight: "600",
                fontSize: "0.9rem"
              }}
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.Category}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "2px solid #374151",
                backgroundColor: "#374151",
                color: "#f9fafb",
                fontSize: "0.9rem",
                transition: "all 0.2s ease",
                outline: "none"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#fbbf24";
                e.target.style.boxShadow = "0 0 0 3px rgba(251, 191, 36, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#374151";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div>
            <label 
              htmlFor="material" 
              style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: "#fbbf24", 
                fontWeight: "600",
                fontSize: "0.9rem"
              }}
            >
              Material
            </label>
            <input
              type="text"
              id="material"
              name="material"
              value={formData.Material}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "2px solid #374151",
                backgroundColor: "#374151",
                color: "#f9fafb",
                fontSize: "0.9rem",
                transition: "all 0.2s ease",
                outline: "none"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#fbbf24";
                e.target.style.boxShadow = "0 0 0 3px rgba(251, 191, 36, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#374151";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div>
            <label 
              htmlFor="price" 
              style={{ 
                display: "block", 
                marginBottom: "0.5rem", 
                color: "#fbbf24", 
                fontWeight: "600",
                fontSize: "0.9rem"
              }}
            >
              Price ($)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.Price}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "8px",
                border: "2px solid #374151",
                backgroundColor: "#374151",
                color: "#f9fafb",
                fontSize: "0.9rem",
                transition: "all 0.2s ease",
                outline: "none"
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "#fbbf24";
                e.target.style.boxShadow = "0 0 0 3px rgba(251, 191, 36, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#374151";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
            <button 
              type="button" 
              onClick={onClose} 
              style={{ 
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                border: "2px solid #6b7280",
                backgroundColor: "transparent",
                color: "#9ca3af",
                fontSize: "0.9rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#6b7280";
                e.currentTarget.style.color = "#f9fafb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "#9ca3af";
              }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              onClick={handleSubmit}
              style={{ 
                padding: "0.75rem 1.5rem",
                borderRadius: "8px",
                border: "2px solid #fbbf24",
                backgroundColor: "#fbbf24",
                color: "#1a1f3a",
                fontSize: "0.9rem",
                fontWeight: "700",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f59e0b";
                e.currentTarget.style.borderColor = "#f59e0b";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 8px 12px -1px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#fbbf24";
                e.currentTarget.style.borderColor = "#fbbf24";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 6px -1px rgba(0, 0, 0, 0.1)";
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}