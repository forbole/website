/* eslint-disable no-shadow */
/* eslint-disable no-console */
import express, { Request, Response } from 'express';
import next from 'next';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import axios from 'axios';

dotenv.config();

const isDev = process.env.NODE_ENV !== 'production';
const app = next({
  dev: isDev,
});

const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;
// const url = process.env.NEXT_PUBLIC_URL;
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

(async () => {
  try {
    await app.prepare();
    const server = express();
    server.use(cors());

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

    server.all('*', (req: Request, res: Response) => {
      return handle(req, res);
    });
    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log('> App Ready On:');
      console.log(`> URL: http://localhost:${port}`);
      console.log(`> ENV: ${process.env.NODE_ENV || 'development'}`);
      console.log(`> PORT: ${port}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
