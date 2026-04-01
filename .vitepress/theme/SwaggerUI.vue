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

/* ========================================================================
   Typography: base reset
   ======================================================================== */

:deep(.swagger-ui),
:deep(.swagger-ui *) {
  font-family: var(--vp-font-family-base);
}

:deep(.swagger-ui) {
  color: var(--vp-c-text-1);
  font-size: 14px;
  line-height: 1.7;
}

/* Headings */
:deep(.swagger-ui .info .title) {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 36px;
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .info h2),
:deep(.swagger-ui .info h3),
:deep(.swagger-ui .info h4) {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

/* Section tags */
:deep(.swagger-ui .opblock-tag) {
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  color: var(--vp-c-text-1);
  border-bottom-color: var(--vp-c-divider);
}

:deep(.swagger-ui .opblock-tag:hover) {
  color: var(--vp-c-brand-1);
}

:deep(.swagger-ui .opblock-tag small) {
  font-size: 13px;
  font-weight: 400;
  color: var(--vp-c-text-2);
}

/* Operation summary */
:deep(.swagger-ui .opblock-summary-method) {
  font-size: 12px;
  font-weight: 700;
  font-family: var(--vp-font-family-mono);
  letter-spacing: 0.02em;
}

:deep(.swagger-ui .opblock-summary-path),
:deep(.swagger-ui .opblock-summary-path a),
:deep(.swagger-ui .opblock-summary-path span) {
  font-size: 14px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1) !important;
}

:deep(.swagger-ui .opblock .opblock-summary-description) {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

/* Body text — all prose inside Swagger */
:deep(.swagger-ui p),
:deep(.swagger-ui li),
:deep(.swagger-ui .info p),
:deep(.swagger-ui .info li),
:deep(.swagger-ui .opblock-description-wrapper p),
:deep(.swagger-ui .opblock-external-docs-wrapper p),
:deep(.swagger-ui .response-col_description__inner p),
:deep(.swagger-ui .renderedMarkdown p),
:deep(.swagger-ui .renderedMarkdown li) {
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2);
}

/* Parameter labels */
:deep(.swagger-ui .parameter__name) {
  font-size: 14px;
  font-weight: 600;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .parameter__name.required)::after {
  color: var(--vp-c-danger-1);
}

:deep(.swagger-ui .parameter__type),
:deep(.swagger-ui .parameter__in) {
  font-size: 12px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-2);
}

:deep(.swagger-ui .parameter__deprecated) {
  color: var(--vp-c-danger-1);
}

/* Response status codes */
:deep(.swagger-ui .response-col_status) {
  font-size: 14px;
  font-weight: 600;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .response-col_description),
:deep(.swagger-ui .response-col_description p) {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

:deep(.swagger-ui .response-col_links),
:deep(.swagger-ui .response-col_links i) {
  color: var(--vp-c-text-2);
}

/* Table headers */
:deep(.swagger-ui table thead tr th),
:deep(.swagger-ui table thead tr td) {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2);
  border-bottom-color: var(--vp-c-divider);
}

/* Table body */
:deep(.swagger-ui table tbody tr td) {
  color: var(--vp-c-text-1);
  border-bottom-color: var(--vp-c-divider);
}

/* Model / schema */
:deep(.swagger-ui .model-title) {
  font-size: 14px;
  font-weight: 600;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .model),
:deep(.swagger-ui .model span),
:deep(.swagger-ui .model-toggle) {
  font-size: 13px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .model .property.primitive),
