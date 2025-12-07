export const getLocalBookmarks = () => {
  const localData = window.localStorage.getItem('bookmarks')
  return localData ? JSON.parse(localData) : []
}
