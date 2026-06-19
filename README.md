# Foundterra Website Content Management Guide

Transform your idea into an investor-ready startup in just 4 weeks.

## 🌍 Language System Overview

Your website supports 3 languages:
- **English** (`en`) - Default language
- **Hebrew** (`he`) - Right-to-left language
- **Russian** (`ru`) - Additional language

All content is stored in separate JSON files for each language.

## 📁 Content File Locations

### Main Content Files
- **English**: `src/content/languages/english.json`
- **Hebrew**: `src/content/languages/hebrew.json`
- **Russian**: `src/content/languages/russian.json`

### Legal Content Files
- **Privacy Policy**: `src/content/legal/privacy-[language].json`
- **Terms of Service**: `src/content/legal/terms-[language].json`
- **Cookie Policy**: `src/content/legal/cookies-[language].json`

### Social Links
- **Social Media Links**: `src/content/socialLinks.json`

### Blog Content
- **Blog Posts**: `public/posts/` (Markdown files)
- **Blog Index**: `public/posts/index.json`

---

## 🎯 How to Update Content

### 1. Website Header & Navigation

**File**: `src/content/languages/[language].json`

```json
{
  "navigation": {
    "logo": "Foundterra",
    "services": "Services",
    "packages": "Packages", 
    "process": "Process",
    "about": "About",
    "resources": "Resources",
    "contact": "Contact",
    "languages": {
      "en": "English",
      "he": "עברית", 
      "ru": "Русский"
    }
  }
}
```

### 2. Call-to-Action Buttons

**File**: `src/content/languages/[language].json`

```json
{
  "cta": {
    "bookSession": "Book Free Session",
    "explorePackages": "Explore Packages",
    "calendlyLink": "https://calendly.com/your-link",
    "contactUs": "Contact Us",
    "getStarted": "Get Started",
    "learnMore": "Learn More"
  }
}
```

**Important**: Update `calendlyLink` with your actual Calendly booking URL.

### 3. Hero Section (Main Page Banner)

**File**: `src/content/languages/[language].json`

```json
{
  "hero": {
    "title": "From Idea to Investment Ready",
    "subtitle": "Transform your startup idea into an investor-ready venture in just 8 weeks",
    "description": "Your description here...",
    "features": [
      "Feature 1",
      "Feature 2", 
      "Feature 3"
    ]
  }
}
```

### 4. Bridge Section

**File**: `src/content/languages/[language].json`

```json
{
  "bridge": {
    "title": "Bridge Your Idea to Investors",
    "subtitle": "Your subtitle here...",
    "steps": [
      {
        "title": "Step 1 Title",
        "description": "Step 1 description..."
      }
    ]
  }
}
```

### 5. About Section

**File**: `src/content/languages/[language].json`

```json
{
  "about": {
    "title": "Who is this for?",
    "subtitle": "Perfect for ambitious entrepreneurs who...",
    "profiles": [
      {
        "title": "Profile 1",
        "description": "Description...",
        "characteristics": ["Point 1", "Point 2"]
      }
    ]
  }
}
```

### 6. Services Section

**File**: `src/content/languages/[language].json`

```json
{
  "services": {
    "title": "Our Core Services",
    "subtitle": "Everything you need to become investment-ready",
    "pitchDecks": {
      "title": "Pitch Decks",
      "description": "Professional investor presentations...",
      "features": ["Feature 1", "Feature 2"]
    },
    "mvpDevelopment": {
      "title": "MVP Development", 
      "description": "Build your minimum viable product...",
      "features": ["Feature 1", "Feature 2"]
    },
    "earlyTraction": {
      "title": "Early Traction",
      "description": "Generate initial customer interest...",
      "features": ["Feature 1", "Feature 2"]
    }
  }
}
```

### 7. Packages & Pricing

**File**: `src/content/languages/[language].json`

```json
{
  "packages": {
    "title": "Investment Readiness Packages",
    "subtitle": "Choose the package that fits your startup stage",
    "plans": [
      {
        "name": "Foundation",
        "price": "$2,997",
        "duration": "4 weeks",
        "description": "Perfect for early-stage startups...",
        "features": [
          "Feature 1",
          "Feature 2"
        ],
        "cta": "Get Started"
      },
      {
        "name": "Launch", 
        "price": "$4,997",
        "duration": "6 weeks",
        "popular": true,
        "description": "Most comprehensive package...",
        "features": [
          "Everything in Foundation",
          "Additional Feature 1"
        ],
        "cta": "Choose Launch"
      },
      {
        "name": "Scale",
        "price": "$7,997", 
        "duration": "8 weeks",
        "description": "For startups ready to scale...",
        "features": [
          "Everything in Launch",
          "Premium Feature 1"
        ],
        "cta": "Go Premium"
      }
    ]
  }
}
```

**To Update Prices**: Change the `price` field in each plan.
**To Update Features**: Modify the `features` array.
**To Update Durations**: Change the `duration` field.

### 8. Process Section

**File**: `src/content/languages/[language].json`

```json
{
  "process": {
    "title": "Our 8-Week Investment Readiness Process",
    "subtitle": "A proven methodology to transform your idea",
    "steps": [
      {
        "week": "Week 1-2",
        "title": "Step Title",
        "description": "What happens in this step...",
        "deliverables": ["Deliverable 1", "Deliverable 2"]
      }
    ]
  }
}
```

### 9. Additional Services

**File**: `src/content/languages/[language].json`

