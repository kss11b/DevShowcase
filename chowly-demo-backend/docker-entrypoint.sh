#!/bin/bash

if [ "$FLASK_ENV" = "development" ]; then
    echo "Starting Flask for Development"
    flask run --host=0.0.0.0 --port=5000
else
    echo "Starting Flask for Production"
    gunicorn -b :5000 run:app
fi