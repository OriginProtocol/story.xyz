type LinkSet<Link> = {
  attributes: {
    href?: string
    label: string
    order: number
    isButton: boolean
    highlightText?: string
    links: Link[]
  }
}

type Link<Icon> = {
  href: string
  iconPosition: 'top' | 'left'
  label: string
  order: number
  isHighlight: boolean
  icon?: Icon
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

  const linkedMapSet = links.map((linkSet: LinkSet<Link<Icon>>) => {
    return {
      href: linkSet.attributes.href,
      label: linkSet.attributes.label,
      isButton: linkSet.attributes.isButton,
      highlightText: linkSet.attributes.highlightText,
      order: linkSet.attributes.order,
      links: linkSet.attributes.links.map((link: Link<Icon>) => {
        return {
          label: link.label,
          href: link.href,
          highlight: link.isHighlight,
          icon: link.icon?.data?.attributes || null
        }
      }).sort(sortOrder)
    }
  }).sort(sortOrder)

  return linkedMapSet
}

export default transformLinks