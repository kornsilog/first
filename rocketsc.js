document.addEventListener('DOMContentLoaded', function() {
    const rocket = document.querySelector('.rocket');
    let isAttached = false;
    let rotationAngle = 0;

    rocket.addEventListener('mousedown', function(event) {
        if (!isAttached && event.detail === 1) {
            attachRocket(event.clientX, event.clientY);
        } else {
            isAttached = false;
        }
    });

    function attachRocket(clientX, clientY) {
        const offsetX = clientX - rocket.offsetLeft;
        const offsetY = clientY - rocket.offsetTop;

        rocket.style.left = clientX - offsetX + 'px';
        rocket.style.top = clientY - offsetY + 'px';

        function moveRocket(event) {
            rocket.style.left = event.clientX - offsetX + 'px';
            rocket.style.top = event.clientY - offsetY + 'px';
            
            const bottomRightX = window.innerWidth;
            const bottomRightY = window.innerHeight;
            const distanceToBottomRight = Math.sqrt(Math.pow(bottomRightX - event.clientX, 2) + Math.pow(bottomRightY - event.clientY, 2));

            const bottomLeftX = 0;
            const bottomLeftY = window.innerHeight;
            const distanceToBottomLeft = Math.sqrt(Math.pow(bottomLeftX - event.clientX, 2) + Math.pow(bottomLeftY - event.clientY, 2));

            const topRightX = window.innerWidth;
            const topRightY = 0;
            const distanceToTopRight = Math.sqrt(Math.pow(topRightX - event.clientX, 2) + Math.pow(topRightY - event.clientY, 2));

            const topLeftX = 0;
            const topLeftY = 0;
            const distanceToTopLeft = Math.sqrt(Math.pow(topLeftX - event.clientX, 2) + Math.pow(topLeftY - event.clientY, 2));

            const maxSize = 300; 
            const minSize = 40; 
            let newSize = minSize;

            const maxDistance = Math.max(distanceToBottomRight, distanceToBottomLeft, distanceToTopRight, distanceToTopLeft);
            newSize += (maxSize - minSize) * (1 - maxDistance / Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2)));

            rocket.style.width = newSize + 'px';
            rocket.style.height = 'auto';
        }

        document.addEventListener('mousemove', moveRocket);
        document.addEventListener('mouseup', function detachRocket(event) {
            document.removeEventListener('mousemove', moveRocket);
            document.removeEventListener('mouseup', detachRocket);
            isAttached = false;

            const planets = document.querySelectorAll('.planet');
            const dropX = event.clientX;
            const dropY = event.clientY;

            planets.forEach(function(planet) {
                const planetRect = planet.getBoundingClientRect();
                if (dropX >= planetRect.left && dropX <= planetRect.right && dropY >= planetRect.top && dropY <= planetRect.bottom) {
                    const planetName = planet.classList[1];
                    redirectToPage(planetName);
                }
            });
        });

        isAttached = true;
    }

    function rotateRocket(angle) {
        rocket.style.transform = `rotate(${angle}deg)`;
    }

    document.addEventListener('keydown', function(event) {
        if (isAttached) {
            if (event.key === 'a' || event.key === 'ArrowLeft') {
                rotationAngle -= 10;
                rotateRocket(rotationAngle);
            } else if (event.key === 'd' || event.key === 'ArrowRight') {
                rotationAngle += 10;
                rotateRocket(rotationAngle);
            }
        }
    });

    function redirectToPage(planetName) {
        switch (planetName) {
            case 'earth':
                window.location.href = 'earth.html';
                break;
            case 'mars':
                window.location.href = 'https://www.youtube.com/watch?v=mfavkCY52MI';
                break;
            case 'jupiter':
                window.location.href = 'https://www.youtube.com/watch?v=fTrqoVSrw1Y';
                break;
            case 'saturn':
                window.location.href = 'https://www.youtube.com/watch?v=ShZ978fBl6Y';
                break;
            default:
                break;
        }
    }
});
