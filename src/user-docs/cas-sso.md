---
title: Pressbooks CAS Single Sign-On
permalink: /user-docs/cas-sso/
---

**Table of Contents**

- [Installation / Activation](#installation-activation)
- [Admin interface description](#admin-interface-description)
- [Details of settings behaviours](#details-of-settings-behaviours)
- [User identification mechanism](#user-identification-mechanism)

This documentation is up to date as of version 1.2.4 of the Pressbooks CAS Single Sign-on plugin.

## Installation / Activation

Get the plugin here: <https://github.com/pressbooks/pressbooks-cas-sso>. The CAS SSO plugin should be installed and activated on the network level.

## Admin interface description

Upon activation of the plugin, a submenu item (“CAS”) is added to the Network Admin interface under “Integrations”. This leads to the CAS settings page:

![Screenshot of the CAS settings page](/images/cas-settings.png)

## Required Settings:

To configure CAS:

- CAS Version: 1, 2 or 3
- Server Hostname
- Server Port
- Server Path

Decide the response if the CAS user does not have a Pressbooks account:

- Refuse Access OR Add New User

**Note**: If the Network Setting for "Allow New Registrations" is set to "No Registrations Allowed", the CAS "Add New User" setting will bypass the Network Settings and register new users. For detailed behaviour on new user handling, see the section **[Details of settings behaviour: Add New user / Refuse access behaviour](#add-new-user-refuse-access-behaviour)** below.

## Optional settings:

- **Email Domain**: If user emails correspond to `NetID@university.edu`, the network manager can specify the email domain used in order to generate accurate user emails. If this field is empty, the server hostname is used to generate placeholder email addresses (`username@127.0.0.1`).
- **[Bypass](#bypass-domains-behaviour)**: Bypass the "Limited Email Registrations" and "Banned Email Domains" lists under Network Settings.
- **[Forced redirection](#forced-redirection-behaviour)**: hide the Pressbooks login page and go directly to the insitutions's CAS login page.
- [**Customize Button Text**:](#customize-button-text) This field allows network managers to customize the label of the "Connect via CAS" button in the Pressbooks login page. If Forced Redirection is checked, then this field is disabled.

## Details of settings behaviours:

### Bypass domains behaviour:

If the Bypass option is **OFF**: Pressbooks' Network settings apply for authorized and banned domains.

If the Bypass option is **ON**: The "Limited Email Registrations" and "Banned Email Domains" lists do not apply for CAS logins. Even IF Email domain entered in CAS settings match a Banned Email Domain, user will still be created.

### Forced Redirection behaviour:

If Forced Redirection is **OFF**, the "Sign In" link from the network website homepage brings the user to the Pressbooks login page, where a "Connect via CAS" button is in the login form. Clicking on this button brings the user to the institution's CAS login page.

If Forced Redirection is **ON**, the "Sign In" link brings the user directly to the institution's CAS login page.

### Add New User / Refuse Access behaviour:

1. IF no Pressbooks user exists for this CAS user
   - IF CAS is configured to "Add New User" AND CAS login is successful
     - a Pressbooks user is created with username = NetID and email = NetID@emailDomain
     - user logs into Pressbooks successfully
   - IF CAS is configured to "Refuse Access" AND CAS login is successful
     - an "Unable to log in" error message appears in the Pressbooks login form (if Forced Redirection is OFF) or in its own page (if Forced Redirection is ON) **NOTE**: Once the user has had this error, subsequent clicks on "Connect via CAS" in the login form directly generates the error message, as the user here is already authenticated in CAS. Every time they click "Connect via CAS", CAS will recognize them as authenticated, but Pressbooks will refuse access. To log out, the user must either go to the CAS logout page or close the browser, terminating the CAS session.
2. IF there is an existing Pressbooks user for this CAS user
   - User logs into Pressbooks successfully (no matter whethre CAS is configured to 'Add New User' or 'Refuse Access')

### Customize Button Text

The button can accept multiple lines of text. Add a `<br />` tag in the button text to insert a line break.

## User identification mechanism

When a user logs into Pressbooks via CAS, the CAS plugin will attempt to find an existing user corresponding to the user who is logging in. If it does not find the user, the CAS plugin will either create a new user (if the CAS setting is set to "Create new user") or refuse access (if the CAS setting is set to "Refuse access").

The mechanism to match the CAS user with the Pressbooks user is the following:

1.  Plugin tries to find a user `where wp_usermeta.meta_key = pressbooks_cas_identity and wp_usermeta.meta_value = NETID`
    - Where `NETID` is unique key sent by CAS
2.  If NETID is not found, try to match a user by their email.
    - Because CAS doesn't send us the user email, it only sends a `NETID`, we make up an email using either: `NETID@CAS-OPTIONS-{Email Domain}`, or if that Admin Option is empty: `NETID@{noreply.}CAS-OPTIONS-{Server Hostname}`
    - wp_usermeta.meta_key and wp_usermeta.meta_value are set by the CAS plugin upon first user matching; subsequent logins follow case #1 above.
3.  If neither #1 or #2 are found, create a new user.
    - `wp_usermeta.meta_key` and `wp_usermeta.meta_value` are set by the CAS plugin upon user creation; subsequent logins follow case #1 above.

Network admins creating new users in Pressbooks should use the same email address provided by the CAS identity provider when registering the user so that the CAS plugin will be able to reliably match users logging in via CAS with their manually-created Pressbooks user accounts.

Note: existing usernames are not used for matching purposes.
