# API Routes Documentation

This document lists all backend routes, HTTP methods, mounted paths, middleware/validators, and brief notes about request parameters or payloads.

Base mount points (from `backend/src/index.ts`):

- `/projects` — project management routes
- `/categories` — category management routes
- `/skills` — skills management routes
- `/achievements` — achievements management routes
- `/info` — info entries routes
- `/education` — education entries routes
- `/admin-ath` — admin auth routes

---

## /projects

- POST `/projects/`
  - Middleware: `upload.single('projectImage')`, `projectCreate` validator
  - Content type: `multipart/form-data` (file + fields)
  - Required body fields:
    - `name` (string) — 1–30 characters
    - `description` (string) — 15–250 characters
    - `technologies` (string)
    - `alive` (boolean)
    - `projectImage` (file) — required; allowed types: `image/jpeg`, `image/jpg`, `image/png`; max 1MB
  - Optional fields:
    - `link` (string) — must be a valid URL if provided

- PATCH `/projects/:id`
  - Middleware: `upload.single('projectImage')`, `projectUpdate` validator
  - Content type: `multipart/form-data` (file + fields)
  - Optional body fields (all optional):
    - `name` (string) — 1–30 characters
    - `description` (string) — 15–250 characters
    - `technologies` (string)
    - `alive` (boolean)
    - `link` (string) — must be a valid URL if provided
    - `projectImage` (file) — jpeg/jpg/png; max 1MB

- GET `/projects/`
  - Returns list of projects.

- GET `/projects/:id`
  - Middleware: `projectGetOne` validator
  - Returns single project by id.

- DELETE `/projects/:id`
  - Middleware: `projectGetOne` validator
  - Deletes project by id.

## /categories

- POST `/categories/`
  - Middleware: `createCategory` validator
  - Required body fields:
    - `name` (string) — 1–50 characters
  - Optional fields:
    - `description` (string) — 1–150 characters

- PATCH `/categories/:id`
  - Middleware: `updateCategory` validator
  - Optional body fields (all optional):
    - `name` (string) — 1–50 characters
    - `description` (string) — 1–150 characters

- GET `/categories/`
  - Returns list of categories.

- GET `/categories/:id`
  - Middleware: `getCategory` validator
  - Returns a category by id.

- DELETE `/categories/:id`
  - Middleware: `deleteCategory` validator
  - Deletes a category by id.

## /skills

- POST `/skills/`
  - Middleware: `createSkill` validator
  - Required body fields:
    - `categoryId` (MongoId string) — category id to which the skill belongs
    - `name` (string) — non-empty
    - `proficiency` (integer) — 1–100

- PATCH `/skills/:id`
  - Middleware: `updateSkill` validator
  - Optional body fields (all optional):
    - `categoryId` (MongoId string)
    - `name` (string) — non-empty
    - `proficiency` (integer) — 1–100

- GET `/skills/`
  - Returns all skills.

- GET `/skills/category/:id`
  - Middleware: `getSkillByCategory` validator
  - Returns skills belonging to a category id.

- GET `/skills/:id`
  - Middleware: `getSkill` validator
  - Returns a skill by id.

- DELETE `/skills/:id`
  - Middleware: `deleteSkill` validator
  - Deletes a skill by id.

## /achievements

- POST `/achievements/`
  - Middleware: `createAchievement` validator
  - Required body fields:
    - `title` (string) — non-empty
    - `count` (integer) — 0–9999

- GET `/achievements/`
  - Returns all achievements.

- GET `/achievements/:id`
  - Middleware: `getAchievement` validator
  - Returns an achievement by id.

- PATCH `/achievements/:id`
  - Middleware: `updateAchievement` validator
  - Optional body fields (all optional):
    - `title` (string) — non-empty
    - `count` (integer) — 0–9999

- DELETE `/achievements/:id`
  - Middleware: `deleteAchievement` validator
  - Deletes an achievement.

## /info

- POST `/info/`
  - Middleware: `createInfo` validator
  - Required body fields:
    - `name` (string) — non-empty
    - `nationality` (string) — non-empty
    - `freelance` (boolean)
    - `graduated` (array) — at least 1 item
    - `specializations` (array) — at least 1 item
    - `languages` (array) — at least 1 item
  - Optional fields:
    - `whatsapp` (string)

- GET `/info/`
  - Returns info records.

- PATCH `/info/:id`
  - Middleware: `updateInfo` validator
  - Optional body fields (all optional):
    - `name` (string) — non-empty
    - `nationality` (string) — non-empty
    - `freelance` (boolean)
    - `graduated` (array) — at least 1 item
    - `specializations` (array) — at least 1 item
    - `languages` (array) — at least 1 item
    - `whatsapp` (string)

