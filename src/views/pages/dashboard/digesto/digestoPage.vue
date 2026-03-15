<template>
  <div class="digesto-page">
    <loader-component :loader="loader" />

    <!-- Barras de búsqueda: semántica y por keywords -->
    <v-card flat class="digesto-search">
      <div class="digesto-search__bars">
        <v-text-field
          v-model="searchQuerySemantic"
          placeholder="Búsqueda semántica (por contenido)..."
          prepend-inner-icon="mdi-magnify-scan"
          variant="solo-filled"
          density="comfortable"
          hide-details
          flat
          clearable
          class="digesto-search__field"
          @click:clear="clearSemanticSearch"
        >
          <template #append-inner>
            <v-progress-circular
              v-if="searchLoading"
              size="20"
              width="2"
              indeterminate
              color="primary"
            />
          </template>
        </v-text-field>
        <v-combobox
          v-model="keywordTags"
          :items="[]"
          chips
          multiple
          clearable
          placeholder="Palabras clave (Enter o coma para añadir)"
          prepend-inner-icon="mdi-tag-search"
          variant="solo-filled"
          density="comfortable"
          hide-details
          flat
          class="digesto-search__field"
          @click:clear="clearKeywordSearch"
        />
      </div>
      <v-chip v-if="isSearchMode && !searchLoading" size="x-small" variant="tonal" color="primary" class="digesto-search__hint">
        {{ searchModeLabel }}
      </v-chip>
    </v-card>

    <!-- Layout de dos paneles -->
    <div class="explorer">
      <!-- Panel izquierdo: Árbol de carpetas -->
      <v-card flat class="explorer__tree">
        <v-card-title class="tree-header text-body-2 font-weight-bold">
          <v-icon size="20" class="mr-2">mdi-folder-multiple</v-icon>
          Explorador de Carpetas
        </v-card-title>

        <v-divider />

        <!-- Estado: cargando árbol -->
        <div v-if="treeLoading" class="d-flex flex-column align-center justify-center pa-8 flex-grow-1">
          <v-progress-circular size="32" width="3" indeterminate color="primary" />
          <span class="text-body-2 text-grey mt-3">Cargando carpetas…</span>
        </div>

        <!-- Estado: error en árbol -->
        <div v-else-if="treeError" class="pa-4 flex-grow-1">
          <v-alert type="error" variant="tonal" density="compact" class="mb-2">
            {{ treeError }}
          </v-alert>
          <v-btn size="small" color="error" variant="outlined" block @click="fetchTree">
            <v-icon start>mdi-refresh</v-icon> Reintentar
          </v-btn>
        </div>

        <!-- Árbol de carpetas -->
        <v-list v-else density="compact" nav class="tree-list pa-1">
          <v-list-item
            v-for="node in flatTree"
            :key="node.path"
            :active="selectedFolderId === node.folderId"
            color="primary"
            rounded="lg"
            :style="{ paddingLeft: node.depth * 20 + 8 + 'px' }"
            @click="selectFolder(node)"
          >
            <template #prepend>
              <v-btn
                variant="text"
                density="compact"
                size="x-small"
                :icon="node.hasChildren
                  ? (expandedPaths.has(node.path) ? 'mdi-chevron-down' : 'mdi-chevron-right')
                  : ''"
                :disabled="!node.hasChildren"
                class="tree-toggle mr-1"
                @click.stop="toggleExpand(node)"
              />
              <v-icon
                size="20"
                :color="selectedFolderId === node.folderId ? 'primary' : 'grey'"
              >
                {{ expandedPaths.has(node.path) && node.hasChildren ? 'mdi-folder-open' : 'mdi-folder' }}
              </v-icon>
            </template>

            <v-list-item-title class="text-body-2">{{ node.name }}</v-list-item-title>

            <template #append>
              <v-chip size="x-small" variant="tonal" :color="selectedFolderId === node.folderId ? 'primary' : 'default'">
                {{ node.count }}
              </v-chip>
            </template>
          </v-list-item>
        </v-list>
      </v-card>

      <!-- Panel derecho: Documentos -->
      <div class="explorer__docs">
        <!-- ===== Modo búsqueda ===== -->
        <template v-if="isSearchMode">
          <v-card flat class="docs-header">
            <v-card-title class="d-flex align-center justify-space-between pa-4">
              <span class="text-h6">Resultados de búsqueda</span>
              <v-chip v-if="!searchLoading" size="small" variant="tonal" color="primary">
                {{ searchResults.length }} resultado(s)
              </v-chip>
            </v-card-title>
          </v-card>

          <v-alert v-if="searchError" type="error" variant="tonal" class="ma-4">
            {{ searchError }}
          </v-alert>

          <div
            v-else-if="searchResults.length === 0 && !searchLoading"
            class="d-flex flex-column align-center justify-center pa-12 flex-grow-1"
          >
            <v-icon size="64" color="grey-lighten-1">mdi-file-search-outline</v-icon>
            <span class="text-body-1 text-grey mt-4">No se encontraron resultados</span>
          </div>

          <div v-else class="docs-grid pa-4">
            <v-card
              v-for="doc in searchResults"
              :key="doc._id ?? doc.driveFileId"
              variant="outlined"
              rounded="lg"
              hover
              class="docs-grid-card"
            >
              <v-card-item class="docs-grid-card__item">
                <template #prepend>
                  <v-icon color="primary" size="small">mdi-file-document</v-icon>
                </template>
                <v-card-title class="text-body-2 font-weight-bold docs-grid-card__title">{{ doc.name }}</v-card-title>
                <v-card-subtitle class="text-caption d-flex align-center ga-1 docs-grid-card__subtitle">
                  <v-icon size="12">mdi-folder-outline</v-icon>
                  {{ doc.folderPathString }}
                </v-card-subtitle>
              </v-card-item>

              <v-card-text class="docs-grid-card__text">
                <v-chip size="x-small" color="indigo" variant="tonal" class="docs-grid-card__chip">
                  {{ doc.category }}
                </v-chip>
                <p v-if="doc.summary" class="text-caption text-grey-darken-1 doc-summary">
                  {{ doc.summary }}
                </p>
              </v-card-text>

              <v-card-actions class="docs-grid-card__actions">
                <v-btn size="x-small" color="primary" variant="flat" @click="openDriveFile(doc.driveFileId)">
                  <v-icon start size="16">mdi-google-drive</v-icon> Ver En G.Drive
                </v-btn>
                <v-btn size="x-small" color="primary" variant="outlined" @click="openPreview(doc)">
                  <v-icon start size="16">mdi-eye</v-icon> Vista Previa
                </v-btn>
              </v-card-actions>
            </v-card>
          </div>
        </template>

        <!-- ===== Modo explorador de carpeta ===== -->
        <template v-else>
          <v-card flat class="docs-header">
            <v-card-title class="d-flex align-center justify-space-between pa-4">
              <span class="text-h6">{{ selectedFolderName || 'Seleccione una carpeta' }}</span>
              <v-chip
                v-if="selectedFolderId && !docsLoading"
                size="small"
                variant="tonal"
                color="primary"
              >
                {{ folderDocumentsList.length }} documento(s)
              </v-chip>
            </v-card-title>
          </v-card>

          <!-- Estado: cargando documentos -->
          <div v-if="docsLoading" class="d-flex flex-column align-center justify-center pa-12 flex-grow-1">
            <v-progress-circular size="32" width="3" indeterminate color="primary" />
            <span class="text-body-2 text-grey mt-3">Cargando documentos…</span>
          </div>

          <!-- Estado: error documentos -->
          <div v-else-if="docsError" class="pa-4">
            <v-alert type="error" variant="tonal" class="mb-3">{{ docsError }}</v-alert>
            <v-btn size="small" color="error" variant="outlined" @click="loadFolderDocuments(selectedFolderId!)">
              <v-icon start>mdi-refresh</v-icon> Reintentar
            </v-btn>
          </div>

          <!-- Estado: sin carpeta seleccionada -->
          <div
            v-else-if="!selectedFolderId"
            class="d-flex flex-column align-center justify-center pa-12 flex-grow-1 text-center"
          >
            <v-icon size="72" color="grey-lighten-2">mdi-folder-open-outline</v-icon>
            <span class="text-body-1 text-grey-lighten-1 mt-4" style="max-width: 280px">
              Seleccione una carpeta del panel izquierdo para ver sus documentos
            </span>
          </div>

          <!-- Estado: carpeta vacía -->
          <div
            v-else-if="folderDocumentsList.length === 0"
            class="d-flex flex-column align-center justify-center pa-12 flex-grow-1"
          >
            <v-icon size="56" color="grey-lighten-1">mdi-file-outline</v-icon>
            <span class="text-body-1 text-grey mt-4">Esta carpeta no tiene documentos</span>
          </div>

          <!-- Tabla de documentos -->
          <v-card v-else flat class="docs-table-card mx-4 mt-4">
            <v-data-table
              :headers="tableHeaders"
              :items="folderDocumentsList"
              :items-per-page="-1"
              density="comfortable"
              hover
              class="elevation-0"
            >
              <template #item.fileName="{ item }">
                <div class="d-flex align-center ga-2">
                  <v-icon size="18" color="primary">mdi-file-document-outline</v-icon>
                  <span class="font-weight-medium">{{ item.fileName }}</span>
                </div>
              </template>

              <template #item.category="{ item }">
                <v-chip size="small" color="indigo" variant="tonal">{{ item.category ?? '—' }}</v-chip>
              </template>

              <template #item.updatedAt="{ item }">
                {{ formatDate(item.updatedAt) }}
              </template>

              <template #item.status="{ item }">
                <v-chip
                  size="small"
                  :color="statusColor(item.status)"
                  variant="tonal"
                >
                  {{ statusLabel(item.status) }}
                </v-chip>
              </template>

              <template #item.actions="{ item }">
                <div class="d-flex ga-1">
                  <v-btn size="small" color="primary" variant="flat" @click="openDriveFile(item.driveFileId)">
                    <v-icon start size="16">mdi-google-drive</v-icon> Ver En G.Drive
                  </v-btn>
                  <v-btn size="small" color="primary" variant="outlined" @click="openPreview(item)">
                    <v-icon start size="16">mdi-eye</v-icon> Vista Previa
                  </v-btn>
         
                </div>
              </template>

              <template #bottom />
            </v-data-table>
          </v-card>
        </template>
      </div>
    </div>

    <!-- Modal de preview -->
    <v-dialog v-model="showPreview" max-width="1100" width="90vw">
      <v-card v-if="previewDoc" rounded="lg" class="preview-card">
        <v-card-title class="d-flex align-center justify-space-between">
          <span class="text-truncate">{{ previewDisplayName }}</span>
          <v-btn icon variant="text" @click="closePreview">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider />
        <v-card-text class="pa-0 preview-body">
          <iframe
            :src="`https://drive.google.com/file/d/${previewDoc.driveFileId}/preview`"
            :title="`Vista previa: ${previewDisplayName}`"
            class="preview-iframe"
            allow="autoplay"
          />
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts" setup>
import loaderComponent from '@/components/loader.vue'
import { ref, computed, watch, onMounted } from 'vue'
import { useDocumentStore, type SearchDocumentItem } from '@/stores/base/document'
import type { DocumentTreeInterface, DocumentFolderItemInterface } from '@/interfaces/document.interface'
import { formatDate, statusLabel, statusColor } from '@/components/helpers/helper'

