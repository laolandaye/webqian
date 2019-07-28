import {fun, fun2} from './math';
import data from '../json/data.json';

import '../css/test.css';

document.write("entry.js is work");
document.write('<br />' + fun(3))
document.write('<br />' + fun2(3))
document.write('<br />' + JSON.stringify(data));
