const dragRatio = 1;
const moveVelocity = 1;
const rotationVelocity = .2;

var keyRegister = {
    w: false,
    a: false,
    s: false,
    d: false,
    q: false,
    e: false,
    Delete: false
};

document.onkeydown = function (e) {
    keyRegister[e.key] = true;
}

document.onkeyup = function (e) {
    keyRegister[e.key] = false;
}

function degToRad(theta) {
    return theta * (Math.PI / 180);
}

function rotate(coords, origin, theta) {
    var sCoords = {
        x: coords.x - origin.x,
        y: coords.y - origin.y
    };

    var rad = degToRad(theta);

    var rotated = {
        x: sCoords.x*Math.cos(rad) - sCoords.y*Math.sin(rad),
        y: sCoords.x*Math.sin(rad) + sCoords.y*Math.cos(rad)
    }

    return {
        x: rotated.x + origin.x,
        y: rotated.y + origin.y
    }
}

function inBounds(coords, boundingRect) {
    var x = coords.x;
    var y = coords.y;
    return !(x < boundingRect.x || x > boundingRect.x + boundingRect.w
        || y < boundingRect.y || y > boundingRect.y + boundingRect.h);
}

function sign (p1, p2, p3)
{
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
}

function inBoundsTriangle (pt, v1, v2, v3)
{
    var d1, d2, d3;
    var has_neg, has_pos;

    d1 = sign(pt, v1, v2);
    d2 = sign(pt, v2, v3);
    d3 = sign(pt, v3, v1);

    has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
    has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

    //return true if all same sign (if on same side of all lines -> inside triangle)

    return !(has_neg && has_pos);
}


function dist(c1, c2) {
    var dx = c1.x - c2.x;
    var dy = c1.y - c2.y;

    return Math.sqrt(dx * dx + dy * dy);
}
