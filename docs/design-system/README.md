# Design System Documentation

UI components, design tokens, style guide, and brand guidelines.

## Contents

### Design Tokens
- Colors
- Typography
- Spacing
- Shadows and elevation
- Border radius

### Components
- Component specifications
- Usage guidelines
- Code examples

### Icons
- Icon library
- Usage guidelines

### Patterns
- Common UI patterns
- Layout patterns
- Navigation patterns

## Design Tokens

### Colors

**Primary Colors:**
```scss
--ion-color-primary: #3880ff;
--ion-color-primary-rgb: 56, 128, 255;
--ion-color-primary-contrast: #ffffff;
```

**Secondary Colors:**
```scss
--ion-color-secondary: #3dc2ff;
--ion-color-secondary-rgb: 61, 194, 255;
--ion-color-secondary-contrast: #ffffff;
```

**Status Colors:**
- Success: Green
- Warning: Orange
- Danger: Red
- Info: Blue

### Typography

**Font Family:**
```scss
--ion-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

**Font Sizes:**
- XS: 12px
- SM: 14px
- Base: 16px
- LG: 18px
- XL: 20px
- 2XL: 24px
- 3XL: 30px

**Font Weights:**
- Regular: 400
- Medium: 500
- Bold: 700

### Spacing

Based on 4px grid:
- XS: 4px
- SM: 8px
- MD: 16px
- LG: 24px
- XL: 32px
- 2XL: 48px

## Component Library

### Buttons

**Primary Button:**
```html
<ion-button expand="block" color="primary">
  Primary Action
</ion-button>
```

**Usage:**
- Primary actions
- Form submissions
- Call-to-action

### Cards

**Standard Card:**
```html
<ion-card>
  <ion-card-header>
    <ion-card-title>Title</ion-card-title>
  </ion-card-header>
  <ion-card-content>
    Content goes here
  </ion-card-content>
</ion-card>
```

**Usage:**
- Group related content
- Display summaries
- Clickable containers

### Forms

**Input Field:**
```html
<ion-item>
  <ion-label position="floating">Label</ion-label>
  <ion-input type="text" placeholder="Enter text"></ion-input>
</ion-item>
```

**Validation:**
- Show errors below input
- Use danger color for errors
- Include helpful error messages

## Layout Patterns

### Page Structure
```html
<ion-header>
  <ion-toolbar>
    <ion-title>Page Title</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content>
  <!-- Page content -->
</ion-content>
```

### Grid Layout
```html
<ion-grid>
  <ion-row>
    <ion-col size="12" size-md="6">
      <!-- Content -->
    </ion-col>
  </ion-row>
</ion-grid>
```

## Brand Guidelines

### Logo
- Logo variations
- Clear space requirements
- Minimum sizes

### Voice and Tone
- Friendly and approachable
- Clear and concise
- Encouraging and positive

---

_Last Updated: 2026-01-03_
