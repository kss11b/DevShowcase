from . import db

class URL(db.Model):
    __tablename__ = 'url'
    id = db.Column(db.Integer, primary_key=True)
    url = db.Column(db.String(2048), nullable=False)
    hash = db.Column(db.String(255), unique=True, nullable=False)

    def __repr__(self):
        return f'<URL {self.url} HASH {self.hash}>'