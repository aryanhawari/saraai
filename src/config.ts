/**
 * SARA AI Official Configuration
 * Light mode only. Clean, concise copy.
 */

// Centralized APK download link — ships with the site so it always works
export const APK_URL = "/downloads/sara-ai-v1.0.apk";
export const APK_SIZE_MB = 35;

// Contact form — messages land in this Gmail inbox (via FormSubmit relay)
export const CONTACT_EMAIL = "saraaihawari90@gmail.com";
export const CONTACT_FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

// Centralized GitHub Repo URL
export const GITHUB_REPO_URL = "https://github.com/aryanhawari/sara-ai";

// Centralized Social Links
export const socialLinks = {
  facebook: "https://www.facebook.com/share/1DLdGgypM7/",
  instagram: "https://www.instagram.com/aryanhawari786/",
  github: "https://github.com/aryanhawari",
  tiktok: "https://tiktok.com/@aryanhawari786",
  email: "mailto:aryan.hawari.dev@gmail.com",
  emailAddress: "aryan.hawari.dev@gmail.com"
};

// Brand & Developer Identity
export const siteConfig = {
  name: "SARA AI",
  badge: "NEPAL'S AI ASSISTANT",
  tagline: "Your intelligent AI companion",
  description: "SARA AI is a fast, free AI chatbot that chats, reasons, searches the web and remembers context.",
  subTagline: "Built for the future of AI.",
  brandPillars: "Intelligent. Fast. Personal.",
  secondaryTagline: "Your AI. Your assistant.",
  developer: {
    name: "Aryan Hawari",
    title: "Creator & Developer of SARA AI",
    bio: "Aryan is a young developer with one simple dream: to build his own AI. SARA AI is that dream, made real — a fast, friendly and private assistant created by him, for everyone. He designs everything himself: the brain, the thinking, the look. Every update makes SARA smarter, faster and more helpful.",
    avatar: "/assets/developer.jpg",
    location: "Kalaiya, Bara, Nepal",
    skills: [
      "Own AI Engine",
      "AI / ML",
      "React",
      "Python",
      "FastAPI",
      "Android",
      "Kotlin",
      "Web Dev"
    ]
  }
};
