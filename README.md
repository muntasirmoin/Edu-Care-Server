<h1 align="center">📖 Edu Care 📖 </h1>
<h2 align="center">🚀 Edu Care API Server 🚀</h2>
<h3 align="center">Develop Edu Care course enrollment System using Express, TypeScript, and MongoDB. </h3>

<p align="center">
  Edu Care delivers a clean, modern learning marketplace: discover courses, inspect details, enroll , and track learning. The app features authentication with multi‑role permissions, responsive UI, analytics dashboards, and a purchase flow.

</p>

---

**Vercel Deploy Link**

- Backend Deploy

```bash
https://edu-care-server-ten.vercel.app
```

- Frontend Deploy

```bash
https://edu-care-client-flax.vercel.app
```

---

**Github Code Link**

- Backend

```bash
https://github.com/muntasirmoin/Edu-Care-Server.git
```

- Frontend

```bash
https://github.com/muntasirmoin/Edu-Care-Client.git
```

---

# Edu Care API Reference 🚀

This document lists all API endpoints available in the EduCare Course Enrollment System.

---

## **1. Authentication Routes** 🔑 (`/api/auth`)

| Method | Endpoint    | Description                   | Access |
| ------ | ----------- | ----------------------------- | ------ |
| POST   | `/register` | Create a new user             | Public |
| POST   | `/login`    | Login with email and password | Public |
| POST   | `/logout`   | Logout user                   | Public |

---

## **2. User Routes** 👤 (`/api/user`)

| Method | Endpoint | Description                     | Access     |
| ------ | -------- | ------------------------------- | ---------- |
| GET    | `/`      | Get all users                   | ADMIN only |
| PATCH  | `/:id`   | Update user info                | ADMIN/USER |
| GET    | `/me`    | Get current logged-in user info | ADMIN/USER |

---

## **3. Course Routes** 📚 (`/api/course`)

| Method | Endpoint | Description          | Access |
| ------ | -------- | -------------------- | ------ |
| GET    | `/`      | Get all courses      | Public |
| GET    | `/:id`   | Get course by ID     | Public |
| POST   | `/`      | Create a new course  | ADMIN  |
| PATCH  | `/:id`   | Update course info   | ADMIN  |
| DELETE | `/:id`   | Soft delete a course | ADMIN  |

---

## **4. Cart Routes** 🛒 (`/api/cart`)

| Method | Endpoint    | Description                         | Access |
| ------ | ----------- | ----------------------------------- | ------ |
| POST   | `/`         | Add a course to cart                | USER   |
| POST   | `/checkout` | Checkout cart                       | USER   |
| GET    | `/`         | Get all cart items for current user | USER   |
| DELETE | `/:id`      | Remove an item from cart            | USER   |

---

## **5. Enrollment Routes** 🎓 (`/api/enrollment`)

| Method | Endpoint          | Description                       | Access     |
| ------ | ----------------- | --------------------------------- | ---------- |
| GET    | `/my-enrollments` | Get enrollments of logged-in user | USER/ADMIN |
| GET    | `/`               | Get all enrollments               | ADMIN      |
| GET    | `/:id`            | Get single enrollment by ID       | ADMIN      |
| POST   | `/`               | Create a new enrollment           | USER       |
| DELETE | `/:id`            | Soft delete an enrollment         | ADMIN      |

---

## Features

### 1. Authentication & Multi‑Role Access

- Email/password authentication using **JWT access + refresh tokens**.
- Roles: **ADMIN** and **USER (Student)**.
- **Route guards**, component-level permissions, and **RBAC middleware** for secure access control.

### 2. Course Management

- **Admin CRUD operations** for courses.

### 3. Course Enrollment

- Add courses to **Cart**.
- Proceed to **Checkout**.

### 4. My Enrollments Page

- Users can view all their **enrolled courses**.
- Track recent activity.

---

## Dashboards & Analytics

### Admin Dashboard

- Total **users**, **courses**, and **enrollments**.
- Quick overview of platform activity.

### User Navbar

- List of **enrolled courses**.
- **Quick access** to courses.

## 🧰 Tech Stack

- 🔲 **Node.js**
- 🛠 **TypeScript**
- 🚀 **Express**
- 🗄 **MongoDB**
- 🧰 **Mongoose**
- 🛡 **Passport.js**
- 🪪 **JWT (JSON Web Token)**
- 🔐 **BcryptJS**
- 🌍 **CORS**
- 📦 **dotenv**
- ✅ **Zod**
- 🧹 **ESLint**
- 🔒 **express-rate-limit**

---

### 📦 Installation Steps

1. **Clone the Repository**

- Backend

```bash
https://github.com/muntasirmoin/Edu-Care-Server.git
```

- Frontend

```bash
https://github.com/muntasirmoin/Edu-Care-Client.git
```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Create Environment Variables File**

   Create a `.env` file in the root directory.

4. **Start the Development Server**

- BackEnd

```bash
npm run dev
```

- FrontEnd

```bash
bun dev
```
