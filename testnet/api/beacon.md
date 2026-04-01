---
layout: doc
outline: deep
title: "Beacon Node API"
description: "API reference for the QRL Beacon Node"
---

# {{ $frontmatter.title}}

{{ $frontmatter.description}}

::: info
"Try it out" requires a local beacon node running on `http://localhost:3500`.
:::

<script setup>
import SwaggerUI from '../../.vitepress/theme/SwaggerUI.vue'
</script>

<SwaggerUI specUrl="/api/beacon-doc.json" />
