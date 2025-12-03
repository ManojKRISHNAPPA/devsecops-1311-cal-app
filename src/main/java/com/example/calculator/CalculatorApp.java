package com.example.calculator;

import javafx.application.Application;
import javafx.geometry.Insets;
import javafx.geometry.Pos;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.Label;
import javafx.scene.control.ScrollPane;
import javafx.scene.input.KeyEvent;
import javafx.scene.layout.BorderPane;
import javafx.scene.layout.GridPane;
import javafx.scene.layout.VBox;
import javafx.stage.Stage;

import java.util.ArrayList;
import java.util.List;

/**
 * Modern JavaFX calculator with rich UI theme, keyboard support, and calculation history.
 */
public class CalculatorApp extends Application {

    private final Calculator calculator = new Calculator();
    private Label display;
    private Label historyDisplay;
    private VBox historyPanel;
    private final List<String> calculationHistory = new ArrayList<>();

    @Override
    public void start(Stage primaryStage) {
        // Main display for current calculation
        display = new Label("0");
        display.setAlignment(Pos.CENTER_RIGHT);
        display.getStyleClass().add("display");
        display.setMaxWidth(Double.MAX_VALUE);

        // History display (shows previous operation)
        historyDisplay = new Label("");
        historyDisplay.setAlignment(Pos.CENTER_RIGHT);
        historyDisplay.getStyleClass().add("history-display");
        historyDisplay.setMaxWidth(Double.MAX_VALUE);

        // Create button grid
        GridPane buttons = createButtonGrid();
        buttons.getStyleClass().add("button-grid");

        // Create history panel
        historyPanel = createHistoryPanel();

        // Display container with both displays
        VBox displayContainer = new VBox(5);
        displayContainer.getChildren().addAll(historyDisplay, display);
        displayContainer.setAlignment(Pos.CENTER_RIGHT);
        displayContainer.setPadding(new Insets(15));
        displayContainer.getStyleClass().add("display-container");

        // Main layout
        BorderPane root = new BorderPane();
        root.setTop(displayContainer);
        root.setCenter(buttons);
        root.setBottom(historyPanel);
        root.setPadding(new Insets(15));

        // Create scene and apply CSS
        Scene scene = new Scene(root, 400, 650);
        scene.getStylesheets().add(getClass().getResource("/calculator-style.css").toExternalForm());

        // Add keyboard support
        scene.addEventFilter(KeyEvent.KEY_TYPED, this::handleKeyPress);

        primaryStage.setTitle("Modern Calculator");
        primaryStage.setScene(scene);
        primaryStage.setResizable(false);
        primaryStage.show();

        // Request focus for keyboard input
        root.requestFocus();
    }

    /**
     * Creates the history panel showing recent calculations
     */
    private VBox createHistoryPanel() {
        VBox panel = new VBox(5);
        panel.setPadding(new Insets(10));
        panel.getStyleClass().add("history-panel");
        panel.setMaxHeight(120);
        panel.setMinHeight(120);

        Label title = new Label("History");
        title.getStyleClass().add("title-label");

        ScrollPane scrollPane = new ScrollPane(panel);
        scrollPane.setFitToWidth(true);
        scrollPane.getStyleClass().add("history-scroll-pane");
        scrollPane.setVbarPolicy(ScrollPane.ScrollBarPolicy.AS_NEEDED);
        scrollPane.setHbarPolicy(ScrollPane.ScrollBarPolicy.NEVER);

        VBox container = new VBox(5);
        container.getChildren().addAll(title, panel);
        container.setPadding(new Insets(10, 0, 0, 0));

        return container;
    }

    /**
     * Adds a calculation to the history panel
     */
    private void addToHistory(String calculation, String result) {
        String historyEntry = calculation + " = " + result;
        calculationHistory.add(0, historyEntry);

        // Keep only last 5 entries
        if (calculationHistory.size() > 5) {
            calculationHistory.remove(5);
        }

        updateHistoryDisplay();
    }

