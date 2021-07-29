# Usage
Package have 4 methods:

1) log - Date + bold text;
2) success - Date + green "Success!" + bold text;
3) warning - Date + yellow "Warning! + bold text;
4) err - Date + red "Error!" + bold text.

Will write '2021.07.29 20:10:04 **Hello World!**'
```
const { log, success, warning, err } = require('@cyber_patrick/colorfullog');
log('Hello World!');
```
Will write 2021.07.29 20:10:04 **Warning! Hello World!**
```
warning('Hello World!');
```
Will write 2021.07.29 20:10:04 **Success! Hello World!**
```
success('Hello World!');
```
Will write 2021.07.29 20:10:04 **Error! Hello World! and stop programm**
```
err('Hello World!');
```

Note: err - call process.exit()