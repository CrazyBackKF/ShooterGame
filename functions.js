function isFullscreen() {
    return document.fullscreenElement !== null || 
           document.webkitFullscreenElement !== null ||
           document.mozFullScreenElement !== null ||
           document.msFullscreenElement !== null;
}

function scale(position) {
    const rect = canvas.getBoundingClientRect();
    const scale = rect.width / canvas.width;

    return (position / scale);
}

function shouldRemoveBullet(bullet)
{
    return (bullet.position.x >= canvas.width ||
            bullet.position.x <= 0 ||
            bullet.position.y >= canvas.height ||
            bullet.position.y <= 0)
}