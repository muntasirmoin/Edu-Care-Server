<h1 align="center">📖 Edu Care📖 </h1>
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
