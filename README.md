# Helldiver's Hangar: Custom Loadout Sharing for Helldivers 2

Helldiver's Hangar is an API designed for Helldivers 2 enthusiasts to share and manage their loadouts. Built with
TypeScript, leveraging NestJS for backend structure, and TypeORM for ORM with a PostgreSQL database, this project aims
for seamless integration and performance.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Installation

To get started with Helldiver's Hangar, follow these steps:

1. **Clone the repository:**
   ```sh
   git clone https://github.com/seba11998/Helldivers-Hangar.git
   cd Helldivers-Hangar
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

## Configuration

Before you can run the application, you need to configure your environment:

1. Copy the `.env.example` file to `.env`:
   ```sh
   cp .env.example .env
   ```

2. Create a database in PostgreSQL named `helldivershangar` or the name you set in the `.env` file.

3. Ensure your PostgreSQL database is running and accessible with these credentials.

## Running the Application

Start the application with:

```sh
npm run start
```

The API will be available at [http://localhost:3000](http://localhost:3000).

After the first run, use the `populate-db.sql` file to populate the database with the necessary data.

## API Endpoints

Here are the available API endpoints:

### Loadouts

- `POST /loadouts` - Create a new loadout
- `GET /loadouts` - Retrieve all loadouts
- `GET /loadouts/:uniqueId` - Retrieve a specific loadout by unique ID
- `PUT /loadouts/:id` - Update a loadout by ID
- `DELETE /loadouts/:id` - Delete a loadout by ID

### Firing Modes

- `GET /firing-modes` - Retrieve all firing modes
- `GET /firing-modes/:id` - Retrieve a specific firing mode by ID
- `POST /firing-modes` - Create a new firing mode
- `PUT /firing-modes/:id` - Update a firing mode by ID
- `DELETE /firing-modes/:id` - Delete a firing mode by ID

### Throwables

- `POST /throwables/image/:id` - Upload an image for a throwable
- `POST /throwables` - Create a new throwable
- `GET /throwables` - Retrieve all throwables
- `GET /throwables/:id` - Retrieve a specific throwable by ID
- `PUT /throwables/:id` - Update a throwable by ID
- `DELETE /throwables/:id` - Delete a throwable by ID

### Traits

- `POST /traits` - Create a new trait
- `GET /traits` - Retrieve all traits
- `GET /traits/:id` - Retrieve a specific trait by ID
- `PUT /traits/:id` - Update a trait by ID
- `DELETE /traits/:id` - Delete a trait by ID

### Passives

- `GET /passives` - Retrieve all passives
- `GET /passives/:id` - Retrieve a specific passive by ID
- `POST /passives` - Create a new passive
- `PUT /passives/:id` - Update a passive by ID
- `DELETE /passives/:id` - Delete a passive by ID

### Primary Weapons

- `POST /primary-weapon/image/:id` - Upload an image for a primary weapon
- `POST /primary-weapon` - Create a new primary weapon
- `GET /primary-weapon` - Retrieve all primary weapons
- `GET /primary-weapon/:id` - Retrieve a specific primary weapon by ID
- `PUT /primary-weapon/:id` - Update a primary weapon by ID

### Secondary Weapons

- `POST /secondary-weapon/image/:id` - Upload an image for a secondary weapon
- `POST /secondary-weapon` - Create a new secondary weapon
- `GET /secondary-weapon` - Retrieve all secondary weapons
- `GET /secondary-weapon/:id` - Retrieve a specific secondary weapon by ID
- `PUT /secondary-weapon/:id` - Update a secondary weapon by ID

### Helmets

- `POST /helmet/image/:id` - Upload an image for a helmet
- `POST /helmet` - Create a new helmet
- `GET /helmet` - Retrieve all helmets
- `GET /helmet/:id` - Retrieve a specific helmet by ID
- `PUT /helmet/:id` - Update a helmet by ID

### Armors

- `POST /armor/image/:id` - Upload an image for an armor
- `POST /armor` - Create a new armor
- `GET /armor` - Retrieve all armors
- `GET /armor/:id` - Retrieve a specific armor by ID
- `PUT /armor/:id` - Update an armor by ID

### Capes

- `POST /cape/image/:id` - Upload an image for a cape
- `POST /cape` - Create a new cape
- `GET /cape` - Retrieve all capes
- `GET /cape/:id` - Retrieve a specific cape by ID
- `PUT /cape/:id` - Update a cape by ID

### Authentication

- `POST /auth/signup` - Sign up a new user
- `POST /auth/login` - Log in a user

## License

This project is licensed under the MIT License.
