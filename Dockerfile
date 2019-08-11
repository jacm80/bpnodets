########################################################################################
# Dockerfile para la configuracion de bpnodets - NodeJS - TypeScript - Express - TypeORM 
########################################################################################
# Imagen Base
FROM mhart/alpine-node:12
ENV NODE_ENV=production
ENV PORT=3000

# Install dependencies
RUN npm update && \
    npm i yarn -g  && \
    npm i mocha -g && \
    npm i chai -g && \
    npm i typescript -g \
    npm i ts-node -g \
    npm i pm2 -g

WORKDIR /home/bpnodets

# Copy files to working directory
ADD . /home/bpnodets

RUN yarn 

RUN env

EXPOSE 3000:3000

CMD [ "pm2-runtime", "build/app/app.js" ]