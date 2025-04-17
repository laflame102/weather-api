# weatherAPI

## How to use

1. **Clone the repository**

   ```bash
   git clone https://github.com/laflame102/weather-api.git
   cd weather-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create .env file**

   Paste all the secret keys


4. **Compose docker**

```bash
docker-compose up --build
```

or run it in the background

```bash
docker-compose up --build -d
```

5. **Run migrations**

```bash
 knex migrate:latest
```

6. **Start**

   Run the development port

```bash
 npm run dev
```

7. **Your api link is ready**

```bash
http://localhost:5071
```
