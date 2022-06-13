/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-shadow */
/* eslint-disable no-console */
import 'dotenv-defaults/config';
import express, { Request, Response } from 'express';
import next from 'next';
import cors from 'cors';
// import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import axios from 'axios';

// require('dotenv').config({ path: require('find-config')('.env') });

// const path = require('path');
// require('dotenv').config({ path: path.resolve(__dirname, '../.env.local') });

// dotenv.config();

const GhostAdminAPI = require('@tryghost/admin-api');

const isDev = process.env.NODE_ENV !== 'production';
const app = next({
  dev: isDev,
});

const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;
const url = process.env.NEXT_PUBLIC_URL;
const transporter = nodemailer.createTransport({
  service: 'Mailgun',
  host: 'smtp.mailgun.org',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_GUN_USER,
    pass: process.env.MAIL_GUN_PW,
  },
});

const ghostAdminApi = new GhostAdminAPI({
  url: 'https://admin.forbole.com',
  // Admin API key goes here
  key: process.env.GHOST_PRIVATE_KEY,
  version: 'v3.0',
});

(async () => {
  try {
    await app.prepare();
    const server = express();
    server.use(cors());
    server.use(express.json());

    // console.log('ghost', process.env.GHOST_PRIVATE_KEY);

    server.post(
      '/api/contact',
      async (req: Request, res: Response, next: any) => {
        try {
          if (process.env.NODE_ENV === 'production') {
            await transporter.sendMail(req.body);
          }
          res.status(200).json({
            success: true,
          });
        } catch (e) {
          next(e);
        }
      }
    );

    server.post(
      '/api/proxy',
      async (req: Request, res: Response, next: any) => {
        try {
          const url = req?.body?.url;
          if (url) {
            const { data } = await axios.get(req?.body?.url);
            res.status(200).json(data);
          }
          next();
        } catch (err) {
          next(err);
        }
      }
    );

    server.post(
      '/api/post-preview',
      async (req: Request, res: Response, next: any) => {
        try {
          const { id } = req?.body;
          const [blog] = await ghostAdminApi.posts
            .browse({
              filter: `uuid:${id}`,
              limit: 1,
              include: 'tags,authors',
              formats: 'html',
            })
            .catch((error: { message: any }) => {
              console.log('the error here');
              console.log(error.message);
            });
          res.status(200).json(blog ?? null);
        } catch (err) {
          next(err);
        }
      }
    );

    server.all('*', (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> App Ready On: ${url}`);
      console.log(`> URL: http://localhost:${port}`);
      console.log(`> ENV: ${process.env.NODE_ENV || 'development'}`);
      console.log(`> PORT: ${port}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
