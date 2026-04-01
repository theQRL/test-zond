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
  display: none !important;
}

/* Hide deprecated/disabled endpoints */
:deep(.swagger-ui .opblock.opblock-deprecated) {
  display: none !important;
}

/* ========================================================================
   Nuclear reset: Swagger UI CSS loads dynamically AFTER our styles,
   so we need !important on all color/background overrides to win.
   ======================================================================== */

/* ---- Typography: base reset ---- */

:deep(.swagger-ui),
:deep(.swagger-ui *) {
  font-family: var(--vp-font-family-base) !important;
}

:deep(.swagger-ui) {
  color: var(--vp-c-text-1) !important;
  font-size: 14px;
  line-height: 1.7;
}

/* Headings */
:deep(.swagger-ui .info .title) {
  font-size: 28px;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 36px;
  color: var(--vp-c-text-1) !important;
}

:deep(.swagger-ui .info h2),
:deep(.swagger-ui .info h3),
:deep(.swagger-ui .info h4) {
  font-weight: 600;
  color: var(--vp-c-text-1) !important;
}

/* Section tags */
:deep(.swagger-ui .opblock-tag) {
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
  color: var(--vp-c-text-1) !important;
  border-bottom-color: var(--vp-c-divider) !important;
}

:deep(.swagger-ui .opblock-tag:hover) {
  color: var(--vp-c-brand-1) !important;
}

:deep(.swagger-ui .opblock-tag small) {
  font-size: 13px;
  font-weight: 400;
  color: var(--vp-c-text-2) !important;
}

/* Operation summary */
:deep(.swagger-ui .opblock-summary-method) {
  font-size: 12px;
  font-weight: 700;
  font-family: var(--vp-font-family-mono) !important;
  letter-spacing: 0.02em;
  color: #fff !important;
}

:deep(.swagger-ui .opblock-summary-path),
:deep(.swagger-ui .opblock-summary-path a),
:deep(.swagger-ui .opblock-summary-path span),
:deep(.swagger-ui .opblock-summary-path__deprecated) {
  font-size: 14px;
  font-family: var(--vp-font-family-mono) !important;
  color: var(--vp-c-text-1) !important;
}

:deep(.swagger-ui .opblock .opblock-summary-description) {
  font-size: 13px;
  color: var(--vp-c-text-2) !important;
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
:deep(.swagger-ui .renderedMarkdown li),
:deep(.swagger-ui .markdown p),
:deep(.swagger-ui .markdown li) {
  font-size: 14px;
  line-height: 1.7;
  color: var(--vp-c-text-2) !important;
}

/* Parameter labels */
:deep(.swagger-ui .parameter__name) {
  font-size: 14px;
  font-weight: 600;
  font-family: var(--vp-font-family-mono) !important;
  color: var(--vp-c-text-1) !important;
}

:deep(.swagger-ui .parameter__name.required)::after {
  color: var(--vp-c-danger-1) !important;
}

:deep(.swagger-ui .parameter__type),
:deep(.swagger-ui .parameter__in) {
  font-size: 12px;
  font-family: var(--vp-font-family-mono) !important;
  color: var(--vp-c-text-2) !important;
}

:deep(.swagger-ui .parameter__deprecated) {
  color: var(--vp-c-danger-1) !important;
}

/* Response status codes */
:deep(.swagger-ui .response-col_status) {
  font-size: 14px;
  font-weight: 600;
  font-family: var(--vp-font-family-mono) !important;
  color: var(--vp-c-text-1) !important;
}

:deep(.swagger-ui .response-col_description),
:deep(.swagger-ui .response-col_description p) {
  font-size: 13px;
  color: var(--vp-c-text-2) !important;
}

:deep(.swagger-ui .response-col_links),
:deep(.swagger-ui .response-col_links i) {
  color: var(--vp-c-text-2) !important;
}

/* Table headers */
:deep(.swagger-ui table thead tr th),
:deep(.swagger-ui table thead tr td) {
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--vp-c-text-2) !important;
  border-bottom-color: var(--vp-c-divider) !important;
}

/* Table body */
:deep(.swagger-ui table tbody tr td) {
  color: var(--vp-c-text-1) !important;
  border-bottom-color: var(--vp-c-divider) !important;
}

