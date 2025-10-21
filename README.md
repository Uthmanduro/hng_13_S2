# **StringSense API: Intelligent String Analysis & Management**

✨ Unlock insights from textual data with the StringSense API, a robust backend solution for advanced string analysis. Built with Node.js, Express, and Prisma, this API provides comprehensive tools for processing, categorizing, and querying strings based on their intrinsic properties, including natural language filtering.

## Features

-   **Comprehensive String Analysis**: Automatically compute length, palindromic status, unique character count, word count, SHA-256 hash, and character frequency for any given string.
-   **Data Persistence**: Securely store analyzed string data in a PostgreSQL database using Prisma ORM.
-   **Flexible Filtering**: Retrieve strings based on various criteria such as length, palindromic nature, word count, or specific character containment.
-   **Natural Language Querying**: Utilize predefined natural language phrases to filter strings, simplifying complex data retrieval.
-   **RESTful Interface**: A clean and intuitive API design for easy integration and consumption.
-   **Efficient Data Management**: Endpoints for creating, retrieving, and deleting string analyses.

## Technologies Used

| Technology    | Description                                                     |
| :------------ | :-------------------------------------------------------------- |
| Node.js       | JavaScript runtime for server-side execution.                   |
| Express.js    | Fast, unopinionated, minimalist web framework for Node.js.      |
| Prisma ORM    | Next-generation ORM for Node.js and TypeScript, simplifying database access. |
| PostgreSQL    | Powerful, open-source relational database system.               |
| Dotenv        | Loads environment variables from a `.env` file.                 |
| Cors          | Node.js middleware for providing a Connect/Express middleware that can be used to enable CORS. |
| Body-parser   | Parse incoming request bodies in a middleware before your handlers. |
| Crypto        | Node.js built-in module for cryptographic functionality, used for SHA-256 hashing. |

## Getting Started

Follow these steps to set up and run the StringSense API locally.

### Installation

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/Uthmanduro/hng_13_S1.git
    cd hng_13_S1
    ```

2.  **Install Dependencies**:
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**:
    Create a `.env` file in the root directory and add your database connection string:

    ```ini
    DATABASE_URL="postgresql://user:password@host:port/database"
    ```
    _Example for a local PostgreSQL database:_
    ```ini
    DATABASE_URL="postgresql://postgres:mysecretpassword@localhost:5432/string_analyzer_db"
    ```

4.  **Run Prisma Migrations**:
    Apply the database schema and generate the Prisma client:

    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

5.  **Start the Server**:
    ```bash
    npm run dev
    ```
    The API will be running on `http://localhost:8000`.

### Environment Variables

| Variable       | Description                                  | Example Value                                  |
| :------------- | :------------------------------------------- | :--------------------------------------------- |
| `DATABASE_URL` | Connection string for your PostgreSQL database. | `postgresql://user:pass@host:5432/dbname` |

## API Documentation

### Overview
The StringSense API provides a robust set of endpoints for analyzing and managing strings. It leverages Node.js with Express for the web server and Prisma for seamless interaction with a PostgreSQL database, offering features like SHA-256 hashing, palindrome detection, and natural language filtering.

### Features
-   **String Analysis**: Compute detailed properties for strings (length, palindrome, unique chars, word count, SHA-256 hash, char frequency).
-   **Filtering**: Query strings based on multiple criteria.
-   **Natural Language Queries**: Predefined filters accessible via human-readable queries.
-   **CRUD Operations**: Create, retrieve, and delete analyzed strings.

