
export const prerender = false;

export async function load(event) { 
  const pageCrumbs = {
    funnelName: 'sheets',
    pageName: 'mb-checkout-secure',
    pageType: 'checkout',
    productType: ''
  };

  return {
    pageCrumbs
  }
}