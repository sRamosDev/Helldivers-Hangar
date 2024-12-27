# API Documentation

## Overview

This API provides endpoints for managing various entities such as helmets, loadouts, passives, primary weapons,
secondary weapons, throwables, and traits. The API is built using NestJS and TypeORM, and it interacts with a PostgreSQL
database.

## Base URL

The base URL for all API endpoints is: `http://your-domain.com/api`

## Authentication

Some endpoints require authentication using JWT. Include the JWT token in the `Authorization` header as follows:

```
Authorization: Bearer <your-jwt-token>
```

### Endpoints

### Helmets

- **Upload Helmet Image**
    - **POST** `/helmet/image/:id`
    - **Description:** Upload an image for a helmet.
    - **Parameters:**
        - `id` (number): The ID of the helmet.
    - **Body:** Multipart form data with the image file.

- **Create Helmet**
    - **POST** `/helmet`
    - **Description:** Create a new helmet.
    - **Body:**
      ```json
      {
        "name": "string",
        "description": "string",
        "type": "string",
        "armor_rating": "number",
        "speed": "number",
        "stamina_regen": "number",
        "passiveIds": "number[]"
      }
      ```

- **Get All Helmets**
    - **GET** `/helmet`
    - **Description:** Retrieve all helmets.

- **Get Helmet by ID**
    - **GET** `/helmet/:id`
    - **Description:** Retrieve a helmet by its ID.
    - **Parameters:**
        - `id` (string): The ID of the helmet.

- **Update Helmet**
    - **PUT** `/helmet/:id`
    - **Description:** Update a helmet.
    - **Parameters:**
        - `id` (string): The ID of the helmet.
    - **Body:**
      ```json
      {
        "name": "string",
        "description": "string",
        "type": "string",
        "armor_rating": "number",
        "speed": "number",
        "stamina_regen": "number",
        "passiveIds": "number[]"
      }
      ```

### Loadouts

- **Create Loadout**
    - **POST** `/loadouts`
    - **Description:** Create a new loadout.
    - **Body:**
      ```json
      {
        "name": "string",
        "helmetId": "number",
        "armorId": "number",
        "capeId": "number",
        "primaryWeaponId": "number",
        "secondaryWeaponId": "number",
        "throwableId": "number"
      }
      ```

- **Get All Loadouts**
    - **GET** `/loadouts`
    - **Description:** Retrieve all loadouts.

- **Get Loadout by Unique ID**
    - **GET** `/loadouts/:uniqueId`
    - **Description:** Retrieve a loadout by its unique ID.
    - **Parameters:**
        - `uniqueId` (string): The unique ID of the loadout.

- **Update Loadout**
    - **PUT** `/loadouts/:id`
    - **Description:** Update a loadout.
    - **Parameters:**
        - `id` (string): The ID of the loadout.
    - **Body:**
      ```json
      {
        "name": "string",
        "helmetId": "number",
        "armorId": "number",
        "capeId": "number",
        "primaryWeaponId": "number",
        "secondaryWeaponId": "number",
        "throwableId": "number"
      }
      ```

- **Delete Loadout**
    - **DELETE** `/loadouts/:id`
    - **Description:** Delete a loadout.
    - **Parameters:**
        - `id` (string): The ID of the loadout.

### Passives

- **Create Passive**
    - **POST** `/passives`
    - **Description:** Create a new passive.
    - **Body:**
      ```json
      {
        "name": "string",
        "description": "string"
      }
      ```

- **Get All Passives**
    - **GET** `/passives`
    - **Description:** Retrieve all passives.

- **Get Passive by ID**
    - **GET** `/passives/:id`
    - **Description:** Retrieve a passive by its ID.
    - **Parameters:**
        - `id` (number): The ID of the passive.

- **Update Passive**
    - **PUT** `/passives/:id`
    - **Description:** Update a passive.
    - **Parameters:**
        - `id` (number): The ID of the passive.
    - **Body:**
      ```json
      {
        "name": "string",
        "description": "string"
      }
      ```

- **Delete Passive**
    - **DELETE** `/passives/:id`
    - **Description:** Delete a passive.
    - **Parameters:**
        - `id` (number): The ID of the passive.

### Primary Weapons

