# Astro's file() loader swallows YAML syntax errors

**Symptom:** with a broken line appended to `src/data/items.yaml`, `astro build` printed one red line and still exited 0:

```
[ERROR] [file-loader] Error reading data from src/data/items.yaml
...
2 page(s) built
exit code: 0
```

On the first ever build (no cache) the site came out with zero entries. On later builds it silently kept the entries from the previous good build (stale data).

**Cause:** `node_modules/astro/dist/content/loaders/file.js` (Astro 7.4.13) wraps read + parse in try/catch, logs `Error reading data from ...`, puts the real message at debug level, and returns without touching the store:

```js
} catch (error) {
    logger.error(`Error reading data from ${fileName}`);
    logger.debug(error.message);
    return;
}
```

**Fix:** a tiny integration in `astro.config.mjs` re-parses the file with `yaml` in `astro:build:start`, so the error propagates. Verified: the broken file now fails with exit code 1 and `Nested mappings are not allowed in compact mappings at line 507, column 9`. A check for an empty collection in the page alone was not enough, because of the stale-cache case.

**Consequences:** the usual cause is an unquoted value containing `: ` (colon + space), e.g. `«Neural Networks: Zero to Hero»` inside an Armenian description. README tells contributors to quote such values.

Schema errors (wrong topic, missing field) are a different path and do fail the build on their own: `InvalidContentEntryDataError ... topics.1: Invalid option: expected one of "ai"|"math"|...`.
