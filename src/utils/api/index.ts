import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// ─── Request interceptor: inject Bearer token if available ──────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ggs_access_token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// ─── Response interceptor: auto-refresh on 401 ───────────────────────────────
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;
    // If 401 and not already retried and not a refresh request itself
    if (
      error.response?.status === 401 &&
      !original._retry &&
      !original.url?.includes("/auth/refresh") &&
      !original.url?.includes("/auth/login")
    ) {
      original._retry = true;
      try {
        const res = await api.post("/api/auth/refresh");
        const newToken = res.data?.accessToken || res.data?.data?.accessToken;
        if (newToken) {
          localStorage.setItem("ggs_access_token", newToken);
          original.headers["Authorization"] = `Bearer ${newToken}`;
          return api(original);
        }
      } catch {
        // Refresh failed → clear session
        localStorage.removeItem("ggs_access_token");
        localStorage.removeItem("ggs_user");
      }
    }
    return Promise.reject(error);
  }
);

// ─── Exported API helpers ────────────────────────────────────────────────────

// AUTH
export const authApi = {
  // `email` is sent too for compatibility with a backend process that has not
  // yet been restarted after the identifier (email/NIS/NISN) update.
  login: (data: { identifier: string; password: string }) => api.post("/api/auth/login", {
    ...data,
    email: data.identifier,
  }),
  register: (data: { name: string; email: string; password: string; role: string }) =>
    api.post("/api/auth/register", data),
  refresh: () => api.post("/api/auth/refresh"),
  logout: () => api.post("/api/auth/logout"),
  logoutAll: () => api.post("/api/auth/logout-all"),
  me: () => api.get("/api/auth/me"),
};

// USERS (manajemen akun — via /api/auth/users)
export const usersApi = {
  getAll: () => api.get("/api/auth/users"),
  create: (data: { name: string; email: string; password?: string; role: string }) =>
    api.post("/api/auth/users", data),
  update: (id: string | number, data: { name?: string; email?: string; password?: string; role: string }) =>
    api.put(`/api/auth/users/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/auth/users/${id}`),
};

// STUDENTS
export const studentsApi = {
  getAll: () => api.get("/api/students"),
  getMe: () => api.get("/api/students/me"),
  getById: (id: string | number) => api.get(`/api/students/${id}`),
  create: (data: object) => api.post("/api/students", data),
  update: (id: string | number, data: object) => api.put(`/api/students/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/students/${id}`),
};

// TEACHERS
export const teachersApi = {
  getAll: () => api.get("/api/teachers"),
  getById: (id: string | number) => api.get(`/api/teachers/${id}`),
  create: (data: object) => api.post("/api/teachers", data),
  update: (id: string | number, data: object) => api.put(`/api/teachers/${id}`, data),
  assignHomeroom: (id: string | number, data: { is_homeroom: boolean; homeroom_class?: string }) =>
    api.put(`/api/teachers/${id}/homeroom`, data),
  delete: (id: string | number) => api.delete(`/api/teachers/${id}`),
};

// BOOKS & READING LOGS (Drive Library)
export const booksApi = {
  getAll: () => api.get("/api/library/books"),
  getById: (id: string | number) => api.get(`/api/library/books/${id}`),
  create: (data: object) => api.post("/api/library/books", data),
  update: (id: string | number, data: object) => api.put(`/api/library/books/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/library/books/${id}`),
};

export const readingLogsApi = {
  getAll: (params?: object) => api.get("/api/library/reading-logs", { params }),
  getMe: () => api.get("/api/library/reading-logs/me"),
  createMine: (data: object) => api.post("/api/library/reading-logs/me", data),
  updateMine: (id: string | number, data: object) => api.put(`/api/library/reading-logs/me/${id}`, data),
  getById: (id: string | number) => api.get(`/api/library/reading-logs/${id}`),
  create: (data: object) => api.post("/api/library/reading-logs", data),
  update: (id: string | number, data: object) => api.put(`/api/library/reading-logs/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/library/reading-logs/${id}`),
};

// SUBJECTS
export const subjectsApi = {
  getAll: () => api.get("/api/subjects"),
  getById: (id: string | number) => api.get(`/api/subjects/${id}`),
  create: (data: object) => api.post("/api/subjects", data),
  update: (id: string | number, data: object) => api.put(`/api/subjects/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/subjects/${id}`),
};

// CLASSES (Master Kelas)
export const classesApi = {
  getAll: () => api.get("/api/classes"),
  create: (data: object) => api.post("/api/classes", data),
  update: (id: string | number, data: object) => api.put(`/api/classes/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/classes/${id}`),
};

