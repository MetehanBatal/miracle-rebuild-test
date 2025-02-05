<script>
    import { page } from '$app/stores';
    import { onMount } from 'svelte';
    import { browser } from '$app/environment';

    import Banners from '$lib/banners/SheetBanner.svelte';

    export let data;

    let initialized = false;

    let editMode = ($page.url.searchParams.get('editMode') === 'true');
    let pageContent = '';
    let styling = '';
    let dPage = {};
    let instances = [];
    let components = []; // This will be populated by the components array from the message
    let componentInstances = []; // Store the loaded components here
    let componentFocused = false;
    let selectedInstanceId = '';

    let selectionText;

     // Helper Functions
     function generateAttributes(instance) {
        // Build attributes string from 'attributes' array, starting with instance id
        let finalAttr = `mtrix-instance-id="${instance.instanceId}"`;

        if (instance.attributes && instance.attributes.length > 0) {
            finalAttr += ' ' + instance.attributes.map(attr => `${attr.name}="${attr.value}"`).join(' ');
        }

        return finalAttr;
    }

    function reconstructHTML(elements, components) {
        // Create a map of instanceId to element object for easy lookup
        const elementMap = new Map();
        elements.forEach((el) => {
        elementMap.set(el.instanceId, { ...el, children: [] });
        });

        const sortedElementMap = new Map(
            [...elementMap.entries()].sort((a, b) => a[1].order - b[1].order)
        );
    
        let rootElement = null;
    
        // Build the tree by assigning children to their parent elements
        sortedElementMap.forEach((el) => {
        if (el.parentInstanceId) {
            const parentEl = sortedElementMap.get(el.parentInstanceId);
            if (parentEl) {
            parentEl.children.push(el);
            }
        } else {
            // If no parentInstanceId, this is the root element (e.g., body)
            rootElement = el;
        }
        });
    
        if (!rootElement) {
        throw new Error('Root element not found.');
        }
    
        // 3. Generate the HTML string from the DOM tree
        function buildHTMLString(element) {
            let nodeName;
            let attributes = [...element.attributes]; // Create a copy of attributes array
            let attrString;
        
            // Handle special cases for nodeName and attributes
            switch (element.nodeName.toUpperCase()) {
            case 'CUSTOM':
                nodeName = 'div';
                attributes.push({ name: 'class', value: 'custom' });
                break;
            default:
                nodeName = element.nodeName.toLowerCase();
            }
        
            // Build attributes string
            const attributesStr = attributes
            .map((attr) => `${attr.name}="${attr.value}"`)
            .join(' ');

            const mtrixDevAttributes = `mtrix-instance-id="${element.instanceId}" mtrix-order="${element.order}"`;
            const componentAttributes = ` mtrix-component-id="${element.componentId}" mtrix-variant-id="${element.variantId}"`;
        
            // Add mtrix-instance-id to attributes
            attrString = attributesStr 
            ? ` ${attributesStr} ${mtrixDevAttributes}` 
            : ` ${mtrixDevAttributes}`;

            if (element.componentId?.length > 0) {
                attrString += componentAttributes;
            }
        
            // Handle content
            let content = '';
            if (element.content) {
            content = element.content;
            }
        
            // Recursively build HTML for child elements
            const childrenHTML = element.children.map(buildHTMLString).join('');
        
            // Special case for COMPONENT
            if (element.nodeName.toUpperCase() === 'COMPONENT') {
            return `<${nodeName}${attrString} />`;
            }
        
            // Handle self-closing tags
            const selfClosingTags = ['img', 'br', 'hr', 'meta', 'link', 'input'];
            if (selfClosingTags.includes(nodeName)) {
            return `<${nodeName}${attrString}/>`;
            }
        
            // Return regular HTML structure
            return `<${nodeName}${attrString}>${content}${childrenHTML}</${nodeName}>`;
        }
    
        // Start building HTML from the root element
        const htmlString = buildHTMLString(rootElement);
    
        return htmlString;
    }

    function generateCSSFromData(dataArray) {
        const breakpointMap = {
            'xxl': '@media screen and (min-width: 1920px)',
            'xl': '@media screen and (min-width: 1440px)',
            'tablet': '@media screen and (max-width: 769px)',
            'mobile': '@media screen and (max-width: 469px)',
            'landscape': '@media screen and (orientation: landscape)'
        };

        let cssContent = '';
        let breakpointBlocks = {};

        dataArray.forEach((doc) => {
            const { name, attributes, breakpoint } = doc;
            let cssBlock = `.${name.replace(/\s+/g, '.')} {\n`;
            Object.entries(attributes).forEach(([key, value]) => {
                cssBlock += `    ${key}: ${value};\n`;
            });
            cssBlock += '}\n\n';

            if (breakpoint && breakpoint !== 'desktop') {
                const mediaQuery = breakpointMap[breakpoint];
                if (mediaQuery) {
                    if (!breakpointBlocks[mediaQuery]) {
                        breakpointBlocks[mediaQuery] = '';
                    }
                    breakpointBlocks[mediaQuery] += cssBlock;
                }
            } else {
                // Default breakpoint (desktop), no media query needed
                cssContent += cssBlock;
            }
        });

        // Append media query blocks to the CSS content
        for (const [mediaQuery, block] of Object.entries(breakpointBlocks)) {
            cssContent += `${mediaQuery} {\n${block}}\n\n`;
        }

        return cssContent;
    }

    // Named Event Handlers
    function handleMouseEnter(e, _id) {
        e.stopPropagation();
        const target = e.target;
        const width = target.offsetWidth;
        const height = target.offsetHeight;
        const rect = target.getBoundingClientRect();
        const offsetTop = rect.top;
        const offsetLeft = rect.left;

        const hoverSchema = {
            action: 'elementHovered',
            data: {
                target: _id,
                width,
                height,
                offsetTop,
                offsetLeft
            }
        };
        window.parent.postMessage(hoverSchema, 'http://localhost:5173/');
    }

    function handleMouseOut(e, _id) {
        e.stopPropagation();

        const hoverSchema = {
            action: 'elementHoverOut'
        };
        window.parent.postMessage(hoverSchema, 'http://localhost:5173/');
    }

    function handleClick(e, _id, type) {
        if (type !== 'noEvent') {
            e.stopPropagation();
            e.preventDefault();
        }
        const target = type === 'noEvent' ? e : e.target;

        selectedInstanceId = _id;

        const width = target.offsetWidth;
        const height = target.offsetHeight;
        const rect = target.getBoundingClientRect();
        const offsetTop = rect.top;
        const offsetLeft = rect.left;

        const clickSchema = {
            action: 'elementClicked',
            data: {
                target: _id,
                width,
                height,
                offsetTop,
                offsetLeft
            }
        };

        if (type === 'noEvent') {
            clickSchema.mirroring = true; }

        window.parent.postMessage(clickSchema, 'http://localhost:5173/');
    }

    function handleDoubleClick(e, _id) {
        e.stopPropagation();
        let nodeName = e.target.nodeName;

        if (nodeName === 'H1' || nodeName === 'H2' || nodeName === 'H3' || nodeName === 'H4' || nodeName === 'H5' || nodeName === 'P') {
            e.target.contentEditable = true;
            e.target.focus();

            const currentContent = e.target.innerHTML;

            // Handle paste events
            const handlePaste = (e) => {
                e.preventDefault();
                const text = e.clipboardData.getData('text/plain');
                const cleanText = text.trim()
                    .replace(/<[^>]*>/g, '')
                    .replace(/\s+/g, ' ');
                document.execCommand('insertText', false, cleanText);
            };

            // Handle keydown for Enter key
            const handleKeydown = (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault();
                    document.execCommand('insertLineBreak');
                }

                const width = e.target.offsetWidth;
                const height = e.target.offsetHeight;
                const rect = e.target.getBoundingClientRect();
                const offsetTop = rect.top;
                const offsetLeft = rect.left;

                const clickSchema = {
                    action: 'elementClicked',
                    data: {
                        target: selectedInstanceId,
                        width,
                        height,
                        offsetTop,
                        offsetLeft
                    },
                    mirroring: true
                };

                window.parent.postMessage(clickSchema, 'http://localhost:5173/');
            };

            let selectionTimeout;

            function handleSelectionChange() {
                const selection = window.getSelection();
                if (!selection.rangeCount) return;

                selectionText = selection.toString();

                const range = selection.getRangeAt(0);
                // if (!e.target.contains(range.startContainer)) {
                //     window.parent.postMessage({
                //         action: 'textSelectionChanged',
                //         data: {
                //             width: 0,
                //             offsetTop: 0,
                //             offsetLeft: 0
                //         }
                //     }, 'http://localhost:5173/');
                //     return;
                // }

                const rect = range.getBoundingClientRect();

                if (rect.width > 3) {
                    const selectionSchema = {
                        action: 'textSelectionChanged',
                        data: {
                            target: _id,
                            width: rect.width,
                            offsetTop: rect.top,
                            offsetLeft: rect.left
                        }
                    };
                    window.parent.postMessage(selectionSchema, 'http://localhost:5173/');
                }
            }

            function handleMouseUp() {
                if (selectionTimeout) {
                    clearTimeout(selectionTimeout);
                }
                selectionTimeout = setTimeout(handleSelectionChange, 10);
            }

            // Clean HTML content
            const cleanHTML = (html) => {
                // For debugging

                // Create a temporary div
                const temp = document.createElement('div');
                temp.innerHTML = html;

                // Define allowed tags
                const allowedTags = ['span', 'b', 'em', 'strong', 'i', 'br'];

                // Recursive function to clean nodes
                const cleanNode = (node) => {
                    // Handle text nodes
                    if (node.nodeType === 3) {
                        return node.cloneNode(true);
                    }

                    // Handle element nodes
                    if (node.nodeType === 1) {
                        const tagName = node.tagName.toLowerCase();
                        
                        if (allowedTags.includes(tagName)) {
                            // Create new element of allowed type
                            const cleanElement = document.createElement(tagName);
                            
                            // Copy allowed attributes if needed
                            // cleanElement.className = node.className; // Uncomment if you want to preserve classes
                            
                            // Process child nodes
                            Array.from(node.childNodes).forEach(child => {
                                const cleanChild = cleanNode(child);
                                if (cleanChild) {
                                    cleanElement.appendChild(cleanChild);
                                }
                            });
                            
                            return cleanElement;
                        } else {
                            // For disallowed tags, preserve their content
                            const wrapper = document.createElement('div');
                            Array.from(node.childNodes).forEach(child => {
                                const cleanChild = cleanNode(child);
                                if (cleanChild) {
                                    wrapper.appendChild(cleanChild);
                                }
                            });
                            return wrapper;
                        }
                    }
                    
                    return null;
                };

                // Clean the content
                const wrapper = document.createElement('div');
                Array.from(temp.childNodes).forEach(childNode => {
                    const cleaned = cleanNode(childNode);
                    if (cleaned) {
                        wrapper.appendChild(cleaned);
                    }
                });

                // For debugging
                
                return wrapper.innerHTML;
            };

            const handleBlur = () => {
                let editedContent = e.target.innerHTML;
                // Clean the HTML before saving
                editedContent = cleanHTML(editedContent);
                e.target.innerHTML = editedContent;
                e.target.contentEditable = false;
                
                // Remove event listeners
                e.target.removeEventListener('paste', handlePaste);
                e.target.removeEventListener('keydown', handleKeydown);
                e.target.removeEventListener('mouseup', handleMouseUp);
                
                if (selectionTimeout) {
                    clearTimeout(selectionTimeout);
                }

                window.parent.postMessage({
                    action: 'textSelectionChanged',
                    data: {
                        width: 0,
                        offsetTop: 0,
                        offsetLeft: 0
                    }
                }, 'http://localhost:5173/');
                
                if (editedContent === currentContent) {
                    return;
                }

                const clickSchema = {
                    action: 'contentChanged',
                    data: {
                        target: _id,
                        content: editedContent
                    }
                };
                window.parent.postMessage(clickSchema, 'http://localhost:5173/');
            };

            // Add event listeners
            e.target.addEventListener('paste', handlePaste);
            e.target.addEventListener('keydown', handleKeydown);
            e.target.addEventListener('mouseup', handleMouseUp);
            e.target.addEventListener('blur', handleBlur, { once: true });
        }
    }

    // Inject Event Listeners Once
    let listenersInjected = false;

    function injectEventListeners(force) {
        setTimeout(() => {
            if (listenersInjected && !force) return;
            listenersInjected = true;

            const elements = document.querySelectorAll(`[mtrix-instance-id]`);
            elements.forEach((element) => {
                if (element.nodeName.toLowerCase() === 'body') {
                    return; }
                let instanceId = element.getAttribute('mtrix-instance-id');
                if (element && !element.dataset.listenersAttached) {
                    element.addEventListener('mouseenter', (e) => handleMouseEnter(e, instanceId));
                    element.addEventListener('mouseout', (e) => handleMouseOut(e, instanceId));
                    element.addEventListener('click', (e) => handleClick(e, instanceId));
                    element.addEventListener('dblclick', (e) => handleDoubleClick(e, instanceId));

                    // Mark as attached
                    element.dataset.listenersAttached = 'true';
                }
            });
        }, 200);
    }

    function changeElementTagName(element, newTagName) {
        // Create new element with desired tag name
        const newElement = document.createElement(newTagName);
        
        // Copy all attributes
        Array.from(element.attributes).forEach(attr => {
            newElement.setAttribute(attr.name, attr.value);
        });
        
        // Copy all child nodes
        while (element.firstChild) {
            newElement.appendChild(element.firstChild);
        }
        
        // Replace old element with new one
        if (element.parentNode) {
            element.parentNode.replaceChild(newElement, element);
        }
        
        return newElement;
    }

    function handleElementCreation(elementData) {
        // Find the parent element
        const parentElement = document.querySelector(`[mtrix-instance-id="${elementData.parentInstanceId}"]`);
        
        if (!parentElement) {
            console.error('Parent element not found');
            return;
        }

        // Create the new element
        const newElement = document.createElement(elementData.nodeName);
        
        // Add the mtrix-instance-id attribute
        newElement.setAttribute('mtrix-instance-id', elementData.instanceId);
        
        // Add any additional attributes
        if (elementData.attributes && elementData.attributes.length > 0) {
            elementData.attributes.forEach(attr => {
                newElement.setAttribute(attr.name, attr.value);
            });
        }
        
        // Add content if it exists
        if (elementData.content) {
            newElement.textContent = elementData.content;
        }
        
        // Append the element to its parent
        parentElement.appendChild(newElement);
        
        return newElement;
    }

    function handleOrderChange(instanceId, parentId, order) {
        const elementToMove = document.querySelector(`[mtrix-instance-id="${instanceId}"]`);
        const parentElement = document.querySelector(`[mtrix-instance-id="${parentId}"]`);
        
        if (!elementToMove || !parentElement) {
            console.error('Required elements not found');
            return;
        }

        // Get all child elements of the parent with their orders
        const siblingElements = Array.from(parentElement.children).filter(el => 
            el.hasAttribute('mtrix-instance-id') && 
            el.getAttribute('mtrix-instance-id') !== instanceId
        );

        // Convert orders to numbers and sort siblings
        siblingElements.sort((a, b) => {
            const orderA = Number(a.getAttribute('mtrix-order') || 0);
            const orderB = Number(b.getAttribute('mtrix-order') || 0);
            return orderA - orderB;
        });

        // Find the first sibling with a higher order
        const nextSibling = siblingElements.find(el => 
            Number(el.getAttribute('mtrix-order') || 0) > order
        );

        // Update the order attribute of the moving element
        elementToMove.setAttribute('mtrix-order', order.toString());

        // Insert the element in the correct position
        if (nextSibling) {
            parentElement.insertBefore(elementToMove, nextSibling);
        } else {
            parentElement.appendChild(elementToMove);
        }
    }

    let presetComponents = new Map();

    // Dynamically import components
    async function loadComponents() {
        for (const comp of data.components) {
            if (comp.type === 'custom') {
                return; }
            try {
                const module = await import(comp.path);
                const targetElement = document.querySelector(`[mtrix-component-id="${comp.componentId}"]`);
                
                if (targetElement && module.default) {
                    // Create a new instance of the component
                    new module.default({
                        target: targetElement,
                        props: {
                            // Add any props you need to pass
                        }
                    });
                }
            } catch (error) {
                console.error(`Failed to load component ${comp.path}:`, error);
            }
        }
    }

    // loadComponents();

    // Process HTML to replace component tags with actual components
    // function processHTML(htmlString) {
    //     const temp = document.createElement('div');
    //     temp.innerHTML = htmlString;

    //     // Find all component tags and create placeholders
    //     const componentElements = temp.querySelectorAll(data.components.map(c => c.componentName).join(','));
    //     componentElements.forEach((el, index) => {
    //         const placeholder = document.createElement('div');
    //         placeholder.setAttribute('data-preset-component', el.tagName);
    //         placeholder.setAttribute('data-index', index);
    //         el.parentNode.replaceChild(placeholder, el);
    //     });

    //     return temp.innerHTML;
    // }

    onMount(async () => {
        let initCount = 0;
        if (editMode && browser) {
            
            injectEventListeners(initCount > 0 ? true : false);

            window.addEventListener('message', async (message) => {
                if (message.origin !== 'https://nova-development.vercel.app' && message.origin !== 'http://localhost:5173') {
                    return;
                }

                if (message.data && message.data.action) {
                    if (message.data.action === 'initialization') {
                        pageContent = '';
                        styling = '';
                        dPage = message.data.data.page;
                        instances = message.data.data.instances;
                        components = message.data.data.components;
                        let styles = message.data.data.styleSheet;
                        
                        styling = `<style>${generateCSSFromData(styles)}</style>`;

                        // Dynamic component loading (if needed)
                        /*
                        for (const component of components) {
                            try {
                                const { default: Component } = await import(component.path);
                                componentInstances.push(Component);
                            } catch (error) {
                                console.error(`Error loading component ${component.name}:`, error);
                            }
                        }
                        */

                        initialized = true;

                        // Choose between direct listener injection or event delegation
                        injectEventListeners(initCount > 0 ? true : false);

                        initCount += 1;

                        if (dPage.pageId === 'component') {
                            window.parent.postMessage({action: 'heightChanged', data: {height: document.body.scrollHeight}}, 'http://localhost:5173/'); }
                        // setupEventDelegation(); // Uncomment to use event delegation instead
                    }

                    if (message.data.action === 'componentFocused') {
                        instances = message.data.data.instances;
                        htmlContent = reconstructHTML(instances, components);

                        initialized = true;

                        componentFocused = true;

                        // Choose between direct listener injection or event delegation
                        injectEventListeners(initCount > 0 ? true : false);

                        initCount += 1;

                        setTimeout(() => {
                            window.parent.postMessage({action: 'heightChanged', data: {height: document.body.scrollHeight}}, 'http://localhost:5173/');
                        }, 240);
                    };

                    if (message.data.action === 'componentBlurred') {
                        instances = message.data.data.instances;
                        console.log('RECONSTRUCT HTML W/: ', instances);
                        htmlContent = reconstructHTML(instances, components);

                        initialized = true;

                        componentFocused = true;

                        // Choose between direct listener injection or event delegation
                        injectEventListeners(initCount > 0 ? true : false);

                        initCount += 1;

                        setTimeout(() => {
                            window.parent.postMessage({action: 'heightChanged', data: {height: document.body.scrollHeight}}, 'http://localhost:5173/');
                        }, 240);
                    }

                    if (message.data.action === 'elementAppended') {
                        handleElementCreation(message.data.data.instance);
                        injectEventListeners(true)
                    }

                    if (message.data.action === 'elementDeleted') {
                        let instance = document.querySelector(`[mtrix-instance-id="${message.data.data.instanceId}"]`);
                        let parent = instance.parentElement;
                        selectedInstanceId = parent.getAttribute('mtrix-instance-id');
                        instance.remove();

                        handleClick(parent, selectedInstanceId, 'noEvent');
                    }

                    if (message.data.action === 'elementAttributeAdded') {
                        document.querySelector(`[mtrix-instance-id="${message.data.data.instanceId}"]`)?.setAttribute(message.data.data.attribute.name, message.data.data.attribute.value)
                    }

                    if (message.data.action === 'orderChanged') {
                        handleOrderChange(message.data.data.instanceId, message.data.data.parentId, message.data.data.order);
                    }

                    if (message.data.action === 'elementAttributeRemoved') {
                        document.querySelector(`[mtrix-instance-id="${message.data.data.instanceId}"]`)?.removeAttribute(message.data.data.attribute.name);
                    }

                    if (message.data.action === 'elementTagChanged') {
                        let element = document.querySelector(`[mtrix-instance-id="${message.data.data.instanceId}"]`);
                        if (element) {
                            changeElementTagName(element, message.data.data.nodeName)
                        };
                    }

                    if (message.data.action === 'stylingChanged') {
                        let styles = message.data.data.styleSheet;

                        styling = `<style>${generateCSSFromData(styles)}</style>`;

                        console.log('STYLING RECEIVED: ', styling);

                        console.log(document.querySelector('.section-content-box.v-7ba7'));

                        let selectedElement = document.querySelector(`[mtrix-instance-id="${selectedInstanceId}"]`);
                        handleClick(selectedElement, selectedInstanceId, 'noEvent');
                    }

                    if (message.data.action === 'selectionChanged') {
                        if (selectedInstanceId.length > 0) {
                            document.querySelector(`[mtrix-instance-id="${selectedInstanceId}"]`)?.classList.remove('in-edit');
                        }

                        selectedInstanceId = message.data.data.instanceId;
                        let selectedElement = document.querySelector(`[mtrix-instance-id="${selectedInstanceId}"]`);

                        selectedElement.classList.add('in-edit');

                        const observer = new IntersectionObserver(
                            ([entry]) => {
                                if (!entry.isIntersecting) {
                                    window.scroll({
                                        top: selectedElement.offsetTop - 120,
                                        behavior: 'smooth'
                                    });
                                }
                                observer.disconnect();
                            },
                            {
                                root: null,
                                rootMargin: '120px',
                                threshold: 1.0
                            }
                        );

                        observer.observe(selectedElement);

                        handleClick(selectedElement, selectedInstanceId, 'noEvent');
                    }

                    if (message.data.action === 'contentChanged') {
                        document.querySelector(`[mtrix-instance-id="${message.data.data.instanceId}"]`).innerHTML = message.data.data.content;
                    }

                    if (message.data.action === 'classChanged') {
                        document.querySelector(`[mtrix-instance-id="${message.data.data.target}"]`).className = message.data.data.className;
                    }

                    if (message.data.action === 'boldSelection') {

                        let selectedEl = document.querySelector(`[mtrix-instance-id="${selectedInstanceId}"]`);
                        wrapTextInContainer(selectedEl, selectionText, 'bold');
                    }

                    if (message.data.action === 'italicSelection') {
                        let selectedEl = document.querySelector(`[mtrix-instance-id="${selectedInstanceId}"]`);
                        wrapTextInContainer(selectedEl, selectionText, 'italic');
                    }

                    
                }
            });

            // Optional: Setup event delegation if preferred
            // setupEventDelegation();
        }
    });

    const wrapTextInContainer = (container, textToWrap, formatType) => {
        // Get the current HTML content
        let content = container.innerHTML;
        
        // Create the wrapped version
        const tag = formatType === 'bold' ? 'b' : 'i';
        const wrappedText = `<${tag}>${textToWrap}</${tag}>`;
        
        // Replace the first instance of the text
        content = content.replace(textToWrap, wrappedText);
        
        // Update the container
        container.innerHTML = content;
    };

    let scrollPos = 0;
    let innerWidth;
    function handleScroll() {
        if (scrollPos > 0 && selectedInstanceId.length > 0) {
            let selectedElement = document.querySelector(`[mtrix-instance-id="${selectedInstanceId}"]`);
            handleClick(selectedElement, selectedInstanceId, 'noEvent');
        }
    }

    function handleResize() {
        if ((innerWidth && innerWidth > 350) && selectedInstanceId.length > 0) {
            let selectedElement = document.querySelector(`[mtrix-instance-id="${selectedInstanceId}"]`);
            handleClick(selectedElement, selectedInstanceId, 'noEvent');
        }
    }

    let htmlContent = data.pageContent;
    let cssData = data.cssData;

    let bannerAttributes = {
		stylingData: '#dcff8e',
		hasTimer: true,
		discountCode: '',
		element: '',
		content: '<p>🎄 HOLIDAY SALE! 🎅 UP TO <strong>46% OFF AUTO-APPLIED&nbsp;</strong></p>'
	};

    const bannerData = "<p>24H SALE: GET <strong>3 FREE TOWELS + EXTRA 20% OFF</strong> WITH CODE <span>FEST20</span></p>";

    $: scrollPos, handleScroll();
    $: innerWidth, handleResize();
</script>

<svelte:head>
    {#if cssData}
    <link rel="stylesheet" href="/assets/css/upsell.css">
    {/if}
</svelte:head>

<svelte:window bind:innerWidth={innerWidth} bind:scrollY={scrollPos} />
<!-- Render each loaded component -->
<!-- {#each componentInstances as Component}
    <svelte:component this={Component} />
{/each} -->
{#if !componentFocused}
<Banners bannerAttributes={bannerAttributes} bannerData={bannerData} />
{/if}

{@html htmlContent}

{@html styling}

{#if !componentFocused}
{#await loadComponents()}
    <div>Loading components...</div>
{/await}
{/if}