import nodemailer from "nodemailer";
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import handlebars from "handlebars";
import { ThankYouTemplate } from "./designs/thank-you";
import { SendSelectedTempalte } from "./designs/send-selected-tempalte";
import { SendRejectionTemplate } from "./designs/send-rejection-template";

export const sendMail = async ({
  to,
  name,
  subject,
  body,
}: {
  to: string;
  name: string;
  subject: string;
  body: string;
}) => {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT || "587"),
    secure: false,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  } as SMTPTransport.Options);

  try {
    await transport.verify();
  } catch (error) {
    console.error("[MAIL_VERIFY]", error);
    throw new Error("Failed to connect to mail server");
  }

  try {
    const sendResult = await transport.sendMail({
      from: '"no-reply" <no-reply@wukonghiring.com>',
      to,
      subject,
      html: body,
    });
    return sendResult;
  } catch (error) {
    console.error("[MAIL_SEND]", error);
    throw new Error("Failed to send email");
  }
};

export const compileThankyouEmailTemplate = (name: string) => {
  const template = handlebars.compile(ThankYouTemplate);  //

  const htmlBody = template({
    name: name,
  });

  return htmlBody;
};

export const compileSendSelectedEmailTemplate = (name: string) => {
  const template = handlebars.compile(SendSelectedTempalte);

  const htmlBody = template({
    name: name,
  });

  return htmlBody;
};

export const compileSendRejectionEmailTemplate = (name: string) => {
  const template = handlebars.compile(SendRejectionTemplate);

  const htmlBody = template({
    name: name,
  });

  return htmlBody;
};
