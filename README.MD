# Usage
Package have 4 methods:

1) log - Date + bold text;
2) success - Date + green "Success!" + bold text;
3) warning - Date + yellow "Warning! + bold text;
4) err - Date + red "Error!" + bold text.

Will write ![alt text](https://github.com/CyberPatrick/colorfullog/blob/main/img/Log.png)
```
const { log, success, warning, err } = require('@cyber_patrick/colorfullog');
log('Hello World!');
```
Will write ![alt text](https://github.com/CyberPatrick/colorfullog/blob/main/img/Warning.png)
```
warning('Hello World!');
```
Will write ![alt text](https://github.com/CyberPatrick/colorfullog/blob/main/img/Success.png)
```
success('Hello World!');
```
Will write ![alt text](https://github.com/CyberPatrick/colorfullog/blob/main/img/Error.png) and stop programm
```
err('Hello World!');
```

Note: err - call process.exit()