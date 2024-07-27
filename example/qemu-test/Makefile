#
# ESP32 commands
#

build_esp32:
	@echo "➡️ Bulding for environment test_esp32 and esp32"
	pio run -e test_esp32

binary_esp32: build_esp32
	esptool.py --chip esp32 \
	merge_bin \
	--flash_mode dio \
	--flash_size 4MB \
	--fill-flash-size 4MB \
	--output flash.bin \
	0x1000 .pio/build/test_esp32/bootloader.bin \
	0x8000 .pio/build/test_esp32/partitions.bin \
	0x10000 .pio/build/test_esp32/firmware.bin

run_esp32:
	@echo "➡️ Starting simulation for environment test_esp32 and esp32"
	qemu-system-xtensa \
	-nographic \
	-machine esp32 \
  	-drive file=flash.bin,if=mtd,format=raw \
  	-global driver=timer.esp32.timg,property=wdt_disable,value=true
#	-serial tcp::5555,server,nowait

simulate: binary_esp32 run_esp32


#
# ESP32S3 commands
#

build_esp32s3:
	@echo "➡️ Bulding for environment test_esp32s3 and esp32s3"
	pio run -e test_esp32s3

binary_esp32s3: build_esp32s3
	esptool.py --chip esp32s3 \
	merge_bin \
	--flash_mode dio \
	--flash_size 4MB \
	--fill-flash-size 4MB \
	--output flash.bin \
	0x1000 .pio/build/test_esp32s3/bootloader.bin \
	0x8000 .pio/build/test_esp32s3/partitions.bin \
	0x10000 .pio/build/test_esp32s3/firmware.bin

run_esp32s3:
	@echo "➡️ Starting simulation for environment test_esp32s3 and esp32s3"
	qemu-system-xtensa \
	-nographic \
	-machine esp32s3 \
	-drive file=flash.bin,if=none,format=raw,id=efuse \
	-global driver=nvram.esp32c3.efuse,property=drive,value=efuse

#	-global driver=esp32s3.gpio,property=strap_mode,value=0x08 \
#	-serial tcp::5555,server,nowait

simulation_esp32s3: binary_esp32s3 run_esp32s3

list_machines:
	qemu-system-xtensa -nographic -machine help