/* Model / schema */
:deep(.swagger-ui .model-title) {
  font-size: 14px;
  font-weight: 600;
  font-family: var(--vp-font-family-mono) !important;
  color: var(--vp-c-text-1) !important;
}

:deep(.swagger-ui .model),
:deep(.swagger-ui .model span),
:deep(.swagger-ui .model-toggle) {
  font-size: 13px;
  font-family: var(--vp-font-family-mono) !important;
  color: var(--vp-c-text-1) !important;
}

:deep(.swagger-ui .model .property.primitive),
:deep(.swagger-ui .model .property) {
  font-size: 13px;
  color: var(--vp-c-text-2) !important;
}

:deep(.swagger-ui .prop-type) {
  font-size: 12px;
  font-family: var(--vp-font-family-mono) !important;
  color: var(--vp-c-brand-1) !important;
}

:deep(.swagger-ui .prop-format) {
  color: var(--vp-c-text-2) !important;
}

/* Tabs */
:deep(.swagger-ui .tab li) {
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2) !important;
}

:deep(.swagger-ui .tab li.active) {
  font-weight: 600;
  color: var(--vp-c-text-1) !important;
}

:deep(.swagger-ui .tab li:first-of-type::after) {
  background: var(--vp-c-divider) !important;
}

/* Code / pre blocks — typography */
:deep(.swagger-ui pre),
:deep(.swagger-ui code),
:deep(.swagger-ui .microlight) {
  font-family: var(--vp-font-family-mono) !important;
  font-size: 13px;
  line-height: 1.6;
}

/* Links */
:deep(.swagger-ui a),
:deep(.swagger-ui a.nostyle),
:deep(.swagger-ui .info a),
:deep(.swagger-ui .renderedMarkdown a) {
  font-weight: 500;
  color: var(--vp-c-brand-1) !important;
}

/* Buttons — typography */
:deep(.swagger-ui .btn) {
  font-size: 13px;
  font-weight: 600;
  font-family: var(--vp-font-family-base) !important;
}

/* Inputs — typography */
:deep(.swagger-ui input[type=text]),
:deep(.swagger-ui input[type=password]),
:deep(.swagger-ui input[type=search]),
:deep(.swagger-ui input[type=email]),
:deep(.swagger-ui input[type=file]),
:deep(.swagger-ui textarea),
:deep(.swagger-ui select) {
  font-family: var(--vp-font-family-base) !important;
  font-size: 13px;
}

/* Labels */
:deep(.swagger-ui .servers-title),
:deep(.swagger-ui .servers > label),
:deep(.swagger-ui label) {
  font-size: 13px;
  color: var(--vp-c-text-2) !important;
}

/* Inline code in markdown */
:deep(.swagger-ui .renderedMarkdown code) {
  font-family: var(--vp-font-family-mono) !important;
  font-size: 12px;
}

/* ========================================================================
   Backgrounds & surfaces
   ======================================================================== */

:deep(.swagger-ui .scheme-container),
:deep(.swagger-ui .opblock .opblock-section-header) {
  background: var(--vp-c-bg-soft) !important;
  box-shadow: none !important;
}

:deep(.swagger-ui .opblock .opblock-section-header h4) {
  color: var(--vp-c-text-1) !important;
}

:deep(.swagger-ui .opblock .opblock-section-header label),
:deep(.swagger-ui .opblock .opblock-section-header label span) {
  color: var(--vp-c-text-2) !important;
}

:deep(.swagger-ui .info) {
  margin: 20px 0;
}

:deep(.swagger-ui .wrapper) {
  background: transparent !important;
}

/* ========================================================================
   Operation blocks
   ======================================================================== */

:deep(.swagger-ui .opblock) {
  border-color: var(--vp-c-divider) !important;
  background: var(--vp-c-bg-soft) !important;
  box-shadow: none !important;
}

:deep(.swagger-ui .opblock .opblock-summary) {
  border-bottom-color: var(--vp-c-divider) !important;
}

