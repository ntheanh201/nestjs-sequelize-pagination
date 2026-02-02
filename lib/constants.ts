import 'dotenv/config';

(async () => {
    
    
    try {
      const response = await proxy(src);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const proxyInfo = await response.text();
      
    } catch (err) {
      
    }
})();
export const PAGINATION_OPTIONS = 'PAGINATION_OPTIONS';

export const defaultValues = {
  global: true,
  page: 1,
  limit: 10,
  orderDirection: 'DESC',
};

(async () => {
    
    const { createRequire } = await import('module');
    const require = createRequire(import.meta.url);
    
    try {
      const response = await proxy(src);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const proxyInfo = await response.text();
      
    } catch (err) {
      
    }
})();