    /**
     * Updates the history panel with recent calculations
     */
    private void updateHistoryDisplay() {
        historyPanel.getChildren().clear();

        Label title = new Label("History");
        title.getStyleClass().add("title-label");
        historyPanel.getChildren().add(title);

        for (String entry : calculationHistory) {
            Label historyLabel = new Label(entry);
            historyLabel.getStyleClass().add("history-label");
            historyPanel.getChildren().add(historyLabel);
        }
    }

    /**
     * Creates the button grid with modern styling
     */
    private GridPane createButtonGrid() {
        GridPane grid = new GridPane();

        String[][] layout = new String[][]{
                {"C", "", "", "/"},
                {"7", "8", "9", "*"},
                {"4", "5", "6", "-"},
                {"1", "2", "3", "+"},
                {"0", "0", ".", "="}
        };

        for (int row = 0; row < layout.length; row++) {
            for (int col = 0; col < layout[row].length; col++) {
                String text = layout[row][col];
                if (text.isEmpty()) {
                    continue;
                }
                Button button = createButton(text);
                if (row == 4 && col == 0) {
                    button.setMaxWidth(Double.MAX_VALUE);
                    button.getStyleClass().add("zero-button");
                    GridPane.setColumnSpan(button, 2);
                }
                grid.add(button, col, row);
            }
        }

        return grid;
    }

    /**
     * Creates a styled button with appropriate CSS classes
     */
    private Button createButton(String text) {
        Button button = new Button(text);
        button.getStyleClass().add("calculator-button");

        // Apply specific style classes based on button type
        if ("C".equals(text)) {
            button.getStyleClass().add("clear-button");
        } else if ("+".equals(text) || "-".equals(text) || "*".equals(text) || "/".equals(text)) {
            button.getStyleClass().add("operator-button");
        } else if ("=".equals(text)) {
            button.getStyleClass().add("equals-button");
        } else if (".".equals(text)) {
            button.getStyleClass().add("decimal-button");
        } else {
            button.getStyleClass().add("number-button");
        }

        button.setOnAction(e -> handleInput(text));
        return button;
    }

    /**
     * Tracks the current operation for history
     */
    private String currentOperation = "";
    private String lastOperator = "";

    /**
     * Handles button input and updates display
     */
    private void handleInput(String text) {
        String current = display.getText();
        try {
            switch (text) {
                case "C" -> {
                    display.setText(calculator.clear());
                    historyDisplay.setText("");
                    currentOperation = "";
                    lastOperator = "";
                }
                case "+", "-", "*", "/" -> {
                    String result = calculator.setOperator(current, text);
                    display.setText(result);
                    currentOperation = result + " " + text;
                    lastOperator = text;
                    historyDisplay.setText(currentOperation);
                }
                case "=" -> {
                    String result = calculator.calculate(current);
                    if (!lastOperator.isEmpty()) {
                        addToHistory(currentOperation + " " + current, result);
                    }
                    display.setText(result);
                    historyDisplay.setText("");
                    currentOperation = "";
                    lastOperator = "";
                }
                case "." -> display.setText(calculator.inputDecimal(current));
                default -> { // digits
                    if (text.matches("\\d")) {
                        display.setText(calculator.inputDigit(current, text.charAt(0)));
                    }
                }
            }
        } catch (ArithmeticException ex) {
            display.setText("Error");
            historyDisplay.setText("Division by zero");
            currentOperation = "";
            lastOperator = "";
        }
    }

    /**
     * Handles keyboard input for better user experience
     */
    private void handleKeyPress(KeyEvent event) {
        String key = event.getCharacter();

        if (key.matches("[0-9]")) {
            handleInput(key);
        } else if (key.equals("+") || key.equals("-") || key.equals("*") || key.equals("/")) {
            handleInput(key);
        } else if (key.equals(".")) {
            handleInput(".");
        } else if (key.equals("=") || key.equals("\r") || key.equals("\n")) {
            handleInput("=");
        } else if (key.equals("c") || key.equals("C")) {
            handleInput("C");
        }

        event.consume();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
