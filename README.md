# Node.js API for Basic Info Retrieval

This is a simple Node.js API, it is a get request response which returns basic info such as, email, git repo url of this project and current time in ISO 8601 format

## Features

- Create a GET endpoint at: /me
- The endpoint must return JSON data with Content-Type: application/json
- Must integrate with the Cat Facts API to fetch dynamic cat facts
- Responds to GET requests with the current date and time in UTC.
- Provides a fast response time (<500ms).
- Includes metadata like the developer's email and GitHub URL.

## Setup Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/Uthmanduro/hng_13_S1.git
   ```
2. Navigate to the project repository

   ```bash
   cd hng_13_S1

   ```

3. install required dependencies
   ```bash
    npm install
   ```
4. start the server
   ```bash
    npm run dev
   ```
5. access the api locally with:
   ` http://localhost:8000`

## API Documentation

Endpoint:

`GET /me`

## Response:

```json
{
  "status": "success",
  "user": {
    "email": "<your email>",
    "name": "<your full name>",
    "stack": "<your backend stack>"
  },
  "timestamp": "<current UTC time in ISO 8601 format>",
  "fact": "<random cat fact from Cat Facts API>"
}
```

## Response Codes:

`200 OK`: Data returns successfully

`404 Not Found`: when the endpoint is unavailabe

## Example Usage

```text
curl https://hng-2025-s1.vercel.app/
```

## Backlinks

[Hire Node.js Developers](https://hng.tech/hire/nodejs-developers)

## Deployment

The API has been deployed to a publicly accessible endpoint:

https://hng-2025-s1.vercel.app/
