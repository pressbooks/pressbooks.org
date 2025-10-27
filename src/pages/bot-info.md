---
title: PressbooksBot Information
slug: bot-info
metaDesc: Information about PressbooksBot, the web crawler used by Pressbooks to index and analyze open educational resources and publicly available books.
---

# About PressbooksBot

PressbooksBot is the official web crawler operated by Pressbooks to help improve our services and support the open educational resources community. This bot follows web standards and respects website policies.

## What is PressbooksBot?

PressbooksBot is an automated web crawler that visits publicly accessible Pressbooks sites and other educational content platforms. It helps us:

- Index and catalog open educational resources (OER)
- Monitor the health and availability of Pressbooks networks
- Validate links in Pressbooks books using HEAD requests for external links

## Good Bot Netiquette

PressbooksBot follows good netiquette and web crawling best practices:

### Respects robots.txt

PressbooksBot fully respects the robots.txt standard. If your site's robots.txt file disallows PressbooksBot, it will not crawl your content.

Example robots.txt entry to allow PressbooksBot:
```
User-agent: PressbooksBot
Allow: /
```

Example to disallow PressbooksBot:
```
User-agent: PressbooksBot
Disallow: /
```

### Reasonable Crawl Rate

PressbooksBot operates at a conservative crawl rate to avoid overwhelming servers. It:

- Makes requests at reasonable intervals
- Does not burden servers with excessive traffic
- Respects crawl-delay directives in robots.txt
- Identifies itself clearly in the User-Agent string

### Clear Identification

PressbooksBot identifies itself in the User-Agent string, making it easy to identify in your server logs:

```
PressbooksBot/1.0 (+https://pressbooks.org/bot-info)
```

### Respects Meta Tags

PressbooksBot honors meta robots tags including:
- `noindex` - will not index the page
- `nofollow` - will not follow links on the page
- `noarchive` - will not archive page content

## Privacy and Data Usage

PressbooksBot only crawls publicly accessible content. We:

- Do not attempt to bypass authentication or paywalls
- Do not collect personal information or user data
- Use collected information solely to improve Pressbooks services
- Respect privacy and data protection standards

## Contact Information

If you have questions about PressbooksBot or need to report an issue:

- Email: [support@pressbooks.com](mailto:support@pressbooks.com)
- Forum: [pressbooks.community](https://pressbooks.community/)
- GitHub: [github.com/pressbooks](https://github.com/pressbooks)

## Blocking PressbooksBot

While we believe PressbooksBot provides value to the open education community, we respect your decision to block it. To block PressbooksBot, add the following to your robots.txt:

```
User-agent: PressbooksBot
Disallow: /
```

You can also block it at the server or firewall level by filtering the User-Agent string containing "PressbooksBot".

## Technical Specifications

- **User-Agent:** `PressbooksBot/1.0 (+https://pressbooks.org/bot-info)`
- **Respects:** robots.txt, meta robots tags, crawl-delay directives
- **Protocol Support:** HTTP/1.1, HTTPS
- **Follows Redirects:** Yes (3xx status codes)

## About Pressbooks

Pressbooks is an open-source book content management system used by educational institutions, academic presses, and independent publishers worldwide. Learn more at [pressbooks.org](/).