const props = defineProps({
  isPublic: {
    type: Boolean,
    default: false
  }
})

const hiddenItems = computed(() => props.isPublic)

const documentStore = useDocumentStore()


// ---------- Types (FlatNode para la lista expandible, basado en DocumentTreeInterface) ----------

interface FlatNode {
  folderId: string
  name: string
  count: number
  depth: number
  path: string
  hasChildren: boolean
}

interface DocItem {
  _id?: string
  name: string
  category: string
  processedAt: string
  status: string
  driveFileId: string
  folderPathString?: string
  summary?: string
}

// ---------- General ----------

const loader = ref(false)

// ---------- Tree (desde state, usando DocumentTreeInterface) ----------

const treeData = computed(() => documentStore.tree)

const treeLoading = ref(false)
const treeError = ref('')
const expandedPaths = ref(new Set<string>())
const selectedFolderId = ref<string | null>(null)
const selectedFolderName = ref('')

function buildFlatTree(nodes: DocumentTreeInterface[], depth = 0, parentPath = ''): FlatNode[] {
  const result: FlatNode[] = []
  for (const node of nodes ?? []) {
    const nodePath = parentPath ? `${parentPath}/${node.name}` : node.name
    const children = node.children ?? []
    const hasChildren = children.length > 0
    result.push({
      folderId: node.folderId,
      name: node.name,
      count: node.count ?? 0,
      depth,
      path: nodePath,
      hasChildren,
    })
    if (hasChildren && expandedPaths.value.has(nodePath)) {
      result.push(...buildFlatTree(children, depth + 1, nodePath))
    }
  }
  return result
}

