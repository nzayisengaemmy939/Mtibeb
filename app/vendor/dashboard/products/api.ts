import axios from "axios";
import toast from "react-hot-toast";

export interface Product {
  id: string;
  Name: string;
  Price: number;
  stock: number;
  rating: number;
  sales: number;
  category: string;
  
ImageURL
?: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get<Product[]>(
      `${process.env.NEXT_PUBLIC_API_URL}/vendor/my-products`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
console.log(response.data,'data to test if working')
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};

export const editProduct = async (productId: string, updatedData: FormData): Promise<Product | null> => {
  try {
    const token = localStorage.getItem("token");
    console.log(productId,'product id')
    const response = await axios.put<Product>(
      `${process.env.NEXT_PUBLIC_API_URL}/vendor/edit-product/${productId}`,
      updatedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success('Product updated successfully');
    return response.data;
  } catch (error) {
    toast.error('failed to update product');
    console.error('Failed to edit product:', error);
    return null;
  }
};

export const deleteProduct = async (id: string | number): Promise<void> => {
  try {
    const token = localStorage.getItem("token"); // Adjust if you store it elsewhere
    console.log(id,'id to delete')
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/vendor/remove-product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status >= 200 && response.status < 300) {
      toast.success("Product deleted successfully");
    } else {
      toast.error(`Failed to delete product with id ${id}`);
    }
  } catch (error) {
    console.error("Delete product error:", error);
    toast.error("Something went wrong while deleting the product");
    throw error;
  }
};

