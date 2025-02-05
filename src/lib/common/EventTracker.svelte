<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    import { logEvent } from '../../stores/functions';
  
    /** @type {Array<{
      eventId: string,
      name: string,
      triggerCondition: string,
      triggerId: string,
      triggerType: 'scrollIntoView' | 'click' | 'timeSpent',
      value: number
    }>} */
    let events = [];

    $: $page.data, events = $page.data.eventsData;
  
    onMount(() => {
      const scrollEvents = events.filter(e => e.triggerType === 'scrollIntoView');
      
      // Only setup observer if we have scroll events
      if (scrollEvents.length > 0) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const event = scrollEvents.find(e => e.triggerId === entry.target.getAttribute('mtrix-instance-id'));
              if (event) {
                console.log(event.value);
                logEvent(event.name, {}, {amount: event.value})
                
                observer.unobserve(entry.target);
              }
            }
          });
        });
  
        scrollEvents.forEach(event => {
          const element = document.querySelector(`[mtrix-instance-id="${event.triggerId}"]`);
          if (element) observer.observe(element);
        });
  
        return () => observer.disconnect();
      }
  
      // Handle click events
      events.forEach(event => {
        if (event.triggerType === 'click') {
          const element = document.querySelector(`[mtrix-instance-id="${event.triggerId}"]`);
          if (element) {
            element.addEventListener('click', () => logEvent(event.name, {}, {amount: event.value}));
          }
        }
      });
  
      // Handle timeSpent events
      events.forEach(event => {
        if (event.triggerType === 'timeSpent' && event.triggerCondition) {
          setTimeout(() => {
            console.log(event.value);
          }, parseInt(event.triggerCondition));
        }
      });
    });
  </script>
  
  <slot />