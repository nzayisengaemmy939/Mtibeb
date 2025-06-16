import axios from "axios";
export interface Product {
  id: string;
  Name: string;
  Price: number;
  stock: number;
  rating: number;
  sales: number;
  category: string
  Material:string
  
ImageURL
?: string;
}

export const allProducts = async (): Promise<Product[]> => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/furniture`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data, 'response data to test if working');

    // Return the inner `data` array
    return response.data.data ?? [];
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};
