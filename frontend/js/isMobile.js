let isMobile = false
if (navigator.userAgent.match(/Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini/i)) {
  isMobile = true
} else {
  isMobile = false
}

if (!isMobile) {
  window.location = 'desktop/index.html'
}