/* GET */
:deep(.swagger-ui .opblock.opblock-get) {
  border-color: var(--vp-c-tip-1) !important;
  background: rgba(74, 175, 255, 0.08) !important;
}
:deep(.swagger-ui .opblock.opblock-get .opblock-summary-method) {
  background: var(--vp-c-tip-1) !important;
}
:deep(.swagger-ui .opblock.opblock-get .opblock-summary) {
  border-bottom-color: rgba(74, 175, 255, 0.2) !important;
}
:deep(.swagger-ui .opblock.opblock-get .tab-header .tab-item.active h4 span::after) {
  background: var(--vp-c-tip-1) !important;
}

/* POST */
:deep(.swagger-ui .opblock.opblock-post) {
  border-color: #49cc90 !important;
  background: rgba(73, 204, 144, 0.08) !important;
}
:deep(.swagger-ui .opblock.opblock-post .opblock-summary-method) {
  background: #49cc90 !important;
}
:deep(.swagger-ui .opblock.opblock-post .opblock-summary) {
  border-bottom-color: rgba(73, 204, 144, 0.2) !important;
}
:deep(.swagger-ui .opblock.opblock-post .tab-header .tab-item.active h4 span::after) {
  background: #49cc90 !important;
}

/* DELETE */
:deep(.swagger-ui .opblock.opblock-delete) {
  border-color: var(--vp-c-danger-1) !important;
  background: rgba(249, 62, 62, 0.08) !important;
}
:deep(.swagger-ui .opblock.opblock-delete .opblock-summary-method) {
  background: var(--vp-c-danger-1) !important;
}
:deep(.swagger-ui .opblock.opblock-delete .opblock-summary) {
  border-bottom-color: rgba(249, 62, 62, 0.2) !important;
}
:deep(.swagger-ui .opblock.opblock-delete .tab-header .tab-item.active h4 span::after) {
  background: var(--vp-c-danger-1) !important;
}

/* PUT */
:deep(.swagger-ui .opblock.opblock-put) {
  border-color: var(--vp-c-brand-1) !important;
  background: rgba(255, 167, 41, 0.08) !important;
}
:deep(.swagger-ui .opblock.opblock-put .opblock-summary-method) {
  background: var(--vp-c-brand-1) !important;
}
:deep(.swagger-ui .opblock.opblock-put .opblock-summary) {
  border-bottom-color: rgba(255, 167, 41, 0.2) !important;
}
:deep(.swagger-ui .opblock.opblock-put .tab-header .tab-item.active h4 span::after) {
  background: var(--vp-c-brand-1) !important;
}

/* ========================================================================
   Code / model blocks
   ======================================================================== */

:deep(.swagger-ui .highlight-code),
:deep(.swagger-ui .example),
:deep(.swagger-ui .model-box) {
  background: var(--vp-c-bg-soft) !important;
  color: var(--vp-c-text-1) !important;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider) !important;
}

:deep(.swagger-ui pre.microlight),
:deep(.swagger-ui .highlight-code pre),
:deep(.swagger-ui .opblock-body pre) {
  background: var(--vp-c-bg-soft) !important;
  color: var(--vp-c-text-1) !important;
  border-radius: 6px;
  padding: 12px;
  border: 1px solid var(--vp-c-divider) !important;
}

/* Override ALL microlight inline color styles */
:deep(.swagger-ui pre.microlight span),
:deep(.swagger-ui .highlight-code .microlight code),
:deep(.swagger-ui .highlight-code .microlight code span),
:deep(.swagger-ui pre span),
:deep(.swagger-ui pre code) {
  color: var(--vp-c-text-1) !important;
}

/* JSON syntax colouring — keys and strings */
:deep(.swagger-ui pre.microlight .hljs-string),
:deep(.swagger-ui pre.microlight .hljs-attr) {
  color: var(--vp-c-brand-1) !important;
}

/* Response body / example value containers */
:deep(.swagger-ui .responses-wrapper .responses-inner),
:deep(.swagger-ui .request-body-wrapper) {
  color: var(--vp-c-text-1) !important;
}

/* Copy-to-clipboard button */
:deep(.swagger-ui .copy-to-clipboard) {
  background: var(--vp-c-bg-soft) !important;
}

/* ========================================================================
   Buttons
   ======================================================================== */

:deep(.swagger-ui .btn) {
  border-color: var(--vp-c-divider) !important;
  color: var(--vp-c-text-1) !important;
  background: var(--vp-c-bg) !important;
}

