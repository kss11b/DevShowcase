FROM python:3.8

WORKDIR /opt/app/

COPY requirements.txt /opt/app/
RUN pip install -r requirements.txt

COPY . /opt/app/

EXPOSE 5000

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

ENTRYPOINT ["docker-entrypoint.sh"]