:deep(.swagger-ui .model .property) {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

:deep(.swagger-ui .prop-type) {
  font-size: 12px;
  font-family: var(--vp-font-family-mono);
  color: var(--vp-c-brand-1);
}

:deep(.swagger-ui .prop-format) {
  color: var(--vp-c-text-2);
}

/* Tabs */
:deep(.swagger-ui .tab li) {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

:deep(.swagger-ui .tab li.active) {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .tab li:first-of-type::after) {
  background: var(--vp-c-divider);
}

/* Code / pre blocks */
:deep(.swagger-ui pre),
:deep(.swagger-ui code),
:deep(.swagger-ui .microlight) {
  font-family: var(--vp-font-family-mono);
  font-size: 13px;
  line-height: 1.6;
}

/* Links */
:deep(.swagger-ui a),
:deep(.swagger-ui a.nostyle),
:deep(.swagger-ui .info a),
:deep(.swagger-ui .renderedMarkdown a) {
  font-weight: 500;
  color: var(--vp-c-brand-1);
}

/* Buttons */
:deep(.swagger-ui .btn) {
  font-size: 13px;
  font-weight: 600;
  font-family: var(--vp-font-family-base);
}

/* Inputs */
:deep(.swagger-ui input[type=text]),
:deep(.swagger-ui input[type=password]),
:deep(.swagger-ui input[type=search]),
:deep(.swagger-ui input[type=email]),
:deep(.swagger-ui input[type=file]),
:deep(.swagger-ui textarea),
:deep(.swagger-ui select) {
  font-family: var(--vp-font-family-base);
  font-size: 13px;
}

/* Server label */
:deep(.swagger-ui .servers-title),
:deep(.swagger-ui .servers > label),
:deep(.swagger-ui label) {
  font-size: 13px;
  color: var(--vp-c-text-2);
}

/* Inline code in markdown descriptions */
:deep(.swagger-ui .renderedMarkdown code) {
  font-family: var(--vp-font-family-mono);
  font-size: 12px;
}

/* ========================================================================
   Backgrounds & surfaces
   ======================================================================== */

:deep(.swagger-ui .scheme-container),
:deep(.swagger-ui .opblock .opblock-section-header) {
  background: var(--vp-c-bg-soft);
  box-shadow: none;
}

:deep(.swagger-ui .opblock .opblock-section-header h4) {
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .opblock .opblock-section-header label) {
  color: var(--vp-c-text-2);
}

:deep(.swagger-ui .info) {
  margin: 20px 0;
}

/* Wrapper background — ensures Swagger content area matches the page */
:deep(.swagger-ui .wrapper) {
  background: transparent;
}

/* ========================================================================
   Operation blocks
   ======================================================================== */

:deep(.swagger-ui .opblock) {
  border-color: var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  box-shadow: none;
}

:deep(.swagger-ui .opblock .opblock-summary) {
  border-bottom-color: var(--vp-c-divider);
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
:deep(.swagger-ui .opblock.opblock-get .tab-header .tab-item.active h4 span::after) {
  background: var(--vp-c-tip-1);
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
:deep(.swagger-ui .opblock.opblock-post .tab-header .tab-item.active h4 span::after) {
  background: #49cc90;
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
:deep(.swagger-ui .opblock.opblock-delete .tab-header .tab-item.active h4 span::after) {
  background: var(--vp-c-danger-1);
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
:deep(.swagger-ui .opblock.opblock-put .tab-header .tab-item.active h4 span::after) {
  background: var(--vp-c-brand-1);
}

/* ========================================================================
   Code / model blocks — force colours to override microlight inline styles
   ======================================================================== */

:deep(.swagger-ui .highlight-code),
:deep(.swagger-ui .example),
:deep(.swagger-ui .model-box) {
  background: var(--vp-c-bg-soft) !important;
  color: var(--vp-c-text-1) !important;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

:deep(.swagger-ui pre.microlight),
:deep(.swagger-ui .highlight-code pre) {
  background: var(--vp-c-bg-soft) !important;
  color: var(--vp-c-text-1) !important;
  border-radius: 6px;
  padding: 12px;
}

/* Override microlight's inline color styles which are hardcoded for white bg */
:deep(.swagger-ui pre.microlight span) {
  color: var(--vp-c-text-1) !important;
}

:deep(.swagger-ui .highlight-code .microlight code) {
  color: var(--vp-c-text-1) !important;
}

/* JSON string values */
:deep(.swagger-ui pre.microlight .hljs-string),
:deep(.swagger-ui pre.microlight .hljs-attr) {
  color: var(--vp-c-brand-1) !important;
}

/* Response body / example value containers */
:deep(.swagger-ui .responses-wrapper .responses-inner),
:deep(.swagger-ui .request-body-wrapper) {
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .opblock-body pre) {
  background: var(--vp-c-bg-soft) !important;
  color: var(--vp-c-text-1) !important;
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
}

/* Copy-to-clipboard button inside code blocks */
:deep(.swagger-ui .copy-to-clipboard) {
  background: var(--vp-c-bg-soft);
}

/* ========================================================================
   Buttons
   ======================================================================== */

:deep(.swagger-ui .btn) {
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
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

:deep(.swagger-ui .btn.cancel) {
  color: var(--vp-c-danger-1);
  border-color: var(--vp-c-danger-1);
  background: var(--vp-c-bg);
}

:deep(.swagger-ui .btn.authorize) {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg);
}

:deep(.swagger-ui .btn.authorize svg) {
  fill: var(--vp-c-brand-1);
}

/* ========================================================================
   Inputs & form controls
   ======================================================================== */

:deep(.swagger-ui input[type=text]),
:deep(.swagger-ui input[type=password]),
:deep(.swagger-ui input[type=search]),
:deep(.swagger-ui input[type=email]),
:deep(.swagger-ui input[type=file]),
:deep(.swagger-ui textarea),
:deep(.swagger-ui select) {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

:deep(.swagger-ui .parameters-col_description input),
:deep(.swagger-ui .parameters-col_description select),
:deep(.swagger-ui .parameters-col_description textarea) {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

/* ========================================================================
   Expand/collapse arrows & icons
   ======================================================================== */

:deep(.swagger-ui .expand-operation svg),
:deep(.swagger-ui .arrow),
:deep(.swagger-ui svg:not(:root)) {
  fill: var(--vp-c-text-2);
}

/* Don't override method badge or authorize icon fill */
:deep(.swagger-ui .opblock-summary-method svg),
:deep(.swagger-ui .btn.authorize svg) {
  fill: currentColor;
}

:deep(.swagger-ui .model-toggle::after) {
  color: var(--vp-c-text-2);
}

/* ========================================================================
   Loading
   ======================================================================== */

:deep(.swagger-ui .loading-container .loading::after) {
  color: var(--vp-c-text-2);
}

/* ========================================================================
   Authorization modal & dialogs
   ======================================================================== */

:deep(.swagger-ui .dialog-ux .modal-ux) {
  background: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .dialog-ux .modal-ux-header) {
  border-bottom-color: var(--vp-c-divider);
}

:deep(.swagger-ui .dialog-ux .modal-ux-header h3) {
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .dialog-ux .modal-ux-content p) {
  color: var(--vp-c-text-2);
}

:deep(.swagger-ui .dialog-ux .backdrop-ux) {
  background: rgba(0, 0, 0, 0.6);
}

/* ========================================================================
   Server dropdown
   ======================================================================== */

:deep(.swagger-ui .scheme-container) {
  border-bottom-color: var(--vp-c-divider);
}

:deep(.swagger-ui .servers > label select) {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  border-color: var(--vp-c-divider);
}

/* ========================================================================
   Markdown rendered inside descriptions
   ======================================================================== */

:deep(.swagger-ui .renderedMarkdown p) {
  color: var(--vp-c-text-2);
}

:deep(.swagger-ui .renderedMarkdown a) {
  color: var(--vp-c-brand-1);
}

:deep(.swagger-ui .renderedMarkdown code) {
  background: var(--vp-c-bg-soft);
  color: var(--vp-code-color);
  padding: 2px 6px;
  border-radius: 4px;
}

:deep(.swagger-ui .renderedMarkdown pre) {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  padding: 12px;
}

:deep(.swagger-ui .renderedMarkdown pre code) {
  background: transparent;
  padding: 0;
  color: var(--vp-c-text-1);
}

/* ========================================================================
   Catch-all: override any remaining Swagger hardcoded colors
   ======================================================================== */

/* Ensure all text inside opblocks is readable */
:deep(.swagger-ui .opblock-body),
:deep(.swagger-ui .opblock-body p),
:deep(.swagger-ui .opblock-body span),
:deep(.swagger-ui .opblock-body small),
:deep(.swagger-ui .opblock-body label) {
  color: var(--vp-c-text-2);
}

:deep(.swagger-ui .opblock-body h4),
:deep(.swagger-ui .opblock-body h5) {
  color: var(--vp-c-text-1);
}

/* Response containers */
:deep(.swagger-ui .responses-table .response-col_description__inner div),
:deep(.swagger-ui .responses-table .response-col_description__inner span) {
  color: var(--vp-c-text-2);
}

/* Parameter enum/default/example values */
:deep(.swagger-ui .parameter__enum),
:deep(.swagger-ui .parameter__default),
:deep(.swagger-ui .parameter__example) {
  color: var(--vp-c-text-2);
}

:deep(.swagger-ui .parameter__enum i),
:deep(.swagger-ui .parameter__default i),
:deep(.swagger-ui .parameter__example i) {
  color: var(--vp-c-text-2);
}

/* Try-it-out response section */
:deep(.swagger-ui .live-responses-table .response-col_status) {
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui .response-content-type) {
  color: var(--vp-c-text-2);
}

:deep(.swagger-ui .response-content-type label) {
  color: var(--vp-c-text-2);
}

/* Schema/model section inside responses */
:deep(.swagger-ui section.models) {
  border-color: var(--vp-c-divider);
}

:deep(.swagger-ui section.models h4) {
  color: var(--vp-c-text-1);
}

:deep(.swagger-ui section.models .model-container) {
  background: var(--vp-c-bg-soft);
  border-color: var(--vp-c-divider);
}

/* Version stamp */
:deep(.swagger-ui .info .version-stamp) {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
}

:deep(.swagger-ui .info .version-stamp pre.version) {
  color: var(--vp-c-text-1);
  background: transparent;
}

/* Description wrapper divs */
:deep(.swagger-ui .markdown p),
:deep(.swagger-ui .markdown li) {
  color: var(--vp-c-text-2);
}
</style>