- **Upload Primary Weapon Image**
    - **POST** `/primary-weapon/image/:id`
    - **Description:** Upload an image for a primary weapon.
    - **Parameters:**
        - `id` (number): The ID of the primary weapon.
    - **Body:** Multipart form data with the image file.

- **Create Primary Weapon**
    - **POST** `/primary-weapon`
    - **Description:** Create a new primary weapon.
    - **Body:**
      ```json
      {
        "name": "string",
        "description": "string",
        "type": "string",
        "damage": "number",
        "capacity": "number",
        "recoil": "number",
        "fireRate": "number",
        "maxPenetration": "object"
      }
      ```

- **Get All Primary Weapons**
    - **GET** `/primary-weapon`
    - **Description:** Retrieve all primary weapons.

- **Get Primary Weapon by ID**
    - **GET** `/primary-weapon/:id`
    - **Description:** Retrieve a primary weapon by its ID.
    - **Parameters:**
        - `id` (string): The ID of the primary weapon.

- **Update Primary Weapon**
    - **PUT** `/primary-weapon/:id`
    - **Description:** Update a primary weapon.
    - **Parameters:**
        - `id` (string): The ID of the primary weapon.
    - **Body:**
      ```json
      {
        "name": "string",
        "description": "string",
        "type": "string",
        "damage": "number",
        "capacity": "number",
        "recoil": "number",
        "fireRate": "number",
        "maxPenetration": "object"
      }
      ```

### Secondary Weapons

- **Upload Secondary Weapon Image**
    - **POST** `/secondary-weapon/image/:id`
    - **Description:** Upload an image for a secondary weapon.
    - **Parameters:**
        - `id` (number): The ID of the secondary weapon.
    - **Body:** Multipart form data with the image file.

- **Create Secondary Weapon**
    - **POST** `/secondary-weapon`
    - **Description:** Create a new secondary weapon.
    - **Body:**
      ```json
      {
        "name": "string",
        "description": "string",
        "type": "string",
        "damage": "number",
        "capacity": "number",
        "recoil": "number",
        "fireRate": "number",
        "maxPenetration": "object"
      }
      ```

- **Get All Secondary Weapons**
    - **GET** `/secondary-weapon`
    - **Description:** Retrieve all secondary weapons.

- **Get Secondary Weapon by ID**
    - **GET** `/secondary-weapon/:id`
    - **Description:** Retrieve a secondary weapon by its ID.
    - **Parameters:**
        - `id` (string): The ID of the secondary weapon.

- **Update Secondary Weapon**
    - **PUT** `/secondary-weapon/:id`
    - **Description:** Update a secondary weapon.
    - **Parameters:**
        - `id` (string): The ID of the secondary weapon.
    - **Body:**
      ```json
      {
        "name": "string",
        "description": "string",
        "type": "string",
        "damage": "number",
        "capacity": "number",
        "recoil": "number",
        "fireRate": "number",
        "maxPenetration": "object"
      }
      ```

### Throwables

- **Upload Throwable Image**
    - **POST** `/throwables/image/:id`
    - **Description:** Upload an image for a throwable.
    - **Parameters:**
        - `id` (number): The ID of the throwable.
    - **Body:** Multipart form data with the image file.

- **Create Throwable**
    - **POST** `/throwables`
    - **Description:** Create a new throwable.
    - **Body:**
      ```json
      {
        "name": "string",
        "description": "string",
        "damage": "number",
        "penetration": "number",
        "outer_radius": "number",
        "fuse_time": "number",
        "traits": "object"
      }
      ```

- **Get All Throwables**
    - **GET** `/throwables`
    - **Description:** Retrieve all throwables.

- **Get Throwable by ID**
    - **GET** `/throwables/:id`
    - **Description:** Retrieve a throwable by its ID.
    - **Parameters:**
        - `id` (number): The ID of the throwable.

- **Update Throwable**
    - **PUT** `/throwables/:id`
    - **Description:** Update a throwable.
    - **Parameters:**
        - `id` (number): The ID of the throwable.
    - **Body:**
      ```json
      {
        "name": "string",
        "description": "string",
        "damage": "number",
        "penetration": "number",
        "outer_radius": "number",
        "fuse_time": "number",
        "traits": "object"
      }
      ```

