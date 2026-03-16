# Pricing Model

| **Plan** | **Monthly Price** | **Core Features** | **Message Allowance** | **Messaging Channels** | **Limits** |
| --- | --- | --- | --- | --- | --- |
| **Free** | €0 | Order dashboard, buyer tracking page, AfterShip tracking, seller branding, email notifications | 0 included | Email only | Max active orders (e.g. 20–50), no SMS/WhatsApp |
| **Pro** | €29 / month *(example)* | Unlimited orders, buyer tracking page, AfterShip tracking, seller branding, email notifications, SMS + WhatsApp notifications | 200 messages/month included | Email, SMS, WhatsApp | Messaging limited by monthly allowance |

## Messaging Rules

| **Rule** | **Description** |
| --- | --- |
| Message Unit | 1 SMS = 1 message credit |
| Message Unit | 1 WhatsApp notification = 1 message credit |
| Monthly Reset | Included message allowance resets each billing cycle |
| Over-Usage | When message allowance reaches zero, additional messages require a top-up |
| Email | Email notifications remain unlimited |

## Messaging Top-Ups

| **Top-Up Package** | **Messages Included** | **Example Price** |
| --- | --- | --- |
| Small Top-Up | 100 messages | €5 |
| Medium Top-Up | 500 messages | €20 |
| Large Top-Up | 1000 messages | €35 |

## **Internal Usage Tracking (System Logic)**

| **Field** | **Purpose** |
| --- | --- |
| *monthlyMessageAllowance* | Number of messages included in the seller’s plan |
| *messagesUsedThisMonth* | Counter tracking messages sent during the current billing period |
| *topupBalance* | Additional purchased message credits |
| *remainingMessages* | Calculated value used to determine if notifications can be sent |