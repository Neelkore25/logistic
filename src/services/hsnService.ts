import { HS_CODES_DATABASE, HsCodeRecord } from '../data/hsCodes';

export interface HsnSearchResult {
  code: string;
  shortCode: string;
  name: string;
  category: string;
  type: 'agriculture' | 'food' | 'electronics' | 'medicine' | 'textile';
  gstRate: string;
  rodtepRate: string;
  exportPolicy: 'Free' | 'Restricted' | 'Prohibited';
  mandatoryCert: string;
  notes: string;
  source: 'api' | 'local_dgft';
}

export const hsnService = {
  /**
   * Search HSN codes via optional external API with robust local DGFT tariff fallback
   */
  async searchHsn(query: string, categoryFilter: string = 'all'): Promise<HsnSearchResult[]> {
    const trimmed = query.trim().toLowerCase();
    const apiUrl = import.meta.env.VITE_HSN_API_URL;
    const apiKey = import.meta.env.VITE_HSN_API_KEY;

    // If external API configured, attempt remote query first
    if (apiUrl && apiKey && trimmed.length > 2) {
      try {
        const response = await fetch(`${apiUrl}?q=${encodeURIComponent(trimmed)}`, {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          }
        });
        if (response.ok) {
          const apiData = await response.json();
          if (Array.isArray(apiData) && apiData.length > 0) {
            return apiData.map((item: any) => ({
              ...item,
              source: 'api'
            }));
          }
        }
      } catch (err) {
        console.warn('HSN External API lookup failed, falling back to DGFT catalog:', err);
      }
    }

    // High quality local DGFT catalog search
    return HS_CODES_DATABASE
      .filter(item => {
        const matchesCategory = categoryFilter === 'all' || item.type === categoryFilter;
        if (!trimmed) return matchesCategory;

        const matchesQuery =
          item.code.toLowerCase().includes(trimmed) ||
          item.shortCode.toLowerCase().includes(trimmed) ||
          item.name.toLowerCase().includes(trimmed) ||
          item.category.toLowerCase().includes(trimmed);

        return matchesCategory && matchesQuery;
      })
      .map(item => ({
        ...item,
        source: 'local_dgft'
      }));
  },

  /**
   * Get single HSN record by code
   */
  async getHsnByCode(code: string): Promise<HsnSearchResult | null> {
    const match = HS_CODES_DATABASE.find(item => item.code === code || item.shortCode === code);
    if (match) {
      return { ...match, source: 'local_dgft' };
    }
    return null;
  }
};
