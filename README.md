Notex Employee Management System
A full-stack web application for managing employees, departments, and user authentication.
This system includes two user roles: Admin and Employee.
Admins can manage departments and employees, while employees can view their own information.

Features
User Authentication: Secure login system for both Admin and Employee roles.
Role-Based Access Control: Admins can access all data, while employees have limited access to their own data.
Department Management: Admins can add, edit, and view departments.
Employee Management: Admins can add, edit, view, and delete employee details.
Tech Stack
Frontend: React.js, React Router, Tailwind CSS
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT (JSON Web Tokens)
Deployment: Docker, Heroku (optional for deployment)
Installation
Backend
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/notex-employee-management.git
cd notex-employee-management
Install the required dependencies:

bash
Copy code
npm install
Create a .env file in the root directory and set the required environment variables:

bash
Copy code
PORT=5000
DB_URI=mongodb://your_mongo_database_uri
JWT_SECRET=your_jwt_secret_key
Start the backend server:

bash
Copy code
npm start
The backend will be running on http://localhost:5000.

Frontend
Navigate to the frontend directory:

bash
Copy code
cd client
Install the required dependencies:

bash
Copy code
npm install
Create a .env file in the client directory and set the required environment variables:

bash
Copy code
REACT_APP_API_URL=http://localhost:5000/api
Start the frontend server:

bash
Copy code
npm start
The frontend will be running on http://localhost:5173.

API Endpoints
Authentication
POST /api/auth/login: Login for users (Admin/Employee).
POST /api/auth/register: Register a new user (Admin only).
Department Management (Admin Only)
GET /api/department: Get all departments.
POST /api/department: Add a new department.
PUT /api/department/:id: Edit a department by ID.
DELETE /api/department/:id: Delete a department by ID.
Employee Management (Admin Only)
GET /api/employee: Get all employees.
POST /api/employee: Add a new employee.
GET /api/employee/:id: Get details of a specific employee by ID.
PUT /api/employee/:id: Edit employee details by ID.
DELETE /api/employee/:id: Delete employee by ID.
Private Routes (Access Control)
Privateroutes component ensures that only authenticated users can access the dashboard.
RolebasedRoutes component restricts access to certain pages based on user roles (Admin/Employee).
Frontend Pages
Login: Login page for both Admin and Employee users.
Admin Dashboard: Admins can manage departments and employees.
Employee Dashboard: Employees can view their personal data and update information.
Department Management: Admins can create, edit, and view departments.
Employee Management: Admins can create, edit, and view employee profiles.
Conclusion
Notex Employee Management System is designed to streamline employee and department management for organizations, providing secure and efficient tools for Admins to manage employee records and departments. The system also allows employees to view their own profiles, ensuring that sensitive data is well-protected.

