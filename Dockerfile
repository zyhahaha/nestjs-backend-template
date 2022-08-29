FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "./"]
RUN npm install pm2 -g
RUN yarn --production --silent
RUN rm package.json yarn.lock
ENV PM2_PUBLIC_KEY pddgkkp9i9yhbdg
ENV PM2_SECRET_KEY vpyx4e86s8t1dwk
COPY ./dist .
EXPOSE 3000
CMD ["pm2-runtime", "main.js"]
# CMD ["node", "main.js"]

