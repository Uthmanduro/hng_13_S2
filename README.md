# Node.js API for Basic Info Retrieval

This is a simple Node.js API, it is a get request response which returns basic info such as, email, git repo url of this project and current time in ISO 8601 format

## Features
- Responds to GET requests with the current date and time in UTC.
- Provides a fast response time (<500ms).
- Includes metadata like the developer's email and GitHub URL.

## Setup Instructions
1. Clone this repository:
   ```bash
   git clone https://github.com/Uthmanduro/hng_2025_S1.git
2. Navigate to the project repository
     ```bash
    cd hng_2025_S1

3. install required dependencies
   ```bash
    npm install
5. start the server
   ```bash
    npm run devv
7. access the api locally with:
   ``` http://localhost:8000```

## API Documentation

Endpoint:

```GET /```

## Response:

```json
{
    "email": "udurosinlohun@gmail.com",
    "current_datetime": "2025-01-30T21:27:35.959Z",
    "github_url": "https://github.com/Uthmanduro/hng_2025_S1"
}
```
## Response Codes:
```200 OK```: Data returns successfully

```404 Not Found```: when the endpoint is unavailabe

## Example Usage
```text
curl https://basic-info-retrieval.vercel.app/
```
## Backlinks

[Hire Node.js Developers](https://hng.tech/hire/nodejs-developers)

## Deployment
The API has been deployed to a publicly accessible endpoint:

https://basic-info-retrieval.vercel.app/


