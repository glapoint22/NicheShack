import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShortcutKeysService {
  constructor() {}
  private pressedKeys: boolean[] = [];
  private modifierKeyPressed: boolean;
  private returnTrueAllowed: boolean;

  // -----------Shortcut Keys--------- \\
  public ctrl_X = [17, 88];
  public ctrl_C = [17, 67];
  public ctrl_V = [17, 86];




  
  // -----------------------------( IS PRESSED )------------------------------ \\

  isPressed(event: KeyboardEvent, shortcutKeys: number[]) : boolean {
    // If the SHIFT key is pressed and it's one of the shortcut keys
    if (((event.keyCode == 16 && shortcutKeys.indexOf(16) != -1)
      //Or if the CTRL key is pressed and it's one of the shortcut keys
      || (event.keyCode == 17 && shortcutKeys.indexOf(17) != -1)
      //Or if the ALT key is pressed and it's one of the shortcut keys
      || (event.keyCode == 18 && shortcutKeys.indexOf(18) != -1))
      // And no other modifier key has been pressed yet
      && !this.modifierKeyPressed) {

        // Mark that a modifier key has been pressed
        this.modifierKeyPressed = true;
        // And add the keyup listener
        document.addEventListener("keyup", this.onKeyUp);
    }

    // If a modifier key has been pressed and it's one of the shortcut keys, we can now...
    if(this.modifierKeyPressed) {

      // Loop through the list of shortcut Keys
      for(let i = 0; i < shortcutKeys.length; i++) {
        // If NOT all shortcut keys are being pressed yet
        if(!this.pressedKeys[shortcutKeys[i]]) {
          // Allow true to be returned
          this.returnTrueAllowed = true;
        }
      }
      // Record the key that is being pressed
      this.pressedKeys[event.keyCode] = true;

      // Then loop through the list of shortcut Keys again
      for(let i = 0; i < shortcutKeys.length; i++) {
        // Now check again to see if all shortcut keys are being pressed
        if(!this.pressedKeys[shortcutKeys[i]]) {
          // If not, retrun false
          return false;
        }
      }
      // As long as we're allowed to return true.
      if(this.returnTrueAllowed) {
        // Only allow to return true once
        this.returnTrueAllowed = false;
        return true;
      }
    }
  }


  // -----------------------------( ON KEY UP )------------------------------ \\

  private onKeyUp = (event: KeyboardEvent) => {
    let allPressedKeysUp = true;

    // Set the key that was just released as no longer being pressed
    this.pressedKeys[event.keyCode] = false;

    // Loop through the list of pressed keys
    for(let i = 0; i < this.pressedKeys.length; i++) {
      // If we come across a key that is still marked as being pressed
      if(this.pressedKeys[i] == true) {
        // Let it be known that not all pressed keys have been released yet and break out of the loop
        allPressedKeysUp = false;
        break;
      }
    }
    // If all pressed keys have been released
    if (allPressedKeysUp) {
      // Reset
      this.pressedKeys = [];
      this.modifierKeyPressed = false;
      document.removeEventListener("keyup", this.onKeyUp);
    }
  }
}