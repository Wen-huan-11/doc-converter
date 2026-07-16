import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/HomePage.vue'),
      meta: { title: '首页' }
    },
    {
      path: '/pdf-to-word',
      name: 'pdf-to-word',
      component: () => import('@/pages/PdfToWordPage.vue'),
      meta: { title: 'PDF 转 Word' }
    },
    {
      path: '/pdf-to-excel',
      name: 'pdf-to-excel',
      component: () => import('@/pages/PdfToExcelPage.vue'),
      meta: { title: 'PDF 转 Excel' }
    },
    {
      path: '/pdf-to-ppt',
      name: 'pdf-to-ppt',
      component: () => import('@/pages/PdfToPptPage.vue'),
      meta: { title: 'PDF 转 PPT' }
    },
    {
      path: '/pdf-to-cad',
      name: 'pdf-to-cad',
      component: () => import('@/pages/PdfToCadPage.vue'),
      meta: { title: 'PDF 转 CAD' }
    },
    {
      path: '/pdf-scan-to-searchable',
      name: 'pdf-scan-to-searchable',
      component: () => import('@/pages/PdfScanToSearchablePage.vue'),
      meta: { title: '转扫描型 PDF' }
    },
    {
      path: '/pdf-to-searchable',
      name: 'pdf-to-searchable',
      component: () => import('@/pages/PdfToSearchablePage.vue'),
      meta: { title: '转可搜索 PDF' }
    },
    {
      path: '/cad-to-pdf',
      name: 'cad-to-pdf',
      component: () => import('@/pages/CadToPdfPage.vue'),
      meta: { title: 'CAD 转 PDF' }
    },
    {
      path: '/caj-to-pdf',
      name: 'caj-to-pdf',
      component: () => import('@/pages/CajToPdfPage.vue'),
      meta: { title: 'CAJ 转 PDF' }
    },
    {
      path: '/pdf-split',
      name: 'pdf-split',
      component: () => import('@/pages/PdfSplitPage.vue'),
      meta: { title: 'PDF 拆分' }
    },
    {
      path: '/pdf-merge',
      name: 'pdf-merge',
      component: () => import('@/pages/PdfMergePage.vue'),
      meta: { title: 'PDF 合并' }
    }
  ]
})

export default router
