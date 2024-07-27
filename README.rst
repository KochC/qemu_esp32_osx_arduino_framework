===========
QEMU for ESP32 & ESP32S3
===========

Compile on OSX
=============

In order to run ESP32 and ESP32S3 code in QEMU, we need an extended version of QEMU. This can be forked from espressif.

⚠️ *Note:*
You might need to install some dependencies first.


**Configuring Build environment to compile QEMU:**


.. code-block:: shell

  ./configure \
    --target-list=xtensa-softmmu,xtensaeb-softmmu \
    --enable-gcrypt \
    --enable-slirp \
    --enable-sdl \
    --enable-debug \
    --enable-sanitizers \
    --disable-strip \
    --disable-user \
    --disable-capstone \
    --disable-vnc \
    --disable-gtk \
    --disable-gnutls

**Building the QEMU:**

.. code-block:: shell

  ninja -C build

Do not forget to add the `build` folder to your PATH.

**Check QEMU:**

After the solution is build, you can check if ESP32 and ESP32S3 emulators are available using the following command.

.. code-block:: shell

  qemu-system-xtensa -nographic -machine help

Expected result is something like:

.. code-block:: shell

  Supported machines are:
  esp32                Espressif ESP32 machine
  esp32s3              Espressif ESP32S3 machine
  ...

Setup project in VSCode
=============

Here are some useful vscode config files. Keep in mind to adjust the files according to your project paths.

*launch.json*

.. code-block:: json

{
    "version": "0.2.0",
    "configurations": [
        {
            "name": "QEMU build",
            "type": "node",
            "request": "launch",
            "program": "${workspaceFolder}/qemu/runner.js",
            "args": [
                "esp32",
                "firmware.bin",
                "${workspaceFolder}"
            ],
            "preLaunchTask": "QEMU build binary",
            "console": "integratedTerminal",
            "internalConsoleOptions": "openOnSessionStart"
        }
    ]
}

*tasks.json*

.. code-block:: json

{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "QEMU build binary",
            "type": "shell",
            "command": "esptool.py",
            "args": [
                "--chip",
                "esp32",
                "merge_bin",
                "--flash_mode",
                "dio",
                "--flash_size",
                "4MB",
                "--fill-flash-size",
                "4MB",
                "--output",
                "${workspaceFolder}/qemu/bin/firmware.bin",
                "0x1000",
                "${workspaceFolder}/.pio/build/test_esp32/bootloader.bin",
                "0x8000",
                "${workspaceFolder}/.pio/build/test_esp32/partitions.bin",
                "0x10000",
                "${workspaceFolder}/.pio/build/test_esp32/firmware.bin"
            ],
            "group": {
                "kind": "build",
                "isDefault": false
            },
            "dependsOn": "PlatformIO: Build",
            "problemMatcher": []
        },
        {
            "label": "PlatformIO: Build",
            "type": "shell",
            "command": "pio",
            "args": [
                "run"
            ],
            "group": {
                "kind": "build",
                "isDefault": false
            },
            "problemMatcher": []
        }
    ]
}


Old original readme from espressif below.

===========
QEMU README
===========

QEMU is a generic and open source machine & userspace emulator and
virtualizer.

QEMU is capable of emulating a complete machine in software without any
need for hardware virtualization support. By using dynamic translation,
it achieves very good performance. QEMU can also integrate with the Xen
and KVM hypervisors to provide emulated hardware while allowing the
hypervisor to manage the CPU. With hypervisor support, QEMU can achieve
near native performance for CPUs. When QEMU emulates CPUs directly it is
capable of running operating systems made for one machine (e.g. an ARMv7
board) on a different machine (e.g. an x86_64 PC board).

QEMU is also capable of providing userspace API virtualization for Linux
and BSD kernel interfaces. This allows binaries compiled against one
architecture ABI (e.g. the Linux PPC64 ABI) to be run on a host using a
different architecture ABI (e.g. the Linux x86_64 ABI). This does not
involve any hardware emulation, simply CPU and syscall emulation.

