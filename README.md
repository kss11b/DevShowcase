This is a project built with NextJS, Flask, and PostgreSQL. It is only configured for local development, but will be deployed to https://kss.bio/ in the near future.
If you want to run this project, you will need to have Docker running on your system.

## Getting Started

To run the front-end add a file called .env.local to the root of the folder chowly-demo-frontend with the following contents:

```bash
HOST_URL="http://localhost:3000"
API_URL="http://chowly-backend-demo:5000"
```

Navigate into the chowly-demo-frontend folder and run:

```bash
docker-compose up --detach
```

This will run the front-end container in the background

Then open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Next, navigate to the chowly-demo-backend folder and run:

```bash
docker-compose up web --detach
```

This will run the back-end flask container in the background

Finally, run:

```bash
docker-compose up db --detach
```

This will run the postgres database in the background
