const { exec } = require('child_process');

const reset = "\x1b[0m";    // Reset to default color
const red = "\x1b[31m";     // Red color
const green = "\x1b[32m";   // Green color
const yellow = "\x1b[33m";  // Yellow color
const bold = "\x1b[1m";    // Bold text

// Retrieve command-line arguments
const args = process.argv.slice(2);

// Check if arguments are provided
if (args.length < 3) {
    console.error('Insufficient arguments provided');
    console.error('Usage: node builder.js <chip> <output> <workspaceFolder>');
    process.exit(1);
}

// Destructure arguments
const [chip, output, workspaceFolder] = args;

// Construct the command with parameters
const merge_binary = `qemu-system-xtensa \
	-nographic \
	-machine ${chip} \
  	-drive file=${workspaceFolder}/qemu/bin/${output},if=mtd,format=raw \
  	-global driver=timer.esp32.timg,property=wdt_disable,value=true`;

// Execute the command and stream the output
process.stdout.write('\x1b[2J\x1b[H');
process.stdout.write(`${green}${bold}\nQEMU for ESP32 started!${reset}\n\n`);
const p = exec(merge_binary);

process.on('SIGINT', () => {
    process.stdout.write(`${green}${bold}\nQEMU stopped!${reset}\n\n`);
    p.kill('SIGINT'); // Send SIGINT to the child process (QEMU) if needed
    process.exit(0);  // Exit the script
});

// Stream stdout and stderr in real-time
p.stdout.on('data', (data) => {
    process.stdout.write(data);
});

p.stderr.on('data', (data) => {
    process.stderr.write(data);
});

p.on('error', (error) => {
    console.error(`Error executing command: ${error}`);
});

p.on('close', (code) => {
    if (code !== 0) {
        console.error(`Command exited with code ${code}`);
    } else {
        console.log('Command completed successfully');
    }
});
