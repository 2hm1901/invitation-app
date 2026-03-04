# 🎓 Invitation App — Thiệp Mời Tốt Nghiệp

Ứng dụng tạo **thiệp mời tốt nghiệp cá nhân hóa** cho từng khách mời, với giao diện classic sang trọng và animation canvas độc đáo.

---

## ✨ Tính năng

- **Host** tạo sự kiện → nhận 2 link: link chia sẻ và link quản lý
- **Guest** mở link → nhập tên → xem thiệp được vẽ riêng → xác nhận tham dự hoặc gửi lời chúc → tải thiệp PNG
- **Dashboard** cho host xem danh sách khách tham dự và lời chúc theo thời gian thực
- Animation cây mọc (canvas) trong loading screen, thiệp vẽ bằng Canvas API độ phân giải cao
- Rate limiting chống spam tạo sự kiện

---

## 🏗 Tech Stack

| Layer | Công nghệ |
|---|---|
| Runtime | Node.js |
| Framework | Express |
| Database | SQLite (`better-sqlite3`) |
| Frontend | Vanilla HTML / CSS / JS |
| Deploy | PM2 + Nginx |

---

## 📁 Cấu trúc dự án

```
├── server/
│   ├── index.js              # Entry point, middleware, routes
│   ├── db/database.js        # Kết nối SQLite, khởi tạo schema
│   └── routes/
│       ├── events.js         # POST /api/events, GET /api/events/:id
│       ├── guests.js         # POST /api/events/:id/guests
│       └── admin.js          # GET /api/admin/:adminToken
├── public/
│   ├── index.html            # Trang tạo sự kiện (host)
│   ├── event.html            # Trang thiệp mời (guest)
│   └── admin.html            # Dashboard quản lý (host)
├── data/events.db            # SQLite DB (auto-generated)
├── deploy/
│   ├── nginx.conf            # Cấu hình Nginx reverse proxy
│   ├── ecosystem.config.js   # PM2 config
│   └── setup.sh              # Script cài đặt server
└── .env                      # Biến môi trường
```

---

## 🚀 Chạy local

### 1. Cài đặt

```bash
npm install
```

### 2. Cấu hình môi trường

```bash
# .env
PORT=3000
BASE_URL=http://localhost:3000
```

### 3. Khởi động

```bash
# Development (auto-reload)
npm run dev

# Production
npm start
```

Truy cập [http://localhost:3000](http://localhost:3000)

---

## 🔌 API Reference

### Events

| Method | Endpoint | Mô tả |
|---|---|---|
| `POST` | `/api/events` | Tạo sự kiện mới |
| `GET` | `/api/events/:id` | Lấy thông tin sự kiện |

**POST /api/events**
```json
// Request
{ "host_name": "Nguyễn Văn A", "event_time": "2025-07-25T08:00", "location": "Hội trường Chăm Pa" }

// Response 201
{ "publicUrl": "http://localhost:3000/e/:id", "adminUrl": "http://localhost:3000/manage/:adminToken" }
```

### Guests

| Method | Endpoint | Mô tả |
|---|---|---|
| `POST` | `/api/events/:id/guests` | Khách xác nhận |

```json
// Request
{ "name": "Trần Thị B", "status": "attending" }
// status: "attending" | "wish_only"
```

### Admin

| Method | Endpoint | Mô tả |
|---|---|---|
| `GET` | `/api/admin/:adminToken` | Dashboard data |

---

## 🗄 Database Schema

```sql
events (
  id TEXT PRIMARY KEY,         -- UUID
  admin_token TEXT UNIQUE,     -- UUID (link quản lý)
  host_name TEXT,
  event_time TEXT,
  location TEXT,
  created_at TEXT
)

guests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_id TEXT REFERENCES events(id) ON DELETE CASCADE,
  name TEXT,
  status TEXT CHECK(status IN ('attending', 'wish_only')),
  created_at TEXT
)
```

---

## 🌐 Deploy lên EC2

Xem hướng dẫn trong thư mục [`deploy/`](deploy/).

```bash
# Trên server
bash deploy/setup.sh
```

Cần cập nhật `BASE_URL` trong `.env` thành domain/IP thực của server trước khi chạy.

---

## 📸 Luồng sử dụng

```
Host → index.html → POST /api/events → nhận publicUrl + adminUrl
                                              │
                     chia sẻ publicUrl ────────▼
                                         Guest → event.html
                                             → nhập tên
                                             → xem thiệp canvas
                                             → xác nhận tham dự
                                              │
Host → adminUrl → admin.html ────────────────▼
               → xem danh sách khách + stats
```
