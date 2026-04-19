# Pricing Model

| **Plan** | **Monthly Price** | **Core Features**                                                                                                             | **Message Allowance**       | **Messaging Channels** | **Limits**                             |
| -------- | ----------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------- | ---------------------- | -------------------------------------- |
| **Free** | €0                | Order dashboard, buyer tracking page, AfterShip tracking, email notifications                                                 | 0 included                  | Email only             | Max active orders (5), no SMS/WhatsApp |
| **Plus** | €12 / month       | Unlimited orders, buyer tracking page, AfterShip tracking, seller branding, email notifications, SMS + WhatsApp notifications | 200 messages/month included | Email, SMS, WhatsApp   | Messaging limited by monthly allowance |

## Messaging Rules

| **Rule**      | **Description**                                                           |
| ------------- | ------------------------------------------------------------------------- |
| Message Unit  | 1 SMS = 1 message credit                                                  |
| Message Unit  | 1 WhatsApp notification = 1 message credit                                |
| Monthly Reset | Included message allowance resets each billing cycle                      |
| Over-Usage    | When message allowance reaches zero, additional messages require a top-up |
| Email         | Email notifications remain unlimited                                      |

## Messaging Top-Ups

| **Top-Up Package** | **Messages Included** | **Example Price** |
| ------------------ | --------------------- | ----------------- |
| Small Top-Up       | 100 messages          | €5                |
| Medium Top-Up      | 500 messages          | €20               |
| Large Top-Up       | 1000 messages         | €35               |

## **Internal Usage Tracking (System Logic)**

| **Field**                 | **Purpose**                                                      |
| ------------------------- | ---------------------------------------------------------------- |
| _monthlyMessageAllowance_ | Number of messages included in the seller’s plan                 |
| _messagesUsedThisMonth_   | Counter tracking messages sent during the current billing period |
| _topupBalance_            | Additional purchased message credits                             |
| _remainingMessages_       | Calculated value used to determine if notifications can be sent  |
