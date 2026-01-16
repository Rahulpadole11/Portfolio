import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';

// Create a contact message
export const createContact = async (req, res) => {
  try {
    const { firstName, lastName, email, message } = req.body;

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    console.log('📨 Receiving contact from:', email);

    const contact = new Contact({
      firstName,
      lastName,
      email,
      message,
    });

    await contact.save();
    console.log('✓ Contact saved to database');

    // Send email notification (optional)
    if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
      console.log('🔔 Sending email notification...');
      await sendEmailNotification(contact);
    } else {
      console.log('⚠️  Email credentials not configured');
    }

    res.status(201).json({ 
      message: 'Message sent successfully! Check your email for confirmation.', 
      contact,
      emailSent: true
    });
  } catch (error) {
    console.error('❌ Error creating contact:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Get all contacts
export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single contact by ID
export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a contact
export const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Contact not found' });
    }
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Send email notification
const sendEmailNotification = async (contact) => {
  try {
    console.log('📧 Attempting to send email...');
    console.log('From:', process.env.EMAIL_USER);
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Verify transporter connection
    await transporter.verify();
    console.log('✓ Email service verified');

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
      replyTo: contact.email,
      subject: `New Portfolio Message from ${contact.firstName} ${contact.lastName}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5; border-radius: 8px;">
          <h3 style="color: #333; margin-bottom: 20px;">New Message from Portfolio Contact Form</h3>
          <div style="background-color: white; padding: 15px; border-radius: 5px; border-left: 4px solid #00d9ff;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${contact.firstName} ${contact.lastName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${contact.email}</p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; background-color: #f9f9f9; padding: 10px; border-radius: 3px;">${contact.message}</p>
            <p style="margin-top: 20px; color: #999; font-size: 12px;">Received at: ${new Date().toLocaleString()}</p>
          </div>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✓ Email sent successfully to:', process.env.EMAIL_USER);
    console.log('Message ID:', info.messageId);
    return true;
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    console.error('Error code:', error.code);
    return false;
  }
};
