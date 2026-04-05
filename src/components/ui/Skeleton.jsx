import React from 'react';
import ContentLoader from 'react-content-loader';

export const CarCardSkeleton = () => (
  <ContentLoader
    speed={2}
    width={300}
    height={350}
    viewBox="0 0 300 350"
    backgroundColor="#F3F2EE"
    foregroundColor="#E4E4E7"
  >
    <rect x="0" y="0" rx="12" ry="12" width="300" height="200" />
    <rect x="15" y="215" rx="4" ry="4" width="200" height="20" />
    <rect x="15" y="240" rx="4" ry="4" width="150" height="15" />
    <rect x="15" y="265" rx="4" ry="4" width="100" height="30" />
    <rect x="200" y="265" rx="4" ry="4" width="85" height="30" />
  </ContentLoader>
);

export const StatsCardSkeleton = () => (
  <ContentLoader
    speed={2}
    width={250}
    height={100}
    viewBox="0 0 250 100"
    backgroundColor="#F3F2EE"
    foregroundColor="#E4E4E7"
  >
    <rect x="15" y="20" rx="4" ry="4" width="80" height="15" />
    <rect x="15" y="45" rx="4" ry="4" width="60" height="30" />
    <circle cx="210" cy="50" r="25" />
  </ContentLoader>
);

export const TableRowSkeleton = () => (
  <ContentLoader
    speed={2}
    width="100%"
    height={60}
    viewBox="0 0 800 60"
    backgroundColor="#F3F2EE"
    foregroundColor="#E4E4E7"
  >
    <rect x="10" y="15" rx="4" ry="4" width="150" height="30" />
    <rect x="180" y="15" rx="4" ry="4" width="120" height="30" />
    <rect x="320" y="15" rx="4" ry="4" width="100" height="30" />
    <rect x="440" y="15" rx="4" ry="4" width="80" height="30" />
    <rect x="540" y="15" rx="4" ry="4" width="100" height="30" />
    <rect x="660" y="15" rx="4" ry="4" width="80" height="30" />
  </ContentLoader>
);