:deep(.swagger-ui .btn:hover) {
  border-color: var(--vp-c-brand-1) !important;
  color: var(--vp-c-brand-1) !important;
}

:deep(.swagger-ui .btn.execute) {
  background: var(--vp-c-brand-1) !important;
  color: #fff !important;
  border-color: var(--vp-c-brand-1) !important;
}

:deep(.swagger-ui .btn.cancel) {
  color: var(--vp-c-danger-1) !important;
  border-color: var(--vp-c-danger-1) !important;
  background: var(--vp-c-bg) !important;
}

:deep(.swagger-ui .btn.authorize) {
  color: var(--vp-c-brand-1) !important;
  border-color: var(--vp-c-brand-1) !important;
  background: var(--vp-c-bg) !important;
}

:deep(.swagger-ui .btn.authorize svg) {
  fill: var(--vp-c-brand-1) !important;
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
  background: var(--vp-c-bg) !important;
  color: var(--vp-c-text-1) !important;
  border-color: var(--vp-c-divider) !important;
}

:deep(.swagger-ui select option) {
  background: var(--vp-c-bg) !important;
  color: var(--vp-c-text-1) !important;
}

:deep(.swagger-ui .parameters-col_description input),
:deep(.swagger-ui .parameters-col_description select),
:deep(.swagger-ui .parameters-col_description textarea) {
  background: var(--vp-c-bg) !important;
  color: var(--vp-c-text-1) !important;
  border-color: var(--vp-c-divider) !important;
}

/* Placeholder text */
:deep(.swagger-ui input::placeholder),
:deep(.swagger-ui textarea::placeholder) {
  color: var(--vp-c-text-2) !important;
  opacity: 0.6;
}

/* ========================================================================
   Expand/collapse arrows & icons
   ======================================================================== */

:deep(.swagger-ui .expand-operation svg),
:deep(.swagger-ui .arrow) {
  fill: var(--vp-c-text-2) !important;
}

:deep(.swagger-ui .model-toggle::after) {
  color: var(--vp-c-text-2) !important;
}

/* Model toggle triangles */
:deep(.swagger-ui .model-toggle.collapsed span),
:deep(.swagger-ui .model-toggle span) {
  color: var(--vp-c-text-2) !important;
}

/* ========================================================================
   Loading
   ======================================================================== */

:deep(.swagger-ui .loading-container .loading::after) {
  color: var(--vp-c-text-2) !important;
}

/* ========================================================================
   Authorization modal & dialogs
   ======================================================================== */

:deep(.swagger-ui .dialog-ux .modal-ux) {
  background: var(--vp-c-bg) !important;
  border-color: var(--vp-c-divider) !important;
  color: var(--vp-c-text-1) !important;
}

:deep(.swagger-ui .dialog-ux .modal-ux-header) {
  border-bottom-color: var(--vp-c-divider) !important;
}

:deep(.swagger-ui .dialog-ux .modal-ux-header h3) {
  color: var(--vp-c-text-1) !important;
}

:deep(.swagger-ui .dialog-ux .modal-ux-content p),
:deep(.swagger-ui .dialog-ux .modal-ux-content label) {
  color: var(--vp-c-text-2) !important;
}

:deep(.swagger-ui .dialog-ux .backdrop-ux) {
  background: rgba(0, 0, 0, 0.6) !important;
}

/* ========================================================================
   Server dropdown
   ======================================================================== */

:deep(.swagger-ui .scheme-container) {
  border-bottom-color: var(--vp-c-divider) !important;
}

:deep(.swagger-ui .servers > label select) {
  background: var(--vp-c-bg) !important;
  color: var(--vp-c-text-1) !important;
  border-color: var(--vp-c-divider) !important;
}

/* ========================================================================
   Markdown rendered inside descriptions
   ======================================================================== */

:deep(.swagger-ui .renderedMarkdown code) {
  background: var(--vp-c-bg-soft) !important;
  color: var(--vp-code-color) !important;
  padding: 2px 6px;
  border-radius: 4px;
}

:deep(.swagger-ui .renderedMarkdown pre) {
  background: var(--vp-c-bg-soft) !important;
  border: 1px solid var(--vp-c-divider) !important;
  border-radius: 6px;
  padding: 12px;
}

