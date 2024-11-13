const functions = require("firebase-functions");
const admin = require("firebase-admin");
const sgMail = require("@sendgrid/mail");


admin.initializeApp();

// ضع مفتاح SendGrid API الخاص بك هنا
sgMail.setApiKey("AIzaSyCIejXoOzkIGLy1B5c630IFk4PF9hnG0mM");

// دالة لإرسال رابط إعادة تعيين كلمة المرور
// eslint-disable-next-line max-len
exports.sendPasswordResetEmail = functions.https.onCall(async (data, context) => {
  const {email} = data;

  const msg = {
    to: email,
    from: "yk35876@gmail.com", // ضع البريد الإلكتروني الخاص بك هنا
    subject: "إعادة تعيين كلمة المرور",
    text: "اضغط على الرابط التالي لإعادة تعيين كلمة المرور الخاصة بك.",
    html: `
            <p>اضغط على الرابط التالي لإعادة تعيين كلمة المرور:
            <a href="https://yousef-80958.firebaseapp.com/__/auth/action?mode=action&oobCode=code">إعادة تعيين</a></p>
        `,
  };

  try {
    await sgMail.send(msg);
    return {success: true};
  } catch (error) {
    console.error("Error sending email: ", error);
    return {success: false, error: error.message};
  }
});
