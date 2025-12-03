# Modern Web Calculator

A beautiful, feature-rich calculator built with HTML, CSS, and JavaScript.

## Features

✨ **Modern UI**
- Beautiful gradient theme with smooth animations
- Responsive design that works on all devices
- Hover effects and visual feedback

⌨️ **Keyboard Support**
- Numbers: `0-9`
- Operators: `+`, `-`, `*`, `/`
- Calculate: `Enter` or `=`
- Clear: `Escape` or `C`
- Backspace: `Backspace`
- Decimal: `.`

📜 **Calculation History**
- Tracks last 10 calculations
- Click on history items to reuse results
- Clear history button

🎯 **Smart Features**
- Decimal operations with automatic trailing zero removal
- Chained operations (e.g., 5 + 3 + 2)
- Division by zero error handling
- Exponential notation for very large/small numbers

## How to Use

### Option 1: Open Directly in Browser
Simply open `index.html` in your web browser:
```bash
open index.html
# or
google-chrome index.html
# or
firefox index.html
```

### Option 2: Using a Local Server
For a better experience, use a local server:

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

**Using Node.js:**
```bash
# If you have npx
npx http-server

# Or install http-server globally
npm install -g http-server
http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

Then open your browser and navigate to `http://localhost:8000`

## File Structure

```
web/
├── index.html         # Main HTML structure
├── styles.css         # All styling and animations
├── calculator.js      # Calculator logic and functionality
└── README.md         # This file
```

## Browser Compatibility

Works on all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

## Screenshots

The calculator features:
- **Dark Theme**: Beautiful gradient background (navy blue to purple)
- **Display**: Large, easy-to-read display with calculation history
- **Button Grid**: Color-coded buttons (blue for operators, green for equals, red for clear)
- **History Panel**: Shows recent calculations with click-to-reuse functionality
- **Info Section**: Lists all features and keyboard shortcuts

## Customization

You can easily customize the calculator by editing `styles.css`:

- Change colors in the gradient backgrounds
- Adjust button sizes and spacing
- Modify animations and transitions
- Change fonts and font sizes

## Technical Details

- **Pure JavaScript**: No frameworks or dependencies required
- **ES6+**: Uses modern JavaScript features (classes, arrow functions, template literals)
- **CSS Grid**: Responsive button layout
- **Flexbox**: Flexible container layouts
- **CSS Animations**: Smooth transitions and effects
- **Event Delegation**: Efficient keyboard event handling

## Development

To modify the calculator:

1. **HTML** (`index.html`): Add/remove buttons or change structure
2. **CSS** (`styles.css`): Modify styling, colors, or animations
3. **JavaScript** (`calculator.js`): Add features or change calculation logic

## Known Limitations

- Does not support parentheses in the current version
- No scientific calculator functions (sin, cos, log, etc.)
- History is not persistent (cleared on page refresh)

## Future Enhancements

Possible improvements:
- [ ] LocalStorage for persistent history
- [ ] Scientific calculator mode
- [ ] Theme switcher (light/dark mode)
- [ ] Expression parsing for complex calculations
- [ ] Memory functions (M+, M-, MR, MC)
- [ ] Percentage calculations

## License

This is part of the Calculator App project.

## Contributing

Feel free to fork and improve! Some ideas:
- Add more themes
- Implement scientific functions
- Add unit conversions
- Create a mobile app version

Enjoy calculating! 🧮✨
