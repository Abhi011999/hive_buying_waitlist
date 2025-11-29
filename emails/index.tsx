import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface EmailProps {
  userFirstname: string;
}

export const NotionWaitlistEmail = ({ userFirstname }: EmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to the Hive! 🖤</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          src={`https://hivebuying.com/hive-logo.webp`}
          width="320"
          alt="HiveBuying"
          style={logo}
        />
        <Text style={greeting}>Hi there,</Text>
        <Text style={paragraph}>
          Thanks for being awesome!
        </Text>
        <Text style={paragraph}>
          You're now part of the first community that believes buying together means getting fair prices and making smarter choices as one.
        </Text>
        <Text style={paragraph}>
          Thanks for being early. The Hive is forming and you're part of it. 💛
        </Text>
        <Text style={signOff}>
          Best,
          <br />
          The HiveBuying Team
        </Text>
        <Text style={paragraph}>
          You can also reach out via WhatsApp for updates:{" "}
          <a href="https://wa.link/5vzeno" style={link}>
            +91 902 668 4646
          </a>
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          © 2025 HiveBuying. You received this email because you joined our waitlist.
          If you believe this is a mistake, feel free to ignore this email.
        </Text>
      </Container>
    </Body>
  </Html>
);

NotionWaitlistEmail.PreviewProps = {
  userFirstname: "Tyler",
} as EmailProps;

export default NotionWaitlistEmail;

const main = {
  background: "#000000",
  fontFamily: 'figtree, "Helvetica Neue", Helvetica, Arial, sans-serif',
  padding: "40px 0",
  color: "#cccccc",
};

const container = {
  margin: "0 auto",
  padding: "24px 32px 48px",
  backgroundColor: "#000000",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  maxWidth: "600px",
};

const logo = {
  margin: "0 auto",
  paddingBottom: "20px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  color: "#ffffff",
  marginBottom: "24px",
  marginTop: "0",
};

const greeting = {
  fontSize: "18px",
  lineHeight: "28px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  marginBottom: "20px",
};

const link = {
  color: "#F7FF9B",
  textDecoration: "underline",
};

const signOff = {
  fontSize: "16px",
  lineHeight: "26px",
  marginTop: "20px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8c8c8c",
  fontSize: "12px",
};