```json
{
  "additionalServices": {
    "title": "Additional Services",
    "subtitle": "Extra support for your startup journey",
    "services": [
      {
        "title": "Service Name",
        "description": "Service description...",
        "price": "Price",
        "features": ["Feature 1", "Feature 2"]
      }
    ]
  }
}
```

### 10. Why Choose Us Section

**File**: `src/content/languages/[language].json`

```json
{
  "whyChoose": {
    "title": "Why Choose Foundterra?",
    "subtitle": "Your success is our mission",
    "reasons": [
      {
        "title": "Reason Title",
        "description": "Detailed explanation...",
        "icon": "icon-name"
      }
    ]
  }
}
```

### 11. Resources Section

**File**: `src/content/languages/[language].json`

```json
{
  "resources": {
    "title": "Free Startup Resources",
    "subtitle": "Download our exclusive guides",
    "items": [
      {
        "title": "Resource Title",
        "description": "Resource description...",
        "link": "/path-to-resource",
        "type": "PDF/Guide/Template"
      }
    ],
    "cta": {
      "title": "Get All Resources",
      "description": "Download our complete startup toolkit"
    }
  }
}
```

### 12. FAQ Section

**File**: `src/content/languages/[language].json`

```json
{
  "faq": {
    "title": "Frequently Asked Questions",
    "subtitle": "Everything you need to know",
    "questions": [
      {
        "question": "Your question here?",
        "answer": "Detailed answer here..."
      }
    ]
  }
}
```

### 13. Final Call-to-Action

**File**: `src/content/languages/[language].json`

```json
{
  "finalCTA": {
    "title": "Ready to Transform Your Startup?",
    "cardTitle": "Book Your Free Strategy Session",
    "description": "Get personalized advice...",
    "benefits": [
      "Benefit 1",
      "Benefit 2"
    ],
    "buttonText": "Book Free Session"
  }
}
```

### 14. Footer

**File**: `src/content/languages/[language].json`

```json
{
  "footer": {
    "tagline": "Transforming startup ideas into investment-ready ventures",
    "email": "hello@foundterra.com",
    "sections": [
      {
        "title": "Services",
        "links": [
          {
            "label": "Link Name",
            "href": "/link-path"
          }
        ]
      }
    ],
    "copyright": "© 2024 Foundterra. All rights reserved."
  }
}
```

---

## 🔗 Updating Links and URLs

### Social Media Links

**File**: `src/content/socialLinks.json`

```json
{
  "socialLinks": {
    "telegram": {
      "url": "https://t.me/your-channel",
      "label": "Telegram",
      "enabled": true
    },
    "linkedin": {
      "url": "https://linkedin.com/company/your-company", 
      "label": "LinkedIn",
      "enabled": true
    },
    "discord": {
      "url": "https://discord.gg/your-server",
      "label": "Discord", 
      "enabled": false
    }
  }
}
```

**To Enable/Disable**: Change `enabled` to `true` or `false`
**To Update URLs**: Change the `url` field

### Contact Information

Update email addresses in the footer section of each language file.

---

## 📝 Blog Management

### Adding New Blog Posts

1. **Create markdown file**: `public/posts/your-post-slug.md`
2. **Update blog index**: Add entry to `public/posts/index.json`

**Blog Index Format**:
```json
[
  {
    "slug": "your-post-slug",
    "title": "Your Post Title",
    "excerpt": "Brief description...",
    "date": "2024-01-15",
    "author": "Author Name",
    "coverImage": "/path-to-image.jpg"
  }
]
```

### Blog Post Format

```markdown
---
title: "Your Post Title"
excerpt: "Brief description for SEO"
date: "2024-01-15"
author: "Author Name"
coverImage: "/images/cover.jpg"
---

# Your Post Title

Your content here...
```

---

## 🔧 Technical Notes

### File Format
- All content files use JSON format
- Maintain proper JSON syntax (quotes, commas, brackets)
- Use UTF-8 encoding for special characters

### Language Switching
- The website automatically detects browser language
- Users can manually switch languages using the dropdown
- Right-to-left (RTL) layout automatically applies for Hebrew

### Validation
- Test your changes by switching between languages
- Verify all links work correctly
- Check that special characters display properly

---

## 📞 Support

If you need help updating content:
1. Check JSON syntax using an online JSON validator
2. Test changes in the preview before publishing
3. Keep backup copies of your content files
4. Contact your developer for complex changes

---

## ✅ Quick Checklist

Before publishing content updates:
- [ ] All JSON files have valid syntax
- [ ] Links are working and point to correct URLs
- [ ] Prices and offers are accurate
- [ ] Content is consistent across all languages
- [ ] Special characters display correctly
- [ ] Images load properly
- [ ] Call-to-action buttons link to correct destinations

---

## 💻 Technical Setup

### Technology Stack

This project is built with modern web technologies:

- **React** - Frontend framework
- **TypeScript** - Type safety and developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI component library
- **React Router** - Client-side routing
- **React Hook Form** - Form validation and management
- **Formspree** - Contact form handling

### Getting Started

#### Prerequisites

- Node.js (v18 or higher)
- npm or bun package manager

#### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your API keys and endpoints

4. Start the development server:
   ```bash
   npm run dev
   # or
   bun dev
   ```

#### Environment Variables

Create a `.env.local` file with the following variables:

```
VITE_MAKE_WEBHOOK_URL=your_make_webhook_url
VITE_RESOURCES_URL=your_resources_url
VITE_FORMSPREE_ID=your_formspree_form_id
```

#### Building for Production

```bash
npm run build
# or
bun run build
```

---

*Last updated: December 2024*