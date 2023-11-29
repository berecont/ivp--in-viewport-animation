/**
 * animation in viewpoRt
 */
document.addEventListener('DOMContentLoaded', function() {
  // funktion, um zu überprüfen, ob ein element im viewport sichtbar ist
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top < window.innerHeight && rect.bottom >= 0
    );
  }

  // funktion zum hinzufügen/entfernen der klasse beim betreten/verlassen des viewports
  function toggleClassOnEnterViewport(element, className) {
    let isElementVisible = false;

    function checkVisibility() {
      const isVisible = isInViewport(element);

      if (isVisible && !isElementVisible) {
        element.classList.add(className);
        isElementVisible = true;
      } else if (!isVisible && isElementVisible) {
        element.classList.remove(className);
        isElementVisible = false;
      }
    }

    function debounce(func, delay) {
      let timeoutId;
      
      return function() {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(function() {
          func();
        }, delay);
      };
    }

    const debouncedCheckVisibility = debounce(checkVisibility, 100);

    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
  }

  // alle elemente mit der klasse '.ivp' auswählen
  const elements = document.querySelectorAll('.ivp');

  // klasse 'visible' hinzufügen/entfernen, wenn elemente in den viewport ein- bzw. austreten
  elements.forEach(function(element) {
    toggleClassOnEnterViewport(element, 'visible');
  });
});
