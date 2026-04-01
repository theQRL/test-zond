<template>
  <div ref="swaggerContainer" class="swagger-ui-container"></div>
</template>

<script setup>
import { ref, onMounted, defineProps } from 'vue'

const props = defineProps({
  specUrl: { type: String, required: true }
})

const swaggerContainer = ref(null)

onMounted(async () => {
  const cssLink = document.createElement('link')
  cssLink.rel = 'stylesheet'
  cssLink.href = 'https://unpkg.com/swagger-ui-dist@5/swagger-ui.css'
  document.head.appendChild(cssLink)

  const script = document.createElement('script')
  script.src = 'https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js'
  script.onload = () => {
    window.SwaggerUIBundle({
      url: props.specUrl,
      domNode: swaggerContainer.value,
      presets: [window.SwaggerUIBundle.presets.apis],
      layout: 'BaseLayout',
      deepLinking: true,
      defaultModelsExpandDepth: 0
    })
  }
  document.head.appendChild(script)
})
</script>

<style scoped>
.swagger-ui-container {
  margin: 0 -24px;
}

/* Hide the default Swagger topbar */
:deep(.swagger-ui .topbar) {
  display: none;
}

/* ---- Typography ---- */
:deep(.swagger-ui) {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .info h2),
:deep(.swagger-ui .info h3),
:deep(.swagger-ui .info h4),
:deep(.swagger-ui .opblock-tag),
:deep(.swagger-ui .opblock-summary-method),
:deep(.swagger-ui .tab li),
:deep(.swagger-ui table thead tr th),
:deep(.swagger-ui .parameter__name),
:deep(.swagger-ui .response-col_status),
:deep(.swagger-ui .model-title) {
  font-family: var(--vp-font-family-base);
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .info .title) {
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .info p),
:deep(.swagger-ui .info li),
:deep(.swagger-ui .opblock-description-wrapper p),
:deep(.swagger-ui .opblock-external-docs-wrapper p),
:deep(.swagger-ui .response-col_description__inner p),
:deep(.swagger-ui .parameter__type),
:deep(.swagger-ui .response-col_description) {
  color: var(--vp-c-text-2);
}

:deep(.swagger-ui a.nostyle),
:deep(.swagger-ui .info a) {
  color: var(--vp-c-brand-1);
}

/* ---- Backgrounds ---- */
:deep(.swagger-ui .scheme-container),
:deep(.swagger-ui .opblock .opblock-section-header) {
  background: var(--vp-c-bg-soft);
  box-shadow: none;
}

:deep(.swagger-ui .info) {
  margin: 20px 0;
}

/* ---- Operation blocks ---- */
:deep(.swagger-ui .opblock) {
  border-color: var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  box-shadow: none;
}

:deep(.swagger-ui .opblock .opblock-summary) {
  border-bottom-color: var(--vp-c-divider);
}

:deep(.swagger-ui .opblock .opblock-summary-description) {
  color: var(--vp-c-text-2);
}

/* GET */
:deep(.swagger-ui .opblock.opblock-get) {
  border-color: var(--vp-c-tip-1);
  background: rgba(74, 175, 255, 0.08);
}
:deep(.swagger-ui .opblock.opblock-get .opblock-summary-method) {
  background: var(--vp-c-tip-1);
}
:deep(.swagger-ui .opblock.opblock-get .opblock-summary) {
  border-bottom-color: rgba(74, 175, 255, 0.2);
}

/* POST */
:deep(.swagger-ui .opblock.opblock-post) {
  border-color: #49cc90;
  background: rgba(73, 204, 144, 0.08);
}
:deep(.swagger-ui .opblock.opblock-post .opblock-summary-method) {
  background: #49cc90;
}
:deep(.swagger-ui .opblock.opblock-post .opblock-summary) {
  border-bottom-color: rgba(73, 204, 144, 0.2);
}

/* DELETE */
:deep(.swagger-ui .opblock.opblock-delete) {
  border-color: var(--vp-c-danger-1);
  background: rgba(249, 62, 62, 0.08);
}
:deep(.swagger-ui .opblock.opblock-delete .opblock-summary-method) {
  background: var(--vp-c-danger-1);
}
:deep(.swagger-ui .opblock.opblock-delete .opblock-summary) {
  border-bottom-color: rgba(249, 62, 62, 0.2);
}

