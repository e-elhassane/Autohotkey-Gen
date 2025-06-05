# AutoHotkey Macro Generator

A modern React application for creating and managing AutoHotkey macros with a user-friendly interface. This tool allows users to record keyboard shortcuts and assign various actions to them.

## Project Structure

### Core Components

#### `src/components/KeyRecorder.js`
- Main component for recording keyboard shortcuts
- Handles key combinations and modifier keys (Ctrl, Alt, Shift, Win)
- Provides visual feedback during recording
- Allows action selection and configuration

#### `src/components/MacroList.js`
- Displays all recorded macros in a list format
- Handles macro deletion and editing
- Provides functionality to download individual or all macros
- Generates AutoHotkey scripts from recorded macros

### Internationalization

#### `src/translations/index.js`
- Contains translations for multiple languages (English, French)
- Manages text content for the entire application
- Provides translation functions through a context

### Context Providers

#### `src/contexts/LanguageContext.js`
- Manages application language state
- Provides language switching functionality
- Makes translations available throughout the app

### Actions and Features

The application supports various actions:

1. Basic Actions:
   - Open Application
   - Open Website
   - Send Keys
   - Replace Text

2. System Controls:
   - Volume Up/Down
   - Brightness Up/Down

3. Utility Features:
   - Quick Note
   - Start Timer
   - Clipboard History
   - AI Assistant Menu

### Generated Scripts

The application generates AutoHotkey scripts with:
- Proper initialization and configuration
- Custom functions for utilities (notes, timer, clipboard)
- AI Assistant menu integration
- Individual hotkey definitions

## Features

1. **Key Recording**
   - Real-time key combination capture
   - Support for modifier keys
   - Visual feedback during recording

2. **Action Management**
   - Multiple action types
   - Configurable parameters
   - Text replacement support

3. **Script Generation**
   - AutoHotkey compatible syntax
   - Proper script structure
   - Function definitions included

4. **Internationalization**
   - Multi-language support
   - Easy language switching
   - Extensible translation system

5. **AI Integration**
   - ChatGPT integration
   - Quick prompts
   - AI assistant menu

## Usage

1. Select an action type from the dropdown menu
2. Click "Record Keys" to start recording your shortcut
3. Press your desired key combination
4. Configure action-specific parameters if needed
5. Save the macro
6. Download individual scripts or all macros at once

## Technical Details

### Dependencies
- React for UI components
- Material-UI for styling
- React Context for state management
- AutoHotkey for script execution

### File Generation
- Generates `.ahk` files
- Includes necessary AutoHotkey directives
- Proper script structure and organization

## Contributing

Feel free to contribute to this project by:
1. Reporting bugs
2. Suggesting new features
3. Submitting pull requests
4. Improving documentation

## License

This project is licensed under the MIT License - see the LICENSE file for details.
