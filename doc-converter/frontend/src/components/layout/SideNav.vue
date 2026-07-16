<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

interface NavItem {
  key: string
  label: string
  route?: string
  icon: string
}

interface NavGroup {
  key: string
  title: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    key: 'pdf-convert',
    title: 'PDF转换',
    items: [
      { key: 'pdf-to-word',   label: '转为Word',       route: '/pdf-to-word',   icon: 'doc' },
      { key: 'pdf-to-excel',  label: '转为Excel',      route: '/pdf-to-excel',  icon: 'xls' },
      { key: 'pdf-to-ppt',    label: '转为PPT',        route: '/pdf-to-ppt',    icon: 'ppt' },
      { key: 'pdf-to-cad',    label: '转为CAD',        route: '/pdf-to-cad',    icon: 'cad' },
      { key: 'pdf-scan',      label: '转扫描型PDF',    route: '/pdf-scan-to-searchable', icon: 'scan' },
      { key: 'pdf-search',    label: '转可搜索PDF',    route: '/pdf-to-searchable', icon: 'search' }
    ]
  },
  {
    key: 'to-pdf',
    title: '转为PDF',
    items: [
      { key: 'cad-to-pdf', label: 'CAD转PDF', route: '/cad-to-pdf', icon: 'cad-pdf' },
      { key: 'caj-to-pdf', label: 'CAJ转PDF', route: '/caj-to-pdf', icon: 'caj' }
    ]
  },
  {
    key: 'split-merge',
    title: '拆分合并',
    items: [
      { key: 'pdf-split', label: 'PDF拆分', route: '/pdf-split', icon: 'split' },
      { key: 'pdf-merge', label: 'PDF合并', route: '/pdf-merge', icon: 'merge' }
    ]
  }
]

function isActive(item: NavItem): boolean {
  return route.path === item.route
}

function navigate(item: NavItem) {
  if (item.route) {
    router.push(item.route)
  }
}

function getIconStyle(icon: string): Record<string, string> {
  const colors: Record<string, string> = {
    doc: '#4a6cf7',
    xls: '#22b07d',
    ppt: '#f07f46',
    cad: '#e04040',
    scan: '#8b5cf6',
    search: '#5b8def',
    'cad-pdf': '#e04040',
    caj: '#f0a040',
    split: '#5b8def',
    merge: '#22b07d'
  }
  return { backgroundColor: colors[icon] || '#888' }
}
</script>

<template>
  <nav class="side-nav">
    <!-- Logo -->
    <div class="nav-header" @click="router.push('/')">
      <div class="nav-logo">
        <svg width="28" height="28" viewBox="0 0 28 28">
          <rect width="28" height="28" rx="6" fill="#7b5cf0"/>
          <text x="14" y="19" text-anchor="middle" fill="white" font-size="14" font-weight="700">W</text>
        </svg>
      </div>
      <span class="nav-title">PDF转换</span>
    </div>

    <!-- Home item -->
    <div
      class="nav-item home-item"
      :class="{ active: route.path === '/' }"
      @click="router.push('/')"
    >
      <span class="nav-icon home-icon">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      </span>
      <span class="nav-label">首页</span>
    </div>

    <!-- Menu groups -->
    <div
      v-for="group in navGroups"
      :key="group.key"
      class="nav-group"
    >
      <div class="nav-group-title">{{ group.title }}</div>
      <div
        v-for="item in group.items"
        :key="item.key"
        class="nav-item"
        :class="{ active: isActive(item) }"
        @click="navigate(item)"
      >
        <span class="nav-icon">
          <span class="icon-dot" :style="getIconStyle(item.icon)"></span>
        </span>
        <span class="nav-label">{{ item.label }}</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="nav-footer">
      <span class="version">v1.0.0</span>
    </div>
  </nav>
</template>

<style scoped>
.side-nav {
  height: 100%;
  background: var(--nav-bg);
  color: var(--nav-text);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.nav-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 20px 18px 16px;
  cursor: pointer;
}

.nav-logo {
  flex-shrink: 0;
}

.nav-title {
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.5px;
}

.home-item {
  margin: 0 10px 4px;
  border-radius: var(--radius-sm);
}

.home-icon {
  color: var(--nav-text);
}

.home-item.active .home-icon {
  color: #ffffff;
}

.nav-group {
  margin-top: 8px;
}

.nav-group-title {
  padding: 8px 18px 4px;
  font-size: 11px;
  font-weight: 600;
  color: var(--nav-group-title);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 18px;
  margin: 1px 10px;
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: all 0.15s ease;
  color: var(--nav-text);
  font-size: 13px;
  position: relative;
}

.nav-item:hover {
  background: var(--nav-bg-hover);
  color: #d0d0e0;
}

.nav-item.active {
  background: var(--nav-bg-active);
  color: #ffffff;
  font-weight: 500;
}

.nav-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 3px;
  height: 20px;
  background: var(--nav-accent);
  border-radius: 0 2px 2px 0;
}

.nav-icon {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.icon-dot {
  width: 10px;
  height: 10px;
  border-radius: 3px;
  display: inline-block;
}

.nav-label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-footer {
  margin-top: auto;
  padding: 16px 18px;
  font-size: 11px;
  color: var(--nav-group-title);
}

.version {
  opacity: 0.5;
}
</style>
