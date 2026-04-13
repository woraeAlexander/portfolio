# EmailJS Setup Guide

Your portfolio contact form is now configured to send emails directly to **woraealexander1@gmail.com**. Follow these steps to activate email functionality:

## Step 1: Create an EmailJS Account
1. Go to [emailjs.com](https://www.emailjs.com)
2. Click **Sign Up** and create a free account
3. Verify your email address

## Step 2: Add Gmail as Email Service
1. From the EmailJS dashboard, go to **Email Services**
2. Click **Add Service**
3. Select **Gmail**
4. Follow the authentication prompts to connect your Gmail account (woraealexander1@gmail.com)
5. Copy the **Service ID** (looks like: `service_xxxxxx`)

## Step 3: Create an Email Template
1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Name it: `template_portfolio`
4. Replace the template content with:

```
From: {{from_name}} <{{from_email}}>
Subject: {{subject}}

Message:
{{message}}
```

5. Save the template

## Step 4: Get Your Public Key
1. Go to **Account** → **API Keys**
2. Copy your **Public Key** (starts with a long string)

## Step 5: Update Your Portfolio Code
1. Open `js/script.js`
2. Find this line at the top:
   ```javascript
   emailjs.init("YOUR_PUBLIC_KEY_HERE");
   ```
3. Replace `YOUR_PUBLIC_KEY_HERE` with your actual EmailJS Public Key
4. Save the file

## Step 6: Test It!
1. Open your portfolio website in a browser
2. Go to the **Contact** section
3. Fill out the form and click **Send Message**
4. Check your Gmail inbox - you should receive the message!

## Notes:
- All messages will be sent to woraealexander1@gmail.com
- The first 200 emails per month are FREE on EmailJS
- No backend server needed - everything works from your browser!

## Troubleshooting:
- **Messages not arriving?** Check your Gmail spam folder
- **CORS error?** Make sure you're using the correct Public Key from EmailJS
- **Template not found?** Double-check the Service ID and Template ID match exactly

Need help? Visit: https://www.emailjs.com/docs/
