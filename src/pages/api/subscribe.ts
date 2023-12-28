import { sanitize } from "isomorphic-dompurify";
import type { NextApiRequest, NextApiResponse } from "next";

import { transporter } from "@src/utils/api";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { inputs } = req.body;

    if (process.env.NODE_ENV === "production") {
      await transporter.sendMail({
        from: inputs.email,
        html: `
<p>Dear Administrator,</p>
<p>A new customer: ${sanitize(inputs.email)} just subscribed our newsletter.</p>
<p>Regards,</p>
<p>Forbole web system</p>
`,
        subject: `A new customer: ${sanitize(
          inputs.email,
        )} just subscribed our newsletter`,
        to: process.env.SEND_EMAIL_TO || "newsletter@forbole.com",
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
