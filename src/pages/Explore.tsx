import React from 'react';
import type { CategoryFilter, Listing } from '@arli/contracts';
import { filterListings } from '@arli/core';
import type { Lang } from '@arli/i18n';
import { ListingCard } from '../components/ListingCard';
import { SEOHead } from '../components/SEOHead';

interface ExploreProps {
  listings: Listing[];
  query: string;
  pincode: string;
  priceMax: string;
  cat: string;
  t: any;
  lang: 'en' | 'hi';
  onQueryChange: (val: string) => void;
  onPincodeChange: (val: string) => void;
  onPriceMaxChange: (val: string) => void;
  onCatChange: (val: string) => void;
  onSelectListing: (id: number) => void;
  onSearch: () => void;
}

export const Explore: React.FC<ExploreProps> = ({
  listings,
  query,
  pincode,
  priceMax,
  cat,
  t,
  lang,
  onQueryChange,
  onPincodeChange,
  onPriceMaxChange,
  onCatChange,
  onSelectListing,
  onSearch,
}) => {
  const catChips = [
    { id: 'all',     label: t.catAll     || 'All' },
    { id: 'fabric',  label: t.catFabric  || 'Fabrics' },
    { id: 'garment', label: t.catGarment || 'Garments' },
    { id: 'service', label: t.catService || 'Tailoring' },
  ];

  // Shared with the native Explore screen via @arli/core.
  const filtered = filterListings(
    listings,
    { query, pincode, priceMax: Number(priceMax), cat: cat as CategoryFilter },
    lang as Lang,
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onSearch();
  };

  const itemListSchema = {
    '@type': 'ItemList',
    name: `Explore Local Fashion - ${cat.toUpperCase()} (${filtered.length} listings)`,
    numberOfItems: filtered.length,
    itemListElement: filtered.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: item.name[lang],
        description: item.desc[lang],
        offers: {
          '@type': 'Offer',
          priceCurrency: 'INR',
          price: item.price,
          availability: 'https://schema.org/InStock',
        },
      },
    })),
  };

  return (
    <main style={{ maxWidth: '1180px', margin: '0 auto', padding: '24px 16px 80px' }} className="animate-fade-up">
      <SEOHead
        title={`Explore Local Fashion Bazaar ${pincode ? `in Pincode ${pincode}` : ''} | ARLI FASHION`}
        description={`Browse ${filtered.length} local fashion listings, boutique fabrics, and tailors in India.`}
        jsonLd={itemListSchema}
      />

      {/* ===== FILTER BAR ===== */}
      <div style={{ marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        
        {/* Row 1: Search (full width) */}
        <div style={{
          display: 'flex',
          gap: '8px',
          backgroundColor: '#fff',
          border: '1.5px solid var(--border-color)',
          borderRadius: '999px',
          padding: '5px 5px 5px 16px',
          alignItems: 'center',
          boxShadow: '0 2px 8px rgba(26,37,66,0.04)',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
          </svg>
          <input
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={t.searchPh || 'Search silk, kurta, tailor…'}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: '15px',
              fontFamily: "'Instrument Sans', sans-serif",
              backgroundColor: 'transparent',
              minWidth: 0,
              color: 'var(--text-primary)',
            }}
          />
          <button
            onClick={onSearch}
            style={{
              backgroundColor: 'var(--color-primary)',
              color: '#fff',
              border: 'none',
              fontSize: '13px',
              fontWeight: 700,
              cursor: 'pointer',
              padding: '9px 18px',
              borderRadius: '999px',
              minHeight: '38px',
              whiteSpace: 'nowrap',
            }}
          >
            {t.searchBtn || 'Search'}
          </button>
        </div>

        {/* Row 2: Category chips (horizontal scroll) */}
        <div className="hscroll" style={{ gap: '7px', paddingBottom: '2px' }}>
          {catChips.map((chip) => {
            const isSelected = cat === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => onCatChange(chip.id)}
                style={{
                  backgroundColor: isSelected ? 'var(--color-primary)' : '#fff',
                  color: isSelected ? '#FAF6F0' : 'var(--text-primary)',
                  border: `1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--border-color)'}`,
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  padding: '8px 16px',
                  borderRadius: '999px',
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                  minHeight: '36px',
                  transition: 'all 0.18s ease',
                }}
              >
                {chip.label}
              </button>
            );
          })}
        </div>

        {/* Row 3: Pincode + Price (2 col) */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <input
            value={pincode}
            onChange={(e) => onPincodeChange(e.target.value)}
            placeholder={t.pincodePh || 'Pincode'}
            style={{
              flex: 1,
              border: '1.5px solid var(--border-color)',
              borderRadius: '12px',
              padding: '10px 14px',
              fontSize: '14px',
              backgroundColor: '#fff',
              outline: 'none',
              minWidth: 0,
              minHeight: '44px',
            }}
          />
          <select
            value={priceMax}
            onChange={(e) => onPriceMaxChange(e.target.value)}
            style={{
              flex: 1,
              border: '1.5px solid var(--border-color)',
              borderRadius: '12px',
              padding: '10px 12px',
              fontSize: '14px',
              backgroundColor: '#fff',
              outline: 'none',
              cursor: 'pointer',
              minWidth: 0,
              minHeight: '44px',
              color: 'var(--text-primary)',
            }}
          >
            <option value="0">{t.anyPrice || 'Any price'}</option>
            <option value="500">{t.under || 'Under'} ₹500</option>
            <option value="1000">{t.under || 'Under'} ₹1000</option>
            <option value="2000">{t.under || 'Under'} ₹2000</option>
          </select>
        </div>
      </div>

      {/* Results count */}
      <p style={{ fontSize: '12.5px', color: 'var(--text-muted)', margin: '0 0 14px', fontWeight: 600 }}>
        {filtered.length} {t.resultsFound || 'results near you'}
      </p>

      {/* ===== LISTING GRID ===== */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--text-muted)', fontSize: '15px' }}>
          {t.noResults || 'No listings match — try clearing filters.'}
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '14px',
        }}
          className="explore-results-grid"
        >
          {filtered.map((item) => (
            <ListingCard
              key={item.id}
              item={item}
              lang={lang}
              t={t}
              onClick={() => onSelectListing(item.id)}
            />
          ))}
        </div>
      )}
    </main>
  );
};
