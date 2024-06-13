# Preconfirmation Devnet Dashboard

A dashboard for visualizing preconfirmations on the devnet built at ZuBerlin 2024.

## Apps

- `client`: a [Next.js](https://nextjs.org/) web app
- `server`: a Node.js/Express server
- `bot`: a small "spammer" of preconfirmation events

## Demo (a.k.a. "prod")

To run the full demo using docker compose:

```
cd server
docker-compose -f docker-compose.prod.yml up --build
```

## Development

To develop all apps and packages, run the following command:

```
cd server
docker-compose -f docker-compose.dev.yml up --build
```

## More coming soon

More info coming soon :)
