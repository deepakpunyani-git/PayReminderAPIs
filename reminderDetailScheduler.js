const schedule = require('node-schedule');
const PayReminderDetails = require('./models/PayReminderDetails');
const PayReminder = require('./models/PayReminder');
const User = require('./models/userModel');
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();
// Function to update reminder details status to 'completed' and handle email content
const updateReminderDetailsStatus = async () => {
  try {
    // Get today's date
    const today = new Date();

    const startOfDay = new Date(today); // Create a copy of today's date
    startOfDay.setHours(0, 0, 0, 0); // Set time to the beginning of the day

    const endOfDay = new Date(today); // Create a copy of today's date
    endOfDay.setHours(23, 59, 59, 999); // Set time to the end of the day

    const pendingReminders = await PayReminderDetails.find({
      status: 'pending',
      notificationDate: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    });


    await Promise.all(pendingReminders.map(async (reminderDetail) => {
      const payReminderData = await PayReminder.findById(reminderDetail.payReminderID);
      const user = await User.findById(payReminderData.user);

      if (!payReminderData || !user) {
        console.error('PayReminder or User not found');
        return;
      }

      // Get email subject and content
      let emailSubject = user.emailSubject;
      let emailContent = user.emailContent;

      if (payReminderData.useCustomContent &&  payReminderData.emailSubject!='' && payReminderData.emailContent!='') {
        emailSubject = payReminderData.emailSubject;
        emailContent = payReminderData.emailContent;
      }
      // console.log(payReminderData,"xcvv",emailSubject,emailContent)

      // Replace placeholders with actual values
      emailSubject = emailSubject.replace('[company_name]', user.companyName)
        .replace('[company_email]', user.companyEmail)
        .replace('[company_phone_number]', user.companyPhoneNumber)
        .replace('[amount]', reminderDetail.amount)
        .replace('[client_name]', payReminderData.name);

      emailContent = emailContent.replace('[company_name]', user.companyName)
        .replace('[company_email]', user.companyEmail)
        .replace('[company_phone_number]', user.companyPhoneNumber)
        .replace('[amount]', reminderDetail.amount)
        .replace('[client_name]', payReminderData.name);


        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: payReminderData.email,
          subject: emailSubject,
          text: emailContent,
        };

        const transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT,
          secure: false, 
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
          },
        });
    
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent:', info.response);
          }
        });



      //Update the status to 'completed'
      reminderDetail.status = 'completed';
      await reminderDetail.save();

       // Check if there are any other pending reminders for the same PayReminder
       const remainingPendingReminders = await PayReminderDetails.find({
        status: 'pending',
        payReminderID: reminderDetail.payReminderID,
      });

      // console.log(remainingPendingReminders,remainingPendingReminders.length,reminderDetail.payReminderID)


      if (remainingPendingReminders.length === 0) {
        payReminderData.status = 'completed';
        await payReminderData.save();
        // console.log(remainingPendingReminders.length)
      }


    }));

    console.log('Reminder details status updated to "completed".');
  } catch (error) {
    console.error('Error updating reminder details status:', error);
  }
};

// Schedule task to run at midday (12:00 PM)
schedule.scheduleJob('0 12 * * *', () => {
  console.log('Running midday task...');
  updateReminderDetailsStatus();
});

// Schedule task to run at end of day (11:59 PM)
schedule.scheduleJob('59 23 * * *', () => {
  console.log('Running end of day task...');
  updateReminderDetailsStatus();
});


// Log message indicating that scheduling is complete
console.log('Scheduling tasks...');
updateReminderDetailsStatus() 