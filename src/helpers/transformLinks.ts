type LinkSet<Link> = {
  attributes: {
    href?: string
    label: string
    order: number
    isButton: boolean
    highlightText?: string
    links: Link[]
    target: string
    nofollow?: boolean
  }
}

type Link<Icon> = {
  href: string
  iconPosition: 'top' | 'left'
  label: string
  order: number
  isHighlight: boolean
  icon?: Icon
  target: string
  nofollow?: boolean
}

type Icon = {
  data?: {
    attributes: {
      alternativeText: string
      caption: string
      url: string
    }
  }
}

const transformLinks = (links: LinkSet<Link<Icon>>[]) => {
  const sortOrder = (a: any, b: any) => {
    return a.order - b.order
  }

  const linkedMapSet = links.map((linkSet) => {
    return {
      href: linkSet.attributes.href,
      label: linkSet.attributes.label,
      isButton: linkSet.attributes.isButton,
      highlightText: linkSet.attributes.highlightText || null,
      order: linkSet.attributes.order,
      target: linkSet.attributes.target,
      nofollow: linkSet.attributes.nofollow,
      links: linkSet.attributes.links.map((link) => {
        return {
          label: link.label,
          href: link.href,
          highlight: link.isHighlight,
          icon: link.icon?.data?.attributes || null,
          target: link.target,
          nofollow: link.nofollow,
        }
      }).sort(sortOrder)
    }
  }).sort(sortOrder)

  return linkedMapSet
}

export default transformLinks