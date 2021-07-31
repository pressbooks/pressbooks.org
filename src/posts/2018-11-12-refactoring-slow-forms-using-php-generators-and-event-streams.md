---
title: 'Refactoring Slow Forms Using PHP Generators and Event Streams'
date: '2018-11-12'
tags:
  - Development
---

The form will still be slow but the user experience will be better. The user will see a
progress bar and see status updates in real time. The idea is to refactor something like
this:

`php /\*\* \* A task that takes way too loooooooooooooooooooooooong... \*/ function task() { step1(); step2(); step3(); // step100(); } `

Into this:

`php /\*\* \* Yields a key/value pair \* The key is between 1-100 and represents percentage completed \* The value is a string of information for the user \* \* @return Generator \*/ function taskGenerator() { step1(); yield 1 => 'Completed step 1'; step2(); yield 2 => 'Completed step 2'; step3(); yield 3 => 'Completed step 3'; // step100(); yield 100 => 'Completed step 100'; } /\*\* \* A task that takes way too loooooooooooooooooooooooong... \*/ function task() { foreach ( taskGenerator() as $percentage => $info ) { // Do nothing, this is a compatibility wrapper // that makes our generator work like a regular function } } `

And this:

`js let evtSource = new EventSource(url); `

\## Before

Currently, cloning a book in Pressbooks looks like this:

_Spinning beach ball of death._

The user clicks submit. They wait, and wait, and wait. The task completes and they receive
some feedback saying "everything seems fine". It's not particularly pleasant but it does
the job. Typical open source WordPress installs, and by extension Pressbooks, don't have
the resources, infrastructure, or competence to setup job queues and delegate these kind
of tasks into the background. Everyone lives with it. The end.

Insert cliché "What if I told you" meme here.

\## After

It is possible to use
[PHP Generators](http://php.net/manual/en/language.generators.overview.php) and
[Event Streams](https://developer.mozilla.org/en-US/docs/Web/API/EventSource) to provide
real-time feedback to the web browser.

[![Screen shot of the EventStream console in Google Chrome.](https://pressbooks.org/app/uploads/2018/11/EventStreamConsole.png)](https://pressbooks.org/app/uploads/2018/11/EventStreamConsole.png)

_The EventStream console in Chrome Browser._

With a bit of refactoring cloning a book in Pressbooks, instead, looks like this:

_A status bar with real-time status updates._

The heavy lifting is done by an EventStreams class
([Source code)](https://github.com/pressbooks/pressbooks/blob/c1a41cc95cd49780f39d0f9c1a7148a45b56a439/inc/class-eventstreams.php#L50).

On the front end, the main changes were from this:

`html `

To:

```html

```

And some JavaScript:

`js $( '#pb-cloner-form' ).on( 'submit', function ( e ) { e.preventDefault(); $( '#pb-cloner-button' ).attr( 'disabled', true ); let form = $( '#pb-cloner-form' ); let eventSourceUrl = PB_ClonerToken.ajaxUrl + (PB_ClonerToken.ajaxUrl.includes( '?' ) ? '&' : '?') + $.param( form.find( ':input' ) ); let evtSource = new EventSource( eventSourceUrl ); evtSource.onopen = function () { $( '#pb-cloner-button' ).hide(); }; evtSource.onmessage = function ( message ) { let bar = $( '#pb-sse-progressbar' ); let info = $( '#pb-sse-info' ); let data = JSON.parse( message.data ); switch ( data.action ) { case 'updateStatusBar': bar.progressbar( { value: parseInt( data.percentage, 10 ) } ); info.html( data.info ); break; case 'complete': evtSource.close(); if ( data.error ) { bar.progressbar( { value: false } ); info.html( data.error ); } else { window.location = PB_ClonerToken.redirectUrl; } break; default: break; } }; evtSource.onerror = function () { evtSource.close(); $( '#pb-sse-progressbar' ).progressbar( { value: false } ); $( '#pb-sse-info' ).html( 'EventStream Connection Error' ); }; } ); `
[(Source code)](https://github.com/pressbooks/pressbooks/blob/c1a41cc95cd49780f39d0f9c1a7148a45b56a439/assets/src/scripts/cloner.js#L1)

The JavaScript (and jQuery) snippet:

\- Targets a form with id `pb-cloner-form` - Stops the form from submitting and instead -
Appends all the form data as `$_GET` parameters to an ajax URL then - Passes that ajax URL
to a `new EventSource` - Updates `pb-sse-progressbar` and `pb-sse-info` when it receives
an event stream message - Redirects the user back to where they started when complete

On the back end, the time consuming function was refactored into a generator that yields a
key/value pair. The key is between 1-100 and represents percentage completed. The value is
a string of information meant for the user. Once you have a generator that follows this
convention, pass it to the EventEmitter. The browser will start receiving an event stream.

`php /\*\* \* @return Generator \*/ function loooooooooooooooooooooooongGenerator() { // Pseudo code yield 1 => 'Looking up the source book'; sleep( 2 ); yield 10 => 'Creating the target book'; sleep( 2 ); // .. sleep( 2 ); yield 100 => 'Done'; } $emitter = new \\Pressbooks\\EventStreams(); $emitter->emit( loooooooooooooooooooooooongGenerator() ); `
[(Source code)](https://github.com/pressbooks/pressbooks/blob/c1a41cc95cd49780f39d0f9c1a7148a45b56a439/inc/class-cloner.php#L343).

Key ideas:

\- It's not necessary to wait until the request finishes, PHP can emit event-stream
responses (SSE) back to the web browser while it is working on something. - PHP Generators
are a relatively simple refactoring hack to get those responses back to the browser. -
`sleep()` is only meant as an example of a function call that takes a long time to finish,
don't put `sleep` in your production code, you already knew this, I hope?

\>
[Originally posted on my personal blog](http://kizu514.com/blog/refactor-your-slow-form-using-php-generators-and-event-streams/)
in a more generic format, with references to the movie Office Space, but it turns out
[it was me, doing research for Pressbooks, the whole time.](https://www.youtube.com/watch?v=_sYQeIO6Wyg)

\*\*WIP\*\*:
