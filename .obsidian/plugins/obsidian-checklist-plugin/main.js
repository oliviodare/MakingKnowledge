'use strict';

var obsidian = require('obsidian');
var os = require('os');

const TODO_VIEW_TYPE = "todo";

const DEFAULT_SETTINGS = {
    todoPageName: "todo",
    showChecked: false,
    groupBy: "page",
    sortDirection: "old->new",
    ignoreFiles: "",
    lookAndFeel: "classic",
};
class TodoSettingTab extends obsidian.PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }
    display() {
        let { containerEl } = this;
        this.containerEl.empty();
        this.containerEl.createEl("h3", {
            text: "General Settings",
        });
        new obsidian.Setting(containerEl)
            .setName("Tag name")
            .setDesc("e.g. #todo")
            .addText((text) => text
            .setPlaceholder("todo")
            .setValue(this.plugin.settings.todoPageName)
            .onChange(async (value) => {
            this.plugin.settings.todoPageName = value;
            await this.plugin.saveSettings();
        }));
        new obsidian.Setting(containerEl).setName("Show Completed?").addToggle((toggle) => {
            toggle.setValue(this.plugin.settings.showChecked);
            toggle.onChange(async (value) => {
                this.plugin.settings.showChecked = value;
                await this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl).setName("Group By").addDropdown((dropdown) => {
            dropdown.addOption("page", "Page");
            dropdown.addOption("tag", "Tag");
            dropdown.setValue(this.plugin.settings.groupBy);
            dropdown.onChange(async (value) => {
                this.plugin.settings.groupBy = value;
                await this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl).setName("Sort Direction").addDropdown((dropdown) => {
            dropdown.addOption("new->old", "New -> Old");
            dropdown.addOption("old->new", "Old -> New");
            dropdown.setValue(this.plugin.settings.sortDirection);
            dropdown.onChange(async (value) => {
                this.plugin.settings.sortDirection = value;
                await this.plugin.saveSettings();
            });
        });
        new obsidian.Setting(containerEl)
            .setName("Ignore Files")
            .setDesc("Ignore files that contain this text anywhere in the filepath. (e.g. 'template' to ignore template.md and templates/file.md)")
            .addText((text) => text.setValue(this.plugin.settings.ignoreFiles).onChange(async (value) => {
            this.plugin.settings.ignoreFiles = value;
            await this.plugin.saveSettings();
        }));
        new obsidian.Setting(containerEl).setName("Look and Feel").addDropdown((dropdown) => {
            dropdown.addOption("classic", "Classic");
            dropdown.addOption("compact", "Compact");
            dropdown.setValue(this.plugin.settings.lookAndFeel);
            dropdown.onChange(async (value) => {
                this.plugin.settings.lookAndFeel = value;
                await this.plugin.saveSettings();
            });
        });
    }
}

function noop() { }
function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}
function is_function(thing) {
    return typeof thing === 'function';
}
function safe_not_equal(a, b) {
    return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
}
function is_empty(obj) {
    return Object.keys(obj).length === 0;
}
function null_to_empty(value) {
    return value == null ? '' : value;
}

function append(target, node) {
    target.appendChild(node);
}
function insert(target, node, anchor) {
    target.insertBefore(node, anchor || null);
}
function detach(node) {
    node.parentNode.removeChild(node);
}
function destroy_each(iterations, detaching) {
    for (let i = 0; i < iterations.length; i += 1) {
        if (iterations[i])
            iterations[i].d(detaching);
    }
}
function element(name) {
    return document.createElement(name);
}
function text(data) {
    return document.createTextNode(data);
}
function space() {
    return text(' ');
}
function empty() {
    return text('');
}
function listen(node, event, handler, options) {
    node.addEventListener(event, handler, options);
    return () => node.removeEventListener(event, handler, options);
}
function attr(node, attribute, value) {
    if (value == null)
        node.removeAttribute(attribute);
    else if (node.getAttribute(attribute) !== value)
        node.setAttribute(attribute, value);
}
function children(element) {
    return Array.from(element.childNodes);
}
function set_data(text, data) {
    data = '' + data;
    if (text.wholeText !== data)
        text.data = data;
}
function toggle_class(element, name, toggle) {
    element.classList[toggle ? 'add' : 'remove'](name);
}

let current_component;
function set_current_component(component) {
    current_component = component;
}

const dirty_components = [];
const binding_callbacks = [];
const render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = Promise.resolve();
let update_scheduled = false;
function schedule_update() {
    if (!update_scheduled) {
        update_scheduled = true;
        resolved_promise.then(flush);
    }
}
function add_render_callback(fn) {
    render_callbacks.push(fn);
}
let flushing = false;
const seen_callbacks = new Set();
function flush() {
    if (flushing)
        return;
    flushing = true;
    do {
        // first, call beforeUpdate functions
        // and update components
        for (let i = 0; i < dirty_components.length; i += 1) {
            const component = dirty_components[i];
            set_current_component(component);
            update(component.$$);
        }
        set_current_component(null);
        dirty_components.length = 0;
        while (binding_callbacks.length)
            binding_callbacks.pop()();
        // then, once components are updated, call
        // afterUpdate functions. This may cause
        // subsequent updates...
        for (let i = 0; i < render_callbacks.length; i += 1) {
            const callback = render_callbacks[i];
            if (!seen_callbacks.has(callback)) {
                // ...so guard against infinite loops
                seen_callbacks.add(callback);
                callback();
            }
        }
        render_callbacks.length = 0;
    } while (dirty_components.length);
    while (flush_callbacks.length) {
        flush_callbacks.pop()();
    }
    update_scheduled = false;
    flushing = false;
    seen_callbacks.clear();
}
function update($$) {
    if ($$.fragment !== null) {
        $$.update();
        run_all($$.before_update);
        const dirty = $$.dirty;
        $$.dirty = [-1];
        $$.fragment && $$.fragment.p($$.ctx, dirty);
        $$.after_update.forEach(add_render_callback);
    }
}
const outroing = new Set();
let outros;
function group_outros() {
    outros = {
        r: 0,
        c: [],
        p: outros // parent group
    };
}
function check_outros() {
    if (!outros.r) {
        run_all(outros.c);
    }
    outros = outros.p;
}
function transition_in(block, local) {
    if (block && block.i) {
        outroing.delete(block);
        block.i(local);
    }
}
function transition_out(block, local, detach, callback) {
    if (block && block.o) {
        if (outroing.has(block))
            return;
        outroing.add(block);
        outros.c.push(() => {
            outroing.delete(block);
            if (callback) {
                if (detach)
                    block.d(1);
                callback();
            }
        });
        block.o(local);
    }
}
function create_component(block) {
    block && block.c();
}
function mount_component(component, target, anchor) {
    const { fragment, on_mount, on_destroy, after_update } = component.$$;
    fragment && fragment.m(target, anchor);
    // onMount happens before the initial afterUpdate
    add_render_callback(() => {
        const new_on_destroy = on_mount.map(run).filter(is_function);
        if (on_destroy) {
            on_destroy.push(...new_on_destroy);
        }
        else {
            // Edge case - component was destroyed immediately,
            // most likely as a result of a binding initialising
            run_all(new_on_destroy);
        }
        component.$$.on_mount = [];
    });
    after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
    const $$ = component.$$;
    if ($$.fragment !== null) {
        run_all($$.on_destroy);
        $$.fragment && $$.fragment.d(detaching);
        // TODO null out other refs, including component.$$ (but need to
        // preserve final state?)
        $$.on_destroy = $$.fragment = null;
        $$.ctx = [];
    }
}
function make_dirty(component, i) {
    if (component.$$.dirty[0] === -1) {
        dirty_components.push(component);
        schedule_update();
        component.$$.dirty.fill(0);
    }
    component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
}
function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
    const parent_component = current_component;
    set_current_component(component);
    const prop_values = options.props || {};
    const $$ = component.$$ = {
        fragment: null,
        ctx: null,
        // state
        props,
        update: noop,
        not_equal,
        bound: blank_object(),
        // lifecycle
        on_mount: [],
        on_destroy: [],
        before_update: [],
        after_update: [],
        context: new Map(parent_component ? parent_component.$$.context : []),
        // everything else
        callbacks: blank_object(),
        dirty,
        skip_bound: false
    };
    let ready = false;
    $$.ctx = instance
        ? instance(component, prop_values, (i, ret, ...rest) => {
            const value = rest.length ? rest[0] : ret;
            if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                if (!$$.skip_bound && $$.bound[i])
                    $$.bound[i](value);
                if (ready)
                    make_dirty(component, i);
            }
            return ret;
        })
        : [];
    $$.update();
    ready = true;
    run_all($$.before_update);
    // `false` as a special case of no DOM component
    $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
    if (options.target) {
        if (options.hydrate) {
            const nodes = children(options.target);
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.l(nodes);
            nodes.forEach(detach);
        }
        else {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            $$.fragment && $$.fragment.c();
        }
        if (options.intro)
            transition_in(component.$$.fragment);
        mount_component(component, options.target, options.anchor);
        flush();
    }
    set_current_component(parent_component);
}
/**
 * Base class for Svelte components. Used when dev=false.
 */
class SvelteComponent {
    $destroy() {
        destroy_component(this, 1);
        this.$destroy = noop;
    }
    $on(type, callback) {
        const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
        callbacks.push(callback);
        return () => {
            const index = callbacks.indexOf(callback);
            if (index !== -1)
                callbacks.splice(index, 1);
        };
    }
    $set($$props) {
        if (this.$$set && !is_empty($$props)) {
            this.$$.skip_bound = true;
            this.$$set($$props);
            this.$$.skip_bound = false;
        }
    }
}

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

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/** public */
const parseTodos = async (files, pageLink, cache, vault, sort, ignoreFiles) => {
    const filesWithCache = await Promise.all(files
        .filter((file) => {
        var _a, _b;
        if (ignoreFiles && file.path.includes(ignoreFiles))
            return false;
        const fileCache = cache.getFileCache(file);
        const tagsOnPage = (_b = (_a = fileCache === null || fileCache === void 0 ? void 0 : fileCache.tags) === null || _a === void 0 ? void 0 : _a.filter((e) => getTagMeta(e.tag).main === pageLink)) !== null && _b !== void 0 ? _b : [];
        return !!(tagsOnPage === null || tagsOnPage === void 0 ? void 0 : tagsOnPage.length);
    })
        .map(async (file) => {
        var _a, _b;
        const fileCache = cache.getFileCache(file);
        const tagsOnPage = (_b = (_a = fileCache === null || fileCache === void 0 ? void 0 : fileCache.tags) === null || _a === void 0 ? void 0 : _a.filter((e) => getTagMeta(e.tag).main === pageLink)) !== null && _b !== void 0 ? _b : [];
        const content = await vault.cachedRead(file);
        return { content, cache: fileCache, validTags: tagsOnPage, file };
    }));
    const allTodos = filesWithCache
        .flatMap((file) => {
        return file.validTags.flatMap((tag) => findAllTodosFromTagBlock(file, tag));
    })
        .filter((todo, i, a) => a.findIndex((_todo) => todo.line === _todo.line && todo.filePath === _todo.filePath) === i);
    allTodos.sort((a, b) => (sort === "new->old" ? b.fileCreatedTs - a.fileCreatedTs : a.fileCreatedTs - b.fileCreatedTs));
    return allTodos;
};
const groupTodos = (items, groupBy) => {
    const groups = [];
    for (const item of items) {
        const itemKey = groupBy === "page" ? item.filePath : `#${[item.mainTag, item.subTag].filter((e) => e != null).join("/")}`;
        let group = groups.find((g) => g.groupId === itemKey);
        if (!group) {
            group = {
                groupId: itemKey,
                groupName: groupBy === "page" ? item.fileLabel : item.subTag,
                type: groupBy,
                todos: [],
            };
            groups.push(group);
        }
        group.todos.push(item);
    }
    return groups.filter((g) => g.todos.length > 0);
};
const toggleTodoItem = (item, app) => {
    const file = app.vault.getFiles().find((f) => f.path === item.filePath);
    const newData = setTodoStatusAtLineTo(file, item.line, !item.checked);
    app.vault.modify(file, newData);
};
const navToFile = async (path, ev) => {
    path = ensureMdExtension(path);
    const app = window.app;
    const file = getFileFromPath(path, app);
    if (!file)
        return;
    const leaf = isMetaPressed(ev) ? app.workspace.splitActiveLeaf() : app.workspace.getUnpinnedLeaf();
    await leaf.openFile(file);
};
const hoverFile = (event, app, filePath) => {
    const targetElement = event.currentTarget;
    const timeoutHandle = setTimeout(() => {
        app.workspace.trigger("link-hover", {}, targetElement, filePath, filePath);
    }, 800);
    targetElement.addEventListener("mouseleave", () => {
        clearTimeout(timeoutHandle);
    });
};
/** private */
const ensureMdExtension = (path) => {
    if (!/\.md$/.test(path))
        return `${path}.md`;
    return path;
};
const getFileFromPath = (path, app) => app.vault.getFiles().find((f) => f.path.endsWith(path));
const isMetaPressed = (e) => {
    return isMacOS() ? e.metaKey : e.ctrlKey;
};
const findAllTodosFromTagBlock = (file, tag) => {
    var _a;
    const fileContents = file.content;
    const links = (_a = file.cache.links) !== null && _a !== void 0 ? _a : [];
    if (!fileContents)
        return [];
    const fileLines = getAllLinesFromFile(fileContents);
    const tagMeta = getTagMeta(tag.tag);
    const tagLine = fileLines[tag.position.start.line];
    if (lineIsValidTodo(tagLine, tagMeta.main)) {
        return [formTodo(tagLine, file.file, tagMeta, links, tag.position.start.line)];
    }
    const todos = [];
    for (let i = tag.position.start.line; i < fileLines.length; i++) {
        const line = fileLines[i];
        if (line.length === 0)
            break;
        if (lineIsValidTodo(line, tagMeta.main)) {
            todos.push(formTodo(line, file.file, tagMeta, links, i));
        }
    }
    return todos;
};
const formTodo = (line, file, tagMeta, links, lineNum) => {
    const relevantLinks = links
        .filter((link) => link.position.start.line === lineNum)
        .map((link) => ({ filePath: link.link, linkName: link.displayText }));
    const linkMap = mapLinkMeta(relevantLinks);
    const rawText = extractTextFromTodoLine(line);
    const spacesIndented = getIndentationSpacesFromTodoLine(line);
    const tagStripped = removeTagFromText(rawText, tagMeta.main);
    const rawChunks = parseTextContent(tagStripped);
    const displayChunks = decorateChunks(rawChunks, linkMap);
    return {
        mainTag: tagMeta.main,
        checked: todoLineIsChecked(line),
        display: displayChunks,
        filePath: file.path,
        fileName: file.name,
        fileLabel: getFileLabelFromName(file.name),
        fileCreatedTs: file.stat.ctime,
        line: lineNum,
        subTag: tagMeta === null || tagMeta === void 0 ? void 0 : tagMeta.sub,
        spacesIndented,
    };
};
const decorateChunks = (chunks, linkMap) => {
    return chunks.map((chunk) => {
        var _a, _b;
        if (chunk.type === "text")
            return {
                value: chunk.rawText,
                type: "text",
            };
        const children = decorateChunks(chunk.children, linkMap);
        if (chunk.type === "link")
            return {
                type: "link",
                children,
                filePath: (_a = linkMap.get(chunk.rawText)) === null || _a === void 0 ? void 0 : _a.filePath,
                label: (_b = linkMap.get(chunk.rawText)) === null || _b === void 0 ? void 0 : _b.linkName,
            };
        return { type: chunk.type, children };
    });
};
const parseTextContent = (formula) => {
    let tokens = parseTokensFromText([{ rawText: formula, type: "text" }], "bold", /\*\*[^\*]+\*\*/, /\*\*([^\*]+)\*\*/g);
    tokens = parseTokensFromText(tokens, "italic", /\*[^\*]+\*/, /\*([^\*]+)\*/g);
    tokens = parseTokensFromText(tokens, "link", /\[\[[^\]]+\]\]/, /\[\[([^\]]+)\]\]/g);
    return tokens;
};
const parseTokensFromText = (chunks, type, splitRegex, tokenRegex) => {
    return chunks.flatMap((chunk) => {
        if (chunk.type === "text") {
            const pieces = chunk.rawText.split(splitRegex);
            const tokens = getAllMatches(tokenRegex, chunk.rawText, 1);
            return pieces.flatMap((piece, i) => {
                const token = tokens[i];
                const finalPieces = [];
                if (piece)
                    finalPieces.push({ type: "text", rawText: piece });
                if (token)
                    finalPieces.push({
                        type,
                        rawText: token,
                        children: [{ type: "text", rawText: token }],
                    });
                return finalPieces;
            });
        }
        else {
            return [
                {
                    type: chunk.type,
                    rawText: chunk.rawText,
                    children: parseTokensFromText(chunk.children, type, splitRegex, tokenRegex),
                },
            ];
        }
    });
};
const getAllMatches = (r, string, captureIndex = 0) => {
    if (!r.global)
        throw new Error("getAllMatches(): cannot get matches for non-global regex.");
    const matches = [];
    r.lastIndex = 0; // reset regexp to first match
    let match;
    while ((match = r.exec(string)))
        matches.push(match[captureIndex]);
    return matches;
};
const setTodoStatusAtLineTo = (file, line, setTo) => {
    const fileContents = file.cachedData;
    if (!fileContents)
        return;
    const fileLines = getAllLinesFromFile(fileContents);
    fileLines[line] = setLineTo(fileLines[line], setTo);
    return combineFileLines(fileLines);
};
const getTagMeta = (tag) => {
    const [full, main, sub] = /^\#([^\/]+)\/?(.*)?$/.exec(tag);
    return { main, sub };
};
const mapLinkMeta = (linkMeta) => {
    const map = new Map();
    for (const link of linkMeta)
        map.set(link.filePath, link);
    return map;
};
const setLineTo = (line, setTo) => line.replace(/^(\s*\-\s\[)([^\]]+)(\].*$)/, `$1${setTo ? "x" : " "}$3`);
const getAllLinesFromFile = (cache) => cache.split(/\r?\n/);
const combineFileLines = (lines) => lines.join("\n");
const lineIsValidTodo = (line, tag) => {
    const tagRemoved = removeTagFromText(line, tag);
    return /^\s*\-\s\[(\s|x)\]\s*\S/.test(tagRemoved);
};
const extractTextFromTodoLine = (line) => { var _a; return (_a = /^\s*\-\s\[(\s|x)\]\s?(.*)$/.exec(line)) === null || _a === void 0 ? void 0 : _a[2]; };
const getIndentationSpacesFromTodoLine = (line) => { var _a, _b, _c; return (_c = (_b = (_a = /^(\s*)\-\s\[(\s|x)\]\s?.*$/.exec(line)) === null || _a === void 0 ? void 0 : _a[1]) === null || _b === void 0 ? void 0 : _b.length) !== null && _c !== void 0 ? _c : 0; };
const todoLineIsChecked = (line) => /^\s*\-\s\[x\]/.test(line);
const getFileLabelFromName = (filename) => { var _a; return (_a = /^(.+)\.md$/.exec(filename)) === null || _a === void 0 ? void 0 : _a[1]; };
const removeTagFromText = (text, tag) => text.replace(new RegExp(`\\s?\\#${tag}[^\\s]*`, "g"), "").trim();
const isMacOS = () => {
    return os.platform() === "darwin";
};

/* src/svelte/CheckCircle.svelte generated by Svelte v3.31.2 */

function add_css() {
	var style = element("style");
	style.id = "svelte-y3iyim-style";
	style.textContent = ".checkbox.svelte-y3iyim{width:20px;height:20px;border-radius:50%;border:2px solid var(--text-muted);padding:2px;position:relative;min-width:20px;min-height:20px}.checked.svelte-y3iyim{background-color:var(--text-muted);width:12px;height:12px;border-radius:50%;position:absolute;top:2px;left:2px}";
	append(document.head, style);
}

function create_fragment(ctx) {
	let div1;
	let div0;

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			attr(div0, "class", "svelte-y3iyim");
			toggle_class(div0, "checked", /*checked*/ ctx[0]);
			attr(div1, "class", "checkbox svelte-y3iyim");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
		},
		p(ctx, [dirty]) {
			if (dirty & /*checked*/ 1) {
				toggle_class(div0, "checked", /*checked*/ ctx[0]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div1);
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	let { checked = false } = $$props;

	$$self.$$set = $$props => {
		if ("checked" in $$props) $$invalidate(0, checked = $$props.checked);
	};

	return [checked];
}

class CheckCircle extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-y3iyim-style")) add_css();
		init(this, options, instance, create_fragment, safe_not_equal, { checked: 0 });
	}
}

