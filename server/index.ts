/* eslint-disable no-shadow */

/* eslint-disable no-console */
import axios from "axios";
import cors from "cors";
import "dotenv-defaults/config";
import express, { Request, Response } from "express";
import DOMPurify from "isomorphic-dompurify";
import next from "next";
import nodemailer from "nodemailer";

const { sanitize } = DOMPurify;

const multer = require("multer");

const whitelist = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (_req: any, file: any, cb: any) => {
    if (!whitelist.includes(file.mimetype)) {
      cb(new Error("file is not allowed"));
      return;
    }

    cb(null, true);
  },
});

interface MulterRequest extends Request {
  files: any;
}

const GhostAdminAPI = require("@tryghost/admin-api");

const isDev = process.env.NODE_ENV !== "production";
const app = next({
  dev: isDev,
});

const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;
const url = process.env.NEXT_PUBLIC_URL;
const transporter = nodemailer.createTransport({
  service: "Mailgun",
  host: "smtp.mailgun.org",
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_GUN_USER,
    pass: process.env.MAIL_GUN_PW,
  },
});

const ghostAdminApi = new GhostAdminAPI({
  url: process.env.NEXT_PUBLIC_GHOST_API,
  // Admin API key goes here
  key: process.env.GHOST_PRIVATE_KEY,
  version: "v3.0",
});

(async () => {
  try {
    await app.prepare();
    const server = express();
    server.use(cors());
    server.use(express.json());

    server.post(
      "/api/contact",
      async (req: Request, res: Response, next: any) => {
        try {
          if (process.env.NODE_ENV === "production") {
            await transporter.sendMail(req.body);
          }
          res.status(200).json({
            success: true,
          });
        } catch (e) {
          next(e);
        }
      },
    );
    // 订阅
    server.post(
      "/api/subscribe",
      async (req: Request, res: Response, next: any) => {
        try {
          const { inputs } = req.body;
          if (process.env.NODE_ENV === "production") {
            await transporter.sendMail({
              from: inputs.email,
              to: "newsletter@forbole.com",
              subject: `A new customer: ${sanitize(
                inputs.email,
              )} just subscribed our newsletter`,
              html: `
              <p>Dear Administrator,</p>
              <p>A new customer: ${sanitize(
                inputs.email,
              )} just subscribed our newsletter.</p>
              <p>Regards,</p>
              <p>Forbole web system</p>
              `,
            });
          }
          res.status(200).json({
            success: true,
          });
        } catch (e) {
          next(e);
        }
      },
    );

    server.post(
      "/api/careers",
      upload.fields([{ name: "resume" }, { name: "coverLetter" }]),
      async (req: Request, res: Response, next: any) => {
        try {
          const inputs = JSON.parse(req.body.inputs);
          if (process.env.NODE_ENV === "production") {
            if ((req as MulterRequest).files.coverLetter !== undefined) {
              await transporter.sendMail({
                from: inputs.email,
                to: "career@forbole.com",
                subject: `[Careers] ${inputs.firstName} ${inputs.lastName}'s Job Application for ${inputs.title}`,
                html: `<p>${sanitize(
                  inputs.message,
                )}</p> <p>Applicant's phone number: +${
                  inputs.countryCode + inputs.number
                }</p>`,
                attachments: [
                  {
                    filename: (req as MulterRequest).files.resume[0]
                      .originalname,
                    content: (req as MulterRequest).files.resume[0].buffer,
                  },
                  {
                    filename: (req as MulterRequest).files.coverLetter[0]
                      .originalname,
                    content: (req as MulterRequest).files.coverLetter[0].buffer,
                  },
                ],
              });
            } else {
              await transporter.sendMail({
                from: inputs.email,
                to: "career@forbole.com",
                subject: `[Careers] ${inputs.firstName} ${inputs.lastName}'s Job Application for ${inputs.title}`,
                html: `<p>${sanitize(
                  inputs.message,
                )}</p> <p>Applicant's phone number: +${
                  inputs.countryCode + inputs.number
                }</p>`,
                attachments: [
                  {
                    filename: (req as MulterRequest).files.resume[0]
                      .originalname,
                    content: (req as MulterRequest).files.resume[0].buffer,
                  },
                ],
              });
            }
          }
          res.status(200).json({
            success: true,
          });
        } catch (e: any) {
          next(e);
        }
      },
    );

    // catch Multer file fields' error
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    server.use((error: any, _req: any, _res: any, _next: any) => {
      console.log("This is the rejected field ->", error.field, error);
    });

    server.post(
      "/api/proxy",
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
      },
    );

    server.post(
      "/api/post-preview",
      async (req: Request, res: Response, next: any) => {
        try {
          const { id } = req?.body || {};
          const [blog] = await ghostAdminApi.posts
            .browse({
              filter: `uuid:${id}`,
              limit: 1,
              include: "tags,authors",
              formats: "html",
            })
            .catch((error: { message: any }) => {
              console.log("the error here");
              console.log(error.message);
            });
          res.status(200).json(blog ?? null);
        } catch (err) {
          next(err);
        }
      },
    );

    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(port, (err?: any) => {
      if (err) throw err;
      console.log(`> App Ready On: ${url}`);
      console.log(`> URL: http://localhost:${port}`);
      console.log(`> ENV: ${process.env.NODE_ENV || "development"}`);
      console.log(`> PORT: ${port}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