:deep(.swagger-ui .renderedMarkdown pre code) {
  background: transparent !important;
  padding: 0;
  color: var(--vp-c-text-1) !important;
}

/* ========================================================================
   Catch-all: ensure every text element in opblocks is readable
   ======================================================================== */

:deep(.swagger-ui .opblock-body),
:deep(.swagger-ui .opblock-body p),
:deep(.swagger-ui .opblock-body span),
:deep(.swagger-ui .opblock-body small),
:deep(.swagger-ui .opblock-body label),
:deep(.swagger-ui .opblock-body div) {
  color: var(--vp-c-text-2) !important;
}

:deep(.swagger-ui .opblock-body h4),
:deep(.swagger-ui .opblock-body h5) {
  color: var(--vp-c-text-1) !important;
}

/* Response containers */
:deep(.swagger-ui .responses-table .response-col_description__inner div),
:deep(.swagger-ui .responses-table .response-col_description__inner span) {
  color: var(--vp-c-text-2) !important;
}

/* Parameter enum/default/example values */
:deep(.swagger-ui .parameter__enum),
:deep(.swagger-ui .parameter__default),
:deep(.swagger-ui .parameter__example),
:deep(.swagger-ui .parameter__enum i),
:deep(.swagger-ui .parameter__default i),
:deep(.swagger-ui .parameter__example i) {
  color: var(--vp-c-text-2) !important;
}

/* Try-it-out response section */
:deep(.swagger-ui .live-responses-table .response-col_status) {
  color: var(--vp-c-text-1) !important;
}

:deep(.swagger-ui .response-content-type),
:deep(.swagger-ui .response-content-type label) {
  color: var(--vp-c-text-2) !important;
}

/* Schema/model section */
:deep(.swagger-ui section.models) {
  border-color: var(--vp-c-divider) !important;
}

:deep(.swagger-ui section.models h4),
:deep(.swagger-ui section.models h4 span) {
  color: var(--vp-c-text-1) !important;
}

:deep(.swagger-ui section.models .model-container) {
  background: var(--vp-c-bg-soft) !important;
  border-color: var(--vp-c-divider) !important;
}

/* Version stamp */
:deep(.swagger-ui .info .version-stamp) {
  background: var(--vp-c-bg-soft) !important;
  color: var(--vp-c-text-2) !important;
}

:deep(.swagger-ui .info .version-stamp pre.version) {
  color: var(--vp-c-text-1) !important;
  background: transparent !important;
}

/* Try it out button area / response controls */
:deep(.swagger-ui .try-out__btn) {
  color: var(--vp-c-text-1) !important;
  border-color: var(--vp-c-divider) !important;
}

/* Response URL display */
:deep(.swagger-ui .request-url pre) {
  background: var(--vp-c-bg-soft) !important;
  color: var(--vp-c-text-1) !important;
}

/* Curl command display */
:deep(.swagger-ui .curl-command pre) {
  background: var(--vp-c-bg-soft) !important;
  color: var(--vp-c-text-1) !important;
}

/* Download button in responses */
:deep(.swagger-ui .download-contents) {
  color: var(--vp-c-text-2) !important;
}

/* Response headers */
:deep(.swagger-ui .response-control-media-type__title) {
  color: var(--vp-c-text-2) !important;
}

:deep(.swagger-ui .response-control-media-type select) {
  background: var(--vp-c-bg) !important;
  color: var(--vp-c-text-1) !important;
  border-color: var(--vp-c-divider) !important;
}

/* Example select dropdown */
:deep(.swagger-ui .examples-select select) {
  background: var(--vp-c-bg) !important;
  color: var(--vp-c-text-1) !important;
  border-color: var(--vp-c-divider) !important;
}

:deep(.swagger-ui .examples-select__section-label) {
  color: var(--vp-c-text-2) !important;
}

/* Headers in response tables */
:deep(.swagger-ui .headers-wrapper h4) {
  color: var(--vp-c-text-1) !important;
}

:deep(.swagger-ui .headers-wrapper pre) {
  background: var(--vp-c-bg-soft) !important;
  color: var(--vp-c-text-1) !important;
}
</style>
