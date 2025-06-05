export const apiConfig = {
  BASE_URL: "https://aqa-course-project.app",
  ENDPOINTS: {
    CUSTOMERS: "/api/customers",
    CUSTOMER_BY_ID: (id: string) => `/api/customers/${id}`,
    LOGIN: "/api/login",
    METRIKS: "/api/metrics",
    PRODUCTS_BY_ID: (id: string) => `/api/products/${id}`,
    PRODUCTS: "//api/products"
  },
} as const;
