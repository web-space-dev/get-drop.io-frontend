# Functional Requirements

# FR1 - User Account & Authentication

Defines the **seller authentication lifecycle**, ensuring only authorised users can access the seller dashboard and order management system.

| **ID** | **Requirement**      | **Description**                                                               |
| ------ | -------------------- | ----------------------------------------------------------------------------- |
| FR1.1  | User Registration    | Seller can create an account using a unique email and password.               |
| FR1.2  | User Login           | Seller can authenticate using valid credentials.                              |
| FR1.3  | Forgot Password      | Seller can request password reset via email link.                             |
| FR1.4  | Reset Password       | Seller can set a new password using a valid reset token.                      |
| FR1.5  | Session Management   | System maintains secure authenticated sessions and allows logout.             |
| FR1.6  | Account Verification | System optionally requires email verification before full account activation. |
| FR1.7  | Login Rate Limiting  | System limits repeated failed login attempts to prevent brute force attacks   |

# FR2 - Order Management

Covers the **core operational workflow** of Drop. The seller logs orders, manages them in a dashboard, and shares tracking links with buyers.

| **ID** | **Requirement**         | **Description**                                                                                                                                                      |
| ------ | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR2.1  | Create Order            | Seller can create an order including ID, buyer name, phone/email, tracking number/link, address, notes and initial status (active by default).                       |
| FR2.2  | View Orders             | Seller can view all orders in a dashboard with Active and Completed groupings.                                                                                       |
| FR2.3  | Update Order            | Seller can edit order details and update the order status.                                                                                                           |
| FR2.4  | Delete / Archive Order  | Seller can archive or remove orders according to system policy.                                                                                                      |
| FR2.5  | Status Timeline         | System stores and displays an order-level chronological history of status updates and notification events.                                                           |
| FR2.6  | Search Orders           | Seller can search orders using buyer name, tracking number, or reference ID.                                                                                         |
| FR2.7  | Filter Orders           | Seller can filter orders by status, date range, or activity state.                                                                                                   |
| FR2.8  | Buyer Tracking Link     | System generates a unique public tracking page link for each order.                                                                                                  |
| FR2.9  | Order Type              | System supports two order types: Outbound (buyer-facing with notifications and tracking link) and Inbound (internal tracking-only, no buyer communication required). |
| FR2.10 | Dashboard Activity Feed | System provides a chronological activity feed of events across all orders, including order creation, status updates and notification events.                         |

# FR3 - **Shipment Tracking Integration**

Enables live shipment visibility, allowing Drop to pull updates from shipping providers while still allowing manual updates when necessary.

| **ID** | **Requirement**            | **Description**                                                                                                                        |
| ------ | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| FR3.1  | AfterShip Integration      | System integrates with the AfterShip API to retrieve shipment tracking information for supported carriers.                             |
| FR3.2  | Tracking Status Sync       | System retrieves and updates shipment status from AfterShip using the provided tracking number.                                        |
| FR3.3  | Tracking Activity Timeline | System stores and displays a chronological timeline of shipment activities returned from AfterShip.                                    |
| FR3.4  | Manual Activity Log        | Seller can manually add status updates or activity notes to an order timeline.                                                         |
| FR3.5  | Manual Status Override     | Seller can manually update order status when automatic tracking data is unavailable or inaccurate.                                     |
| FR3.6  | Tracking Display           | Shipment tracking data is made available to the buyer tracking page, including current status, activity timeline and last update time. |
| FR3.7  | API Error Handling         | System logs AfterShip API errors and retries failed tracking updates.                                                                  |
| FR3.8  | Tracking Refresh Policy    | System periodically refreshes tracking status from AfterShip according to defined polling intervals                                    |

# **FR4 — Plans & Billing**

Enables monetisation and subscription management, allowing Drop to enforce feature access and usage limits per plan.

| **ID** | **Requirement**       | **Description**                                                                                                                |
| ------ | --------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| FR4.1  | Plan Catalogue        | System defines available plans (Free and Plus) and associated limits/features.                                                 |
| FR4.2  | Stripe Checkout       | Sellers can subscribe or upgrade using Stripe Checkout.                                                                        |
| FR4.3  | Subscription Webhooks | System processes Stripe events such as subscription creation, renewal, cancellation or failure.                                |
| FR4.4  | Plan Enforcement      | System enforces usage limits and feature availability according to the user’s active plan.                                     |
| FR4.5  | Billing Portal        | Seller can manage payment methods and cancel subscription via Stripe billing portal.                                           |
| FR4.6  | Downgrade Handling    | System applies Free plan limits when a subscription expires or is downgraded.                                                  |
| FR4.7  | Monthly Credits       | Plus Plan includes a monthly allocation of credits that reset each billing cycle.                                              |
| FR4.8  | Credit Top Up         | Sellers can purchase additional message credits as one-time top-ups, with available package options varying by active plan.    |
| FR4.9  | Credit Consumption    | The system consumes subscription credits first, then purchased credits. Purchased credits do not reset based on billing cycle. |
| FR4.10 | Active Order Limit    | System enforces a maximum number of active orders per plan (Free: 5, Plus: 25)                                                 |

