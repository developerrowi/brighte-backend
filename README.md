## Tech Specification
- NodeJS  v20.18.3

## Run using docker 
- `docker-compose build && docker-compose up`

## Manual Installation

- `git@github.com:developerrowi/brighte-backend.git`
- `cd brighte-backend/`
-  add or update `.env` variables in file directory
- `npm install`

## Dev Build 
-  `npm run dev`

## Prod Build
-  `npm run build && npm run start`


## Notes (For dev setup)
-  Make sure to add the `DATABASE_URL` variable in .env
-  sample .env 
-  `
     PORT=3000
     NODE_ENV=development
     DATABASE_URL="postgresql://username:password@localhost:5432/brighte?schema=public"
    `







