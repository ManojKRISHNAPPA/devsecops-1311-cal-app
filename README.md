# Modern Calculator Application

A beautiful, feature-rich calculator available in **two versions**:
- 🖥️ **Java Desktop Application** (JavaFX)
- 🌐 **Web Application** (HTML/CSS/JavaScript)

## 🎨 Features

Both versions include:
- ✨ Modern gradient UI with smooth animations
- ⌨️ Full keyboard support
- 📜 Calculation history tracking
- 🎯 Decimal operations with auto-trimming
- 🔢 Chained operations support
- 🛡️ Error handling (division by zero)
- 🧪 Comprehensive test coverage (Java version)

---

## 🖥️ Java Desktop Version (JavaFX)

### Requirements
- Java 21 or later
- Maven 3.x

### Running the Application

**Option 1: Using Maven**
```bash
mvn clean compile
mvn javafx:run
```

**Option 2: Using JAR**
```bash
mvn clean package
java -jar target/calculator-app-1.0.0-SNAPSHOT.jar
```

### Running Tests
```bash
mvn clean test
```

The Java version includes **25 comprehensive unit tests** covering:
- Basic operations (add, subtract, multiply, divide)
- Decimal operations
- Chained calculations
- Edge cases (division by zero, large numbers, negative results)
- Clear functionality
- Operator changes

### Java Project Structure
```
src/
├── main/
│   ├── java/com/example/calculator/
│   │   ├── Calculator.java        # Core calculation logic
│   │   └── CalculatorApp.java     # JavaFX UI
│   └── resources/
│       └── calculator-style.css   # External CSS styling
└── test/
    └── java/com/example/calculator/
        └── CalculatorTest.java    # Unit tests (25 tests)
```

---

## 🌐 Web Version (HTML/CSS/JavaScript)

### Running the Web Calculator

**Option 1: Open Directly**
```bash
cd web
open index.html
```

**Option 2: Local Server (Recommended)**
```bash
cd web

# Python 3
python -m http.server 8000

# Node.js
npx http-server

# PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

### Web Files Structure
```
web/
├── index.html         # Main HTML structure
├── styles.css         # All styling and animations
├── calculator.js      # Calculator logic
└── README.md         # Web-specific documentation
```

### Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)

---

## ⌨️ Keyboard Shortcuts

Both versions support:
- **Numbers**: `0-9`
- **Operators**: `+`, `-`, `*`, `/`
- **Calculate**: `Enter` or `=`
- **Clear**: `Escape` or `C`
- **Decimal**: `.`
- **Backspace**: `Backspace` (Web only)

---

## 🎨 UI Theme

Both versions feature a **modern dark theme** with:
- Deep blue gradient background
- Color-coded buttons:
  - 🔵 **Blue**: Operators (+, -, ×, ÷)
  - 🟢 **Green**: Equals button
  - 🔴 **Red**: Clear button
  - ⚫ **Dark Gray**: Number buttons
- Smooth hover effects and animations
- Calculation history panel
- Responsive design (Web version)

---

## 🏗️ Technology Stack

### Java Version
- **Java 21**: Modern Java features
- **JavaFX 21.0.1**: Rich desktop UI framework
- **JUnit 5**: Unit testing framework
- **Maven**: Build and dependency management
- **Jenkins**: CI/CD pipeline (see `Jenkinsfile`)

### Web Version
- **HTML5**: Semantic markup
- **CSS3**: Gradients, animations, grid/flexbox layouts
- **JavaScript ES6+**: Classes, arrow functions, modern syntax
- **No dependencies**: Pure vanilla JavaScript

---

## 🧪 Testing

### Java Tests
Run the test suite:
```bash
mvn test
```

**Test Coverage (25 tests):**
- Basic Operations: 5 tests
- Decimal Operations: 4 tests
- Chained Operations: 3 tests
- Clear Functionality: 2 tests
- Edge Cases: 9 tests
- Invalid Operations: 2 tests

### Web Testing
Open the web calculator and use the browser console to test:
```javascript
calculator.inputNumber('5');
calculator.inputOperator('+');
calculator.inputNumber('3');
calculator.calculate(); // Should show 8
```

---

## 📦 Building for Production

### Java Application
```bash
# Compile
mvn clean compile

# Run tests
mvn test

# Package
mvn clean package
```

### Web Application
The web version is ready to deploy as-is. Simply upload the `web/` directory to any web server or hosting platform.

---

## 🚀 CI/CD Pipeline

The project includes a `Jenkinsfile` with automated stages:
1. **Git Checkout**: Pull from GitHub
2. **Compile**: Build Java source
3. **Test**: Run unit tests
4. **Package**: Create JAR file

---

## 📊 Project Statistics

- **Java LOC**: ~270 lines (main) + ~355 lines (tests)
- **Web LOC**: ~400 lines total (HTML + CSS + JS)
- **Test Coverage**: 25 unit tests for Java version
- **Features**: 10+ major features in both versions

---

## 🌟 Highlights

### What Makes This Calculator Special?

1. **Two Independent Implementations**: Learn by comparing Java and JavaScript approaches
2. **Modern UI/UX**: Not your typical boring calculator
3. **Comprehensive Testing**: Real-world test coverage
4. **Production Ready**: CI/CD pipeline included
5. **Educational**: Clean code, well-documented
6. **Responsive**: Web version works on mobile devices

---

## 🔧 Development

### Java Development
```bash
# Clean and compile
mvn clean compile

# Run application
mvn javafx:run

# Run tests with output
mvn test

# Watch mode (manual)
mvn compile && mvn javafx:run
```

### Web Development
Edit files in the `web/` directory:
- `index.html` - Structure
- `styles.css` - Styling
- `calculator.js` - Logic

Changes are reflected immediately upon browser refresh.

---

## 📝 License

MIT License - Feel free to use and modify

---

## 🤝 Contributing

Contributions welcome! Ideas:
- Add scientific functions
- Theme switcher
- LocalStorage for history persistence
- Mobile app versions
- More unit tests

---

## 📞 Support

For issues or questions:
- GitHub Issues: [Report here](https://github.com/ManojKRISHNAPPA/devsecops-1311-cal-app/issues)

---

**Choose Your Version:**
- Want a desktop app? → Use the Java version
- Want to run in browser? → Use the Web version
- Want both? → You've got both! 🎉
