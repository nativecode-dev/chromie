# plsos2-extensions

Set of Chrome extensions for PLSos2.

NOTE: Any provided images are subject to change.

## pls-orders

Integrates printing files directly to an order's research tab. Each pinned order that contains unfulfilled research will create a printer for each research item. See the example image below.

![printer-list](printer-list.png)

# Installation

Make sure you download and install [yarn](https://yarnpkg.com). We don't use `npm` no' mo'!

```bash
yarn install
yarn test
```

1. Navigate to [Chrome Extensions](chrome://extensions).
2. Ensure that `Develper mode` is checked.
3. Click on `Load unpacked extension...` and navigate to your `dist` folder.

In order to speedup the developer inner loop, a watch options is provided to automatically build changes.

```bash
yarn watch
```

![pls-orders-extension](pls-orders-extension.png)

# License

Copyright 2017 PropLogix <support@proplogix.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without
limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions
of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
