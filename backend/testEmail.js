import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔍 Testing Email Configuration...\n');
console.log('Email:', process.env.EMAIL_USER);
console.log('Password:', process.env.EMAIL_PASSWORD ? '***' + process.env.EMAIL_PASSWORD.slice(-4) : 'NOT SET');

const testEmail = async () => {
  try {
    console.log('\n📧 Creating Gmail transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    console.log('🔐 Verifying connection...');
    await transporter.verify();
    console.log('✅ Connection verified!\n');

    console.log('📤 Sending test email...');
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: '🎉 Test Email - Portfolio Works!',
      html: `
        <div style="font-family: Arial; padding: 20px; background: #f5f5f5; border-radius: 8px;">
          <h2 style="color: #00d9ff;">✅ Email Configuration is Working!</h2>
          <p>Your email setup is correctly configured.</p>
          <p>Time: ${new Date().toLocaleString()}</p>
        </div>
      `,
    });

    console.log('✅ Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('\n✨ Check your inbox at:', process.env.EMAIL_USER);
    process.exit(0);
  } catch (error) {
    console.error('\n❌ ERROR:', error.message);
    console.error('\nCommon issues:');
    console.error('1. 2-Factor Authentication not enabled');
    console.error('2. Wrong App Password (should be 16 characters)');
    console.error('3. Gmail blocking the attempt');
    console.error('\nFix:');
    console.error('1. Go to https://myaccount.google.com/security');
    console.error('2. Enable 2-Step Verification');
    console.error('3. Go to https://myaccount.google.com/apppasswords');
    console.error('4. Generate new App Password and update .env');
    process.exit(1);
  }
};

testEmail();
