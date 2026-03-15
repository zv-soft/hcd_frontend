import type {
  DocumentTreeInterface,
  DocumentsByFolderResponseInterface,
} from "@/interfaces/document.interface"
import webService from "@/webService"
import { defineStore } from "pinia"

export interface SearchDocumentItem {
  _id?: string
  name: string
  category: string
  driveFileId: string
  folderPathString?: string
  summary?: string
  [key: string]: unknown
}

export const useDocumentStore = defineStore("document", {
  state: () => ({
    tree: [] as DocumentTreeInterface[],
    folderDocuments: null as DocumentsByFolderResponseInterface | null,
    searchResults: [] as SearchDocumentItem[],
    searchLoading: false,
    searchError: "",
  }),
  actions: {
    async fetchTree(): Promise<boolean> {
      try {
        const res = await webService.get(`digesto/get-folder-tree`, {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })

        if (res.status === 200) {
          this.tree = res.data as DocumentTreeInterface[]
          return true
        }
        return false
      } catch (err) {
        console.log(err)
        return false
      }
    },

    async fetchDocumentsByFolder(folderId: string): Promise<boolean> {
      this.folderDocuments = null
      try {
        const res = await webService.get(`digesto/find-by-folder/${folderId}`, {
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })

        if (res.status === 200) {
          this.folderDocuments = res.data as DocumentsByFolderResponseInterface
          return true
        }
        this.folderDocuments = null
        return false
      } catch (err) {
        console.log(err)
        this.folderDocuments = null
        return false
      }
    },

    async semanticSearch(query: string, limit = 10): Promise<boolean> {
      this.searchLoading = true
      this.searchError = ""
      try {
        const res = await webService.get("digesto/search", {
          params: { q: query, limit },
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        if (res.status === 200) {
          this.searchResults = Array.isArray(res.data) ? res.data : []
          return true
        }
        this.searchResults = []
        return false
      } catch (err: unknown) {
        const e = err as { response?: { data?: { message?: string }; message?: string }; message?: string }
        this.searchError = e.response?.data?.message ?? e.message ?? "Error en la búsqueda semántica"
        this.searchResults = []
        return false
      } finally {
        this.searchLoading = false
      }
    },

    async keywordSearch(query: string, category?: string, limit = 10): Promise<boolean> {
      this.searchLoading = true
      this.searchError = ""
      try {
        const params: { q: string; limit: number; category?: string } = { q: query, limit }
        if (category) params.category = category
        const res = await webService.get("digesto/search/keywords", {
          params,
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        if (res.status === 200) {
          this.searchResults = Array.isArray(res.data) ? res.data : []
          return true
        }
        this.searchResults = []
        return false
      } catch (err: unknown) {
        const e = err as { response?: { data?: { message?: string }; message?: string }; message?: string }
        this.searchError = e.response?.data?.message ?? e.message ?? "Error en la búsqueda por keywords"
        this.searchResults = []
        return false
      } finally {
        this.searchLoading = false
      }
    },

    async hybridSearch(query: string, limit = 10): Promise<boolean> {
      this.searchLoading = true
      this.searchError = ""
      try {
        const res = await webService.get("digesto/search/hybrid", {
          params: { q: query, limit },
          headers: {
            "Content-Type": "application/json",
            "X-Requested-With": "XMLHttpRequest",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        })
        if (res.status === 200) {
          this.searchResults = Array.isArray(res.data) ? res.data : []
          return true
        }
        this.searchResults = []
        return false
      } catch (err: unknown) {
        const e = err as { response?: { data?: { message?: string }; message?: string }; message?: string }
        this.searchError = e.response?.data?.message ?? e.message ?? "Error en la búsqueda híbrida"
        this.searchResults = []
        return false
      } finally {
        this.searchLoading = false
      }
    },

    clearSearchResults() {
      this.searchResults = []
      this.searchError = ""
      this.searchLoading = false
    },
  },
})