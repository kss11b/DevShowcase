FROM python:3.8

WORKDIR /opt/app/

COPY requirements.txt /opt/app/ 

RUN pip install -r requirements.txt

COPY . /opt/app/

EXPOSE 80

VOLUME ["/opt/app"]

CMD ["python", 'run']
# CMD ["flask", "run", "--host=0.0.0.0"]