const flatTree = computed(() => buildFlatTree(treeData.value))

async function fetchTree() {
  treeLoading.value = true
  treeError.value = ''
  try {
    const ok = await documentStore.fetchTree()
    if (!ok) treeError.value = 'Error al cargar el árbol de carpetas'
  } catch (e: any) {
    treeError.value = e.message || 'Error al cargar el árbol de carpetas'
  } finally {
    treeLoading.value = false
  }
}

function toggleExpand(node: FlatNode) {
  const copy = new Set(expandedPaths.value)
  copy.has(node.path) ? copy.delete(node.path) : copy.add(node.path)
  expandedPaths.value = copy
}

function selectFolder(node: FlatNode) {
  if (node.hasChildren && !expandedPaths.value.has(node.path)) {
    toggleExpand(node)
  }
  selectedFolderId.value = node.folderId
  selectedFolderName.value = node.name
  loadFolderDocuments(node.folderId)
}

// ---------- Documents ----------

const docsLoading = ref(false)
const docsError = ref('')

const tableHeaders = props.isPublic
  ? [
      { title: 'Nombre', key: 'fileName', sortable: true },
      { title: 'Acciones', key: 'actions', sortable: false, width: '220px' },
    ]
  : [
      { title: 'Nombre', key: 'fileName', sortable: true, hidden: hiddenItems },
      { title: 'Categoría', key: 'category', sortable: true },
      { title: 'Fecha actualización', key: 'updatedAt', sortable: true, hidden: hiddenItems },
      { title: 'Estado', key: 'status', sortable: true, hidden: hiddenItems },
      { title: 'Acciones', key: 'actions', sortable: false, width: '220px', hidden: hiddenItems },
    ]

