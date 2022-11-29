if (window.location.hash.includes('#/stake')) {
  const routeWithoutHash = window.location.hash.replace('#', '')
  window.location.replace(routeWithoutHash)
}