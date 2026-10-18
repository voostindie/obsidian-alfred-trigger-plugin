# Alfred Trigger

Run **Trigger Alfred** while a document is active in Obsidian to open
`alfred://runtrigger/nl.ulso.curator/obsidian?argument=...` through the system URL handler. The bundle ID (`nl.ulso.curator`) and external trigger ID (`obsidian`) can be changed in the plugin settings.

The argument contains a UTF-8 JSON object encoded as base64 and escaped for the URL query. For example, decoding it produces:

```json
{"name":"Example","path":"/Users/you/Vault/Example.md","properties":{"tags":["example"],"status":"draft"}}
```

The name is the active view's display title, and the path is the absolute local path. Each invocation uses the active document, including documents in pop-out windows and reading views. If no document is active, the plugin shows a notice.

In edit mode (including live preview), placing the cursor inside a wikilink such as `[[Note]]`, or selecting all or part of that link, uses the linked note instead. The link must resolve to an existing Markdown note in the vault. Links with aliases, headings, or block references are supported, such as `[[Note#Heading|Label]]`. For a resolved link, the name is the linked note's filename without its extension, and the path and properties come from that note. If the link cannot be resolved, or the selection extends beyond a single link, the active document is used.

When the document has frontmatter, each property is included under `properties`, preserving its value and type. The `properties` field is omitted when no frontmatter is available.

This command sends the document name, path, and frontmatter properties to your local Alfred workflow.

The [Alfred Markdown Curator Workflow](https://github.com/voostindie/alfred-markdown-curator-workflow) I built works great with this plugin!
