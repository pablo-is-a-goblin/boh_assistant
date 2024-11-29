FROM python:3

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

COPY conf/reqs.txt /django_files/

RUN pip install -r /django_files/reqs.txt

WORKDIR /django_files

CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]