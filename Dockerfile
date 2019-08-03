########################################################################################
# Dockerfile para la configuracion de bpnodets - NodeJS - TypeScript - Express - TypeORM 
########################################################################################
# Imagen Base
FROM mhart/alpine-node:6.2.0
ENV PORT=3000

# Install dependencies
RUN npm i pm2 -g && \
    npm i yarn -g 

# Select working directory
# RUN mkdir -p /home/bpnodets
WORKDIR /home/bpnodets

# Copy files to working directory
ADD . /home/bpnodets

# Create environment file
RUN cp example.env.production .env

RUN npm install && \
    npm run-script build

#RUN ls /home/bpnodets/build

EXPOSE 3000

CMD [ "pm2-runtime", "build/app/app.js" ]