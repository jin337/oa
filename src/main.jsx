import { createRoot } from 'react-dom/client'
// redux
import { Provider } from 'react-redux'
import { store } from './store'
// 路由
import { RouterProvider } from 'react-router'
import { router } from './router'
// 样式
import 'src/index.scss'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
