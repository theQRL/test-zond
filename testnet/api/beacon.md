---
layout: doc
outline: deep
title: "Beacon Node API"
description: "API reference for the QRL Beacon Node"
---

# {{ $frontmatter.title}}

{{ $frontmatter.description}}

::: info Connecting to your node
Enter your node's URL in the server dropdown below to use "Try it out". The default is `http://localhost:3500`.

Your node must be started with CORS enabled for browser requests to work:

```bash
--grpc-gateway-corsdomain "*"
```

Add this flag to your beacon-chain startup command. Only use `"*"` on private or local networks. On public-facing nodes, restrict to specific origins to prevent unauthorized access to your API endpoint.
:::

<script setup>
import SwaggerUI from '../../.vitepress/theme/SwaggerUI.vue'
</script>

<SwaggerUI specUrl="/api/beacon-doc.json" />