/* PUT */
:deep(.swagger-ui .opblock.opblock-put) {
  border-color: var(--vp-c-brand-1);
  background: rgba(255, 167, 41, 0.08);
}
:deep(.swagger-ui .opblock.opblock-put .opblock-summary-method) {
  background: var(--vp-c-brand-1);
}
:deep(.swagger-ui .opblock.opblock-put .opblock-summary) {
  border-bottom-color: rgba(255, 167, 41, 0.2);
}

/* ---- Section tags ---- */
:deep(.swagger-ui .opblock-tag) {
  border-bottom-color: var(--vp-c-divider);
}

:deep(.swagger-ui .opblock-tag:hover) {
  color: var(--vp-c-brand-1);
}

/* ---- Tables ---- */
:deep(.swagger-ui table thead tr td),
:deep(.swagger-ui table thead tr th) {
  border-bottom-color: var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .parameters-col_description input),
:deep(.swagger-ui .parameters-col_description select),
:deep(.swagger-ui .parameters-col_description textarea) {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

/* ---- Response section ---- */
:deep(.swagger-ui .responses-inner h4),
:deep(.swagger-ui .responses-inner h5),
:deep(.swagger-ui .response-col_status) {
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .response-col_links) {
  color: var(--vp-c-text-2);
}

/* ---- Code / model blocks ---- */
:deep(.swagger-ui .highlight-code),
:deep(.swagger-ui .microlight),
:deep(.swagger-ui .model-box),
:deep(.swagger-ui .example) {
  background: var(--vp-c-bg-alt) !important;
  color: var(--vp-c-text-1);
  border-radius: 6px;
}

:deep(.swagger-ui pre.microlight) {
  background: var(--vp-c-bg-alt) !important;
  color: var(--vp-c-text-1);
  border-radius: 6px;
  padding: 12px;
}

:deep(.swagger-ui .model) {
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .model .property.primitive) {
  color: var(--vp-c-text-2);
}

:deep(.swagger-ui .prop-type) {
  color: var(--vp-c-brand-1);
}

/* ---- Buttons ---- */
:deep(.swagger-ui .btn) {
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .btn:hover) {
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

:deep(.swagger-ui .btn.execute) {
  background: var(--vp-c-brand-1);
  color: #fff;
  border-color: var(--vp-c-brand-1);
}

:deep(.swagger-ui .btn.authorize) {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

:deep(.swagger-ui .btn.authorize svg) {
  fill: var(--vp-c-brand-1);
}

/* ---- Inputs ---- */
:deep(.swagger-ui input[type=text]),
:deep(.swagger-ui textarea),
:deep(.swagger-ui select) {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

/* ---- Expand/collapse arrows ---- */
:deep(.swagger-ui .expand-operation svg),
:deep(.swagger-ui .arrow) {
  fill: var(--vp-c-text-2);
}

/* ---- Loading ---- */
:deep(.swagger-ui .loading-container .loading::after) {
  color: var(--vp-c-text-2);
}

/* ---- Authorization modal ---- */
:deep(.swagger-ui .dialog-ux .modal-ux) {
  background: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .dialog-ux .modal-ux-header h3) {
  color: var(--vp-c-text-1);
}

/* ---- Server dropdown ---- */
:deep(.swagger-ui .scheme-container) {
  border-bottom-color: var(--vp-c-divider);
}

:deep(.swagger-ui .servers > label select) {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

/* ---- Tab panels ---- */
:deep(.swagger-ui .tab li) {
  color: var(--vp-c-text-2);
}

:deep(.swagger-ui .tab li.active) {
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .tab li:first-of-type::after) {
  background: var(--vp-c-divider);
}

/* ---- Markdown rendered inside descriptions ---- */
:deep(.swagger-ui .renderedMarkdown p) {
  color: var(--vp-c-text-2);
}

:deep(.swagger-ui .renderedMarkdown a) {
  color: var(--vp-c-brand-1);
}

:deep(.swagger-ui .renderedMarkdown code) {
  background: var(--vp-c-bg-alt);
  color: var(--vp-code-color);
  padding: 2px 6px;
  border-radius: 4px;
}
</style>
