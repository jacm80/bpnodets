########################################################################################
# Dockerfile para la configuracion de bpnodets - NodeJS - TypeScript - Express - TypeORM 
########################################################################################
# Imagen Base
FROM alpine:3.1
ENV PORT=4000

# Metadata
LABEL "cl.jacm.bpnodets"="jacm"
LABEL maintainer="jacanepa@gmail.com"
LABEL author="Juan A Canepa"
LABEL version="1.0"

# Install dependencies
RUN npm i pm2 -g

# Select working directory
WORKDIR /opt/bpnodets

# Create environment file
RUN cp example.env .env

# Copy files to working directory
ADD . /opt/bpnodets

RUN npm install && \
    npm run-script build

WORKDIR /home/misuraBackend

EXPOSE 4000

CMD [ "pm2-runtime", "src/app/app.ts" ]