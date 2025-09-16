# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

## Home First Impression Upgrade

This portfolio has been upgraded with a stronger "first 5-10 second impression" for recruiters, focusing on immediate proof of value with improved mobile experience.

### What Changed

**Home/Hero Section Restructure:**
- **New layout order**: Name → Subhead → Highlights → CTAs → Project Peek → Scroll Cue
- **Condensed subhead**: Single line that clearly states "I build AI apps and cut mean-time-to-resolution on OCI"
- **3 highlight chips**: "3 AI demos", "↓25% MTTR", "5+ tools shipped" for instant proof
- **Project Peek**: Compact cards showing top 3 projects with thumbnails, metrics, and tech tags
- **Mobile carousel**: Horizontal snap scroll for project cards on mobile
- **Scroll cue**: Subtle animated indicator to guide users to work section

**Enhanced Mobile Experience:**
- **BottomDock component**: Replaces left social rail on mobile with expandable bottom dock
- **Safe area support**: Respects device safe areas (iPhone notches, etc.)
- **Improved touch targets**: All interactive elements meet accessibility standards

**Light Mode Improvements:**
- **Better contrast**: Enhanced text/background contrast ratios for WCAG AA compliance
- **Refined spotlight**: Subtle radial gradient behind name for depth
- **Reduced dot pattern opacity**: Less visual noise in light mode

### New Components Added

1. **`ProjectPeek.jsx`** - Displays 3 featured project cards with responsive grid/carousel
2. **`ScrollCue.jsx`** - Animated scroll indicator linking to work section  
3. **`BottomDock.jsx`** - Mobile-only expandable dock with social links + resume CTA

### How to Add/Edit Project Peek Items

The ProjectPeek component automatically selects the top 3 projects from `src/data/data.js` that have either `live` or `github` URLs. To customize:

1. **Edit project data** in `src/data/data.js`
2. **Ensure projects have**:
   - `image`: Thumbnail path (16:10 aspect ratio recommended)
   - `summary`: Brief description (will be truncated to 2 lines)
   - `tags`: Array of 1-3 tech keywords
   - `live` and/or `github`: At least one link required
3. **Projects automatically get metrics** based on their position (Live demo, Open source, AI-powered)

### Accessibility & Performance Features

- **Keyboard navigation**: All interactive elements are keyboard accessible
- **Focus-visible rings**: Clear focus indicators for keyboard users
- **Lazy loading**: Project images load only when needed
- **Reduced motion support**: Respects `prefers-reduced-motion` setting
- **WCAG AA compliance**: Enhanced contrast ratios and touch targets
- **Semantic HTML**: Proper headings, landmarks, and ARIA labels

### Mobile Responsiveness

- **Snap scrolling**: Smooth horizontal scroll on mobile project carousel  
- **Safe area insets**: Bottom dock respects device-specific safe areas
- **No horizontal overflow**: Prevents unwanted horizontal scrolling
- **Touch-friendly**: 44px minimum touch targets throughout

## Contact Form Integration

The contact form uses a **serverless function** with **Resend API** for secure email delivery.

### Environment Setup

**For local development**, create a `.env.local` file:

```bash
# Resend API Configuration (for serverless functions)
RESEND_API_KEY=your_resend_api_key_here
CONTACT_EMAIL=your@email.com
```

**For Netlify deployment**, set these environment variables in your Netlify dashboard:
- `RESEND_API_KEY`: Your Resend API key
- `CONTACT_EMAIL`: Where you want to receive contact form emails

### Architecture

- **Frontend**: React form with validation and UX improvements
- **Backend**: Netlify serverless function (`/.netlify/functions/contact`)
- **Email Service**: Resend API for reliable delivery
- **Security**: API key kept secure on the server side

### Features

- 🔒 **Secure API calls** via serverless functions (no exposed keys)
- 📧 **Professional HTML emails** with branded styling
- 🛡️ **Rate limiting** (3 submissions per minute per email)
- 🚫 **Spam protection** with honeypot fields
- 📬 **Reply-to headers** for direct responses
- ⚡ **Error handling** with user-friendly messages
- 📊 **Email tracking** with unique message IDs
- 🚀 **CORS compliant** and production ready

### Deployment Setup

1. **Sign up at [resend.com](https://resend.com)**
2. **Verify your domain** (add DNS records)
3. **Generate an API key**
4. **Deploy to Netlify** and set environment variables:
   - Go to Site settings > Environment variables
   - Add `RESEND_API_KEY` with your API key
   - Add `CONTACT_EMAIL` with your email address
5. **Update domain** in the serverless function if needed

### Local Development

To test the serverless function locally:

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Start local development with functions
netlify dev
```

### Email Template

Professional HTML emails include:
- **Gradient header** with portfolio branding
- **Structured fields** (Name, Email, Subject, Message)
- **Timestamp** and easy reply instructions
- **Plain text fallback** for all email clients
- **Custom headers** for email organization

