import logging
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['POSTGRES_DB'] = os.environ.get('POSTGRES_DB', 'chowly-demo-db')
app.config['POSTGRES_USER'] = os.environ.get('POSTGRES_USER', 'test')
app.config['POSTGRES_PASSWORD'] = os.environ.get('POSTGRES_PASSWORD', 'password')
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{app.config["POSTGRES_USER"]}:{app.config["POSTGRES_PASSWORD"]}@db:5432/{app.config["POSTGRES_DB"]}'
db = SQLAlchemy(app)

from . import routes, models

logging.basicConfig(level=logging.DEBUG)
app.logger.info('Flask app started')