- DELETE `/info/:id`
  - Middleware: `deleteInfo` validator
  - Deletes an info record.

## /education

- POST `/education/`
  - Middleware: `createEducation` validator
  - Required body fields:
    - `name` (string) — non-empty
    - `learningSource` (string) — non-empty
    - `description` (string) — non-empty
    - `startingTime` (date string) — validated with format `dd/MM/yyyy` by current validator

- PATCH `/education/:id`
  - Middleware: `updateEducation` validator
  - Optional body fields (all optional):
    - `name` (string) — non-empty
    - `learningSource` (string) — non-empty
    - `description` (string) — non-empty
    - `startingTime` (date string) — format `dd/MM/yyyy`

- GET `/education/`
  - Returns education entries.

- GET `/education/:id`
  - Middleware: `getEducation` validator
  - Returns an education entry by id.

- DELETE `/education/:id`
  - Middleware: `deleteEducation` validator
  - Deletes an education entry.

## /contact

- POST `/contact/`
  - Middleware: `create` validator
  - Required body fields:
    - `fullname` (string) — 3–50 characters
    - `email` (string) — valid email
    - `message` (string) — 10–256 characters
  - Notes: If a contact with the same email exists, the message will be appended to the existing document; otherwise a new contact document is created.

- GET `/contact/`
  - Returns list of contact documents (public endpoint).

- GET `/contact/:id`
  - Middleware: `getById` validator
  - Returns a contact document by id (admin only).

- DELETE `/contact/:id`
  - Middleware: `deleteById` validator
  - Deletes a contact document by id (admin only).

## /admin-ath (authentication)

- POST `/admin-ath/register`
  - Middleware: `validator.register`
  - Required body fields:
    - `username` (string) — 3–50 characters
    - `email` (string) — valid email
    - `password` (string) — 8+ characters

- POST `/admin-ath/login`
  - Middleware: `validator.login`
  - Required body fields:
    - `email` (string) — valid email
    - `password` (string)

- GET `/admin-ath/logout`
  - Middleware: `validator.logout`
  - Logs out the current user (clears cookies/session).

## Admin-only endpoints

- Overview: Any route that is protected by the server `verifyToken` middleware requires an authenticated admin. Obtain credentials via `POST /admin-ath/login` (sets an HTTP-only cookie on successful login) or provide the JWT in the `Authorization: Bearer <token>` header.
- Note: the authentication cookie used by the admin auth controller is `ath-token` (httpOnly). After logging in, include that cookie in requests from the admin client or send the token via an `Authorization` header.

- Admin-protected endpoints (require `verifyToken`):
  - `/projects`
    - POST `/projects/` — create a project
    - PATCH `/projects/:id` — update a project
    - GET `/projects/:id` — get a single project
    - DELETE `/projects/:id` — delete a project

  - `/categories`
    - POST `/categories/` — create a category
    - PATCH `/categories/:id` — update a category
    - GET `/categories/:id` — get a category
    - DELETE `/categories/:id` — delete a category

  - `/skills`
    - POST `/skills/` — create a skill
    - PATCH `/skills/:id` — update a skill
    - GET `/skills/category/:id` — list skills by category
    - GET `/skills/:id` — get a skill
    - DELETE `/skills/:id` — delete a skill

  - `/achievements`
    - POST `/achievements/` — create an achievement
    - GET `/achievements/:id` — get an achievement
    - PATCH `/achievements/:id` — update an achievement
    - DELETE `/achievements/:id` — delete an achievement

  - `/info`
    - POST `/info/` — create info
    - PATCH `/info/:id` — update info
    - DELETE `/info/:id` — delete info

  - `/education`
    - POST `/education/` — create an education entry
    - PATCH `/education/:id` — update an education entry
    - GET `/education/:id` — get an education entry
    - DELETE `/education/:id` — delete an education entry

  - `/contact`
    - POST `/contact/` — create a contact entry
    - GET `/contact/:id` — get a contact entry
    - DELETE `/contact/:id` — delete a contact entry

  - `/admin-ath`
    - GET `/admin-ath/logout` — logout (requires authentication)

If you want, I can also mark these endpoints inline in the route sections above (adding a short "Admin only" note next to each protected method) or add example request/response samples for authenticated calls.

---

Notes & pointers

- Validators mentioned above are defined in `backend/src/validators/*` and enforce request body/params shape.
- Controllers implementing logic are in `backend/src/controllers/*`.
- To see exact request fields and validation rules, inspect the matching validator files (e.g., `project.validator.ts`, `auth.validator.ts`).

If you'd like, I can expand this document with request/response schemas (examples) by extracting details from each validator and controller.