// SCHEDULES
export const schedulesApi = {
  getAll: () => api.get("/api/schedules"),
  getMe: () => api.get("/api/schedules/me"),
  getById: (id: string | number) => api.get(`/api/schedules/${id}`),
  create: (data: object) => api.post("/api/schedules", data),
  update: (id: string | number, data: object) => api.put(`/api/schedules/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/schedules/${id}`),
};

// ATTENDANCE
export const attendanceApi = {
  getAll: () => api.get("/api/attendance"),
  getMe: () => api.get("/api/attendance/me"),
  record: (data: object | object[]) => api.post("/api/attendance", data),
  delete: (id: string | number) => api.delete(`/api/attendance/${id}`),
};

// GRADES
export const gradesApi = {
  getAll: () => api.get("/api/grades"),
  getMe: () => api.get("/api/grades/me"),
  getById: (id: string | number) => api.get(`/api/grades/${id}`),
  createOrUpdate: (data: object) => api.post("/api/grades", data),
  update: (id: string | number, data: object) => api.put(`/api/grades/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/grades/${id}`),
};

// COUNSELING / BK
export const counselingApi = {
  getAll: () => api.get("/api/counseling"),
  create: (data: object) => api.post("/api/counseling", data),
  update: (id: string | number, data: object) => api.put(`/api/counseling/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/counseling/${id}`),
};

// ACHIEVEMENTS / PRESTASI
export const achievementsApi = {
  getAll: () => api.get("/api/achievements"),
  create: (data: object) => api.post("/api/achievements", data),
  update: (id: string | number, data: object) => api.put(`/api/achievements/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/achievements/${id}`),
};

// ANNOUNCEMENTS / PENGUMUMAN
export const announcementsApi = {
  getAll: () => api.get("/api/announcements"),
  create: (data: object) => api.post("/api/announcements", data),
  update: (id: string | number, data: object) => api.put(`/api/announcements/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/announcements/${id}`),
};

// ARCHIVES / ARSIP
export const archivesApi = {
  getAll: () => api.get("/api/archives"),
  create: (data: object) => api.post("/api/archives", data),
  update: (id: string | number, data: object) => api.put(`/api/archives/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/archives/${id}`),
};

// SETTINGS
export const settingsApi = {
  getAll: () => api.get("/api/settings"),
  update: (data: object) => api.put("/api/settings", data),
};

// EXTRACURRICULAR
export const extracurricularApi = {
  getAll: () => api.get("/api/extracurricular"),
  create: (data: object) => api.post("/api/extracurricular", data),
  update: (id: string | number, data: object) => api.put(`/api/extracurricular/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/extracurricular/${id}`),
  getStudents: () => api.get("/api/extracurricular-students"),
  registerStudent: (data: object) => api.post("/api/extracurricular-students", data),
  removeStudent: (id: string | number) => api.delete(`/api/extracurricular-students/${id}`),
};

// CALENDAR EVENTS
export const calendarEventsApi = {
  getAll: () => api.get("/api/calendar-events"),
  create: (data: object) => api.post("/api/calendar-events", data),
  update: (id: string | number, data: object) => api.put(`/api/calendar-events/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/calendar-events/${id}`),
};

// NEWS CMS
export const newsApi = {
  getAll: () => api.get("/api/news"),
  getById: (id: string | number) => api.get(`/api/news/${id}`),
  create: (data: object) => api.post("/api/news", data),
  update: (id: string | number, data: object) => api.put(`/api/news/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/news/${id}`),
};

// PPDB
export const ppdbApi = {
  getAll: () => api.get("/api/ppdb"),
  create: (data: object) => api.post("/api/ppdb", data),
  update: (id: string | number, data: object) => api.put(`/api/ppdb/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/ppdb/${id}`),
};

// INVENTORY / SAPRAS
export const inventoryApi = {
  getAll: () => api.get("/api/inventory"),
  create: (data: object) => api.post("/api/inventory", data),
  update: (id: string | number, data: object) => api.put(`/api/inventory/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/inventory/${id}`),
};

// REPORTS / DASHBOARD STATS
export const reportsApi = {
  getDashboard: () => api.get("/api/reports/dashboard"),
};

// BACKUP
export const backupApi = {
  create: () => api.post("/api/backup"),
};

// LESSON PLANS
export const lessonPlansApi = {
  getAll: () => api.get("/api/lesson-plans"),
  getById: (id: string | number) => api.get(`/api/lesson-plans/${id}`),
  create: (data: object) => api.post("/api/lesson-plans", data),
  update: (id: string | number, data: object) => api.put(`/api/lesson-plans/${id}`, data),
  delete: (id: string | number) => api.delete(`/api/lesson-plans/${id}`),
};

// Legacy export — kept so older imports still work
export const API_JWT = api;

export default api;