const folderDocumentsList = computed(() => documentStore.folderDocuments?.documents ?? [])

async function loadFolderDocuments(folderId: string) {
  docsLoading.value = true
  docsError.value = ''
  try {
    const ok = await documentStore.fetchDocumentsByFolder(folderId)
    if (!ok) docsError.value = 'Error al cargar documentos'
  } catch (e: any) {
    docsError.value = e.message || 'Error al cargar documentos'
  } finally {
    docsLoading.value = false
  }
}

// ---------- Search ----------

const searchQuerySemantic = ref('')
const keywordTags = ref<string[]>([])
const SEARCH_LIMIT = 10
let searchTimeout: ReturnType<typeof setTimeout> | null = null

const searchResults = computed(() => documentStore.searchResults)
const searchLoading = computed(() => documentStore.searchLoading)
const searchError = computed(() => documentStore.searchError)

const hasSemantic = computed(() => searchQuerySemantic.value.trim().length > 0)
const hasKeyword = computed(() => keywordTags.value.length > 0)

const isSearchMode = computed(() => hasSemantic.value || hasKeyword.value)

const searchModeLabel = computed(() => {
  if (hasSemantic.value && hasKeyword.value) return 'Búsqueda híbrida'
  if (hasSemantic.value) return 'Búsqueda semántica'
  if (hasKeyword.value) return 'Búsqueda por keywords'
  return ''
})

