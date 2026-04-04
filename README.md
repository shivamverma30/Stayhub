# SStayHub (WanderLust)

> A production-style full-stack stay-booking platform where users can discover destinations, list properties, upload images, and share reviews.

---

![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.x-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![EJS](https://img.shields.io/badge/View-EJS-B4CA65)
![Deployment](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?logo=render&logoColor=000)

## Live Demo

**Production URL:** https://sstayhub.onrender.com/

---

## Project Overview

SStayHub is a full-stack web application inspired by modern vacation rental platforms. It allows travelers to browse and filter listings, view listing locations on an interactive map, and post reviews. Hosts can create, update, and delete their own listings with secure image uploads via Cloudinary.

The application is built with an MVC architecture using Express, MongoDB, EJS templates, and Passport.js authentication. It is deployed on Render and connected to MongoDB Atlas.

---

## Features

- User authentication with signup, login, and logout (Passport Local)
- Session-based auth with persistent store in MongoDB (`connect-mongo`)
- Flash messaging for success/error user feedback
- Create, read, update, delete (CRUD) for listings
- Secure authorization checks:
  - only listing owner can edit/delete listing
  - only review author can delete review
- Review and rating system for each listing
- Server-side input validation using Joi schemas
- Image uploads with Multer + Cloudinary storage
- Geo-enabled listings with Mapbox geocoding + map visualization
- Search and category filtering on listing catalog
- Responsive UI with EJS templates, Bootstrap, and custom styling
- Dark mode toggle and enhanced frontend interactions

---

## Tech Stack

### Frontend

| Technology | Purpose |
|---|---|
| EJS + ejs-mate | Server-side templating and reusable layouts |
| Bootstrap 5 | Responsive UI components |
| Vanilla JavaScript | Theme toggle, animations, form behavior |
| Mapbox GL JS | Interactive map rendering on listing detail page |
| CSS (custom) | Design system, theming, and animations |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Express.js | Web framework and routing |
| Passport.js + passport-local | Authentication |
| express-session + connect-mongo | Session management |
| Joi | Request payload validation |
| Multer + multer-storage-cloudinary | File upload handling |
| Cloudinary SDK | Cloud image asset management |

### Database

| Technology | Purpose |
|---|---|
| MongoDB Atlas | Hosted NoSQL database |
| Mongoose | ODM, schema modeling, and relationships |

### Deployment

| Platform | Role |
|---|---|
| Render | Application hosting and runtime deployment |
| MongoDB Atlas | Managed cloud database |
| Cloudinary | Media storage and delivery |

---

## Architecture (MVC)

This project follows **Model-View-Controller** with route-level middleware orchestration:

1. **Models (`models/`)**
	- Define data schemas and relationships with Mongoose.
	- `Listing` references `User` (owner) and `Review` documents.
	- `Review` references author (`User`).

2. **Controllers (`controllers/`)**
	- Encapsulate business logic for listings, reviews, and users.
	- Handle geocoding, persistence, redirects, and flash responses.

3. **Routes (`routes/`)**
	- Bind HTTP endpoints to controllers.
	- Compose middleware for auth, authorization, validation, and file upload.

4. **Views (`views/`)**
	- Render dynamic UI using EJS templates and shared layout/includes.

5. **Middleware (`middleware.js`)**
	- Authentication guard (`isLoggedIn`)
	- Ownership/author checks (`isOwner`, `isReviewAuthor`)
	- Joi validation (`validateListing`, `validateReview`)
	- Redirect preservation (`savedRedirectUrl`)

**Request flow example (Create Listing):**

`POST /listings` -> `isLoggedIn` -> `multer upload` -> `validateListing` -> `controller.createListing` -> `Listing model save` -> redirect with flash message

---

## Folder Structure

```text
MajorProject/
|-- app.js
|-- cloudConfig.js
|-- middleware.js
|-- schema.js
|-- package.json
|-- controllers/
|   |-- listings.js
|   |-- reviews.js
|   |-- user.js
|-- models/
|   |-- listing.js
|   |-- review.js
|   |-- user.js
|-- routes/
|   |-- listing.js
|   |-- review.js
|   |-- user.js
|-- views/
|   |-- layouts/
|   |   |-- biolerplate.ejs
|   |-- includes/
|   |   |-- navbar.ejs
|   |   |-- footer.ejs
|   |   |-- flash.ejs
|   |-- listings/
|   |   |-- index.ejs
|   |   |-- new.ejs
|   |   |-- edit.ejs
|   |   |-- show.ejs
|   |-- users/
|   |   |-- signup.ejs
|   |   |-- login.ejs
|   |-- error.ejs
|-- public/
|   |-- css/
|   |   |-- style.css
|   |   |-- rating.css
|   |-- js/
|   |   |-- script.js
|   |   |-- map.js
|-- utils/
|   |-- ExpressError.js
|   |-- wrapAsync.js
|-- init/
|   |-- data.js
|   |-- index.js
|-- Learning_Demo/
|   |-- server.js
|   |-- routes/
|   |-- views/
```

### Folder Purpose

- `controllers/`: Route handlers and domain logic
- `models/`: Mongoose schemas and document relationships
- `routes/`: Endpoint declarations and middleware pipeline
- `views/`: EJS templates for server-rendered pages
- `public/`: Static frontend assets (CSS/JS)
- `utils/`: Reusable helpers (async wrapper, custom errors)
- `init/`: Seed script and starter dataset
- `Learning_Demo/`: Practice/sandbox app (separate from production flow)

---

## Installation Guide

### Prerequisites

- Node.js (v18+ recommended, project currently targets v22.x)
- npm
- MongoDB Atlas database
- Cloudinary account
- Mapbox account

### Steps

```bash
# 1) Clone repository
git clone https://github.com/shivamverma30/Stayhub.git

# 2) Go to project folder
cd MajorProject

# 3) Install dependencies
npm install

# 4) Create .env file in root (see variables below)

# 5) Start app
node app.js
```

Open in browser: `http://localhost:8080/listings`

---

## Environment Variables

Create a `.env` file in the project root:

```env
ATLASDB_URL=mongodb+srv://<username>:<password>@<cluster-url>/<db-name>
SECRET=your_session_secret

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAP_TOKEN=your_mapbox_access_token

# Optional (for Render or custom host)
PORT=8080
NODE_ENV=development
```

### Variable Reference

| Variable | Required | Description |
|---|---|---|
| `ATLASDB_URL` | Yes | MongoDB Atlas connection string |
| `SECRET` | Yes | Session and cookie signing secret |
| `CLOUD_NAME` | Yes | Cloudinary cloud name |
| `CLOUD_API_KEY` | Yes | Cloudinary API key |
| `CLOUD_API_SECRET` | Yes | Cloudinary API secret |
| `MAP_TOKEN` | Yes | Mapbox API token for geocoding/map display |
| `PORT` | No | Server port override |
| `NODE_ENV` | No | Runtime mode (`development`/`production`) |

---

## Usage

1. Sign up for a new account or log in.
2. Browse listings from the homepage (`/listings`).
3. Use search and category chips to filter destinations.
4. Open a listing to view details, map location, and guest reviews.
5. If logged in, create a new listing with image upload.
6. If you are the owner, edit or delete your listing.
7. Add reviews on listings; remove only your own reviews.

---

## API Overview

The app uses server-rendered routes (EJS) with REST-style patterns.

### Listing Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/listings` | List all listings (+ optional filters) |
| GET | `/listings/new` | Render create-listing form |
| POST | `/listings` | Create listing (auth + upload + validation) |
| GET | `/listings/:id` | Show listing details |
| GET | `/listings/:id/edit` | Render edit form (owner only) |
| PUT | `/listings/:id` | Update listing (owner only) |
| DELETE | `/listings/:id` | Delete listing (owner only) |

### Review Routes

| Method | Endpoint | Description |
|---|---|---|
| POST | `/listings/:id/reviews` | Create review (auth required) |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete review (author only) |

### Auth Routes

| Method | Endpoint | Description |
|---|---|---|
| GET | `/signup` | Signup page |
| POST | `/signup` | Register user |
| GET | `/login` | Login page |
| POST | `/login` | Authenticate user |
| GET | `/logout` | Logout current session |

---

## Deployment

This application is deployed on **Render** and uses:

- **MongoDB Atlas** for production database hosting
- **Cloudinary** for media asset storage
- Environment variables configured in the Render dashboard

Live URL: https://sstayhub.onrender.com/

---

## Performance & Security Considerations

- **Input validation**: Joi schemas prevent malformed listing/review payloads.
- **Auth & authorization**: Route guards enforce login and ownership checks.
- **Session persistence**: Sessions stored in MongoDB (`connect-mongo`) for resilience across restarts.
- **Async error safety**: `wrapAsync` centralizes promise error propagation.
- **Search hardening**: User search input is regex-escaped before querying.
- **Cloud media storage**: Offloads file handling to Cloudinary.
- **HTTP-only cookies**: Session cookies are marked `httpOnly`.

Recommended production hardening additions:

- Add `helmet`, rate limiting, and CSRF protection
- Add request logging and centralized observability
- Add test coverage and CI pipeline


## Future Improvements

- Booking workflow (date selection, availability, reservations)
- Role-based access control (host/admin privileges)
- Advanced search filters (price range, ratings, amenities)
- User profile pages and listing management dashboard
- Image optimization/transformation presets per device size
- API versioning and optional SPA/mobile client support
- Unit/integration tests (Jest + Supertest) and GitHub Actions CI/CD

---

## Contributing

Contributions are welcome.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit changes (`git commit -m "feat: add your feature"`)
4. Push branch (`git push origin feature/your-feature`)
5. Open a Pull Request with a clear description

Please include reproduction steps and screenshots for UI changes.

---

## License

This project is currently under the **ISC License** (as defined in `package.json`).

If you plan to open-source this project publicly, you may add a dedicated `LICENSE` file for clarity.

