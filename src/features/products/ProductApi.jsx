import { axiosi } from "../../config/axios";

export const addProduct = async (data) => {
  try {
    const res = await axiosi.post("/products", data);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const fetchProducts = async (params) => {
  let queryString = "";

  const { filters = {}, pagination = {}, sort = {}, search } = params;

  // 🔹 Filtres de texte/liste
  if (filters.brand) {
    filters.brand.forEach((brand) => {
      queryString += `brand=${encodeURIComponent(brand)}&`;
    });
  }

  if (filters.category) {
    filters.category.forEach((category) => {
      queryString += `category=${encodeURIComponent(category)}&`;
    });
  }

  if (filters.subcategory) {
    filters.subcategory.forEach((subcategory) => {
      queryString += `subcategory=${encodeURIComponent(subcategory)}&`;
    });
  }

  // 🔹 Filtres numériques
  if (filters.minPrice) {
    queryString += `minPrice=${encodeURIComponent(filters.minPrice)}&`;
  }

  if (filters.maxPrice) {
    queryString += `maxPrice=${encodeURIComponent(filters.maxPrice)}&`;
  }

  // 🔹 Filtres booléens
  if (filters.isLiquid) {
    queryString += `isLiquid=${filters.isLiquid}&`;
  }

  // 🔹 Pagination
  if (pagination.page) queryString += `page=${pagination.page}&`;
  if (pagination.limit) queryString += `limit=${pagination.limit}&`;

  // 🔹 Tri
  if (sort?.sort) queryString += `sort=${sort.sort}&`;
  if (sort?.order) queryString += `order=${sort.order}&`;

  // 🔹 Recherche
  if (search) queryString += `search=${encodeURIComponent(search)}&`;

  try {
    console.log("✅ QueryString générée:", queryString);
    const res = await axiosi.get(`/products?${queryString}`);
    const totalResults = res.headers["x-total-count"] || 0;

    return { data: res.data, totalResults };
  } catch (error) {
    console.error("❌ Erreur lors du fetchProducts:", error);
    throw error.response?.data || error;
  }
};


export const fetchProductById = async (id) => {
  try {
    const res = await axiosi.get(`/products/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const updateProductById = async (update) => {
  try {
    const res = await axiosi.patch(`/products/${update._id}`, update);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const undeleteProductById = async (id) => {
  try {
    const res = await axiosi.patch(`/products/undelete/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
export const deleteProductById = async (id) => {
  try {
    const res = await axiosi.delete(`/products/${id}`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
