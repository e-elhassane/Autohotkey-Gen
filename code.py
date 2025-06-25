import board
import digitalio
import usb_hid
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keycode import Keycode
from adafruit_hid.keyboard_layout_us import KeyboardLayoutUS
import usb_midi
import supervisor
from keyboard_matrix import KeyboardMatrix

# Disable MIDI to ensure we have enough USB endpoints
usb_midi.disable()

# Create keyboard objects
kbd = Keyboard(usb_hid.devices)
layout = KeyboardLayoutUS(kbd)

# Dictionary to map regular keycodes to their modified versions
KEY_MAPPING = {
    # Letter keys
    Keycode.A: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.A],
    Keycode.B: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.B],
    Keycode.C: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.C],
    Keycode.D: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.D],
    Keycode.E: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.E],
    Keycode.F: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.F],
    Keycode.G: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.G],
    Keycode.H: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.H],
    Keycode.I: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.I],
    Keycode.J: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.J],
    Keycode.K: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.K],
    Keycode.L: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.L],
    Keycode.M: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.M],
    Keycode.N: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.N],
    Keycode.O: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.O],
    Keycode.P: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.P],
    Keycode.Q: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.Q],
    Keycode.R: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.R],
    Keycode.S: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.S],
    Keycode.T: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.T],
    Keycode.U: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.U],
    Keycode.V: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.V],
    Keycode.W: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.W],
    Keycode.X: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.X],
    Keycode.Y: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.Y],
    Keycode.Z: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.Z],
    
    # Number keys
    Keycode.ONE: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.ONE],
    Keycode.TWO: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.TWO],
    Keycode.THREE: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.THREE],
    Keycode.FOUR: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.FOUR],
    Keycode.FIVE: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.FIVE],
    Keycode.SIX: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.SIX],
    Keycode.SEVEN: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.SEVEN],
    Keycode.EIGHT: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.EIGHT],
    Keycode.NINE: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.NINE],
    Keycode.ZERO: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.ZERO],
    
    # Function keys
    Keycode.F1: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.F1],
    Keycode.F2: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.F2],
    Keycode.F3: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.F3],
    Keycode.F4: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.F4],
    Keycode.F5: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.F5],
    Keycode.F6: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.F6],
    Keycode.F7: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.F7],
    Keycode.F8: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.F8],
    Keycode.F9: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.F9],
    Keycode.F10: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.F10],
    Keycode.F11: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.F11],
    Keycode.F12: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.F12],
    
    # Special keys
    Keycode.ENTER: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.ENTER],
    Keycode.ESCAPE: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.ESCAPE],
    Keycode.BACKSPACE: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.BACKSPACE],
    Keycode.TAB: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.TAB],
    Keycode.SPACEBAR: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.SPACEBAR],
    Keycode.MINUS: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.MINUS],
    Keycode.EQUALS: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.EQUALS],
    Keycode.LEFT_BRACKET: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.LEFT_BRACKET],
    Keycode.RIGHT_BRACKET: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.RIGHT_BRACKET],
    Keycode.BACKSLASH: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.BACKSLASH],
    Keycode.SEMICOLON: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.SEMICOLON],
    Keycode.QUOTE: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.QUOTE],
    Keycode.GRAVE_ACCENT: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.GRAVE_ACCENT],
    Keycode.COMMA: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.COMMA],
    Keycode.PERIOD: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.PERIOD],
    Keycode.FORWARD_SLASH: [Keycode.LEFT_CONTROL, Keycode.LEFT_SHIFT, Keycode.LEFT_ALT, Keycode.FORWARD_SLASH],
}

def handle_keypress(key):
    """Handle a keypress by sending the modified version"""
    if key in KEY_MAPPING:
        kbd.press(*KEY_MAPPING[key])
        kbd.release_all()

# Initialize the keyboard matrix
matrix = KeyboardMatrix()

# LED for status indication
led = digitalio.DigitalInOut(board.LED)
led.direction = digitalio.Direction.OUTPUT

# Main loop
while True:
    # Scan for new keypresses
    new_keys = matrix.scan_for_changes()
    
    # Handle any new keypresses
    for key in new_keys:
        handle_keypress(key)
        led.value = True  # Flash LED on keypress
    
    # Turn off LED if it was on
    led.value = False 