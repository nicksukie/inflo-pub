FROM python:3.7

ENV PYTHONUNBUFFERED 1

RUN mkdir /webapplication

WORKDIR /webapplication

ADD . /webapplication/

RUN pip install -r requirements.txt
