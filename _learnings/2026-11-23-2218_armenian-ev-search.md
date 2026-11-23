# Armenian "ev" has three spellings, and lowercasing does not unify them

**Symptom:** on the live site, searching `երևան` found 8 entries and `երեւան` found 0.

**Cause:** `և` (U+0587) is one character, while `եւ` is two (U+0565 U+0582). `toLowerCase()` leaves both as they are. Phone keyboards without a `և` key also lead people to type `եվ`.

**Fix:** `src/search.ts` runs `normalize("NFKC")`, which splits `և` into `եւ`, and then replaces `եւ` with `եվ`. The same function runs at build time on the entry text and in the browser on the query.

```text
query        before  after
երևան             8      8
երեւան            0      8
Երեվան            0      8
```

**Consequence:** never lowercase Armenian search text by hand. Any new searchable field goes through `normalize()`.
