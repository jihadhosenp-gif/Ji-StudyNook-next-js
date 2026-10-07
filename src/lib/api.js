import axios from "axios";
import mockAdapter from "./mockAdapter";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "";
export const IS_DEMO = !baseURL;

const api = axios.create({
  baseURL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  ...(IS_DEMO ? { adapter: mockAdapter } : {}),
});

export const roomsApi = {
  list: (params) => api.get("/api/rooms", { params }).then((r) => r.data.rooms),
  get: (id) => api.get(`/api/rooms/${id}`).then((r) => r.data.room),
  create: (data) => api.post("/api/rooms", data).then((r) => r.data.room),
  update: (id, data) => api.put(`/api/rooms/${id}`, data).then((r) => r.data.room),
  remove: (id) => api.delete(`/api/rooms/${id}`),
};

export const bookingsApi = {
  create: (data) => api.post("/api/bookings", data).then((r) => r.data.booking),
  mine: () => api.get("/api/bookings/my").then((r) => r.data.bookings),
  cancel: (id) => api.patch(`/api/bookings/${id}/cancel`).then((r) => r.data.booking),
};

export default api;