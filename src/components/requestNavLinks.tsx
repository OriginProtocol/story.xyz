const requestNavLinks = async () => {
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cms`)
  const dataParsed = await data.json()
  return { links: dataParsed }
}

export default requestNavLinks