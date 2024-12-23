
# Helldiver's Hangar: Custom Loadout Sharing for Helldivers 2

Helldiver's Hangar is a nascent API designed for Helldivers 2 enthusiasts to share and manage their loadouts. Built with TypeScript, leveraging NestJS for backend structure, and TypeORM for ORM with a PostgreSQL database, this project looks for seamless integration and performance.


## Installation

To get started with Helldiver's Hangar, follow these steps:

1. **Clone the repository:**
   ```
   git clone https://github.com/seba11998/Helldivers-Hangar.git
   ```
   ```
   cd Helldivers-Hangar
   ```

2. **Install dependencies:**
    `npm install`

## Configuration
   
Before you can run the application, you need to configure your environment:

Copy the `.env.example` file to `.env`:

Create a database in PostgreSQL named `helldivershangar` or the name you set in the `.env` file.

Ensure your PostgreSQL database is running and accessible with these credentials.

## Running the Application

Start the application with:
```npm run start ```

The API will be available at http://localhost:3000.

After the first run, use the file populate-db.sql to populate the database with the necessary data.

## License

This project is licensed under the MIT License.



   