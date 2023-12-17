from flask import request, redirect, jsonify
import hashlib
import base64
from . import app, db
from .models import URL

@app.route('/url', methods=['POST'])
def url():
    data = request.json
    redirect_url = data.get('redirectUrl')
    app.logger.info(redirect_url)
    if request.method == 'POST':
        hash_object = hashlib.sha256(redirect_url.encode())
        hash_digest = hash_object.digest()
        base64_encoded = base64.urlsafe_b64encode(hash_digest)

        short_url = base64_encoded[:8].decode()

        app.logger.info(short_url)

        existing_url = URL.query.filter_by(hash=short_url).first()
        
        try:
            app.logger.info(f'Existing: {existing_url}')

            if existing_url is None:
                new_url = URL(url=redirect_url, hash=short_url)
                db.session.add(new_url)
                db.session.commit()

        except ValueError:
            pass
        return jsonify(short_url)

# This could technically live in the below route, but I'm separating concerns for now
@app.route('/url/<tiny_url>', methods=['GET'])
def translate(tiny_url):
    app.logger.info(tiny_url)
    try:
        url_entry = URL.query.filter_by(hash=tiny_url).first()
    except ValueError as err:
        app.logger.error(err)
        # app.logger.info(f"Here is the returned record {url_entry}")

    # app.logger.info('Value before return', url_entry)
    if url_entry is not None:

        # app.logger.info(f"URL found: {url_entry.url}")
        return jsonify(url=url_entry.url)
    else:
        return jsonify(error="URL not found"), 404

