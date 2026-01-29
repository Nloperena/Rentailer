export const routes = {
  journey: '/',
  market: '/market',
  growth: '/growth',
  profile: '/profile',
  guide: '/guide',
  portfolio: '/portfolio',
  marketplace: '/marketplace',
  settings: '/settings',
};

export const getRoute = (key: keyof typeof routes) => routes[key];