/* src/svelte/TodoText.svelte generated by Svelte v3.31.2 */

function add_css$1() {
	var style = element("style");
	style.id = "svelte-1ggcaxe-style";
	style.textContent = ".link-item.svelte-1ggcaxe{color:var(--text-accent);text-decoration:underline;cursor:pointer;transition:color 150ms ease-in-out}.link-item.svelte-1ggcaxe:hover{color:var(--text-accent-hover)}.bold-item.svelte-1ggcaxe{font-weight:bold}.italic-item.svelte-1ggcaxe{font-style:italic}";
	append(document.head, style);
}

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[4] = list[i];
	return child_ctx;
}

// (16:34) 
function create_if_block_3(ctx) {
	let span;
	let todotext;
	let current;
	let mounted;
	let dispose;

	todotext = new TodoText_1({
			props: { chunks: /*chunk*/ ctx[4].children }
		});

	function click_handler(...args) {
		return /*click_handler*/ ctx[2](/*chunk*/ ctx[4], ...args);
	}

	function mouseenter_handler(...args) {
		return /*mouseenter_handler*/ ctx[3](/*chunk*/ ctx[4], ...args);
	}

	return {
		c() {
			span = element("span");
			create_component(todotext.$$.fragment);
			attr(span, "class", "link-item svelte-1ggcaxe");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			mount_component(todotext, span, null);
			current = true;

			if (!mounted) {
				dispose = [
					listen(span, "click", click_handler),
					listen(span, "mouseenter", mouseenter_handler)
				];

				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const todotext_changes = {};
			if (dirty & /*chunks*/ 1) todotext_changes.chunks = /*chunk*/ ctx[4].children;
			todotext.$set(todotext_changes);
		},
		i(local) {
			if (current) return;
			transition_in(todotext.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(todotext.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(span);
			destroy_component(todotext);
			mounted = false;
			run_all(dispose);
		}
	};
}

// (14:36) 
function create_if_block_2(ctx) {
	let span;
	let todotext;
	let current;

	todotext = new TodoText_1({
			props: { chunks: /*chunk*/ ctx[4].children }
		});

	return {
		c() {
			span = element("span");
			create_component(todotext.$$.fragment);
			attr(span, "class", "italic-item svelte-1ggcaxe");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			mount_component(todotext, span, null);
			current = true;
		},
		p(ctx, dirty) {
			const todotext_changes = {};
			if (dirty & /*chunks*/ 1) todotext_changes.chunks = /*chunk*/ ctx[4].children;
			todotext.$set(todotext_changes);
		},
		i(local) {
			if (current) return;
			transition_in(todotext.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(todotext.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(span);
			destroy_component(todotext);
		}
	};
}

// (12:34) 
function create_if_block_1(ctx) {
	let span;
	let todotext;
	let current;

	todotext = new TodoText_1({
			props: { chunks: /*chunk*/ ctx[4].children }
		});

	return {
		c() {
			span = element("span");
			create_component(todotext.$$.fragment);
			attr(span, "class", "bold-item svelte-1ggcaxe");
		},
		m(target, anchor) {
			insert(target, span, anchor);
			mount_component(todotext, span, null);
			current = true;
		},
		p(ctx, dirty) {
			const todotext_changes = {};
			if (dirty & /*chunks*/ 1) todotext_changes.chunks = /*chunk*/ ctx[4].children;
			todotext.$set(todotext_changes);
		},
		i(local) {
			if (current) return;
			transition_in(todotext.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(todotext.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(span);
			destroy_component(todotext);
		}
	};
}

// (10:2) {#if chunk.type === "text"}
function create_if_block(ctx) {
	let span;
	let t_value = /*chunk*/ ctx[4].value + "";
	let t;

	return {
		c() {
			span = element("span");
			t = text(t_value);
		},
		m(target, anchor) {
			insert(target, span, anchor);
			append(span, t);
		},
		p(ctx, dirty) {
			if (dirty & /*chunks*/ 1 && t_value !== (t_value = /*chunk*/ ctx[4].value + "")) set_data(t, t_value);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(span);
		}
	};
}

// (9:0) {#each chunks as chunk}
function create_each_block(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_if_block_1, create_if_block_2, create_if_block_3];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*chunk*/ ctx[4].type === "text") return 0;
		if (/*chunk*/ ctx[4].type === "bold") return 1;
		if (/*chunk*/ ctx[4].type === "italic") return 2;
		if (/*chunk*/ ctx[4].type === "link") return 3;
		return -1;
	}

	if (~(current_block_type_index = select_block_type(ctx))) {
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
	}

	return {
		c() {
			if (if_block) if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if (~current_block_type_index) {
				if_blocks[current_block_type_index].m(target, anchor);
			}

			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if (~current_block_type_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				}
			} else {
				if (if_block) {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
				}

				if (~current_block_type_index) {
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					} else {
						if_block.p(ctx, dirty);
					}

					transition_in(if_block, 1);
					if_block.m(if_block_anchor.parentNode, if_block_anchor);
				} else {
					if_block = null;
				}
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (~current_block_type_index) {
				if_blocks[current_block_type_index].d(detaching);
			}

			if (detaching) detach(if_block_anchor);
		}
	};
}

function create_fragment$1(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*chunks*/ ctx[0];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*chunks, navToFile, hoverFile, app*/ 3) {
				each_value = /*chunks*/ ctx[0];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	
	
	let { chunks } = $$props;
	const app = window.app;

	const click_handler = (chunk, ev) => {
		ev.stopPropagation();
		if (chunk.filePath) navToFile(chunk.filePath, ev);
	};

	const mouseenter_handler = (chunk, ev) => {
		if (chunk.filePath) hoverFile(ev, app, chunk.filePath);
	};

	$$self.$$set = $$props => {
		if ("chunks" in $$props) $$invalidate(0, chunks = $$props.chunks);
	};

	return [chunks, app, click_handler, mouseenter_handler];
}

class TodoText_1 extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1ggcaxe-style")) add_css$1();
		init(this, options, instance$1, create_fragment$1, safe_not_equal, { chunks: 0 });
	}
}

/* src/svelte/Loading.svelte generated by Svelte v3.31.2 */

function add_css$2() {
	var style = element("style");
	style.id = "svelte-1bzczna-style";
	style.textContent = ".loader.svelte-1bzczna{background:transparent !important;border-radius:100%;border:2px solid;display:flex;animation-fill-mode:both;margin:0 auto;animation:svelte-1bzczna-niceSpinLoader 0.75s 0s infinite linear;border-color:var(--text-muted);border-bottom-color:var(--text-normal);width:16px;height:16px}@keyframes svelte-1bzczna-niceSpinLoader{0%{transform:rotate(0deg)}50%{transform:rotate(180deg)}100%{transform:rotate(360deg)}}";
	append(document.head, style);
}

function create_fragment$2(ctx) {
	let div;

	return {
		c() {
			div = element("div");
			attr(div, "class", "loader svelte-1bzczna");
		},
		m(target, anchor) {
			insert(target, div, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

class Loading extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-1bzczna-style")) add_css$2();
		init(this, options, null, create_fragment$2, safe_not_equal, {});
	}
}

/* src/svelte/App.svelte generated by Svelte v3.31.2 */

function add_css$3() {
	var style = element("style");
	style.id = "svelte-sak9cb-style";
	style.textContent = ".todo-item.svelte-sak9cb.svelte-sak9cb{display:flex;align-items:center;gap:4px;background-color:var(--interactive-normal);border-radius:8px;padding:8px 12px;margin-bottom:16px;cursor:pointer;transition:background-color 100ms ease-in-out}.compact.svelte-sak9cb .todo-item.svelte-sak9cb{margin-bottom:8px;padding:4px 8px}.todo-item.svelte-sak9cb.svelte-sak9cb:hover{background-color:var(--interactive-hover)}.todo-text.svelte-sak9cb.svelte-sak9cb{margin-left:8px}.file-link.svelte-sak9cb.svelte-sak9cb{margin-bottom:4px;color:var(--text-muted);transition:opacity 150ms ease-in-out;cursor:pointer}.file-link.svelte-sak9cb.svelte-sak9cb:hover{opacity:0.8}.group-header.svelte-sak9cb.svelte-sak9cb{font-weight:600;font-size:16px;margin-bottom:8px}.tag-base.svelte-sak9cb.svelte-sak9cb{color:var(--text-faint)}.tag-sub.svelte-sak9cb.svelte-sak9cb{color:var(--text-muted)}";
	append(document.head, style);
}

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[16] = list[i];
	return child_ctx;
}

function get_each_context_1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[19] = list[i];
	return child_ctx;
}

// (47:4) {:else}
function create_else_block(ctx) {
	let each_1_anchor;
	let current;
	let each_value = /*todoGroups*/ ctx[3];
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (dirty & /*todoGroups, toggleItem, navToFile, todoTag*/ 25) {
				each_value = /*todoGroups*/ ctx[3];
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

// (45:38) 
function create_if_block_1$1(ctx) {
	let div;
	let t0;
	let t1;

	return {
		c() {
			div = element("div");
			t0 = text("No checklist items found for tag: #");
			t1 = text(/*todoTag*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t0);
			append(div, t1);
		},
		p(ctx, dirty) {
			if (dirty & /*todoTag*/ 1) set_data(t1, /*todoTag*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (43:4) {#if firstRun}
function create_if_block$1(ctx) {
	let loading;
	let current;
	loading = new Loading({});

	return {
		c() {
			create_component(loading.$$.fragment);
		},
		m(target, anchor) {
			mount_component(loading, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(loading.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(loading.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(loading, detaching);
		}
	};
}

// (53:8) {:else}
function create_else_block_1(ctx) {
	let div;
	let span0;
	let t0_value = `#${/*todoTag*/ ctx[0]}${/*group*/ ctx[16].groupName != null ? "/" : ""}` + "";
	let t0;
	let span1;
	let t1_value = (/*group*/ ctx[16].groupName ?? "") + "";
	let t1;

	return {
		c() {
			div = element("div");
			span0 = element("span");
			t0 = text(t0_value);
			span1 = element("span");
			t1 = text(t1_value);
			attr(span0, "class", "tag-base svelte-sak9cb");
			attr(span1, "class", "tag-sub svelte-sak9cb");
			attr(div, "class", "group-header svelte-sak9cb");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, span0);
			append(span0, t0);
			append(div, span1);
			append(span1, t1);
		},
		p(ctx, dirty) {
			if (dirty & /*todoTag, todoGroups*/ 9 && t0_value !== (t0_value = `#${/*todoTag*/ ctx[0]}${/*group*/ ctx[16].groupName != null ? "/" : ""}` + "")) set_data(t0, t0_value);
			if (dirty & /*todoGroups*/ 8 && t1_value !== (t1_value = (/*group*/ ctx[16].groupName ?? "") + "")) set_data(t1, t1_value);
		},
		d(detaching) {
			if (detaching) detach(div);
		}
	};
}

// (49:8) {#if group.type === "page"}
function create_if_block_2$1(ctx) {
	let div;
	let t_value = /*group*/ ctx[16].groupName + "";
	let t;
	let mounted;
	let dispose;

	function click_handler(...args) {
		return /*click_handler*/ ctx[10](/*group*/ ctx[16], ...args);
	}

	return {
		c() {
			div = element("div");
			t = text(t_value);
			attr(div, "class", "file-link group-header svelte-sak9cb");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);

			if (!mounted) {
				dispose = listen(div, "click", click_handler);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			if (dirty & /*todoGroups*/ 8 && t_value !== (t_value = /*group*/ ctx[16].groupName + "")) set_data(t, t_value);
		},
		d(detaching) {
			if (detaching) detach(div);
			mounted = false;
			dispose();
		}
	};
}

// (61:8) {#each group.todos as todo}
function create_each_block_1(ctx) {
	let div1;
	let checkcircle;
	let t0;
	let div0;
	let todotext;
	let t1;
	let current;
	let mounted;
	let dispose;

	checkcircle = new CheckCircle({
			props: { checked: /*todo*/ ctx[19].checked }
		});

	todotext = new TodoText_1({
			props: { chunks: /*todo*/ ctx[19].display }
		});

	function click_handler_1() {
		return /*click_handler_1*/ ctx[11](/*todo*/ ctx[19]);
	}

	return {
		c() {
			div1 = element("div");
			create_component(checkcircle.$$.fragment);
			t0 = space();
			div0 = element("div");
			create_component(todotext.$$.fragment);
			t1 = space();
			attr(div0, "class", "todo-text svelte-sak9cb");
			attr(div1, "class", "todo-item svelte-sak9cb");
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			mount_component(checkcircle, div1, null);
			append(div1, t0);
			append(div1, div0);
			mount_component(todotext, div0, null);
			append(div1, t1);
			current = true;

			if (!mounted) {
				dispose = listen(div1, "click", click_handler_1);
				mounted = true;
			}
		},
		p(new_ctx, dirty) {
			ctx = new_ctx;
			const checkcircle_changes = {};
			if (dirty & /*todoGroups*/ 8) checkcircle_changes.checked = /*todo*/ ctx[19].checked;
			checkcircle.$set(checkcircle_changes);
			const todotext_changes = {};
			if (dirty & /*todoGroups*/ 8) todotext_changes.chunks = /*todo*/ ctx[19].display;
			todotext.$set(todotext_changes);
		},
		i(local) {
			if (current) return;
			transition_in(checkcircle.$$.fragment, local);
			transition_in(todotext.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(checkcircle.$$.fragment, local);
			transition_out(todotext.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			destroy_component(checkcircle);
			destroy_component(todotext);
			mounted = false;
			dispose();
		}
	};
}

// (48:6) {#each todoGroups as group}
function create_each_block$1(ctx) {
	let t;
	let each_1_anchor;
	let current;

	function select_block_type_1(ctx, dirty) {
		if (/*group*/ ctx[16].type === "page") return create_if_block_2$1;
		return create_else_block_1;
	}

	let current_block_type = select_block_type_1(ctx);
	let if_block = current_block_type(ctx);
	let each_value_1 = /*group*/ ctx[16].todos;
	let each_blocks = [];

	for (let i = 0; i < each_value_1.length; i += 1) {
		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			if_block.c();
			t = space();

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			if_block.m(target, anchor);
			insert(target, t, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].m(target, anchor);
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block) {
				if_block.p(ctx, dirty);
			} else {
				if_block.d(1);
				if_block = current_block_type(ctx);

				if (if_block) {
					if_block.c();
					if_block.m(t.parentNode, t);
				}
			}

			if (dirty & /*toggleItem, todoGroups*/ 24) {
				each_value_1 = /*group*/ ctx[16].todos;
				let i;

				for (i = 0; i < each_value_1.length; i += 1) {
					const child_ctx = get_each_context_1(ctx, each_value_1, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block_1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value_1.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if_block.d(detaching);
			if (detaching) detach(t);
			destroy_each(each_blocks, detaching);
			if (detaching) detach(each_1_anchor);
		}
	};
}

function create_fragment$3(ctx) {
	let div1;
	let div0;
	let current_block_type_index;
	let if_block;
	let div1_class_value;
	let current;
	const if_block_creators = [create_if_block$1, create_if_block_1$1, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*firstRun*/ ctx[2]) return 0;
		if (/*todoGroups*/ ctx[3].length === 0) return 1;
		return 2;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			div1 = element("div");
			div0 = element("div");
			if_block.c();
			attr(div0, "class", "todo-list");
			attr(div1, "class", div1_class_value = "" + (null_to_empty(/*lookAndFeel*/ ctx[1]) + " svelte-sak9cb"));
		},
		m(target, anchor) {
			insert(target, div1, anchor);
			append(div1, div0);
			if_blocks[current_block_type_index].m(div0, null);
			current = true;
		},
		p(ctx, [dirty]) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(div0, null);
			}

			if (!current || dirty & /*lookAndFeel*/ 2 && div1_class_value !== (div1_class_value = "" + (null_to_empty(/*lookAndFeel*/ ctx[1]) + " svelte-sak9cb"))) {
				attr(div1, "class", div1_class_value);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) detach(div1);
			if_blocks[current_block_type_index].d();
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	
	
	let { todoTag } = $$props;
	let { showChecked } = $$props;
	let { groupBy } = $$props;
	let { sortDirection } = $$props;
	let { lookAndFeel } = $$props;
	let { ignoreFiles } = $$props;
	let { rerenderKey } = $$props;
	const app = window.app;
	let todos = [];
	let todoGroups = [];
	let firstRun = true;

	const formGroups = _todos => {
		return groupTodos(showChecked ? _todos : _todos.filter(e => !e.checked), groupBy);
	};

	const toggleItem = item => __awaiter(void 0, void 0, void 0, function* () {
		toggleTodoItem(item, app);
		item.checked = !item.checked;
		$$invalidate(3, todoGroups = formGroups(todos));
	});

	const recalcItems = () => __awaiter(void 0, void 0, void 0, function* () {
		todos = yield parseTodos(app.vault.getFiles(), todoTag, app.metadataCache, app.vault, sortDirection, ignoreFiles);
		$$invalidate(3, todoGroups = formGroups(todos));
		$$invalidate(2, firstRun = false);
	});

	const click_handler = (group, e) => navToFile(group.groupId, e);
	const click_handler_1 = todo => toggleItem(todo);

	$$self.$$set = $$props => {
		if ("todoTag" in $$props) $$invalidate(0, todoTag = $$props.todoTag);
		if ("showChecked" in $$props) $$invalidate(5, showChecked = $$props.showChecked);
		if ("groupBy" in $$props) $$invalidate(6, groupBy = $$props.groupBy);
		if ("sortDirection" in $$props) $$invalidate(7, sortDirection = $$props.sortDirection);
		if ("lookAndFeel" in $$props) $$invalidate(1, lookAndFeel = $$props.lookAndFeel);
		if ("ignoreFiles" in $$props) $$invalidate(8, ignoreFiles = $$props.ignoreFiles);
		if ("rerenderKey" in $$props) $$invalidate(9, rerenderKey = $$props.rerenderKey);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*rerenderKey, firstRun*/ 516) {
			 {
				if (firstRun) setTimeout(recalcItems, 800); else recalcItems();
			}
		}
	};

	return [
		todoTag,
		lookAndFeel,
		firstRun,
		todoGroups,
		toggleItem,
		showChecked,
		groupBy,
		sortDirection,
		ignoreFiles,
		rerenderKey,
		click_handler,
		click_handler_1
	];
}

class App extends SvelteComponent {
	constructor(options) {
		super();
		if (!document.getElementById("svelte-sak9cb-style")) add_css$3();

		init(this, options, instance$2, create_fragment$3, safe_not_equal, {
			todoTag: 0,
			showChecked: 5,
			groupBy: 6,
			sortDirection: 7,
			lookAndFeel: 1,
			ignoreFiles: 8,
			rerenderKey: 9
		});
	}
}

class TodoListView extends obsidian.ItemView {
    constructor(leaf, settings) {
        super(leaf);
        this.settings = settings;
    }
    getViewType() {
        return TODO_VIEW_TYPE;
    }
    getDisplayText() {
        return "Todo List";
    }
    getIcon() {
        return "checkmark";
    }
    async onClose() {
        this._app.$destroy();
    }
    getProps() {
        return {
            todoTag: this.settings.todoPageName,
            showChecked: this.settings.showChecked,
            groupBy: this.settings.groupBy,
            sortDirection: this.settings.sortDirection,
            ignoreFiles: this.settings.ignoreFiles,
            lookAndFeel: this.settings.lookAndFeel,
            rerenderKey: Symbol("[rerender]"),
        };
    }
    async onOpen() {
        this._app = new App({
            target: this.contentEl,
            props: this.getProps(),
        });
        this.registerEvent(this.app.metadataCache.on("resolve", () => this.rerender()));
    }
    rerender() {
        this._app.$set(this.getProps());
    }
}

class TodoPlugin extends obsidian.Plugin {
    async onload() {
        await this.loadSettings();
        this.addSettingTab(new TodoSettingTab(this.app, this));
        this.registerView(TODO_VIEW_TYPE, (leaf) => {
            this.view = new TodoListView(leaf, this.settings);
            return this.view;
        });
        if (this.app.workspace.layoutReady)
            this.initLeaf();
        else
            this.registerEvent(this.app.workspace.on("layout-ready", () => this.initLeaf()));
    }
    initLeaf() {
        if (this.app.workspace.getLeavesOfType(TODO_VIEW_TYPE).length)
            return;
        this.app.workspace.getRightLeaf(true).setViewState({
            type: TODO_VIEW_TYPE,
            active: false,
        });
    }
    onunload() {
        this.view.onClose();
    }
    async loadSettings() {
        const loadedData = await this.loadData();
        this.settings = Object.assign(Object.assign({}, DEFAULT_SETTINGS), loadedData);
    }
    async saveSettings() {
        await this.saveData(this.settings);
        this.view.rerender();
    }
}

module.exports = TodoPlugin;
