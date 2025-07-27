# Like2Win Landing Page

A professional landing page for the Like2Win Farcaster Mini App built with Next.js 14, TypeScript, and TailwindCSS.

## Features

- ✨ **Modern Design**: Clean, professional UI with gradient effects and smooth animations
- 📱 **Mobile-First**: Fully responsive design optimized for all device sizes
- 🌙 **Dark Mode**: Complete dark mode support with smooth transitions
- ⚡ **Performance**: Optimized for Lighthouse scores 90+
- 🔗 **MiniKit Integration**: Seamless integration with Farcaster MiniKit
- 🛡️ **Error Handling**: Comprehensive error boundaries and user-friendly error messages
- 🎯 **SEO Optimized**: Complete meta tags and social sharing optimization

## Structure

```
app/
├── components/
│   ├── ErrorBoundary.tsx          # Global error handling
│   ├── LandingPage.tsx             # Main landing page component
│   ├── layout/
│   │   ├── Header.tsx              # Navigation header
│   │   └── Footer.tsx              # Site footer
│   ├── sections/
│   │   ├── Hero.tsx                # Hero section with animations
│   │   ├── Features.tsx            # Features showcase
│   │   ├── Demo.tsx                # Interactive demo
│   │   └── CTA.tsx                 # Call-to-action section
│   ├── ui/
│   │   ├── Button.tsx              # Reusable button component
│   │   ├── Card.tsx                # Card component
│   │   └── Modal.tsx               # Modal component
│   └── icons/
│       └── index.tsx               # Icon components
├── types/
│   └── index.ts                    # TypeScript type definitions
├── utils/
│   ├── errors.ts                   # Error handling utilities
│   └── format.ts                   # Formatting utilities
└── page.tsx                        # Main page with context detection
```

## Key Components

### Hero Section
- Animated background elements
- Dynamic statistics display
- Next raffle countdown
- Smooth scroll navigation

### Features Section
- Like2Win mechanics explanation
- Dual participation paths
- Prize distribution breakdown
- Bootstrap logic explanation

### Demo Section
- Interactive post liking simulation
- Real-time ticket counter
- Raffle simulation with results
- Step-by-step process visualization

### CTA Section
- Wallet connection integration
- Quick action buttons to Farcaster
- Statistics and social proof
- Notification signup

## Context-Aware Rendering

The application intelligently detects its environment:

- **Browser**: Shows full landing page experience
- **MiniKit Frame**: Shows optimized mini app interface

## Styling

- **Framework**: TailwindCSS with custom configuration
- **Dark Mode**: Class-based dark mode with automatic detection
- **Animations**: Custom keyframes and transitions
- **Typography**: Geist font family
- **Colors**: Blue-purple gradient theme with semantic color system

## Error Handling

- **Error Boundaries**: Protect each major section
- **User-Friendly Messages**: Clear, actionable error messages
- **Development Mode**: Detailed error information for debugging
- **Logging**: Structured error logging for monitoring

## SEO & Social

- **Meta Tags**: Complete OpenGraph and Twitter Card support
- **Structured Data**: Schema markup for better search visibility
- **Social Sharing**: Optimized images and descriptions
- **Canonical URLs**: Proper URL canonicalization

## Performance Features

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js automatic image optimization
- **Lazy Loading**: Deferred loading of non-critical content
- **Caching**: Optimized caching strategies

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Customization

### Colors
Update the TailwindCSS configuration and CSS variables in `app/theme.css` to customize the color scheme.

### Content
All text content is easily editable within the component files. Look for sections marked with comments for easy identification.

### Animations
Custom animations are defined in the TailwindCSS config. Add new animations by extending the `animation` and `keyframes` objects.

### Icons
Add new icons to `app/components/icons/index.tsx` following the existing pattern.

## Integration Points

### Wallet Connection
- OnchainKit wallet integration
- Automatic address formatting
- Connection state management

### Farcaster Integration
- MiniKit context detection
- Frame metadata generation
- Deep linking to Farcaster

### Analytics Ready
The components are structured to easily add analytics tracking:
- Button click events
- Section view tracking
- User interaction metrics

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast compliance

## Next Steps

1. **Environment Variables**: Set up production environment variables
2. **Analytics**: Integrate analytics tracking
3. **Testing**: Add unit and integration tests
4. **Monitoring**: Set up error monitoring service
5. **Performance**: Implement advanced performance monitoring

---

Built with ❤️ for the Farcaster ecosystem