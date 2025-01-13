# Oommah API Documentation

## Authentication

All API endpoints require authentication unless specified otherwise.

### POST /api/auth/signup

Create a new user account.

Request body:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}

