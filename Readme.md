# Teller Service

A microservice designed to manage teller transactions, including deposits, withdrawals, and balance inquiries.

**Key Features:**

* Handles financial transactions for teller operations.
* Provides APIs for balance management.
* Uses TypeORM for database interactions.
* Utilizes JWT for authentication.

**Getting Started:**

1.  **Clone the repository:**
    ```bash
    git clone [repository URL]
    cd [repository directory]
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```
3.  **Configure environment variables:**
    * Create a `.env` file in the root directory and add your database connection details, JWT secret, and other necessary configurations.
    * Refer to `.env.example` for the required variables.

4.  **Build the project (if using TypeScript):**
    ```bash
    npm run build
    # or
    yarn build
    ```
5.  **Run migrations:**
    * Run the database migrations to create the necessary tables. This is crucial for the initial setup.
    ```bash
    npx typeorm migration:run --dataSource ./dist/data-source.js
    ```
    * **Note:** This command should be run after the service is started for the first time, ensuring that the necessary build files are present.
6.  **Start the service:**
    ```bash
    npm start
    # or
    yarn start
    ```

**Docker Compose**
```bash
docker compose up --build
```

**Migrations:**

* Database migrations are used to manage schema changes.
* Run the following command after starting the service for the first time to apply the migrations:
    ```bash
    npx typeorm migration:run --dataSource ./dist/data-source.js
    ```

**API Documentation:**

* [Link to your API documentation, if available]

**Contributing:**

* [Contribution guidelines, if applicable]

**License:**

* [License information]