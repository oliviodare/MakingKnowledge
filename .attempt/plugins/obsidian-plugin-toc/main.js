'use strict';

var obsidian = require('obsidian');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getDefaultExportFromCjs (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, basedir, module) {
	return module = {
		path: basedir,
		exports: {},
		require: function (path, base) {
			return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
		}
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var dedent_1 = createCommonjsModule(function (module) {

function dedent(strings) {

  var raw = void 0;
  if (typeof strings === "string") {
    // dedent can be used as a plain function
    raw = [strings];
  } else {
    raw = strings.raw;
  }

  // first, perform interpolation
  var result = "";
  for (var i = 0; i < raw.length; i++) {
    result += raw[i].
    // join lines when there is a suppressed newline
    replace(/\\\n[ \t]*/g, "").

    // handle escaped backticks
    replace(/\\`/g, "`");

    if (i < (arguments.length <= 1 ? 0 : arguments.length - 1)) {
      result += arguments.length <= i + 1 ? undefined : arguments[i + 1];
    }
  }

  // now strip indentation
  var lines = result.split("\n");
  var mindent = null;
  lines.forEach(function (l) {
    var m = l.match(/^(\s+)\S+/);
    if (m) {
      var indent = m[1].length;
      if (!mindent) {
        // this is the first indented line
        mindent = indent;
      } else {
        mindent = Math.min(mindent, indent);
      }
    }
  });

  if (mindent !== null) {
    result = lines.map(function (l) {
      return l[0] === " " ? l.slice(mindent) : l;
    }).join("\n");
  }

  // dedent eats leading and trailing whitespace too
  result = result.trim();

  // handle escaped newlines at the end to ensure they don't get stripped too
  return result.replace(/\\n/g, "\n");
}

{
  module.exports = dedent;
}
});

var objectorarray = (val) => {
  return val != null && typeof val === 'object' && val.constructor !== RegExp
};

function Parse (data) {
  if (!(this instanceof Parse)) {
    return new Parse(data)
  }
  this.err = null;
  this.value = null;
  try {
    this.value = JSON.parse(data);
  } catch (err) {
    this.err = err;
  }
}

var parse = Parse;

var lib = createCommonjsModule(function (module, exports) {
var __importDefault = (commonjsGlobal && commonjsGlobal.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dedent_1$1 = __importDefault(dedent_1);
const objectorarray_1 = __importDefault(objectorarray);
const fast_json_parse_1 = __importDefault(parse);
const ENDENT_ID = "twhZNwxI1aFG3r4";
function endent(strings, ...values) {
    let result = "";
    for (let i = 0; i < strings.length; i++) {
        result += strings[i];
        if (i < values.length) {
            let value = values[i];
            let isJson = false;
            if (fast_json_parse_1.default(value).value) {
                value = fast_json_parse_1.default(value).value;
                isJson = true;
            }
            if ((value && value[ENDENT_ID]) || isJson) {
                let rawlines = result.split("\n");
                let l = rawlines[rawlines.length - 1].search(/\S/);
                let endentation = l > 0 ? " ".repeat(l) : "";
                let valueJson = isJson
                    ? JSON.stringify(value, null, 2)
                    : value[ENDENT_ID];
                let valueLines = valueJson.split("\n");
                valueLines.forEach((l, index) => {
                    if (index > 0) {
                        result += "\n" + endentation + l;
                    }
                    else {
                        result += l;
                    }
                });
            }
            else if (typeof value === "string" && value.includes("\n")) {
                let endentations = result.match(/(?:^|\n)( *)$/);
                if (typeof value === "string") {
                    let endentation = endentations ? endentations[1] : "";
                    result += value
                        .split("\n")
                        .map((str, i) => {
                        str = ENDENT_ID + str;
                        return i === 0 ? str : `${endentation}${str}`;
                    })
                        .join("\n");
                }
                else {
                    result += value;
                }
            }
            else {
                result += value;
            }
        }
    }
    result = dedent_1$1.default(result);
    return result.split(ENDENT_ID).join("");
}
endent.pretty = (data) => {
    return objectorarray_1.default(data)
        ? { [ENDENT_ID]: JSON.stringify(data, null, 2) }
        : data;
};
exports.default = endent;
});

var endent = /*@__PURE__*/getDefaultExportFromCjs(lib);

var getCurrentHeaderDepth = function (headings, cursor) {
    var previousHeadings = headings.filter(function (heading) { return heading.position.end.line < cursor.line; });
    if (!previousHeadings.length) {
        return 0;
    }
    return previousHeadings[previousHeadings.length - 1].level;
};
var getSubsequentHeadings = function (headings, cursor) {
    return headings.filter(function (heading) { return heading.position.end.line > cursor.line; });
};
var createToc = function (_a, cursor, settings) {
    var _b = _a.headings, headings = _b === void 0 ? [] : _b;
    var currentDepth = getCurrentHeaderDepth(headings, cursor);
    var subsequentHeadings = getSubsequentHeadings(headings, cursor);
    var includedHeadings = [];
    for (var _i = 0, subsequentHeadings_1 = subsequentHeadings; _i < subsequentHeadings_1.length; _i++) {
        var heading = subsequentHeadings_1[_i];
        if (heading.level <= currentDepth) {
            break;
        }
        if (heading.level >= settings.minimumDepth &&
            heading.level <= settings.maximumDepth) {
            includedHeadings.push(heading);
        }
    }
    if (!includedHeadings.length) {
        return;
    }
    var links = includedHeadings.map(function (heading) {
        var itemIndication = (settings.listStyle === "number" && "1.") || "-";
        var indent = new Array(Math.max(0, heading.level - currentDepth - 1))
            .fill("\t")
            .join("");
        return "" + indent + itemIndication + " [[#" + heading.heading + "|" + heading.heading + "]]";
    });
    return endent(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    ", "\n    ", "\n  "], ["\n    ", "\n    ", "\n  "])), settings.title ? settings.title + "\n" : "", links.join("\n"));
};
var templateObject_1;

var TableOfContentsSettingsTab = /** @class */ (function (_super) {
    __extends(TableOfContentsSettingsTab, _super);
    function TableOfContentsSettingsTab(app, plugin) {
        var _this = _super.call(this, app, plugin) || this;
        _this.plugin = plugin;
        return _this;
    }
    TableOfContentsSettingsTab.prototype.display = function () {
        var _this = this;
        var containerEl = this.containerEl;
        containerEl.empty();
        containerEl.createEl("h2", { text: "Table of Contents - Settings" });
        new obsidian.Setting(containerEl)
            .setName("List Style")
            .setDesc("The type of list to render the table of contents as.")
            .addDropdown(function (dropdown) {
            return dropdown
                .setValue(_this.plugin.settings.listStyle)
                .addOption("bullet", "Bullet")
                .addOption("number", "Number")
                .onChange(function (value) {
                _this.plugin.settings.listStyle = value;
                _this.plugin.saveData(_this.plugin.settings);
                _this.display();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Title")
            .setDesc("Optional title to put before the table of contents")
            .addText(function (text) {
            return text
                .setPlaceholder("**Table of Contents**")
                .setValue(_this.plugin.settings.title || "")
                .onChange(function (value) {
                _this.plugin.settings.title = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Minimum Header Depth")
            .setDesc("The lowest header depth to add to the table of contents. Defaults to 2")
            .addSlider(function (text) {
            return text
                .setValue(_this.plugin.settings.minimumDepth)
                .setDynamicTooltip()
                .setLimits(1, 6, 1)
                .onChange(function (value) {
                _this.plugin.settings.minimumDepth = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Maximum Header Depth")
            .setDesc("The highest header depth to add to the table of contents. Defaults to 6")
            .addSlider(function (text) {
            return text
                .setValue(_this.plugin.settings.maximumDepth)
                .setDynamicTooltip()
                .setLimits(1, 6, 1)
                .onChange(function (value) {
                _this.plugin.settings.minimumDepth = value;
                _this.plugin.saveData(_this.plugin.settings);
            });
        });
    };
    return TableOfContentsSettingsTab;
}(obsidian.PluginSettingTab));
var TableOfContentsPlugin = /** @class */ (function (_super) {
    __extends(TableOfContentsPlugin, _super);
    function TableOfContentsPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.settings = {
            minimumDepth: 2,
            maximumDepth: 6,
            listStyle: "bullet",
        };
        _this.createTocForActiveFile = function (settings) {
            if (settings === void 0) { settings = _this.settings; }
            return function () {
                var activeView = _this.app.workspace.getActiveViewOfType(obsidian.MarkdownView);
                if (activeView && activeView.file) {
                    var editor = activeView.sourceMode.cmEditor;
                    var cursor = editor.getCursor();
                    var data = _this.app.metadataCache.getFileCache(activeView.file) || {};
                    var toc = createToc(data, cursor, typeof settings === "function" ? settings(data, cursor) : settings);
                    if (toc) {
                        editor.replaceRange(toc, cursor);
                    }
                }
            };
        };
        return _this;
    }
    TableOfContentsPlugin.prototype.onload = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log("Load Table of Contents plugin");
                        _a = this;
                        _b = [__assign({}, this.settings)];
                        return [4 /*yield*/, this.loadData()];
                    case 1:
                        _a.settings = __assign.apply(void 0, _b.concat([(_c.sent())]));
                        this.addCommand({
                            id: "create-toc",
                            name: "Create table of contents",
                            callback: this.createTocForActiveFile(),
                        });
                        this.addCommand({
                            id: "create-toc-next-level",
                            name: "Create table of contents for next heading level",
                            callback: this.createTocForActiveFile(function (data, cursor) {
                                var currentHeaderDepth = getCurrentHeaderDepth(data.headings || [], cursor);
                                return __assign(__assign({}, _this.settings), { maximumDepth: currentHeaderDepth + 1 });
                            }),
                        });
                        this.addSettingTab(new TableOfContentsSettingsTab(this.app, this));
                        return [2 /*return*/];
                }
            });
        });
    };
    return TableOfContentsPlugin;
}(obsidian.Plugin));

module.exports = TableOfContentsPlugin;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vbm9kZV9tb2R1bGVzL3RzbGliL3RzbGliLmVzNi5qcyIsIi4uL25vZGVfbW9kdWxlcy9kZWRlbnQvZGlzdC9kZWRlbnQuanMiLCIuLi9ub2RlX21vZHVsZXMvb2JqZWN0b3JhcnJheS9pbmRleC5qcyIsIi4uL25vZGVfbW9kdWxlcy9mYXN0LWpzb24tcGFyc2UvcGFyc2UuanMiLCIuLi9ub2RlX21vZHVsZXMvZW5kZW50L2xpYi9pbmRleC5qcyIsIi4uL3NyYy9jcmVhdGUtdG9jLnRzIiwiLi4vc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGlmICh0eXBlb2YgYiAhPT0gXCJmdW5jdGlvblwiICYmIGIgIT09IG51bGwpXHJcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNsYXNzIGV4dGVuZHMgdmFsdWUgXCIgKyBTdHJpbmcoYikgKyBcIiBpcyBub3QgYSBjb25zdHJ1Y3RvciBvciBudWxsXCIpO1xyXG4gICAgZXh0ZW5kU3RhdGljcyhkLCBiKTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fYXNzaWduID0gZnVuY3Rpb24oKSB7XHJcbiAgICBfX2Fzc2lnbiA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gX19hc3NpZ24odCkge1xyXG4gICAgICAgIGZvciAodmFyIHMsIGkgPSAxLCBuID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IG47IGkrKykge1xyXG4gICAgICAgICAgICBzID0gYXJndW1lbnRzW2ldO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkpIHRbcF0gPSBzW3BdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdDtcclxuICAgIH1cclxuICAgIHJldHVybiBfX2Fzc2lnbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19yZXN0KHMsIGUpIHtcclxuICAgIHZhciB0ID0ge307XHJcbiAgICBmb3IgKHZhciBwIGluIHMpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwocywgcCkgJiYgZS5pbmRleE9mKHApIDwgMClcclxuICAgICAgICB0W3BdID0gc1twXTtcclxuICAgIGlmIChzICE9IG51bGwgJiYgdHlwZW9mIE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPT09IFwiZnVuY3Rpb25cIilcclxuICAgICAgICBmb3IgKHZhciBpID0gMCwgcCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMocyk7IGkgPCBwLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChlLmluZGV4T2YocFtpXSkgPCAwICYmIE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGUuY2FsbChzLCBwW2ldKSlcclxuICAgICAgICAgICAgICAgIHRbcFtpXV0gPSBzW3BbaV1dO1xyXG4gICAgICAgIH1cclxuICAgIHJldHVybiB0O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYykge1xyXG4gICAgdmFyIGMgPSBhcmd1bWVudHMubGVuZ3RoLCByID0gYyA8IDMgPyB0YXJnZXQgOiBkZXNjID09PSBudWxsID8gZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IodGFyZ2V0LCBrZXkpIDogZGVzYywgZDtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5kZWNvcmF0ZSA9PT0gXCJmdW5jdGlvblwiKSByID0gUmVmbGVjdC5kZWNvcmF0ZShkZWNvcmF0b3JzLCB0YXJnZXQsIGtleSwgZGVzYyk7XHJcbiAgICBlbHNlIGZvciAodmFyIGkgPSBkZWNvcmF0b3JzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSBpZiAoZCA9IGRlY29yYXRvcnNbaV0pIHIgPSAoYyA8IDMgPyBkKHIpIDogYyA+IDMgPyBkKHRhcmdldCwga2V5LCByKSA6IGQodGFyZ2V0LCBrZXkpKSB8fCByO1xyXG4gICAgcmV0dXJuIGMgPiAzICYmIHIgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwga2V5LCByKSwgcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcGFyYW0ocGFyYW1JbmRleCwgZGVjb3JhdG9yKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24gKHRhcmdldCwga2V5KSB7IGRlY29yYXRvcih0YXJnZXQsIGtleSwgcGFyYW1JbmRleCk7IH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fbWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpIHtcclxuICAgIGlmICh0eXBlb2YgUmVmbGVjdCA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgUmVmbGVjdC5tZXRhZGF0YSA9PT0gXCJmdW5jdGlvblwiKSByZXR1cm4gUmVmbGVjdC5tZXRhZGF0YShtZXRhZGF0YUtleSwgbWV0YWRhdGFWYWx1ZSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2F3YWl0ZXIodGhpc0FyZywgX2FyZ3VtZW50cywgUCwgZ2VuZXJhdG9yKSB7XHJcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cclxuICAgIHJldHVybiBuZXcgKFAgfHwgKFAgPSBQcm9taXNlKSkoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGZ1bGZpbGxlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvci5uZXh0KHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cclxuICAgICAgICBmdW5jdGlvbiBzdGVwKHJlc3VsdCkgeyByZXN1bHQuZG9uZSA/IHJlc29sdmUocmVzdWx0LnZhbHVlKSA6IGFkb3B0KHJlc3VsdC52YWx1ZSkudGhlbihmdWxmaWxsZWQsIHJlamVjdGVkKTsgfVxyXG4gICAgICAgIHN0ZXAoKGdlbmVyYXRvciA9IGdlbmVyYXRvci5hcHBseSh0aGlzQXJnLCBfYXJndW1lbnRzIHx8IFtdKSkubmV4dCgpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19nZW5lcmF0b3IodGhpc0FyZywgYm9keSkge1xyXG4gICAgdmFyIF8gPSB7IGxhYmVsOiAwLCBzZW50OiBmdW5jdGlvbigpIHsgaWYgKHRbMF0gJiAxKSB0aHJvdyB0WzFdOyByZXR1cm4gdFsxXTsgfSwgdHJ5czogW10sIG9wczogW10gfSwgZiwgeSwgdCwgZztcclxuICAgIHJldHVybiBnID0geyBuZXh0OiB2ZXJiKDApLCBcInRocm93XCI6IHZlcmIoMSksIFwicmV0dXJuXCI6IHZlcmIoMikgfSwgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIChnW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXM7IH0pLCBnO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IHJldHVybiBmdW5jdGlvbiAodikgeyByZXR1cm4gc3RlcChbbiwgdl0pOyB9OyB9XHJcbiAgICBmdW5jdGlvbiBzdGVwKG9wKSB7XHJcbiAgICAgICAgaWYgKGYpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJHZW5lcmF0b3IgaXMgYWxyZWFkeSBleGVjdXRpbmcuXCIpO1xyXG4gICAgICAgIHdoaWxlIChfKSB0cnkge1xyXG4gICAgICAgICAgICBpZiAoZiA9IDEsIHkgJiYgKHQgPSBvcFswXSAmIDIgPyB5W1wicmV0dXJuXCJdIDogb3BbMF0gPyB5W1widGhyb3dcIl0gfHwgKCh0ID0geVtcInJldHVyblwiXSkgJiYgdC5jYWxsKHkpLCAwKSA6IHkubmV4dCkgJiYgISh0ID0gdC5jYWxsKHksIG9wWzFdKSkuZG9uZSkgcmV0dXJuIHQ7XHJcbiAgICAgICAgICAgIGlmICh5ID0gMCwgdCkgb3AgPSBbb3BbMF0gJiAyLCB0LnZhbHVlXTtcclxuICAgICAgICAgICAgc3dpdGNoIChvcFswXSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSAwOiBjYXNlIDE6IHQgPSBvcDsgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIDQ6IF8ubGFiZWwrKzsgcmV0dXJuIHsgdmFsdWU6IG9wWzFdLCBkb25lOiBmYWxzZSB9O1xyXG4gICAgICAgICAgICAgICAgY2FzZSA1OiBfLmxhYmVsKys7IHkgPSBvcFsxXTsgb3AgPSBbMF07IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA3OiBvcCA9IF8ub3BzLnBvcCgpOyBfLnRyeXMucG9wKCk7IGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgICAgICBpZiAoISh0ID0gXy50cnlzLCB0ID0gdC5sZW5ndGggPiAwICYmIHRbdC5sZW5ndGggLSAxXSkgJiYgKG9wWzBdID09PSA2IHx8IG9wWzBdID09PSAyKSkgeyBfID0gMDsgY29udGludWU7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDMgJiYgKCF0IHx8IChvcFsxXSA+IHRbMF0gJiYgb3BbMV0gPCB0WzNdKSkpIHsgXy5sYWJlbCA9IG9wWzFdOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChvcFswXSA9PT0gNiAmJiBfLmxhYmVsIDwgdFsxXSkgeyBfLmxhYmVsID0gdFsxXTsgdCA9IG9wOyBicmVhazsgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0ICYmIF8ubGFiZWwgPCB0WzJdKSB7IF8ubGFiZWwgPSB0WzJdOyBfLm9wcy5wdXNoKG9wKTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodFsyXSkgXy5vcHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvcCA9IGJvZHkuY2FsbCh0aGlzQXJnLCBfKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7IG9wID0gWzYsIGVdOyB5ID0gMDsgfSBmaW5hbGx5IHsgZiA9IHQgPSAwOyB9XHJcbiAgICAgICAgaWYgKG9wWzBdICYgNSkgdGhyb3cgb3BbMV07IHJldHVybiB7IHZhbHVlOiBvcFswXSA/IG9wWzFdIDogdm9pZCAwLCBkb25lOiB0cnVlIH07XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgX19jcmVhdGVCaW5kaW5nID0gT2JqZWN0LmNyZWF0ZSA/IChmdW5jdGlvbihvLCBtLCBrLCBrMikge1xyXG4gICAgaWYgKGsyID09PSB1bmRlZmluZWQpIGsyID0gaztcclxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvLCBrMiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gbVtrXTsgfSB9KTtcclxufSkgOiAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBvW2syXSA9IG1ba107XHJcbn0pO1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZXhwb3J0U3RhcihtLCBvKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIG0pIGlmIChwICE9PSBcImRlZmF1bHRcIiAmJiAhT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG8sIHApKSBfX2NyZWF0ZUJpbmRpbmcobywgbSwgcCk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3ZhbHVlcyhvKSB7XHJcbiAgICB2YXIgcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBTeW1ib2wuaXRlcmF0b3IsIG0gPSBzICYmIG9bc10sIGkgPSAwO1xyXG4gICAgaWYgKG0pIHJldHVybiBtLmNhbGwobyk7XHJcbiAgICBpZiAobyAmJiB0eXBlb2Ygby5sZW5ndGggPT09IFwibnVtYmVyXCIpIHJldHVybiB7XHJcbiAgICAgICAgbmV4dDogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAobyAmJiBpID49IG8ubGVuZ3RoKSBvID0gdm9pZCAwO1xyXG4gICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogbyAmJiBvW2krK10sIGRvbmU6ICFvIH07XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgIHRocm93IG5ldyBUeXBlRXJyb3IocyA/IFwiT2JqZWN0IGlzIG5vdCBpdGVyYWJsZS5cIiA6IFwiU3ltYm9sLml0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVhZChvLCBuKSB7XHJcbiAgICB2YXIgbSA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvW1N5bWJvbC5pdGVyYXRvcl07XHJcbiAgICBpZiAoIW0pIHJldHVybiBvO1xyXG4gICAgdmFyIGkgPSBtLmNhbGwobyksIHIsIGFyID0gW10sIGU7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHdoaWxlICgobiA9PT0gdm9pZCAwIHx8IG4tLSA+IDApICYmICEociA9IGkubmV4dCgpKS5kb25lKSBhci5wdXNoKHIudmFsdWUpO1xyXG4gICAgfVxyXG4gICAgY2F0Y2ggKGVycm9yKSB7IGUgPSB7IGVycm9yOiBlcnJvciB9OyB9XHJcbiAgICBmaW5hbGx5IHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBpZiAociAmJiAhci5kb25lICYmIChtID0gaVtcInJldHVyblwiXSkpIG0uY2FsbChpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZmluYWxseSB7IGlmIChlKSB0aHJvdyBlLmVycm9yOyB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbi8qKiBAZGVwcmVjYXRlZCAqL1xyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWRBcnJheXMoKSB7XHJcbiAgICBmb3IgKHZhciBzID0gMCwgaSA9IDAsIGlsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHMgKz0gYXJndW1lbnRzW2ldLmxlbmd0aDtcclxuICAgIGZvciAodmFyIHIgPSBBcnJheShzKSwgayA9IDAsIGkgPSAwOyBpIDwgaWw7IGkrKylcclxuICAgICAgICBmb3IgKHZhciBhID0gYXJndW1lbnRzW2ldLCBqID0gMCwgamwgPSBhLmxlbmd0aDsgaiA8IGpsOyBqKyssIGsrKylcclxuICAgICAgICAgICAgcltrXSA9IGFbal07XHJcbiAgICByZXR1cm4gcjtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fc3ByZWFkQXJyYXkodG8sIGZyb20pIHtcclxuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGZyb20ubGVuZ3RoLCBqID0gdG8ubGVuZ3RoOyBpIDwgaWw7IGkrKywgaisrKVxyXG4gICAgICAgIHRvW2pdID0gZnJvbVtpXTtcclxuICAgIHJldHVybiB0bztcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmZ1bmN0aW9uIGRlZGVudChzdHJpbmdzKSB7XG5cbiAgdmFyIHJhdyA9IHZvaWQgMDtcbiAgaWYgKHR5cGVvZiBzdHJpbmdzID09PSBcInN0cmluZ1wiKSB7XG4gICAgLy8gZGVkZW50IGNhbiBiZSB1c2VkIGFzIGEgcGxhaW4gZnVuY3Rpb25cbiAgICByYXcgPSBbc3RyaW5nc107XG4gIH0gZWxzZSB7XG4gICAgcmF3ID0gc3RyaW5ncy5yYXc7XG4gIH1cblxuICAvLyBmaXJzdCwgcGVyZm9ybSBpbnRlcnBvbGF0aW9uXG4gIHZhciByZXN1bHQgPSBcIlwiO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJhdy5sZW5ndGg7IGkrKykge1xuICAgIHJlc3VsdCArPSByYXdbaV0uXG4gICAgLy8gam9pbiBsaW5lcyB3aGVuIHRoZXJlIGlzIGEgc3VwcHJlc3NlZCBuZXdsaW5lXG4gICAgcmVwbGFjZSgvXFxcXFxcblsgXFx0XSovZywgXCJcIikuXG5cbiAgICAvLyBoYW5kbGUgZXNjYXBlZCBiYWNrdGlja3NcbiAgICByZXBsYWNlKC9cXFxcYC9nLCBcImBcIik7XG5cbiAgICBpZiAoaSA8IChhcmd1bWVudHMubGVuZ3RoIDw9IDEgPyAwIDogYXJndW1lbnRzLmxlbmd0aCAtIDEpKSB7XG4gICAgICByZXN1bHQgKz0gYXJndW1lbnRzLmxlbmd0aCA8PSBpICsgMSA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1tpICsgMV07XG4gICAgfVxuICB9XG5cbiAgLy8gbm93IHN0cmlwIGluZGVudGF0aW9uXG4gIHZhciBsaW5lcyA9IHJlc3VsdC5zcGxpdChcIlxcblwiKTtcbiAgdmFyIG1pbmRlbnQgPSBudWxsO1xuICBsaW5lcy5mb3JFYWNoKGZ1bmN0aW9uIChsKSB7XG4gICAgdmFyIG0gPSBsLm1hdGNoKC9eKFxccyspXFxTKy8pO1xuICAgIGlmIChtKSB7XG4gICAgICB2YXIgaW5kZW50ID0gbVsxXS5sZW5ndGg7XG4gICAgICBpZiAoIW1pbmRlbnQpIHtcbiAgICAgICAgLy8gdGhpcyBpcyB0aGUgZmlyc3QgaW5kZW50ZWQgbGluZVxuICAgICAgICBtaW5kZW50ID0gaW5kZW50O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWluZGVudCA9IE1hdGgubWluKG1pbmRlbnQsIGluZGVudCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBpZiAobWluZGVudCAhPT0gbnVsbCkge1xuICAgIHJlc3VsdCA9IGxpbmVzLm1hcChmdW5jdGlvbiAobCkge1xuICAgICAgcmV0dXJuIGxbMF0gPT09IFwiIFwiID8gbC5zbGljZShtaW5kZW50KSA6IGw7XG4gICAgfSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIC8vIGRlZGVudCBlYXRzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UgdG9vXG4gIHJlc3VsdCA9IHJlc3VsdC50cmltKCk7XG5cbiAgLy8gaGFuZGxlIGVzY2FwZWQgbmV3bGluZXMgYXQgdGhlIGVuZCB0byBlbnN1cmUgdGhleSBkb24ndCBnZXQgc3RyaXBwZWQgdG9vXG4gIHJldHVybiByZXN1bHQucmVwbGFjZSgvXFxcXG4vZywgXCJcXG5cIik7XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIG1vZHVsZS5leHBvcnRzID0gZGVkZW50O1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSAodmFsKSA9PiB7XG4gIHJldHVybiB2YWwgIT0gbnVsbCAmJiB0eXBlb2YgdmFsID09PSAnb2JqZWN0JyAmJiB2YWwuY29uc3RydWN0b3IgIT09IFJlZ0V4cFxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmZ1bmN0aW9uIFBhcnNlIChkYXRhKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQYXJzZSkpIHtcbiAgICByZXR1cm4gbmV3IFBhcnNlKGRhdGEpXG4gIH1cbiAgdGhpcy5lcnIgPSBudWxsXG4gIHRoaXMudmFsdWUgPSBudWxsXG4gIHRyeSB7XG4gICAgdGhpcy52YWx1ZSA9IEpTT04ucGFyc2UoZGF0YSlcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgdGhpcy5lcnIgPSBlcnJcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFBhcnNlXG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGRlZGVudF8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJkZWRlbnRcIikpO1xuY29uc3Qgb2JqZWN0b3JhcnJheV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJvYmplY3RvcmFycmF5XCIpKTtcbmNvbnN0IGZhc3RfanNvbl9wYXJzZV8xID0gX19pbXBvcnREZWZhdWx0KHJlcXVpcmUoXCJmYXN0LWpzb24tcGFyc2VcIikpO1xuY29uc3QgRU5ERU5UX0lEID0gXCJ0d2haTnd4STFhRkczcjRcIjtcbmZ1bmN0aW9uIGVuZGVudChzdHJpbmdzLCAuLi52YWx1ZXMpIHtcbiAgICBsZXQgcmVzdWx0ID0gXCJcIjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ICs9IHN0cmluZ3NbaV07XG4gICAgICAgIGlmIChpIDwgdmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdmFsdWVzW2ldO1xuICAgICAgICAgICAgbGV0IGlzSnNvbiA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKGZhc3RfanNvbl9wYXJzZV8xLmRlZmF1bHQodmFsdWUpLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBmYXN0X2pzb25fcGFyc2VfMS5kZWZhdWx0KHZhbHVlKS52YWx1ZTtcbiAgICAgICAgICAgICAgICBpc0pzb24gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCh2YWx1ZSAmJiB2YWx1ZVtFTkRFTlRfSURdKSB8fCBpc0pzb24pIHtcbiAgICAgICAgICAgICAgICBsZXQgcmF3bGluZXMgPSByZXN1bHQuc3BsaXQoXCJcXG5cIik7XG4gICAgICAgICAgICAgICAgbGV0IGwgPSByYXdsaW5lc1tyYXdsaW5lcy5sZW5ndGggLSAxXS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgICAgIGxldCBlbmRlbnRhdGlvbiA9IGwgPiAwID8gXCIgXCIucmVwZWF0KGwpIDogXCJcIjtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVKc29uID0gaXNKc29uXG4gICAgICAgICAgICAgICAgICAgID8gSlNPTi5zdHJpbmdpZnkodmFsdWUsIG51bGwsIDIpXG4gICAgICAgICAgICAgICAgICAgIDogdmFsdWVbRU5ERU5UX0lEXTtcbiAgICAgICAgICAgICAgICBsZXQgdmFsdWVMaW5lcyA9IHZhbHVlSnNvbi5zcGxpdChcIlxcblwiKTtcbiAgICAgICAgICAgICAgICB2YWx1ZUxpbmVzLmZvckVhY2goKGwsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSBcIlxcblwiICsgZW5kZW50YXRpb24gKyBsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ICs9IGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiAmJiB2YWx1ZS5pbmNsdWRlcyhcIlxcblwiKSkge1xuICAgICAgICAgICAgICAgIGxldCBlbmRlbnRhdGlvbnMgPSByZXN1bHQubWF0Y2goLyg/Ol58XFxuKSggKikkLyk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZW5kZW50YXRpb24gPSBlbmRlbnRhdGlvbnMgPyBlbmRlbnRhdGlvbnNbMV0gOiBcIlwiO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgKz0gdmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdChcIlxcblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgLm1hcCgoc3RyLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHIgPSBFTkRFTlRfSUQgKyBzdHI7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaSA9PT0gMCA/IHN0ciA6IGAke2VuZGVudGF0aW9ufSR7c3RyfWA7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAuam9pbihcIlxcblwiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCArPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgKz0gdmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0ID0gZGVkZW50XzEuZGVmYXVsdChyZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQuc3BsaXQoRU5ERU5UX0lEKS5qb2luKFwiXCIpO1xufVxuZW5kZW50LnByZXR0eSA9IChkYXRhKSA9PiB7XG4gICAgcmV0dXJuIG9iamVjdG9yYXJyYXlfMS5kZWZhdWx0KGRhdGEpXG4gICAgICAgID8geyBbRU5ERU5UX0lEXTogSlNPTi5zdHJpbmdpZnkoZGF0YSwgbnVsbCwgMikgfVxuICAgICAgICA6IGRhdGE7XG59O1xuZXhwb3J0cy5kZWZhdWx0ID0gZW5kZW50O1xuIiwiaW1wb3J0IGVuZGVudCBmcm9tIFwiZW5kZW50XCI7XG5pbXBvcnQgeyBDYWNoZWRNZXRhZGF0YSwgSGVhZGluZ0NhY2hlIH0gZnJvbSBcIm9ic2lkaWFuXCI7XG5pbXBvcnQgeyBUYWJsZU9mQ29udGVudHNQbHVnaW5TZXR0aW5ncyB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3Vyc29yUG9zaXRpb24ge1xuICBsaW5lOiBudW1iZXI7XG4gIGNoOiBudW1iZXI7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50SGVhZGVyRGVwdGggPSAoXG4gIGhlYWRpbmdzOiBIZWFkaW5nQ2FjaGVbXSxcbiAgY3Vyc29yOiBDdXJzb3JQb3NpdGlvblxuKTogbnVtYmVyID0+IHtcbiAgY29uc3QgcHJldmlvdXNIZWFkaW5ncyA9IGhlYWRpbmdzLmZpbHRlcihcbiAgICAoaGVhZGluZykgPT4gaGVhZGluZy5wb3NpdGlvbi5lbmQubGluZSA8IGN1cnNvci5saW5lXG4gICk7XG5cbiAgaWYgKCFwcmV2aW91c0hlYWRpbmdzLmxlbmd0aCkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgcmV0dXJuIHByZXZpb3VzSGVhZGluZ3NbcHJldmlvdXNIZWFkaW5ncy5sZW5ndGggLSAxXS5sZXZlbDtcbn07XG5cbmNvbnN0IGdldFN1YnNlcXVlbnRIZWFkaW5ncyA9IChcbiAgaGVhZGluZ3M6IEhlYWRpbmdDYWNoZVtdLFxuICBjdXJzb3I6IEN1cnNvclBvc2l0aW9uXG4pOiBIZWFkaW5nQ2FjaGVbXSA9PiB7XG4gIHJldHVybiBoZWFkaW5ncy5maWx0ZXIoKGhlYWRpbmcpID0+IGhlYWRpbmcucG9zaXRpb24uZW5kLmxpbmUgPiBjdXJzb3IubGluZSk7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlVG9jID0gKFxuICB7IGhlYWRpbmdzID0gW10gfTogQ2FjaGVkTWV0YWRhdGEsXG4gIGN1cnNvcjogQ3Vyc29yUG9zaXRpb24sXG4gIHNldHRpbmdzOiBUYWJsZU9mQ29udGVudHNQbHVnaW5TZXR0aW5nc1xuKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcbiAgY29uc3QgY3VycmVudERlcHRoID0gZ2V0Q3VycmVudEhlYWRlckRlcHRoKGhlYWRpbmdzLCBjdXJzb3IpO1xuICBjb25zdCBzdWJzZXF1ZW50SGVhZGluZ3MgPSBnZXRTdWJzZXF1ZW50SGVhZGluZ3MoaGVhZGluZ3MsIGN1cnNvcik7XG4gIGNvbnN0IGluY2x1ZGVkSGVhZGluZ3M6IEhlYWRpbmdDYWNoZVtdID0gW107XG5cbiAgZm9yIChjb25zdCBoZWFkaW5nIG9mIHN1YnNlcXVlbnRIZWFkaW5ncykge1xuICAgIGlmIChoZWFkaW5nLmxldmVsIDw9IGN1cnJlbnREZXB0aCkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgaGVhZGluZy5sZXZlbCA+PSBzZXR0aW5ncy5taW5pbXVtRGVwdGggJiZcbiAgICAgIGhlYWRpbmcubGV2ZWwgPD0gc2V0dGluZ3MubWF4aW11bURlcHRoXG4gICAgKSB7XG4gICAgICBpbmNsdWRlZEhlYWRpbmdzLnB1c2goaGVhZGluZyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFpbmNsdWRlZEhlYWRpbmdzLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGxpbmtzID0gaW5jbHVkZWRIZWFkaW5ncy5tYXAoKGhlYWRpbmcpID0+IHtcbiAgICBjb25zdCBpdGVtSW5kaWNhdGlvbiA9IChzZXR0aW5ncy5saXN0U3R5bGUgPT09IFwibnVtYmVyXCIgJiYgXCIxLlwiKSB8fCBcIi1cIjtcbiAgICBjb25zdCBpbmRlbnQgPSBuZXcgQXJyYXkoTWF0aC5tYXgoMCwgaGVhZGluZy5sZXZlbCAtIGN1cnJlbnREZXB0aCAtIDEpKVxuICAgICAgLmZpbGwoXCJcXHRcIilcbiAgICAgIC5qb2luKFwiXCIpO1xuXG4gICAgcmV0dXJuIGAke2luZGVudH0ke2l0ZW1JbmRpY2F0aW9ufSBbWyMke2hlYWRpbmcuaGVhZGluZ318JHtoZWFkaW5nLmhlYWRpbmd9XV1gO1xuICB9KTtcblxuICByZXR1cm4gZW5kZW50YFxuICAgICR7c2V0dGluZ3MudGl0bGUgPyBgJHtzZXR0aW5ncy50aXRsZX1cXG5gIDogXCJcIn1cbiAgICAke2xpbmtzLmpvaW4oXCJcXG5cIil9XG4gIGA7XG59O1xuIiwiaW1wb3J0IHtcbiAgQXBwLFxuICBDYWNoZWRNZXRhZGF0YSxcbiAgTWFya2Rvd25WaWV3LFxuICBQbHVnaW4sXG4gIFBsdWdpblNldHRpbmdUYWIsXG4gIFNldHRpbmcsXG59IGZyb20gXCJvYnNpZGlhblwiO1xuaW1wb3J0IHsgY3JlYXRlVG9jLCBnZXRDdXJyZW50SGVhZGVyRGVwdGggfSBmcm9tIFwiLi9jcmVhdGUtdG9jXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3Vyc29yUG9zaXRpb24ge1xuICBsaW5lOiBudW1iZXI7XG4gIGNoOiBudW1iZXI7XG59XG5cbmNsYXNzIFRhYmxlT2ZDb250ZW50c1NldHRpbmdzVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgcGx1Z2luOiBUYWJsZU9mQ29udGVudHNQbHVnaW47XG5cbiAgY29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogVGFibGVPZkNvbnRlbnRzUGx1Z2luKSB7XG4gICAgc3VwZXIoYXBwLCBwbHVnaW4pO1xuICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICB9XG5cbiAgcHVibGljIGRpc3BsYXkoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjb250YWluZXJFbCB9ID0gdGhpcztcbiAgICBjb250YWluZXJFbC5lbXB0eSgpO1xuXG4gICAgY29udGFpbmVyRWwuY3JlYXRlRWwoXCJoMlwiLCB7IHRleHQ6IFwiVGFibGUgb2YgQ29udGVudHMgLSBTZXR0aW5nc1wiIH0pO1xuXG4gICAgbmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG4gICAgICAuc2V0TmFtZShcIkxpc3QgU3R5bGVcIilcbiAgICAgIC5zZXREZXNjKFwiVGhlIHR5cGUgb2YgbGlzdCB0byByZW5kZXIgdGhlIHRhYmxlIG9mIGNvbnRlbnRzIGFzLlwiKVxuICAgICAgLmFkZERyb3Bkb3duKChkcm9wZG93bikgPT5cbiAgICAgICAgZHJvcGRvd25cbiAgICAgICAgICAuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3MubGlzdFN0eWxlKVxuICAgICAgICAgIC5hZGRPcHRpb24oXCJidWxsZXRcIiwgXCJCdWxsZXRcIilcbiAgICAgICAgICAuYWRkT3B0aW9uKFwibnVtYmVyXCIsIFwiTnVtYmVyXCIpXG4gICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubGlzdFN0eWxlID0gdmFsdWUgYXMgYW55O1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2F2ZURhdGEodGhpcy5wbHVnaW4uc2V0dGluZ3MpO1xuICAgICAgICAgICAgdGhpcy5kaXNwbGF5KCk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG5cbiAgICBuZXcgU2V0dGluZyhjb250YWluZXJFbClcbiAgICAgIC5zZXROYW1lKFwiVGl0bGVcIilcbiAgICAgIC5zZXREZXNjKFwiT3B0aW9uYWwgdGl0bGUgdG8gcHV0IGJlZm9yZSB0aGUgdGFibGUgb2YgY29udGVudHNcIilcbiAgICAgIC5hZGRUZXh0KCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFBsYWNlaG9sZGVyKFwiKipUYWJsZSBvZiBDb250ZW50cyoqXCIpXG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnRpdGxlIHx8IFwiXCIpXG4gICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MudGl0bGUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJNaW5pbXVtIEhlYWRlciBEZXB0aFwiKVxuICAgICAgLnNldERlc2MoXG4gICAgICAgIFwiVGhlIGxvd2VzdCBoZWFkZXIgZGVwdGggdG8gYWRkIHRvIHRoZSB0YWJsZSBvZiBjb250ZW50cy4gRGVmYXVsdHMgdG8gMlwiXG4gICAgICApXG4gICAgICAuYWRkU2xpZGVyKCh0ZXh0KSA9PlxuICAgICAgICB0ZXh0XG4gICAgICAgICAgLnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLm1pbmltdW1EZXB0aClcbiAgICAgICAgICAuc2V0RHluYW1pY1Rvb2x0aXAoKVxuICAgICAgICAgIC5zZXRMaW1pdHMoMSwgNiwgMSlcbiAgICAgICAgICAub25DaGFuZ2UoKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zZXR0aW5ncy5taW5pbXVtRGVwdGggPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMucGx1Z2luLnNhdmVEYXRhKHRoaXMucGx1Z2luLnNldHRpbmdzKTtcbiAgICAgICAgICB9KVxuICAgICAgKTtcblxuICAgIG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuICAgICAgLnNldE5hbWUoXCJNYXhpbXVtIEhlYWRlciBEZXB0aFwiKVxuICAgICAgLnNldERlc2MoXG4gICAgICAgIFwiVGhlIGhpZ2hlc3QgaGVhZGVyIGRlcHRoIHRvIGFkZCB0byB0aGUgdGFibGUgb2YgY29udGVudHMuIERlZmF1bHRzIHRvIDZcIlxuICAgICAgKVxuICAgICAgLmFkZFNsaWRlcigodGV4dCkgPT5cbiAgICAgICAgdGV4dFxuICAgICAgICAgIC5zZXRWYWx1ZSh0aGlzLnBsdWdpbi5zZXR0aW5ncy5tYXhpbXVtRGVwdGgpXG4gICAgICAgICAgLnNldER5bmFtaWNUb29sdGlwKClcbiAgICAgICAgICAuc2V0TGltaXRzKDEsIDYsIDEpXG4gICAgICAgICAgLm9uQ2hhbmdlKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4uc2V0dGluZ3MubWluaW11bURlcHRoID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLnBsdWdpbi5zYXZlRGF0YSh0aGlzLnBsdWdpbi5zZXR0aW5ncyk7XG4gICAgICAgICAgfSlcbiAgICAgICk7XG4gIH1cbn1cblxudHlwZSBHZXRTZXR0aW5ncyA9IChcbiAgZGF0YTogQ2FjaGVkTWV0YWRhdGEsXG4gIGN1cnNvcjogQ29kZU1pcnJvci5Qb3NpdGlvblxuKSA9PiBUYWJsZU9mQ29udGVudHNQbHVnaW5TZXR0aW5ncztcblxuaW50ZXJmYWNlIFRhYmxlT2ZDb250ZW50c1BsdWdpblNldHRpbmdzIHtcbiAgbGlzdFN0eWxlOiBcImJ1bGxldFwiIHwgXCJudW1iZXJcIjtcbiAgbWluaW11bURlcHRoOiBudW1iZXI7XG4gIG1heGltdW1EZXB0aDogbnVtYmVyO1xuICB0aXRsZT86IHN0cmluZztcbn1cblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFibGVPZkNvbnRlbnRzUGx1Z2luIGV4dGVuZHMgUGx1Z2luIHtcbiAgcHVibGljIHNldHRpbmdzOiBUYWJsZU9mQ29udGVudHNQbHVnaW5TZXR0aW5ncyA9IHtcbiAgICBtaW5pbXVtRGVwdGg6IDIsXG4gICAgbWF4aW11bURlcHRoOiA2LFxuICAgIGxpc3RTdHlsZTogXCJidWxsZXRcIixcbiAgfTtcblxuICBwdWJsaWMgYXN5bmMgb25sb2FkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnNvbGUubG9nKFwiTG9hZCBUYWJsZSBvZiBDb250ZW50cyBwbHVnaW5cIik7XG5cbiAgICB0aGlzLnNldHRpbmdzID0ge1xuICAgICAgLi4udGhpcy5zZXR0aW5ncyxcbiAgICAgIC4uLihhd2FpdCB0aGlzLmxvYWREYXRhKCkpLFxuICAgIH07XG5cbiAgICB0aGlzLmFkZENvbW1hbmQoe1xuICAgICAgaWQ6IFwiY3JlYXRlLXRvY1wiLFxuICAgICAgbmFtZTogXCJDcmVhdGUgdGFibGUgb2YgY29udGVudHNcIixcbiAgICAgIGNhbGxiYWNrOiB0aGlzLmNyZWF0ZVRvY0ZvckFjdGl2ZUZpbGUoKSxcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkQ29tbWFuZCh7XG4gICAgICBpZDogXCJjcmVhdGUtdG9jLW5leHQtbGV2ZWxcIixcbiAgICAgIG5hbWU6IFwiQ3JlYXRlIHRhYmxlIG9mIGNvbnRlbnRzIGZvciBuZXh0IGhlYWRpbmcgbGV2ZWxcIixcbiAgICAgIGNhbGxiYWNrOiB0aGlzLmNyZWF0ZVRvY0ZvckFjdGl2ZUZpbGUoKGRhdGEsIGN1cnNvcikgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50SGVhZGVyRGVwdGggPSBnZXRDdXJyZW50SGVhZGVyRGVwdGgoXG4gICAgICAgICAgZGF0YS5oZWFkaW5ncyB8fCBbXSxcbiAgICAgICAgICBjdXJzb3JcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnRoaXMuc2V0dGluZ3MsXG4gICAgICAgICAgbWF4aW11bURlcHRoOiBjdXJyZW50SGVhZGVyRGVwdGggKyAxLFxuICAgICAgICB9O1xuICAgICAgfSksXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZFNldHRpbmdUYWIobmV3IFRhYmxlT2ZDb250ZW50c1NldHRpbmdzVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVRvY0ZvckFjdGl2ZUZpbGUgPSAoXG4gICAgc2V0dGluZ3M6IFRhYmxlT2ZDb250ZW50c1BsdWdpblNldHRpbmdzIHwgR2V0U2V0dGluZ3MgPSB0aGlzLnNldHRpbmdzXG4gICkgPT4gKCkgPT4ge1xuICAgIGNvbnN0IGFjdGl2ZVZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuXG4gICAgaWYgKGFjdGl2ZVZpZXcgJiYgYWN0aXZlVmlldy5maWxlKSB7XG4gICAgICBjb25zdCBlZGl0b3IgPSBhY3RpdmVWaWV3LnNvdXJjZU1vZGUuY21FZGl0b3I7XG4gICAgICBjb25zdCBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yKCk7XG4gICAgICBjb25zdCBkYXRhID0gdGhpcy5hcHAubWV0YWRhdGFDYWNoZS5nZXRGaWxlQ2FjaGUoYWN0aXZlVmlldy5maWxlKSB8fCB7fTtcbiAgICAgIGNvbnN0IHRvYyA9IGNyZWF0ZVRvYyhcbiAgICAgICAgZGF0YSxcbiAgICAgICAgY3Vyc29yLFxuICAgICAgICB0eXBlb2Ygc2V0dGluZ3MgPT09IFwiZnVuY3Rpb25cIiA/IHNldHRpbmdzKGRhdGEsIGN1cnNvcikgOiBzZXR0aW5nc1xuICAgICAgKTtcblxuICAgICAgaWYgKHRvYykge1xuICAgICAgICBlZGl0b3IucmVwbGFjZVJhbmdlKHRvYywgY3Vyc29yKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG4iXSwibmFtZXMiOlsidGhpcyIsImRlZGVudF8xIiwicmVxdWlyZSQkMCIsInJlcXVpcmUkJDEiLCJyZXF1aXJlJCQyIiwiU2V0dGluZyIsIlBsdWdpblNldHRpbmdUYWIiLCJNYXJrZG93blZpZXciLCJQbHVnaW4iXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQyxFQUFFLENBQUMsRUFBRTtBQUNuQyxJQUFJLGFBQWEsR0FBRyxNQUFNLENBQUMsY0FBYztBQUN6QyxTQUFTLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxZQUFZLEtBQUssSUFBSSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDcEYsUUFBUSxVQUFVLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDMUcsSUFBSSxPQUFPLGFBQWEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDO0FBQ0Y7QUFDTyxTQUFTLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFO0FBQ2hDLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLElBQUksQ0FBQyxLQUFLLElBQUk7QUFDN0MsUUFBUSxNQUFNLElBQUksU0FBUyxDQUFDLHNCQUFzQixHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRywrQkFBK0IsQ0FBQyxDQUFDO0FBQ2xHLElBQUksYUFBYSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztBQUN4QixJQUFJLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUMzQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxLQUFLLElBQUksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxTQUFTLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFDekYsQ0FBQztBQUNEO0FBQ08sSUFBSSxRQUFRLEdBQUcsV0FBVztBQUNqQyxJQUFJLFFBQVEsR0FBRyxNQUFNLENBQUMsTUFBTSxJQUFJLFNBQVMsUUFBUSxDQUFDLENBQUMsRUFBRTtBQUNyRCxRQUFRLEtBQUssSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzdELFlBQVksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM3QixZQUFZLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3pGLFNBQVM7QUFDVCxRQUFRLE9BQU8sQ0FBQyxDQUFDO0FBQ2pCLE1BQUs7QUFDTCxJQUFJLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7QUFDM0MsRUFBQztBQTRCRDtBQUNPLFNBQVMsU0FBUyxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsQ0FBQyxFQUFFLFNBQVMsRUFBRTtBQUM3RCxJQUFJLFNBQVMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLE9BQU8sS0FBSyxZQUFZLENBQUMsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsVUFBVSxPQUFPLEVBQUUsRUFBRSxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRTtBQUNoSCxJQUFJLE9BQU8sS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQyxFQUFFLFVBQVUsT0FBTyxFQUFFLE1BQU0sRUFBRTtBQUMvRCxRQUFRLFNBQVMsU0FBUyxDQUFDLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDbkcsUUFBUSxTQUFTLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7QUFDdEcsUUFBUSxTQUFTLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEVBQUU7QUFDdEgsUUFBUSxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDOUUsS0FBSyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBQ0Q7QUFDTyxTQUFTLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFO0FBQzNDLElBQUksSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNySCxJQUFJLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLE1BQU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxXQUFXLEVBQUUsT0FBTyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQzdKLElBQUksU0FBUyxJQUFJLENBQUMsQ0FBQyxFQUFFLEVBQUUsT0FBTyxVQUFVLENBQUMsRUFBRSxFQUFFLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7QUFDdEUsSUFBSSxTQUFTLElBQUksQ0FBQyxFQUFFLEVBQUU7QUFDdEIsUUFBUSxJQUFJLENBQUMsRUFBRSxNQUFNLElBQUksU0FBUyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDdEUsUUFBUSxPQUFPLENBQUMsRUFBRSxJQUFJO0FBQ3RCLFlBQVksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDekssWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3BELFlBQVksUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3pCLGdCQUFnQixLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNO0FBQzlDLGdCQUFnQixLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLENBQUM7QUFDeEUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7QUFDakUsZ0JBQWdCLEtBQUssQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVM7QUFDakUsZ0JBQWdCO0FBQ2hCLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUFFO0FBQ2hJLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO0FBQzFHLG9CQUFvQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUU7QUFDekYsb0JBQW9CLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFBRTtBQUN2RixvQkFBb0IsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQVM7QUFDM0MsYUFBYTtBQUNiLFlBQVksRUFBRSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQ3ZDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtBQUNsRSxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUM7QUFDekYsS0FBSztBQUNMLENBQUM7QUE4RkQ7QUFDTyxTQUFTLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUU7QUFDbEQsSUFBSSxJQUFJLE1BQU0sQ0FBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxFQUFFO0FBQ25ILElBQUksT0FBTyxNQUFNLENBQUM7QUFDbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMU1BO0FBQ0EsU0FBUyxNQUFNLENBQUMsT0FBTyxFQUFFO0FBQ3pCO0FBQ0EsRUFBRSxJQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQztBQUNuQixFQUFFLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO0FBQ25DO0FBQ0EsSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNwQixHQUFHLE1BQU07QUFDVCxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO0FBQ3RCLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDbEIsRUFBRSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN2QyxJQUFJLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3BCO0FBQ0EsSUFBSSxPQUFPLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQztBQUM5QjtBQUNBO0FBQ0EsSUFBSSxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQ3pCO0FBQ0EsSUFBSSxJQUFJLENBQUMsSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsRUFBRTtBQUNoRSxNQUFNLE1BQU0sSUFBSSxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxHQUFHLFNBQVMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDekUsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRSxJQUFJLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ2pDLEVBQUUsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBQ3JCLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUM3QixJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDakMsSUFBSSxJQUFJLENBQUMsRUFBRTtBQUNYLE1BQU0sSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztBQUMvQixNQUFNLElBQUksQ0FBQyxPQUFPLEVBQUU7QUFDcEI7QUFDQSxRQUFRLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFDekIsT0FBTyxNQUFNO0FBQ2IsUUFBUSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7QUFDNUMsT0FBTztBQUNQLEtBQUs7QUFDTCxHQUFHLENBQUMsQ0FBQztBQUNMO0FBQ0EsRUFBRSxJQUFJLE9BQU8sS0FBSyxJQUFJLEVBQUU7QUFDeEIsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNwQyxNQUFNLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNqRCxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEIsR0FBRztBQUNIO0FBQ0E7QUFDQSxFQUFFLE1BQU0sR0FBRyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7QUFDekI7QUFDQTtBQUNBLEVBQUUsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUN0QyxDQUFDO0FBQ0Q7QUFDbUM7QUFDbkMsRUFBRSxjQUFjLEdBQUcsTUFBTSxDQUFDO0FBQzFCOzs7QUMxREEsaUJBQWMsR0FBRyxDQUFDLEdBQUcsS0FBSztBQUMxQixFQUFFLE9BQU8sR0FBRyxJQUFJLElBQUksSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksR0FBRyxDQUFDLFdBQVcsS0FBSyxNQUFNO0FBQzdFOztBQ0FBLFNBQVMsS0FBSyxFQUFFLElBQUksRUFBRTtBQUN0QixFQUFFLElBQUksRUFBRSxJQUFJLFlBQVksS0FBSyxDQUFDLEVBQUU7QUFDaEMsSUFBSSxPQUFPLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQztBQUMxQixHQUFHO0FBQ0gsRUFBRSxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUk7QUFDakIsRUFBRSxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUk7QUFDbkIsRUFBRSxJQUFJO0FBQ04sSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFDO0FBQ2pDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRTtBQUNoQixJQUFJLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBRztBQUNsQixHQUFHO0FBQ0gsQ0FBQztBQUNEO0FBQ0EsU0FBYyxHQUFHOzs7QUNkakIsSUFBSSxlQUFlLEdBQUcsQ0FBQ0EsY0FBSSxJQUFJQSxjQUFJLENBQUMsZUFBZSxLQUFLLFVBQVUsR0FBRyxFQUFFO0FBQ3ZFLElBQUksT0FBTyxDQUFDLEdBQUcsSUFBSSxHQUFHLENBQUMsVUFBVSxJQUFJLEdBQUcsR0FBRyxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQztBQUM5RCxDQUFDLENBQUM7QUFDRixNQUFNLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUM5RCxNQUFNQyxVQUFRLEdBQUcsZUFBZSxDQUFDQyxRQUFpQixDQUFDLENBQUM7QUFDcEQsTUFBTSxlQUFlLEdBQUcsZUFBZSxDQUFDQyxhQUF3QixDQUFDLENBQUM7QUFDbEUsTUFBTSxpQkFBaUIsR0FBRyxlQUFlLENBQUNDLEtBQTBCLENBQUMsQ0FBQztBQUN0RSxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQztBQUNwQyxTQUFTLE1BQU0sQ0FBQyxPQUFPLEVBQUUsR0FBRyxNQUFNLEVBQUU7QUFDcEMsSUFBSSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUM7QUFDcEIsSUFBSSxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUM3QyxRQUFRLE1BQU0sSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDN0IsUUFBUSxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsTUFBTSxFQUFFO0FBQy9CLFlBQVksSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLFlBQVksSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBQy9CLFlBQVksSUFBSSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxFQUFFO0FBQ3hELGdCQUFnQixLQUFLLEdBQUcsaUJBQWlCLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUMvRCxnQkFBZ0IsTUFBTSxHQUFHLElBQUksQ0FBQztBQUM5QixhQUFhO0FBQ2IsWUFBWSxJQUFJLENBQUMsS0FBSyxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxNQUFNLEVBQUU7QUFDdkQsZ0JBQWdCLElBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDbEQsZ0JBQWdCLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuRSxnQkFBZ0IsSUFBSSxXQUFXLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUM3RCxnQkFBZ0IsSUFBSSxTQUFTLEdBQUcsTUFBTTtBQUN0QyxzQkFBc0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztBQUNwRCxzQkFBc0IsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZDLGdCQUFnQixJQUFJLFVBQVUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3ZELGdCQUFnQixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssS0FBSztBQUNqRCxvQkFBb0IsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFO0FBQ25DLHdCQUF3QixNQUFNLElBQUksSUFBSSxHQUFHLFdBQVcsR0FBRyxDQUFDLENBQUM7QUFDekQscUJBQXFCO0FBQ3JCLHlCQUF5QjtBQUN6Qix3QkFBd0IsTUFBTSxJQUFJLENBQUMsQ0FBQztBQUNwQyxxQkFBcUI7QUFDckIsaUJBQWlCLENBQUMsQ0FBQztBQUNuQixhQUFhO0FBQ2IsaUJBQWlCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7QUFDeEUsZ0JBQWdCLElBQUksWUFBWSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDakUsZ0JBQWdCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO0FBQy9DLG9CQUFvQixJQUFJLFdBQVcsR0FBRyxZQUFZLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxRSxvQkFBb0IsTUFBTSxJQUFJLEtBQUs7QUFDbkMseUJBQXlCLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDcEMseUJBQXlCLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLEtBQUs7QUFDekMsd0JBQXdCLEdBQUcsR0FBRyxTQUFTLEdBQUcsR0FBRyxDQUFDO0FBQzlDLHdCQUF3QixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsRUFBRSxXQUFXLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3RFLHFCQUFxQixDQUFDO0FBQ3RCLHlCQUF5QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEMsaUJBQWlCO0FBQ2pCLHFCQUFxQjtBQUNyQixvQkFBb0IsTUFBTSxJQUFJLEtBQUssQ0FBQztBQUNwQyxpQkFBaUI7QUFDakIsYUFBYTtBQUNiLGlCQUFpQjtBQUNqQixnQkFBZ0IsTUFBTSxJQUFJLEtBQUssQ0FBQztBQUNoQyxhQUFhO0FBQ2IsU0FBUztBQUNULEtBQUs7QUFDTCxJQUFJLE1BQU0sR0FBR0gsVUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN0QyxJQUFJLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUNELE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEtBQUs7QUFDMUIsSUFBSSxPQUFPLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO0FBQ3hDLFVBQVUsRUFBRSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUU7QUFDeEQsVUFBVSxJQUFJLENBQUM7QUFDZixDQUFDLENBQUM7QUFDRixlQUFlLEdBQUcsTUFBTTs7Ozs7QUN6RGpCLElBQU0scUJBQXFCLEdBQUcsVUFDbkMsUUFBd0IsRUFDeEIsTUFBc0I7SUFFdEIsSUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUN0QyxVQUFDLE9BQU8sSUFBSyxPQUFBLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxHQUFBLENBQ3JELENBQUM7SUFFRixJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO1FBQzVCLE9BQU8sQ0FBQyxDQUFDO0tBQ1Y7SUFFRCxPQUFPLGdCQUFnQixDQUFDLGdCQUFnQixDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDN0QsQ0FBQyxDQUFDO0FBRUYsSUFBTSxxQkFBcUIsR0FBRyxVQUM1QixRQUF3QixFQUN4QixNQUFzQjtJQUV0QixPQUFPLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQyxPQUFPLElBQUssT0FBQSxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksR0FBQSxDQUFDLENBQUM7QUFDL0UsQ0FBQyxDQUFDO0FBRUssSUFBTSxTQUFTLEdBQUcsVUFDdkIsRUFBaUMsRUFDakMsTUFBc0IsRUFDdEIsUUFBdUM7UUFGckMsZ0JBQWEsRUFBYixRQUFRLG1CQUFHLEVBQUUsS0FBQTtJQUlmLElBQU0sWUFBWSxHQUFHLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM3RCxJQUFNLGtCQUFrQixHQUFHLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNuRSxJQUFNLGdCQUFnQixHQUFtQixFQUFFLENBQUM7SUFFNUMsS0FBc0IsVUFBa0IsRUFBbEIseUNBQWtCLEVBQWxCLGdDQUFrQixFQUFsQixJQUFrQixFQUFFO1FBQXJDLElBQU0sT0FBTywyQkFBQTtRQUNoQixJQUFJLE9BQU8sQ0FBQyxLQUFLLElBQUksWUFBWSxFQUFFO1lBQ2pDLE1BQU07U0FDUDtRQUVELElBQ0UsT0FBTyxDQUFDLEtBQUssSUFBSSxRQUFRLENBQUMsWUFBWTtZQUN0QyxPQUFPLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxZQUFZLEVBQ3RDO1lBQ0EsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBQ2hDO0tBQ0Y7SUFFRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO1FBQzVCLE9BQU87S0FDUjtJQUVELElBQU0sS0FBSyxHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxVQUFDLE9BQU87UUFDekMsSUFBTSxjQUFjLEdBQUcsQ0FBQyxRQUFRLENBQUMsU0FBUyxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssR0FBRyxDQUFDO1FBQ3hFLElBQU0sTUFBTSxHQUFHLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxLQUFLLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3BFLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDVixJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFWixPQUFPLEtBQUcsTUFBTSxHQUFHLGNBQWMsWUFBTyxPQUFPLENBQUMsT0FBTyxTQUFJLE9BQU8sQ0FBQyxPQUFPLE9BQUksQ0FBQztLQUNoRixDQUFDLENBQUM7SUFFSCxPQUFPLE1BQU0sNkZBQUEsUUFDVCxFQUEyQyxRQUMzQyxFQUFnQixNQUNuQixLQUZHLFFBQVEsQ0FBQyxLQUFLLEdBQU0sUUFBUSxDQUFDLEtBQUssT0FBSSxHQUFHLEVBQUUsRUFDM0MsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDbEI7QUFDSixDQUFDLENBQUM7OztBQ3ZERjtJQUF5Qyw4Q0FBZ0I7SUFHdkQsb0NBQVksR0FBUSxFQUFFLE1BQTZCO1FBQW5ELFlBQ0Usa0JBQU0sR0FBRyxFQUFFLE1BQU0sQ0FBQyxTQUVuQjtRQURDLEtBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDOztLQUN0QjtJQUVNLDRDQUFPLEdBQWQ7UUFBQSxpQkFpRUM7UUFoRVMsSUFBQSxXQUFXLEdBQUssSUFBSSxZQUFULENBQVU7UUFDN0IsV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRXBCLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLEVBQUUsSUFBSSxFQUFFLDhCQUE4QixFQUFFLENBQUMsQ0FBQztRQUVyRSxJQUFJSSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsWUFBWSxDQUFDO2FBQ3JCLE9BQU8sQ0FBQyxzREFBc0QsQ0FBQzthQUMvRCxXQUFXLENBQUMsVUFBQyxRQUFRO1lBQ3BCLE9BQUEsUUFBUTtpQkFDTCxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO2lCQUN4QyxTQUFTLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQztpQkFDN0IsU0FBUyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUM7aUJBQzdCLFFBQVEsQ0FBQyxVQUFDLEtBQUs7Z0JBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLEtBQVksQ0FBQztnQkFDOUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFDM0MsS0FBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2hCLENBQUM7U0FBQSxDQUNMLENBQUM7UUFFSixJQUFJQSxnQkFBTyxDQUFDLFdBQVcsQ0FBQzthQUNyQixPQUFPLENBQUMsT0FBTyxDQUFDO2FBQ2hCLE9BQU8sQ0FBQyxvREFBb0QsQ0FBQzthQUM3RCxPQUFPLENBQUMsVUFBQyxJQUFJO1lBQ1osT0FBQSxJQUFJO2lCQUNELGNBQWMsQ0FBQyx1QkFBdUIsQ0FBQztpQkFDdkMsUUFBUSxDQUFDLEtBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7aUJBQzFDLFFBQVEsQ0FBQyxVQUFDLEtBQUs7Z0JBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbkMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM1QyxDQUFDO1NBQUEsQ0FDTCxDQUFDO1FBRUosSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLHNCQUFzQixDQUFDO2FBQy9CLE9BQU8sQ0FDTix3RUFBd0UsQ0FDekU7YUFDQSxTQUFTLENBQUMsVUFBQyxJQUFJO1lBQ2QsT0FBQSxJQUFJO2lCQUNELFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7aUJBQzNDLGlCQUFpQixFQUFFO2lCQUNuQixTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ2xCLFFBQVEsQ0FBQyxVQUFDLEtBQUs7Z0JBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM1QyxDQUFDO1NBQUEsQ0FDTCxDQUFDO1FBRUosSUFBSUEsZ0JBQU8sQ0FBQyxXQUFXLENBQUM7YUFDckIsT0FBTyxDQUFDLHNCQUFzQixDQUFDO2FBQy9CLE9BQU8sQ0FDTix5RUFBeUUsQ0FDMUU7YUFDQSxTQUFTLENBQUMsVUFBQyxJQUFJO1lBQ2QsT0FBQSxJQUFJO2lCQUNELFFBQVEsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUM7aUJBQzNDLGlCQUFpQixFQUFFO2lCQUNuQixTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7aUJBQ2xCLFFBQVEsQ0FBQyxVQUFDLEtBQUs7Z0JBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztnQkFDMUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM1QyxDQUFDO1NBQUEsQ0FDTCxDQUFDO0tBQ0w7SUFDSCxpQ0FBQztBQUFELENBMUVBLENBQXlDQyx5QkFBZ0IsR0EwRXhEOztJQWNrRCx5Q0FBTTtJQUF6RDtRQUFBLHFFQTREQztRQTNEUSxjQUFRLEdBQWtDO1lBQy9DLFlBQVksRUFBRSxDQUFDO1lBQ2YsWUFBWSxFQUFFLENBQUM7WUFDZixTQUFTLEVBQUUsUUFBUTtTQUNwQixDQUFDO1FBbUNNLDRCQUFzQixHQUFHLFVBQy9CLFFBQXFFO1lBQXJFLHlCQUFBLEVBQUEsV0FBd0QsS0FBSSxDQUFDLFFBQVE7WUFDbEUsT0FBQTtnQkFDSCxJQUFNLFVBQVUsR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQ0MscUJBQVksQ0FBQyxDQUFDO2dCQUV4RSxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsSUFBSSxFQUFFO29CQUNqQyxJQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQztvQkFDOUMsSUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNsQyxJQUFNLElBQUksR0FBRyxLQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztvQkFDeEUsSUFBTSxHQUFHLEdBQUcsU0FBUyxDQUNuQixJQUFJLEVBQ0osTUFBTSxFQUNOLE9BQU8sUUFBUSxLQUFLLFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FDbkUsQ0FBQztvQkFFRixJQUFJLEdBQUcsRUFBRTt3QkFDUCxNQUFNLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztxQkFDbEM7aUJBQ0Y7YUFDRjtTQUFBLENBQUM7O0tBQ0g7SUFyRGMsc0NBQU0sR0FBbkI7Ozs7Ozs7d0JBQ0UsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO3dCQUU3QyxLQUFBLElBQUksQ0FBQTsyQ0FDQyxJQUFJLENBQUMsUUFBUTt3QkFDWixxQkFBTSxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUE7O3dCQUYzQixHQUFLLFFBQVEsc0NBRVAsU0FBcUIsSUFDMUIsQ0FBQzt3QkFFRixJQUFJLENBQUMsVUFBVSxDQUFDOzRCQUNkLEVBQUUsRUFBRSxZQUFZOzRCQUNoQixJQUFJLEVBQUUsMEJBQTBCOzRCQUNoQyxRQUFRLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixFQUFFO3lCQUN4QyxDQUFDLENBQUM7d0JBRUgsSUFBSSxDQUFDLFVBQVUsQ0FBQzs0QkFDZCxFQUFFLEVBQUUsdUJBQXVCOzRCQUMzQixJQUFJLEVBQUUsaURBQWlEOzRCQUN2RCxRQUFRLEVBQUUsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFVBQUMsSUFBSSxFQUFFLE1BQU07Z0NBQ2pELElBQU0sa0JBQWtCLEdBQUcscUJBQXFCLENBQzlDLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRSxFQUNuQixNQUFNLENBQ1AsQ0FBQztnQ0FFRiw2QkFDSyxLQUFJLENBQUMsUUFBUSxLQUNoQixZQUFZLEVBQUUsa0JBQWtCLEdBQUcsQ0FBQyxJQUNwQzs2QkFDSCxDQUFDO3lCQUNILENBQUMsQ0FBQzt3QkFFSCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksMEJBQTBCLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7OztLQUNwRTtJQXNCSCw0QkFBQztBQUFELENBNURBLENBQW1EQyxlQUFNOzs7OyJ9
