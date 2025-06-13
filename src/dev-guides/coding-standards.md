---
title: Coding Standards
slug: ''
metaDesc: ''
---
## Validating with PHP Code Sniffer

Instead of reading this why not just let the computer nag you? From the Pressbooks plugin directory:

1.  `composer install`
2.  `composer standards`

Bonus: You can sometimes automatically fix errors by running:

`composer fix` or `vendor/bin/phpcbf --standard=phpcs.ruleset.xml /path/to/your/file`

## Pressbooks Coding Standards (Mandatory)

We enforce [Human Made Coding Standards](https://github.com/humanmade/coding-standards) with the following small tweaks.

- Use `camelCase` for class methods & properties, `UPPERCASE` for class constants, `snake_case` everywhere else.
- We do not strictly enforce commenting requirements.
- [PHP Sessions](https://www.php.net/manual/en/book.session.php) are allowed.

### Write Classes or Namespaced functions, stay out of global space!

We use [PHP Namespaces](https://www.php.net/manual/en/language.namespaces.php). Our namespace is: \`\\Pressbooks\`

- If your Class isn't an Object like `\WP_User`, `\WP_Dependencies`, `\WP_Query` etc., write a library of functions.
- If your Class is a bunch of Static methods and nothing else, write a library of functions.
- Afraid of function name collisions? See Namespaces.

## Pressbooks Coding Recommendations (Optional)

Write accurate [PHPDoc](https://github.com/php-fig/fig-standards/blob/master/proposed/phpdoc.md) styled code comments.

Prefix [action and filter hook](https://developer.wordpress.org/plugins/hooks/) names with `pb_`.

Prefix WP Post meta keys with `pb_`.

Prefix WP User meta keys with `pb_`.

Prefix WP Option names with `pressbooks_`.

Theme files are exempt from the above rules, but should still make an effort to follow them.
