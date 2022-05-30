import defaultSettings from '@/settings'

const title = defaultSettings.title || 'CRM 系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
    // return `${pageTitle}`
  }
  return `${title}`
}
