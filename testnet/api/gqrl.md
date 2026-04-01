---
layout: doc
outline: deep
title: "gqrl API"
description: "API reference for the gqrl execution layer JSON-RPC"
---

# {{ $frontmatter.title}}

{{ $frontmatter.description}}

::: info Connecting to your node
Enter your node's URL in the server dropdown below to use "Try it out". The default is `http://localhost:8545`. All methods are JSON-RPC 2.0 POST requests to the same endpoint.

Your node must be started with CORS enabled for browser requests to work:

```bash
--http.corsdomain "*"
```

Add this flag to your gqrl startup command. Only use `"*"` on private or local networks. On public-facing nodes, restrict to specific origins to prevent unauthorized access to your RPC endpoint.
:::

<script setup>
import SwaggerUI from '../../.vitepress/theme/SwaggerUI.vue'
</script>

<SwaggerUI specUrl="/api/gqrl-doc.json" />
