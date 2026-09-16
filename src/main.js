import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faUpload,
  faSignOutAlt,
  faFileExcel,
  faFilePdf,
  faFileWord,
  faFileImage,
  faFile,
  faUsers,
  faTrash
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faUpload,
  faSignOutAlt,
  faFileExcel,
  faFilePdf,
  faFileWord,
  faFileImage,
  faFile,
  faUsers,
  faTrash
)


import 'bootstrap/dist/css/codebase.min.css'
import 'bootstrap'

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon) // Registra o componente
  .use(router)
  .mount('#app')