# Preconfirmation Devnet Dashboard

A dashboard for visualizing preconfirmations on the devnet built at ZuBerlin 2024.

Announcment tweet by Justin Drake found here: https://x.com/drakefjustin/status/1801321889152835758

Demo video from above tweet:

https://github.com/user-attachments/assets/5d6b1dbe-b35c-4b30-8ecf-14425bc7383b

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
