// Listen to the scroll event
window.addEventListener('scroll', function() {
    var scrolledHeight = window.pageYOffset;

    var cover = document.querySelector('.cover');
    var cover2 = document.querySelector('.cover2');

    // Calculate the offset position of each element
    var coverOffset = getOffsetTop(cover);
    var cover2Offset = getOffsetTop(cover2);

    // Adjust the background position
    var coordsCover = '50%' + calculatePosition(scrolledHeight, coverOffset) + 'px';
    cover.style.backgroundPosition = coordsCover;

    var coordsCover2 = '50%' + calculatePosition(scrolledHeight, cover2Offset) + 'px';
    cover2.style.backgroundPosition = coordsCover2;
});

// Function to calculate an element's top offset
function getOffsetTop(elem) {
    var offsetTop = 0;
    do {
        if (!isNaN(elem.offsetTop)) {
            offsetTop += elem.offsetTop;
        }
    } while(elem = elem.offsetParent);
    return offsetTop;
}

// Function to calculate background position
function calculatePosition(scrolledHeight, elementOffset) {
    // Adjust the multiplier (-0.5) based on desired parallax speed
    return (scrolledHeight - elementOffset) * -0.5;
}


document.addEventListener("DOMContentLoaded", function() {
    var screenHeight = window.innerHeight;
    var divWithBackground = document.querySelector('.cover');
    divWithBackground.style.height = screenHeight + 'px';
});