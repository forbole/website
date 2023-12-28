import type { NextApiRequest, NextApiResponse } from "next";

import { transporter } from "@src/utils/api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (process.env.NODE_ENV === "production") {
      const { source, ...restBody } = req.body;

      const subject =
        {
          devtools:
            "A new customer just wanted to get in touch with us via Developer Tools form",
          enterprise:
            "A new customer just wanted to get in touch with us via Contact form",
          staking: "Inquiry From Forbole Validator Website",
        }[source as string] || "A new enquiry from Forbole's website";

      const email =
        {
          devtools: "rpc@forbole.com",
        }[source as string] || "info@forbole.com";

      await transporter.sendMail({
        ...restBody,
        subject,
        to: process.env.SEND_EMAIL_TO || email,
      });
    }

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    res.status(500).json("Internal Server Error");
  }
};

export default handler;
