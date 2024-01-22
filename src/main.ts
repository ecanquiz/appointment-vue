import app from '@/plugins/app'
import '@/plugins'
import '@/assets/css/app.css'
import router from './router'

app.mount('#app')
app.use(router)