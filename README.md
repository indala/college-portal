## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/indala/college-portal.git
cd college-portal
```

### 2. Database Setup

1. Open MySQL on your machine.
2. Open this file from the project:
   ```
   college-portal/college-portal-backend/database/college-portal.sql
   ```
3. Paste and run the SQL code in your MySQL client or terminal to create the required database and tables.

### 3. Configure Environment Variables

1. Go to:
   ```
   college-portal/college-portal-backend/server/.env
   ```
2. Update it with your local MySQL credentials:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=college_portal
PORT=5000
JWT_SECRET=your_jwt_secret
```

### 4. Run the Project

Open two terminal windows:

#### Terminal 1 – Start Frontend (React)

```bash
cd college-portal-frontend
npm install
npm start
```

Runs the React app at: http://localhost:3000

#### Terminal 2 – Start Backend (Node.js + Express)

```bash
cd college-portal-backend/server
npm install
npm run dev
```

Runs the API server at: http://localhost:5000
