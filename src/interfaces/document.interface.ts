export interface DocumentTreeInterface {
  name: string
  folderId: string
  count: number
  children?: DocumentTreeInterface[]
}

export interface DocumentFolderItemInterface {
  _id: string
  driveFileId: string
  fileName: string
  folderId: string
  folderName: string
  folderPath: string[]
  folderPathString: string
  summary: string | null
  keywords: string[]
  category: string | null
  status: string
  createdAt: string
  updatedAt: string
}

export interface DocumentsByFolderResponseInterface {
  folderId: string
  folderName: string
  folderPathString: string
  total: number
  documents: DocumentFolderItemInterface[]
}