# **FR5 — Notifications**

Handles buyer communication, ensuring customers receive updates through multiple channels when order status changes.

| **ID** | **Requirement**                           | **Description**                                                                                                                                                      |
| ------ | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR5.1  | Notification Selection                    | The seller can choose which notifications to enable (Email, SMS, WhatsApp) per order.                                                                                |
| FR5.2  | Email Notifications                       | System sends email notifications to buyers when updates occur and email is provided. Email notifications cost no credits.                                            |
| FR5.3  | SMS Notifications                         | System sends SMS notifications for supported plans where a phone number exists. A SMS notification consumes one credit and will not send if the user has no credits. |
| FR5.4  | WhatsApp Notifications                    | System sends WhatsApp notifications where supported by integration. A WhatsApp notification consumes one credit and will not send if the user has no credits.        |
| FR5.5  | Notification Triggers                     | Notifications are triggered automatically on defined order or shipment status changes and can also be triggered manually by the seller.                              |
| FR5.6  | Notification Send Logging                 | System records notification send attempts and outcomes required for product operation, support and credit enforcement.                                               |
| FR5.7  | Notification Limits (SMS & WhatsApp only) | System limits these channels based on the available credits.                                                                                                         |
| FR5.8  | Message Templates                         | System supports configurable templates with dynamic variables (name, status, link).                                                                                  |
| FR5.9  | Authentication Emails                     | System sends emails for authentication workflows (verification, reset password, etc.).                                                                               |
| FR5.10 | Notification Deduplication                | System prevents duplicate notifications being sent for identical status updates within a defined window.                                                             |
| FR5.11 | Billing & Usage Emails                    | System sends the seller important usage information (e.g. low credit warning, subscription created, failed, receipts)                                                |

# **FR6 — Seller Branding**

| **ID** | **Requirement**            | **Description**                                                                                                                                                                                                               |
| ------ | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR6.1  | Seller Profile Branding    | All sellers can define their business name. Plus plan sellers can upload a logo for use on buyer-facing experiences.                                                                                                          |
| FR6.2  | Brand Colour Configuration | A plus seller can configure a primary brand colour used in the buyer tracking page interface.                                                                                                                                 |
| FR6.3  | Branded Tracking Page      | Buyer-facing tracking pages display seller branding according to the seller’s active plan. Free plan pages display the seller business name alongside Drop branding, while Plus plan pages can include logo and colour theme. |
| FR6.4  | Branding Preview           | Seller can preview how their branding will appear on buyer tracking pages.                                                                                                                                                    |
| FR6.5  | Branding Fallback          | If branding is not configured, the system displays default Drop branding.                                                                                                                                                     |
| FR6.6  | Branding Storage           | System securely stores branding assets (logos, colour settings) linked to the seller account.                                                                                                                                 |
| FR6.7  | Logo Validation            | System validates uploaded logos for supported formats and file size limits.                                                                                                                                                   |

# **FR7 — Buyer Tracking Page**

| **ID** | **Requirement**             | **Description**                                                                                             |
| ------ | --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| FR7.1  | Public Tracking Page        | System generates a public buyer-facing tracking page for each order.                                        |
| FR7.2  | Shipment Status Display     | Page displays current shipment status and shipment activity timeline in a simplified buyer-friendly format. |
| FR7.3  | Tracking Updates            | Page reflects real-time or recently synced tracking updates.                                                |
| FR7.4  | Shipment Summary            | Page displays key shipment details such as order reference and current status.                              |
| FR7.5  | Mobile Responsiveness       | Buyer page is fully responsive across desktop and mobile devices.                                           |
| FR7.6  | Secure Access Link          | Tracking page is accessible only via a unique order tracking link.                                          |
| FR7.7  | Seller Branding Integration | Page applies seller branding (logo, colour, name) when configured.                                          |

# **FR8 — Admin Dashboard (Platform Administration)**

| **ID** | **Requirement**         | **Description**                                                                                        |
| ------ | ----------------------- | ------------------------------------------------------------------------------------------------------ |
| FR8.1  | Admin Authentication    | Platform administrators can securely access the admin dashboard using approved authentication methods. |
| FR8.2  | Seller Management       | Admin can view all registered seller accounts and account details.                                     |
| FR8.3  | Order Overview          | Admin can view all orders across the platform for monitoring and support.                              |
| FR8.4  | Subscription Monitoring | Admin can view seller subscription plans and payment status.                                           |
| FR8.5  | Usage Monitoring        | Admin can view platform metrics such as total sellers, orders and active subscriptions.                |
| FR8.6  | Account Suspension      | Admin can suspend or disable seller accounts if required.                                              |
| FR8.7  | Support Lookup          | Admin can search sellers, orders or tracking numbers for support queries.                              |
