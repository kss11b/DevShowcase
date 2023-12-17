import logging
from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://test:password@db:5432/chowly-demo-db'
db = SQLAlchemy(app)

from . import routes, models

logging.basicConfig(level=logging.DEBUG)
app.logger.info('Flask app started')