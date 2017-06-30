FROM node:slim

ADD thoughtbnb.zip /opt/

RUN apt-get update && apt-get install -y unzip bzip2 build-essential python --no-install-recommends

RUN cd /opt/ && \
    unzip thoughtbnb.zip -d /opt/thoughtbnb && \
    cd /opt/thoughtbnb && \
    npm install --production && \
    npm install -g node-mongo-seeds

EXPOSE 3000

CMD cd /opt/thoughtbnb; nohup node bin/www