function getSearchParams() {
  const semantic = searchQuerySemantic.value.trim()
  const keyword = Array.isArray(keywordTags.value)
    ? keywordTags.value.filter((v): v is string => typeof v === 'string').join(' ').trim()
    : ''
  return { semantic, keyword }
}

watch([searchQuerySemantic, keywordTags], () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  const { semantic, keyword } = getSearchParams()
  if (!semantic && !keyword) {
    documentStore.clearSearchResults()
    return
  }
  searchTimeout = setTimeout(() => performSearch(), 400)
}, { deep: true })

async function performSearch() {
  const { semantic, keyword } = getSearchParams()
  if (semantic && keyword) {
    await documentStore.hybridSearch(`${semantic} ${keyword}`.trim(), SEARCH_LIMIT)
  } else if (semantic) {
    await documentStore.semanticSearch(semantic, SEARCH_LIMIT)
  } else if (keyword) {
    await documentStore.keywordSearch(keyword, undefined, SEARCH_LIMIT)
  }
}

function clearSemanticSearch() {
  searchQuerySemantic.value = ''
}

function clearKeywordSearch() {
  keywordTags.value = []
}

// ---------- Preview ----------

const previewDoc = ref<DocItem | DocumentFolderItemInterface | SearchDocumentItem | null>(null)
const showPreview = ref(false)

const previewDisplayName = computed(() => {
  const doc = previewDoc.value
  if (!doc) return ''
  return 'fileName' in doc ? doc.fileName : doc.name
})

function openPreview(doc: DocItem | DocumentFolderItemInterface | SearchDocumentItem) {
  previewDoc.value = doc
  showPreview.value = true
}

function closePreview() {
  showPreview.value = false
  previewDoc.value = null
}

function openDriveFile(driveFileId: string) {
  window.open(`https://drive.google.com/file/d/${driveFileId}/view`, '_blank')
}


// ---------- Init ----------

onMounted(() => {
  fetchTree()
})
</script>

<style scoped>
.digesto-page {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  overflow: hidden;
}

.digesto-search {
  flex-shrink: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  padding: 12px 16px;
}

.digesto-search__bars {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}

.digesto-search__field {
  flex: 1;
  min-width: 200px;
}

.digesto-search__hint {
  margin-top: 8px;
  display: inline-block;
}

.explorer {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* --- Árbol de carpetas --- */

.explorer__tree {
  width: 310px;
  min-width: 250px;
  border-right: 1px solid rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 0 !important;
}

.tree-header {
  flex-shrink: 0;
}

.tree-list {
  flex: 1;
  overflow-y: auto;
}

.tree-toggle {
  min-width: 24px !important;
  width: 24px !important;
  height: 24px !important;
}

/* --- Panel de documentos --- */

.explorer__docs {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: rgb(var(--v-theme-surface));
}

.docs-header {
  flex-shrink: 0;
  border-radius: 0 !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}

.docs-table-card {
  flex: 1;
  overflow: auto;
  border-radius: 8px;
  margin-bottom: 16px !important;
}

/* --- Grilla de resultados de búsqueda --- */

.docs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
  overflow-y: auto;
  flex: 1;
  align-content: start;
}

.docs-grid-card {
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.docs-grid-card__item {
  padding: 10px 12px 4px !important;
}

.docs-grid-card__title {
  padding-bottom: 0;
  min-height: 0;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.docs-grid-card__subtitle {
  opacity: 0.85;
  margin-top: 2px;
  min-height: 0;
}

.docs-grid-card__text {
  padding: 4px 12px 8px !important;
  flex: 0 0 auto;
}

.docs-grid-card__chip {
  margin-bottom: 4px !important;
}

.docs-grid-card__actions {
  padding: 4px 8px 8px !important;
  min-height: 0;
}

.doc-summary {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin: 0;
}

/* --- Modal de preview --- */

.preview-card {
  height: 85vh;
  display: flex;
  flex-direction: column;
}

.preview-body {
  flex: 1;
  overflow: hidden;
}

.preview-iframe {
  width: 100%;
  height: 100%;
  border: none;
}
</style>
