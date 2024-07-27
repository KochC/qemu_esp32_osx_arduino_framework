#include <Arduino.h>
#include <iostream>

void setup()
{
  std::cout << millis() << ": Look mom, I can count..." << std::endl;
}

int count = 0;
void loop()
{
  long now = millis();
  long next = now + 1000;
  std::cout << now << ": " << ++count << std::endl;
  while(next > millis()){
    // do nothing
  }
}
