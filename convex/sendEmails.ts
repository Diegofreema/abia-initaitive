import { components } from './_generated/api';
import { Resend } from '@convex-dev/resend';
import { internalMutation } from './_generated/server';
import { v } from 'convex/values';

export const resend: Resend = new Resend(components.resend, {});

export const sendWelcomeEmail = internalMutation({
  args: { email: v.string(), name: v.string() },
  handler: async (ctx, args) => {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ABIA Youth Leadership Academy</title>
    <style>
        /* Reset styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #374151;
            background-color: #f9fafb;
        }

        /* Container */
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        /* Header */
        .header {
            background: linear-gradient(135deg, #059669 0%, #10b981 50%, #34d399 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }

        .header::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
            opacity: 0.3;
            z-index: 1;
        }

        .logo {
            position: relative;
            z-index: 2;
            display: inline-block;
            width: 80px;
            height: 80px;
            background: rgba(255, 255, 255, 0.2);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }

        .logo-text {
            color: white;
            font-size: 28px;
            font-weight: bold;
        }

        .header h1 {
            position: relative;
            z-index: 2;
            color: white;
            font-size: 28px;
            font-weight: bold;
            margin-bottom: 10px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .header p {
            position: relative;
            z-index: 2;
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            max-width: 400px;
            margin: 0 auto;
        }

        /* Content */
        .content {
            padding: 40px 30px;
        }

        .greeting {
            font-size: 24px;
            font-weight: bold;
            color: #1f2937;
            margin-bottom: 20px;
        }

        .message {
            font-size: 16px;
            color: #4b5563;
            margin-bottom: 30px;
            line-height: 1.7;
        }

        /* Status Card */
        .status-card {
            background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
            border: 1px solid #bbf7d0;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
            text-align: center;
        }

        .status-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #059669, #10b981);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
            box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
        }

        .status-title {
            font-size: 18px;
            font-weight: bold;
            color: #065f46;
            margin-bottom: 8px;
        }

        .status-description {
            color: #047857;
            font-size: 14px;
        }

        /* Next Steps */
        .next-steps {
            background-color: #f8fafc;
            border-radius: 12px;
            padding: 30px;
            margin: 30px 0;
        }

        .next-steps h3 {
            color: #1f2937;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 20px;
            display: flex;
            align-items: center;
        }

        .step-icon {
            width: 24px;
            height: 24px;
            background: linear-gradient(135deg, #059669, #10b981);
            border-radius: 6px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
        }

        .steps-list {
            list-style: none;
            padding: 0;
        }

        .steps-list li {
            display: flex;
            align-items: flex-start;
            margin-bottom: 15px;
            padding: 15px;
            background: white;
            border-radius: 8px;
            border-left: 4px solid #10b981;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .step-number {
            background: linear-gradient(135deg, #059669, #10b981);
            color: white;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            font-weight: bold;
            margin-right: 15px;
            flex-shrink: 0;
        }

        .step-content {
            flex: 1;
        }

        .step-title {
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 4px;
        }

        .step-description {
            color: #6b7280;
            font-size: 14px;
        }

        /* CTA Button */
        .cta-section {
            text-align: center;
            margin: 40px 0;
        }

        .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #059669, #10b981);
            color: white;
            text-decoration: none;
            padding: 16px 32px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
            transition: all 0.3s ease;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(5, 150, 105, 0.4);
        }

        /* Program Highlights */
        .highlights {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin: 30px 0;
        }

        .highlight-card {
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 12px;
            padding: 25px;
            text-align: center;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .highlight-icon {
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #dcfce7, #bbf7d0);
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 15px;
        }

        .highlight-title {
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 8px;
        }

        .highlight-description {
            color: #6b7280;
            font-size: 14px;
        }

        /* Footer */
        .footer {
            background-color: #1f2937;
            color: #d1d5db;
            padding: 40px 30px;
            text-align: center;
        }

        .footer-logo {
            display: inline-block;
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #059669, #10b981);
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 20px;
        }

        .footer-logo-text {
            color: white;
            font-size: 20px;
            font-weight: bold;
        }

        .footer h4 {
            color: white;
            font-size: 18px;
            margin-bottom: 15px;
        }

        .footer p {
            font-size: 14px;
            margin-bottom: 20px;
            max-width: 400px;
            margin-left: auto;
            margin-right: auto;
        }

        .social-links {
            margin: 20px 0;
        }

        .social-link {
            display: inline-block;
            width: 40px;
            height: 40px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            margin: 0 8px;
            text-decoration: none;
            color: #d1d5db;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
        }

        .social-link:hover {
            background: rgba(16, 185, 129, 0.2);
            color: #10b981;
        }

        .footer-divider {
            height: 1px;
            background: #374151;
            margin: 30px 0;
        }

        .footer-bottom {
            font-size: 12px;
            color: #9ca3af;
        }

        /* Responsive */
        @media (max-width: 600px) {
            .email-container {
                margin: 0;
                box-shadow: none;
            }

            .header, .content, .footer {
                padding: 30px 20px;
            }

            .header h1 {
                font-size: 24px;
            }

            .greeting {
                font-size: 20px;
            }

            .highlights {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header -->
        <div class="header">
            <div class="logo">
                <span class="logo-text">AY</span>
            </div>
            <h1>ABIA Youth Leadership Academy</h1>
            <p>Empowering the next generation of leaders in Abia State</p>
        </div>

        <!-- Content -->
        <div class="content">
            <div class="greeting">Welcome to the Academy, ${args.name}!</div>
            
            <div class="message">
                Congratulations! We're thrilled to have you join the ABIA Youth Leadership Academy family. Your journey to becoming an exceptional leader starts here, and we couldn't be more excited to be part of your transformation.
            </div>

            <!-- Status Card -->
            <div class="status-card">
                <div class="status-icon">
                    <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                </div>
                <div class="status-title">Registration Received</div>
                <div class="status-description">Your application is currently under review. We'll notify you of the status within 3-5 business days.</div>
            </div>

            <!-- Next Steps -->
            <div class="next-steps">
                <h3>
                    <div class="step-icon">
                        <svg width="16" height="16" fill="white" viewBox="0 0 24 24">
                            <path d="M9 5l7 7-7 7"/>
                        </svg>
                    </div>
                    What Happens Next?
                </h3>
                <ul class="steps-list">
                    <li>
                        <div class="step-number">1</div>
                        <div class="step-content">
                            <div class="step-title">Application Review</div>
                            <div class="step-description">Our team will carefully review your application and supporting documents.</div>
                        </div>
                    </li>
                    <li>
                        <div class="step-number">2</div>
                        <div class="step-content">
                            <div class="step-title">Interview Process</div>
                            <div class="step-description">Selected candidates will be invited for a brief interview to discuss their leadership aspirations.</div>
                        </div>
                    </li>
                    <li>
                        <div class="step-number">3</div>
                        <div class="step-content">
                            <div class="step-title">Program Commencement</div>
                            <div class="step-description">Successful applicants will receive their welcome package and program schedule.</div>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Program Highlights -->
            <div class="highlights">
                <div class="highlight-card">
                    <div class="highlight-icon">
                        <svg width="24" height="24" fill="#059669" viewBox="0 0 24 24">
                            <path d="M12 14l9-5-9-5-9 5 9 5z"/>
                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
                        </svg>
                    </div>
                    <div class="highlight-title">7-days Program</div>
                    <div class="highlight-description">Comprehensive leadership development with ongoing mentorship</div>
                </div>
                <div class="highlight-card">
                    <div class="highlight-icon">
                        <svg width="24" height="24" fill="#059669" viewBox="0 0 24 24">
                            <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                        </svg>
                    </div>
                    <div class="highlight-title">Expert Mentors</div>
                    <div class="highlight-description">Learn from experienced leaders and industry professionals</div>
                </div>
                <div class="highlight-card">
                    <div class="highlight-icon">
                        <svg width="24" height="24" fill="#059669" viewBox="0 0 24 24">
                            <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                        </svg>
                    </div>
                    <div class="highlight-title">Certification</div>
                    <div class="highlight-description">Receive official certification upon successful completion</div>
                </div>
            </div>

            <!-- CTA Section -->
            <div class="cta-section">
                <a href="https://www.ayla.com.ng/user/profile" class="cta-button">View Your Application Status</a>
            </div>

            <div class="message">
                <strong>Important:</strong> Please keep this email for your records. You can check your application status anytime by logging into your profile using the button above.
            </div>
        </div>

        <!-- Footer -->
        <div class="footer">
            <div class="footer-logo">
                <span class="footer-logo-text">AY</span>
            </div>
            <h4>ABIA Youth Leadership Academy</h4>
            <p>Building tomorrow's leaders today through comprehensive leadership development, mentorship, and community engagement programs.</p>
            
            <div class="social-links">
                <a href="#" class="social-link">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                </a>
                <a href="#" class="social-link">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                    </svg>
                </a>
                <a href="#" class="social-link">
                    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                    </svg>
                </a>
            </div>

            <div class="footer-divider"></div>
            
            <div class="footer-bottom">
                <p>© ${new Date().getFullYear()} ABIA Youth Leadership Academy. All rights reserved.</p>
                <p>Umuahia, Abia State, Nigeria | info@ayla.gov.ng</p>
            </div>
        </div>
    </div>
</body>
</html>`;
    await resend.sendEmail(ctx, {
      from: 'Support <info@learnfactory.com.ng>',
      to: args.email,
      subject: 'Welcome to ABIA Youth Leadership Academy',
      html,
    });
  },
});
