# Toddler Likes App

A modern application to help parents track their toddler's likes and dislikes. It will be available on both desktop and mobile. It is built with a modern tech stack with Typescript throughout.

---

You can see the current Database plan [here](https://dbdiagram.io/d/Toddler-App-6791708637f5d6cbeb9e6e14).

```mermaid
erDiagram
  role {
      enum_type parent
      enum_type child
  }

  families {
      int4 id PK
      varchar name
      timestamp createdAt
  }

  items {
      int4 id PK
      varchar name
      text description
      int4 createdBy FK
      varchar image
      int4 familyId FK
      timestamp createdAt
      timestamp updatedAt
  }

  items_tags {
      int4 id PK
      int4 itemId FK
      int4 tagId FK
  }

  preferences {
      int4 id PK
      text note
      int4 rating
      date lastChecked
      int4 itemId FK
      int4 userId FK
      int4 familyId FK
      int4 createdBy FK
      timestamp createdAt
      timestamp updatedAt
      index userId_itemId
  }

  tags {
      int4 id PK
      varchar name
      int4 familyId FK
      int4 createdBy FK
      timestamp createdAt
      timestamp updatedAt
      index name_familyId
  }

  users {
      int4 id PK
      varchar avatar
      varchar name
      varchar email
      varchar password
      role role
      int4 familyId FK
      timestamp createdAt
      timestamp updatedAt
  }

  users ||--o{ items : "created"
  families ||--o{ items : "has"
  items ||--o{ items_tags : "has"
  tags ||--o{ items_tags : "in"
  users ||--o{ preferences : "created"
  families ||--o{ preferences : "has"
  items ||--o{ preferences : "has"
  users ||--o{ preferences : "owns"
  users ||--o{ tags : "created"
  families ||--o{ tags : "has"
  families ||--o{ users : "has"
```

## Tech Stack

### Backend

- [NodeJS](https://nodejs.org/en)
- [Express](https://expressjs.com/)
- [Drizzle ORM](https://orm.drizzle.team/)

### Mobile

- [Expo](https://expo.dev/)
- [Gluestack UI](https://gluestack.io/)
- [React Native](https://reactnative.dev/)

## Getting Started

### Create .env file

In each directory, copy the `.env.sample` and create `.env`

```
cp .env.sample .env
```

### Run the backend API

#### Install dependencies

```
npm install
```

#### Run it

```
npm run dev
```

#### Generate and migrate the database tables

```
npx drizzle-kit push
```

#### Seed the database

```
npm run db:seed
```

#### See your database

```
npm run db:studio
```

Visit your [local Drizzle Studio](https://local.drizzle.studio/) to see your data
