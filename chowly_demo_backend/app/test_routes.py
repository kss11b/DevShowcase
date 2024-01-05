import unittest
from flask_testing import TestCase
from urllib.parse import urlparse
from app import app, db
from app.models import URL

class TestRoutes(TestCase):
  def create_app(self):
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    return app

  def setUp(self):
    db.create_all()

  def tearDown(self):
    db.session.remove()
    db.drop_all()

  def test_translate_post(self):
    url = 'https://google.com'
    response = self.client.post('/url', json={'redirectUrl': url})
    self.assertEqual(response.status_code, 200)

    short_url = response.data.decode('utf-8').strip('"\n')

    self.assertEqual(short_url, "BQRvJsg-")

  def test_translate_get(self):
    url = URL(hash='abc', url='http://example.com')
    db.session.add(url)
    db.session.commit()

    response = self.client.get('/url/abc')
    self.assertEqual(response.status_code, 200)

if __name__ == '__main__':
  unittest.main()