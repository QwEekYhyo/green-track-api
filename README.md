# Green Track API

Welcome to the Green Track API project

### Deploy

Copy the file `.env.example`, rename it to `.env` and complete it

### Add user

```
curl -d '{"firstName":"your first name", "surname":"your surname", "username":"your username", "password":"your password"}' -H "Content-Type: application/json" -X POST localhost:3333/auth/register
```

### Authenticated request
```
curl -H "Authorization: Bearer tHiSiSaToKeN" localhost:3333/hello
```