### Getting Started
For detailed setup instructions, please refer to the main [Getting Started](#getting-started) section above.

### Environment Variables
All required environment variables are detailed in the main [Environment Variables](#environment-variables) section.

### Base URL
`http://localhost:8000`

### Endpoints

#### `POST /strings`
Analyzes a given string, stores its properties, and returns the analysis.

**Request**:
```json
{
  "value": "Hello World"
}
```
**Response**:
```json
{
  "id": "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b27796ad9f146e",
  "value": "Hello World",
  "properties": {
    "length": 11,
    "is_palindrome": false,
    "unique_characters": 8,
    "word_count": 2,
    "sha256_hash": "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b27796ad9f146e",
    "character_frequency_map": {
      "H": 1,
      "e": 1,
      "l": 3,
      "o": 2,
      " ": 1,
      "W": 1,
      "r": 1,
      "d": 1
    }
  },
  "created_at": "2023-10-27T10:00:00.000Z"
}
```
**Errors**:
-   `400 Bad Request`: Missing "value" field.
-   `422 Unprocessable Entity`: Field "value" must be a string.
-   `409 Conflict`: String already exists.

#### `GET /strings`
Retrieves all analyzed strings, with optional filtering based on string properties.

**Request**:
```
GET /strings?is_palindrome=true&min_length=5&contains_character=a
```
**Query Parameters**:
-   `is_palindrome`: `true` or `false` to filter by palindromic status.
-   `min_length`: Minimum length of the string.
-   `max_length`: Maximum length of the string.
-   `word_count`: Exact word count of the string.
-   `contains_character`: A single character that the string must contain.

**Response**:
```json
{
  "data": [
    {
      "id": "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b27796ad9f146e",
      "value": "Hello World",
      "length": 11,
      "is_palindrome": false,
      "unique_characters": 8,
      "word_count": 2,
      "sha256_hash": "a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b27796ad9f146e",
      "character_frequency_map": { /* ... */ },
      "created_at": "2023-10-27T10:00:00.000Z"
    }
  ],
  "count": 1,
  "filters_applied": {
    "is_palindrome": false,
    "length": {
      "gte": 5
    },
    "value": {
      "contains": "a"
    }
  }
}
```
**Errors**:
-   `400 Bad Request`: Invalid query parameters.

#### `GET /strings/filter-by-natural-language`
Filters strings using predefined natural language queries.

**Request**:
```
GET /strings/filter-by-natural-language?query=palindromic strings that contain the first vowel
```
**Query Parameters**:
-   `query`: A natural language query string. Supported queries:
    -   `all single word palindromic strings`
    -   `strings longer than 10 characters`
    -   `palindromic strings that contain the first vowel`
    -   `strings containing the letter z`

**Response**:
```json
{
  "data": [
    {
      "id": "a1b2c3d4...",
      "value": "madam",
      "length": 5,
      "is_palindrome": true,
      "unique_characters": 3,
      "word_count": 1,
      "sha256_hash": "a1b2c3d4...",
      "character_frequency_map": { /* ... */ },
      "created_at": "2023-10-27T10:05:00.000Z"
    }
  ],
  "count": 1
}
```
**Errors**:
-   `400 Bad Request`: Missing query parameter.
-   `400 Bad Request`: Unable to parse natural language query.
-   `422 Unprocessable Entity`: Query parsed but resulted in conflicting or invalid filters.

#### `GET /strings/:string_value`
Retrieves the analysis for a specific string identified by its SHA-256 hash. The `string_value` parameter will be hashed to find the record.

**Request**:
```
GET /strings/hello
```
_(The API will internally hash "hello" to find the record)_

**Response**:
```json
{
  "id": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
  "value": "hello",
  "created_at": "2023-10-27T10:08:00.000Z",
  "properties": {
    "length": 5,
    "is_palindrome": false,
    "unique_characters": 4,
    "word_count": 1,
    "sha256_hash": "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824",
    "character_frequency_map": {
      "h": 1,
      "e": 1,
      "l": 2,
      "o": 1
    }
  }
}
```
**Errors**:
-   `404 Not Found`: String analysis not found.

#### `DELETE /strings/:string_value`
Deletes an analyzed string record from the database. The `string_value` parameter will be hashed to find the record.

**Request**:
```
DELETE /strings/delete-me
```
_(The API will internally hash "delete-me" to find and delete the record)_

**Response**:
```
204 No Content
```
**Errors**:
-   `404 Not Found`: String does not exist in the system.

## Usage

Here are some `curl` examples to demonstrate how to interact with the StringSense API:

### Analyze a new string

```bash
curl -X POST \
  http://localhost:8000/strings \
  -H 'Content-Type: application/json' \
  -d '{
    "value": "racecar"
  }'
```

### Get all strings with filters

```bash
curl -X GET \
  "http://localhost:8000/strings?is_palindrome=true&min_length=5"
```

### Filter strings using natural language

```bash
curl -X GET \
  "http://localhost:8000/strings/filter-by-natural-language?query=all single word palindromic strings"
```

### Get analysis for a specific string

```bash
curl -X GET \
  http://localhost:8000/strings/madam
```

### Delete a string analysis

```bash
curl -X DELETE \
  http://localhost:8000/strings/racecar
```

## Contributing

We welcome contributions to the StringSense API! To contribute, please follow these guidelines:

-   ⭐ **Fork the repository** and clone it locally.
-   🌱 **Create a new branch** for your feature or bug fix: `git checkout -b feature/your-feature-name` or `git checkout -b bugfix/issue-description`.
-   💻 **Make your changes**, ensuring they adhere to the project's coding style.
-   🧪 **Write and run tests** for your changes.
-   ✅ **Commit your changes** with a clear and descriptive message: `git commit -m "feat: Add new string property calculation"`
-   ⬆️ **Push your branch** to your forked repository.
-   🤝 **Open a Pull Request** to the main repository, detailing your changes and their benefits.

## License

This project is licensed under the ISC License.

## Author Info

-   **LinkedIn**: [Your LinkedIn Profile](https://www.linkedin.com/in/yourusername/)
-   **Twitter**: [Your Twitter Handle](https://twitter.com/yourusername)
-   **Portfolio**: [Your Portfolio Website](https://www.yourportfolio.com)

---

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue?logo=express)](https://expressjs.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.x-blueviolet?logo=prisma)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)](https://www.postgresql.org/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vercel.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

[![Readme was generated by Dokugen](https://img.shields.io/badge/Readme%20was%20generated%20by-Dokugen-brightgreen)](https://www.npmjs.com/package/dokugen)