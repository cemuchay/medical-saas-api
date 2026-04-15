# 🏥 Medical SaaS API

 A high-performance, Multi-Tenant Hospital Management API built with NestJS, Prisma 7, and PostgreSQL (Supabase). This system is engineered for data isolation, allowing multiple hospitals to operate on a single infrastructure securely. 
 ## 🚀 Key Features
 1. **Multi-Tenancy Architecture:** Secure data isolation using a custom **TenantInterceptor** that scopes every database query to a specific **tenantId** extracted from JWTs.
 
 2. **Type-Safe Persistence:** Leverages Prisma 7 with custom PostgreSQL adapters for robust, type-safe database interactions.
 
 3. **Advanced Filtering Engine:** A dynamic search system allowing complex queries (e.g., ?name=chizalam) without hardcoding logic.
 
 4. **Audit Logging:** Automatic tracking of critical actions (e.g., CREATE_PATIENT) to ensure healthcare compliance.
 
 5. **Global Security & RBAC:** Integrated Passport.js and JWT strategies with Role-Based Access Control.
 
 6. **Standardized Error Handling:** A global exception filter providing consistent, developer-friendly JSON error responses.
 
 ## 🛠️ Technical Stack


| Category | Technology |
| -------- | -------- |
| Framework   | NestJS (node.js)   |
| Language  | Typescript (Strict Mode)  |
| ORM  | Prisma 7 |
| Database  | PostgreSQL (via supabase)  |
| AuthJWT  | Passport.js  |
| Deployment  | Render / Docker |

 
 ## 🏗️ Architecture Overview
 The project follows a modular NestJS architecture designed for horizontal scalability.
 
 1. **Data Isolation Logic**

 Instead of manually adding where: { tenantId } to every service method, we utilize a Global Interceptor.
 1. The AuthGuard validates the JWT and attaches the user payload to the request.
 2. The TenantInterceptor extracts the tenantId from the user payload.
 3. The Service uses this ID to scope all Prisma calls, ensuring Hospital A can never see Hospital B's data.
 
 ## 🚦 Getting Started
 Prerequisites
 - Node.js (v20+)
 - npm / yarn
 - A Supabase (PostgreSQL) connection string
 
 Installation
 1. **Clone the repo:**

 `git clone https://github.com/cemuchay/medical-saas-api.git
cd medical-saas-api`

2. **Install dependencies:**

`npm install`

3. **Environment Setup:**

Create a **.env** file in the root:

`DATABASE_URL="postgres://..."`

`JWT_SECRET="your_secure_secret"`

`DEV_MODE="true"`

`PORT=3000`

4. **Database Migration & Seed:**

`npx prisma generate`

`npx prisma db push`

`npx ts-node prisma/seed.ts`

5. **Run the App:**

`npm run start:dev`

## 📡 API Endpoints (Samples)


| Method | Endpoint | Description
| -------- | -------- | -------- | 
|**POST**|/**auth/login**|Returns a JWT containing **tenantId**.
|**GET**|**/patients**|Fetch all patients for the authenticated hospital.
|**GET**|**/patients?name=jo**|Search patients within the hospital context.
| **POST**|**/patients**|Create a new patient (Automatically creates Audit Log).

## 🛡️ Security & Compliance

- JWT Extraction: All sensitive data is stored in the JWT payload, reducing database round-trips for session data.
- Input Validation: Uses class-validator and class-transformer to sanitize all incoming DTOs.
- Audit Trails: Every "Write" operation is logged in the AuditLog table with a timestamp, actor ID, and metadata.

## 👨‍💻 Author
**Chizalam Emuchay**

- Full-Stack Engineer specialized in React, TypeScript, and NestJS.
- [Portfolio](https://chizalam.vercel.app/)

***

###### Developed with a focus on high-availability and strict type safety.