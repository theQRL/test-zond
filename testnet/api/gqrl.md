---
layout: doc
outline: deep
title: "gqrl API"
description: "API reference for the gqrl execution layer JSON-RPC"
---

# {{ $frontmatter.title}}

{{ $frontmatter.description}}

::: info
"Try it out" requires a local gqrl node running on `http://localhost:8545`. All methods are JSON-RPC POST requests to the same endpoint.
:::

<script setup>
import SwaggerUI from '../../.vitepress/theme/SwaggerUI.vue'
</script>

<SwaggerUI specUrl="/api/gqrl-doc.json" />
