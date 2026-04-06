/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

const SITE_NAME = "Unfold HR AI"

interface ContactConfirmationProps {
  name?: string
}

const ContactConfirmationEmail = ({ name }: ContactConfirmationProps) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>Thanks for reaching out to {SITE_NAME}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Text style={logo}>{SITE_NAME}</Text>
        <Hr style={hr} />
        <Heading style={h1}>
          {name ? `Thank you, ${name}!` : 'Thank you for reaching out!'}
        </Heading>
        <Text style={text}>
          We've received your message and our team will be in touch within 48 hours.
        </Text>
        <Text style={text}>
          In the meantime, feel free to explore our AI agents and training modules to see how we can help transform your HR operations.
        </Text>
        <Text style={footer}>
          Best regards,<br />
          The {SITE_NAME} Team
        </Text>
      </Container>
    </Body>
  </Html>
)

export const template = {
  component: ContactConfirmationEmail,
  subject: 'Thanks for contacting Unfold HR AI',
  displayName: 'Contact form confirmation',
  previewData: { name: 'Jane' },
} satisfies TemplateEntry

const main: React.CSSProperties = {
  backgroundColor: '#ffffff',
  fontFamily: "'Instrument Sans', Arial, sans-serif",
}

const container: React.CSSProperties = {
  padding: '40px 25px',
  maxWidth: '560px',
  margin: '0 auto',
}

const logo: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 700,
  color: 'hsl(217, 26%, 15%)',
  letterSpacing: '-0.02em',
  margin: '0 0 24px',
}

const hr: React.CSSProperties = {
  borderColor: 'hsl(218, 26%, 91%)',
  margin: '0 0 32px',
}

const h1: React.CSSProperties = {
  fontSize: '22px',
  fontWeight: 'bold',
  color: 'hsl(217, 26%, 15%)',
  margin: '0 0 20px',
  lineHeight: '1.3',
}

const text: React.CSSProperties = {
  fontSize: '15px',
  color: 'hsl(215, 16%, 47%)',
  lineHeight: '1.6',
  margin: '0 0 20px',
}

const footer: React.CSSProperties = {
  fontSize: '14px',
  color: 'hsl(215, 16%, 47%)',
  margin: '32px 0 0',
  lineHeight: '1.6',
}
