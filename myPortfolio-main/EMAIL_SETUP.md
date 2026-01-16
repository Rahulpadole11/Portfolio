# Email Setup Guide - Contact Form Notifications

## How to Receive Contact Messages in Your Email

When users submit the contact form, you'll automatically receive an email notification with their message!

---

## Step 1: Get Gmail App Password

### 1.1 Enable 2-Factor Authentication (Required)
1. Go to: https://myaccount.google.com/security
2. Look for "2-Step Verification" in the left menu
3. Click "2-Step Verification"
4. Follow the steps to enable it (you'll need your phone)

### 1.2 Create App Password
1. After 2FA is enabled, go to: https://myaccount.google.com/apppasswords
2. Select **App**: "Mail"
3. Select **Device**: "Windows Computer" (or your device)
4. Google will generate a 16-character password
5. **Copy this password** (you'll use it in .env)

Example: `abcd efgh ijkl mnop` (with spaces)

---

## Step 2: Update .env File

Open `/backend/.env` and update these lines:

```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop
```

### Example:
```
EMAIL_USER=rahul@gmail.com
EMAIL_PASSWORD=abcd efgh ijkl mnop
```

⚠️ **Important**: 
- Use your actual Gmail address
- Use the 16-character App Password (without spaces)
- Keep this file private (never commit to GitHub)

---

## Step 3: Restart Backend Server

```bash
cd backend
npm run dev
```

The server will now:
- Save contact messages to MongoDB
- Automatically send email to your Gmail inbox

---

## Step 4: Test Email Sending

### Test via Website:
1. Open http://localhost:5173
2. Click "Chat" button (bottom-right)
3. Fill in the form:
   - First Name: John
   - Last Name: Doe
   - Email: john@gmail.com
   - Message: This is a test message!
4. Click "Send"
5. Check your Gmail inbox in 2-3 seconds

### Test via cURL (Alternative):
```bash
curl -X POST http://localhost:5000/api/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@gmail.com",
    "message": "Test message"
  }'
```

---

## Email Template

When a user submits the form, you'll receive an email like:

```
From: your-email@gmail.com
Subject: New Portfolio Message from John Doe

---

New Message from Portfolio Contact Form

Name: John Doe
Email: john@gmail.com

Message:
This is a test message!
```

---

## Troubleshooting

### ❌ Email not sending?

**Problem 1: Gmail blocked the attempt**
- Gmail may block less secure apps
- Solution: Use App Password instead (follow Step 1.2)

**Problem 2: Wrong credentials**
- Check .env file for typos
- Verify you're using App Password, not regular password
- Remove spaces in the password

**Problem 3: 2FA not enabled**
- App Passwords only work with 2FA enabled
- Go to: https://myaccount.google.com/security
- Enable "2-Step Verification" first

**Problem 4: Email in SPAM folder**
- Check your Gmail SPAM folder
- Mark as "Not Spam" to improve delivery

### ✅ Check Backend Logs

When you run `npm run dev`, look for:
```
Email sent successfully
```

If there's an error, it will show in the console.

---

## Alternative: Using Other Email Providers

### Use Outlook/Hotmail:
```
EMAIL_USER=your-email@outlook.com
EMAIL_PASSWORD=your-outlook-password
```

Update backend code to use Outlook:
```javascript
const transporter = nodemailer.createTransport({
  service: 'hotmail',  // Change from 'gmail'
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});
```

### Use SendGrid (Recommended for Production):
1. Sign up at: https://sendgrid.com
2. Get API key
3. Update backend to use SendGrid instead of nodemailer

---

## Security Tips ⚠️

1. **Never commit .env file to GitHub**
   - Already in `.gitignore` ✅

2. **Use App Password, not your regular Gmail password**
   - More secure than storing main password

3. **Regenerate password if compromised**
   - Go to: https://myaccount.google.com/apppasswords
   - Delete the old one and create a new one

4. **Keep it private**
   - Don't share your .env file
   - Don't post credentials in forums/issues

---

## Test Results

After setup, you should see:

**In Browser:**
- ✅ "✓ Message sent successfully!" (after form submission)

**In Email:**
- ✅ Email arrives in your inbox within seconds
- ✅ Shows sender info and complete message

**In Backend Console:**
- ✅ "Email sent successfully" message

**In MongoDB:**
- ✅ Message saved in database
- ✅ Can view in "Contact Messages" section on website

---

## Final Checklist

- [ ] 2FA enabled on Gmail
- [ ] App Password generated
- [ ] .env file updated with EMAIL_USER and EMAIL_PASSWORD
- [ ] Backend server restarted
- [ ] Test message sent and received
- [ ] Email appears in inbox (not spam)

---

## Quick Commands

```bash
# Start backend with email enabled
cd backend && npm run dev

# Check if MongoDB is running
# (Should show: MongoDB connected)

# View all contacts in database
curl http://localhost:5000/api/contacts
```

---

You're all set! 🎉 Contact messages will now be emailed to you automatically!
