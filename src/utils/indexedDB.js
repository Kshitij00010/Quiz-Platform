// Code to save quiz history in indexedDB
const openDB = () => {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('quizPlatformDB', 1)
      
      request.onupgradeneeded = () => {
        const db = request.result
        if (!db.objectStoreNames.contains('quizHistory')) {
          db.createObjectStore('quizHistory', { keyPath: 'id', autoIncrement: true })
        }
      }
      
      request.onsuccess = () => resolve(request.result)
      request.onerror = (e) => reject(e)
    })
  }
  
  const saveQuizHistory = async (quizData) => {
    const db = await openDB()
    const tx = db.transaction('quizHistory', 'readwrite')
    const store = tx.objectStore('quizHistory')
    store.add(quizData)
    return tx.complete
  }
  
  export { saveQuizHistory }
  