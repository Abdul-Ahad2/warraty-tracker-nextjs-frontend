# 🛡️ Warrantor | Advanced Asset Protection

Warrantor is a premium, cloud-native warranty management suite designed to protect your physical investments. Built with a focus on editorial aesthetics and bank-grade security, it simplifies the lifecycle of your product warranties through automated tracking and intelligent alerting.

---

## ✨ Core Features

### 🔐 High-Security Infrastructure
- **Cognito-Powered Identity**: Secure user authentication and lifecycle management.
- **TOTP Multi-Factor Authentication (MFA)**: Advanced 2FA setup using Google Authenticator or Authy, with custom QR code generation and verification.
- **Security Dashboard**: Integrated password management and secure account teardown protocols.

### 📜 Intelligent Warranty Tracking
- **S3 Receipt Vault**: Securely upload and store receipt photos/product evidence directly to AWS S3.
- **Automated Lifecycle Math**: Automatic calculation of coverage status (Active, Expiring Soon, Expired) using server-time synchronization.
- **Categorical Organization**: Smart tagging for Electronics, Appliances, Automotive, and more.

### 🔔 Smart Notification System
- **Omni-Channel Alerts**: Automated email notifications triggered via CloudWatch Events and EventBridge 30/7/1 days before expiry.
- **In-App Notification Center**: Real-time sync of read/unread states with backend persistency.
- **Proactive Warnings**: Visual cues and badges across the dashboard for urgent asset protection.

### 🎨 Editorial Design System
- **Aesthetic**: "Warm Paper & Editorial Sage" palette designed for professional clarity.
- **UI Components**:
    - **Portaled Modals**: Premium full-screen backdrop blurs with React Portals.
    - **Micro-animations**: Smooth, staggered entrance animations for all data grids.
    - **Adaptive Layouts**: Fully responsive experience from mobile to ultra-wide displays.

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS, Framer Motion
- **Auth**: AWS Amplify (Cognito)
- **Storage**: AWS S3
- **Database**: DynamoDB
- **Compute**: AWS Lambda (Serverless Framework)
- **Mailing**: AWS SES (Simple Email Service)

---

## 🚀 Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Configuration**:
   Create a `.env.local` with your AWS credentials and Amplify configuration:
   ```env
   NEXT_PUBLIC_AWS_REGION=us-east-1
   NEXT_PUBLIC_USER_POOL_ID=...
   NEXT_PUBLIC_USER_POOL_CLIENT_ID=...
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

---

## 📐 Data Architecture

The system uses a **Single Table Design** (or segmented service tables) in DynamoDB for high-speed retrieval of warranty and notification assets, optimized for user-specific indexing.

---

*Designed & Engineered for Visual Excellence.*