- **Delete Throwable**
    - **DELETE** `/throwables/:id`
    - **Description:** Delete a throwable.
    - **Parameters:**
        - `id` (number): The ID of the throwable.

### Traits

- **Create Trait**
    - **POST** `/traits`
    - **Description:** Create a new trait.
    - **Body:**
      ```json
      {
        "name": "string",
        "description": "string"
      }
      ```

- **Get All Traits**
    - **GET** `/traits`
    - **Description:** Retrieve all traits.

- **Get Trait by ID**
    - **GET** `/traits/:id`
    - **Description:** Retrieve a trait by its ID.
    - **Parameters:**
        - `id` (number): The ID of the trait.

- **Update Trait**
    - **PUT** `/traits/:id`
    - **Description:** Update a trait.
    - **Parameters:**
        - `id` (number): The ID of the trait.
    - **Body:**
      ```json
      {
        "name": "string",
        "description": "string"
      }
      ```

- **Delete Trait**
    - **DELETE** `/traits/:id`
    - **Description:** Delete a trait.
    - **Parameters:**
        - `id` (number): The ID of the trait.

### Armors

- **Upload Armor Image**
    - **POST** `/armor/image/:id`
    - **Description:** Upload an image for an armor.
    - **Parameters:**
        - `id` (number): The ID of the armor.
    - **Body:** Multipart form data with the image file.

- **Create Armor**
    - **POST** `/armor`
    - **Description:** Create a new armor.
    - **Body:**
      ```json
      {
        "name": "string",
        "description": "string",
        "type": "string",
        "armor_rating": "number",
        "speed": "number",
        "stamina_regen": "number",
        "passiveIds": "number[]"
      }
      ```

- **Get All Armors**
    - **GET** `/armor`
    - **Description:** Retrieve all armors.

- **Get Armor by ID**
    - **GET** `/armor/:id`
    - **Description:** Retrieve an armor by its ID.
    - **Parameters:**
        - `id` (string): The ID of the armor.

- **Update Armor**
    - **PUT** `/armor/:id`
    - **Description:** Update an armor.
    - **Parameters:**
        - `id` (string): The ID of the armor.
    - **Body:**
      ```json
      {
        "name": "string",
        "description": "string",
        "type": "string",
        "armor_rating": "number",
        "speed": "number",
        "stamina_regen": "number",
        "passiveIds": "number[]"
      }
      ```

### Capes

- **Upload Cape Image**
    - **POST** `/cape/image/:id`
    - **Description:** Upload an image for a cape.
    - **Parameters:**
        - `id` (number): The ID of the cape.
    - **Body:** Multipart form data with the image file.

- **Create Cape**
    - **POST** `/cape`
    - **Description:** Create a new cape.
    - **Authentication:** Requires a valid JWT token.
    - **Body:**
      ```json
      {
        "name": "string",
        "description": "string",
        "type": "string",
        "armor_rating": "number",
        "speed": "number",
        "stamina_regen": "number",
        "passiveIds": "number[]"
      }
      ```

- **Get All Capes**
    - **GET** `/cape`
    - **Description:** Retrieve all capes.

- **Get Cape by ID**
    - **GET** `/cape/:id`
    - **Description:** Retrieve a cape by its ID.
    - **Parameters:**
        - `id` (string): The ID of the cape.

- **Update Cape**
    - **PUT** `/cape/:id`
    - **Description:** Update a cape.
    - **Authentication:** Requires a valid JWT token.
    - **Parameters:**
        - `id` (string): The ID of the cape.
    - **Body:**
      ```json
      {
        "name": "string",
        "description": "string",
        "type": "string",
        "armor_rating": "number",
        "speed": "number",
        "stamina_regen": "number",
        "passiveIds": "number[]"
      }
      ```

### Authentication

- **Sign Up**
    - **POST** `/auth/signup`
    - **Description:** Sign up a new user.
    - **Body:**
      ```json
      {
      "name": "string",
      "email": "string",
      "password": "string"
      }
      ```

- **Log In**
    - **POST** `/auth/login`
    - **Description:** Log in a user.
    - **Body:**
      ```json
      {
        "username": "string",
        "password": "string"
      }
      ```


# TODO: Add error handling

## Error Handling

All error responses should follow the structure:

```json
{
  "statusCode": "number",
  "message": "string",
  "error": "string"
}
```

