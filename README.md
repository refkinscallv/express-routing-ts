# 📦 @refkinscallv/express-routing-ts

Laravel-style routing system for Express.js in TypeScript. Simplify your route definitions, middleware stacks, and controller bindings like a boss.

---

## 🧪 See Example

Curious how it all comes together?  
👉 Check out [`example/index.ts`](https://github.com/refkinscallv/express-routing-ts/blob/main/example/index.ts) for a full working demo!

---

## 🛠 Installation

```bash
npm install @refkinscallv/express-routing-ts
```

---

## 📚 Features

* ✅ Simple route declarations (`get`, `post`, etc.)
* ✅ Grouped routes with prefix
* ✅ Middleware stack: global, group, and per-route
* ✅ Controller-method pair as route handler
* ✅ Consistent handler format using `HttpContext`
* ✅ Auto-instantiate controllers
* ✅ Express-compatible

---

## 🧩 Type Definitions

```ts
type RouteMiddleware = (req: Request, res: Response, next: NextFunction) => void;

type RouteMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head';

type HttpContext = {
  req: Request;
  res: Response;
  next: NextFunction;
};

type RouteHandler = ((ctx: HttpContext) => any) | [any, string];

interface RouteDefinition {
  methods: RouteMethod[];
  path: string;
  handler: RouteHandler;
  middlewares?: RouteMiddleware[];
}
```

---

## ✨ Usage

### 🔹 1. Basic Route

```ts
Routes.get('/hello', ({ res }) => {
  res.send('Hello World');
});
```

### 🔹 2. With Middleware

```ts
Routes.post(
  '/submit',
  ({ res }) => res.send('Submitted'),
  [authMiddleware],
);
```

---

### 🔹 3. Controller Binding

You can use `[ControllerClass, 'methodName']`:

```ts
class UserController {
  index({ res }: HttpContext) {
    res.send('User list');
  }
}

Routes.get('/users', [UserController, 'index']);
```

> ⚠️ Controller will be instantiated if not passed as an object.

---

### 🔹 4. Grouped Routes

Use `Routes.group()` to prefix and stack middleware:

```ts
Routes.group('/admin', () => {
  Routes.get('/dashboard', ({ res }) => res.send('Admin Dashboard'));
}, [adminOnly]);
```

---

### 🔹 5. Global Middleware Scope

Wrap multiple routes in a shared global middleware:

```ts
Routes.middleware([authMiddleware], () => {
  Routes.get('/me', ({ res }) => res.send('My Profile'));
});
```

---

### 🔹 6. Register to Express

```ts
import express from 'express';
import Routes from '@refkinscallv/express-routing-ts';

// registered your routes
// import 'path/to/routes.ts'

const app = express();
const router = express.Router();

Routes.apply(router);

app.use(router);
app.listen(3000);
```

---

## 📖 API Reference

### 📌 Routes Methods

| Method      | Description                        |
| ----------- | ---------------------------------- |
| `get()`     | Define GET route                   |
| `post()`    | Define POST route                  |
| `put()`     | Define PUT route                   |
| `patch()`   | Define PATCH route                 |
| `delete()`  | Define DELETE route                |
| `options()` | Define OPTIONS route               |
| `head()`    | Define HEAD route                  |
| `add()`     | Custom route with multiple methods |

---

### 📌 Static Methods

| Method                | Description                                       |
| --------------------- | ------------------------------------------------- |
| `Routes.get()`        | Register a GET route                              |
| `Routes.post()`       | Register a POST route                             |
| `Routes.put()`        | Register a PUT route                              |
| `Routes.delete()`     | Register a DELETE route                           |
| `Routes.patch()`      | Register a PATCH route                            |
| `Routes.options()`    | Register an OPTIONS route                         |
| `Routes.head()`       | Register a HEAD route                             |
| `Routes.add()`        | Register one or more HTTP methods at once         |
| `Routes.group()`      | Group routes under a prefix and share middlewares |
| `Routes.middleware()` | Apply global middleware scope to nested routes    |
| `Routes.apply()`      | Apply all registered routes to an Express router  |

---

## 📌 Execution Flow

Middleware Execution Order:

```txt
[ Global Middleware ] → [ Group Middleware ] → [ Route Middleware ]
```

Handler Execution:

* If a function → Executed directly
* If `[Controller, 'method']`:

  * Instantiates controller (if class passed)
  * Binds and executes method

---

## 🧪 Example

```ts
class HomeController {
  index({ res }: HttpContext) {
    res.send('Welcome to Home!');
  }
}

Routes.group('/v1', () => {
  Routes.get('/', [HomeController, 'index']);
});
```

---

## 🧠 Tips

* Route paths will be automatically cleaned to avoid duplicate slashes (`//` → `/`).
* Controller methods are bound to their instance or static context.
* Handler functions can be `async` or return a Promise.

---

## 🤝 License

MIT License © 2025 \[Refkinscallv]