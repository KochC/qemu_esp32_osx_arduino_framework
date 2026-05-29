# QEMU ESP32 for macOS with Arduino Framework

Fork of Espressif's patched QEMU for ESP32 emulation with macOS-specific build instructions and configuration.

## Overview

This repository contains a modified version of QEMU that supports ESP32 emulation, specifically configured for macOS development environments using the Arduino framework.

## Description

QEMU (Quick Emulator) is a generic and open source machine emulator. This fork includes Espressif's patches to enable ESP32 emulation, allowing developers to test and debug ESP32 firmware without physical hardware.

### Features

- ESP32 hardware emulation
- Compatible with Arduino framework
- macOS-optimized build configuration
- Serial port emulation
- GPIO and peripheral simulation

## Building on macOS

For detailed build instructions and configuration, see the [Wiki](../../wiki).

### Prerequisites

- macOS 10.14 or later
- Xcode Command Line Tools
- Homebrew (recommended for dependencies)

### Quick Start

```bash
# Install dependencies
brew install pkg-config glib pixman

# Configure and build
./configure --target-list=xtensa-softmmu
make -j$(sysctl -n hw.ncpu)
```

## Usage

After building, you can run ESP32 binaries compiled with the Arduino framework:

```bash
./build/qemu-system-xtensa -M esp32 -kernel path/to/firmware.elf
```

## Documentation

- See `README.rst` for general QEMU documentation
- Check the Wiki for macOS-specific setup and troubleshooting

## Upstream

This is a fork of Espressif's QEMU patches for ESP32. For the latest upstream changes, see:
- [Espressif QEMU](https://github.com/espressif/qemu)
- [QEMU Project](https://www.qemu.org/)

## License

QEMU is released under the GNU General Public License, version 2. See `LICENSE` and `COPYING` for details.

## Tags

`qemu` `esp32` `emulation` `arduino` `macos` `embedded` `espressif` `xtensa`
