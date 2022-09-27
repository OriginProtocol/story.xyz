import transformLinks from "./helpers/transformLinks"

const requestCms = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cms`)
  const { links } = await data.json()
  return { links: transformLinks(links) }
}

export default requestCms