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

function checkCircleCollision(circle1, circle2) {
    const dx = circle2.position.x - circle1.position.x;
    const dy = circle2.position.y - circle1.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const radiiSum = circle1.radius + circle2.radius;

    return distance <= radiiSum;
}

function checkCircleRectangleCollision(circle, rect) {
    if(!circle) return;
    const closestX = Math.max(rect.position.x, Math.min(circle.position.x, rect.position.x + rect.width));
    const closestY = Math.max(rect.position.y, Math.min(circle.position.y, rect.position.y + rect.height));

    const dx = circle.position.x - closestX;
    const dy = circle.position.y - closestY;

    return (dx * dx + dy * dy) <= (circle.radius * circle.radius);
}