QEMU aims to fit into a variety of use cases. It can be invoked directly
by users wishing to have full control over its behaviour and settings.
It also aims to facilitate integration into higher level management
layers, by providing a stable command line interface and monitor API.
It is commonly invoked indirectly via the libvirt library when using
open source applications such as oVirt, OpenStack and virt-manager.

QEMU as a whole is released under the GNU General Public License,
version 2. For full licensing details, consult the LICENSE file.


Documentation
=============

Documentation can be found hosted online at
`<https://www.qemu.org/documentation/>`_. The documentation for the
current development version that is available at
`<https://www.qemu.org/docs/master/>`_ is generated from the ``docs/``
folder in the source tree, and is built by `Sphinx
<https://www.sphinx-doc.org/en/master/>`_.


Building
========

QEMU is multi-platform software intended to be buildable on all modern
Linux platforms, OS-X, Win32 (via the Mingw64 toolchain) and a variety
of other UNIX targets. The simple steps to build QEMU are:


.. code-block:: shell

  mkdir build
  cd build
  ../configure
  make

Additional information can also be found online via the QEMU website:

* `<https://wiki.qemu.org/Hosts/Linux>`_
* `<https://wiki.qemu.org/Hosts/Mac>`_
* `<https://wiki.qemu.org/Hosts/W32>`_


Submitting patches
==================

The QEMU source code is maintained under the GIT version control system.

.. code-block:: shell

   git clone https://gitlab.com/qemu-project/qemu.git

When submitting patches, one common approach is to use 'git
format-patch' and/or 'git send-email' to format & send the mail to the
qemu-devel@nongnu.org mailing list. All patches submitted must contain
a 'Signed-off-by' line from the author. Patches should follow the
guidelines set out in the `style section
<https://www.qemu.org/docs/master/devel/style.html>`_ of
the Developers Guide.

Additional information on submitting patches can be found online via
the QEMU website

* `<https://wiki.qemu.org/Contribute/SubmitAPatch>`_
* `<https://wiki.qemu.org/Contribute/TrivialPatches>`_

The QEMU website is also maintained under source control.

.. code-block:: shell

  git clone https://gitlab.com/qemu-project/qemu-web.git

* `<https://www.qemu.org/2017/02/04/the-new-qemu-website-is-up/>`_

A 'git-publish' utility was created to make above process less
cumbersome, and is highly recommended for making regular contributions,
or even just for sending consecutive patch series revisions. It also
requires a working 'git send-email' setup, and by default doesn't
automate everything, so you may want to go through the above steps
manually for once.

For installation instructions, please go to

*  `<https://github.com/stefanha/git-publish>`_

The workflow with 'git-publish' is:

.. code-block:: shell

  $ git checkout master -b my-feature
  $ # work on new commits, add your 'Signed-off-by' lines to each
  $ git publish

Your patch series will be sent and tagged as my-feature-v1 if you need to refer
back to it in the future.

Sending v2:

.. code-block:: shell

  $ git checkout my-feature # same topic branch
  $ # making changes to the commits (using 'git rebase', for example)
  $ git publish

Your patch series will be sent with 'v2' tag in the subject and the git tip
will be tagged as my-feature-v2.

Bug reporting
=============

The QEMU project uses GitLab issues to track bugs. Bugs
found when running code built from QEMU git or upstream released sources
should be reported via:

* `<https://gitlab.com/qemu-project/qemu/-/issues>`_

If using QEMU via an operating system vendor pre-built binary package, it
is preferable to report bugs to the vendor's own bug tracker first. If
the bug is also known to affect latest upstream code, it can also be
reported via GitLab.

For additional information on bug reporting consult:

* `<https://wiki.qemu.org/Contribute/ReportABug>`_


ChangeLog
=========

For version history and release notes, please visit
`<https://wiki.qemu.org/ChangeLog/>`_ or look at the git history for
more detailed information.


Contact
=======

The QEMU community can be contacted in a number of ways, with the two
main methods being email and IRC

* `<mailto:qemu-devel@nongnu.org>`_
* `<https://lists.nongnu.org/mailman/listinfo/qemu-devel>`_
* #qemu on irc.oftc.net

Information on additional methods of contacting the community can be
found online via the QEMU website:

* `<https://wiki.qemu.org/Contribute/StartHere>`_
