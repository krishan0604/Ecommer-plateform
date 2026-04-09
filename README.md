# Full-Stack E-Commerce Project

## Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Zustand, React Query
- **Backend**: Java 21, Spring Boot 3, PostgreSQL, Spring Data JPA, Hibernate, Lombok
- **API Documentation**: Swagger UI (SpringDoc OpenAPI)

## Setup and Running Locally

### Backend (Spring Boot)
1. **Database**: Ensure you have PostgreSQL running.
2. **Environment Variables**: Set the following environment variables or update `application.properties`:
   - `DB_URL`: JDBC URL for PostgreSQL (e.g., `jdbc:postgresql://localhost:5432/ecomm`)
   - `DB_USERNAME`: Database username
   - `DB_PASSWORD`: Database password
   - `PORT`: (Optional) Server port, defaults to 8080
3. **Run**:
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
4. **API Docs**: Access Swagger UI at `http://localhost:8080/swagger-ui.html`

### Frontend (React + Vite)
1. **Install Dependencies**:
   ```bash
   cd ecomm-frontend
   npm install
   ```
2. **Environment Variables**: Update `.env` file if backend URL is different:
   - `VITE_API_BASE_URL=http://localhost:8080/api`
3. **Run**:
   ```bash
   npm run dev
   ```

## Folder Structure
```text
Ecommerce website/
├── backend/             # Spring Boot 3 Backend
│   ├── Dockerfile      # Ready for Render
│   └── src/            # Core logic & 30-product DataSeeder
├── ecomm-frontend/      # React 18 + Vite Frontend
│   ├── vercel.json     # Ready for Vercel
│   └── src/            # Optimized UI with Skeletons & Zustand
└── README.md           # This file
```

## Deployment
- **Frontend**: Deploy to Vercel. Ensure `vercel.json` is present.
- **Backend**: Deploy to Railway or Render using the provided `Dockerfile`.
