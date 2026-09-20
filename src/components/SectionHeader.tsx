import { tabCopy } from '../data/tabCopy'
import type { Tab } from '../types'

export function SectionHeader({ tab }: { tab: Tab }) {
  const { title, subtitle } = tabCopy[tab]

  return (
    <div className="section-header">
      <span className="section-title">{title}</span>
      <span className="section-subtitle">{subtitle}</span>
    </div>
  )
}
