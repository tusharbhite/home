/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2014 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */
;(function (window, undefined) {

    window.Granite = window.Granite || {};
    window.Granite.author = window.Granite.author || {};

    function getDpi() {
        var body = document.body,
            elem = document.createElement('div');

        body.appendChild(elem);

        elem.style.width = '1in';

        var val = document.defaultView
            .getComputedStyle(elem, null)
            .getPropertyValue('width');

        body.removeChild(elem);

        return parseFloat(val);
    }

    function detectNativeDevice() {
        var cfg = {
            'type': 'screen',
            'width': window.innerWidth || document.documentElement.clientWidth,
            'height': window.innerHeight || document.documentElement.clientHeight,

            'device-width': window.screen.width,
            'device-height': window.screen.height,
            'device-pixel-ratio': 1.0,

            'resolution': getDpi(),
            'scan': 'progressive',
            'grid': false,

            'color': window.screen.colorDepth,
            'color-index': window.screen.pixelDepth,
            'monochrome': 0
        };

        cfg['aspect-ratio'] = cfg.width / cfg.height;
        cfg['orientation'] = cfg.width > cfg.height ? 'landscape' : 'portrait';
        cfg['device-aspect-ratio'] = cfg['device-width'] / cfg['device-height'];

        return cfg;
    }

    function createStyleSheet(document) {
        var style = document.createElement("style");
        style.appendChild(document.createTextNode(""));

        // Add the <style> element to the page
        document.head.appendChild(style);

        return style;
    }

    /**
     * The asset finder is a registry for a certain interface
     * @type {*}
     */
    var MediaEmulator = function(doc) {
        this.document = doc;

        this._getRules();
    };

    /**
     * returns the native device and window configuration
     * @type {detectNativeDevice}
     */
    MediaEmulator.getNativeDevice = detectNativeDevice;

    MediaEmulator.prototype = {};

    /**
     * @type appliedStyleSheet {HTMLStyleElement} which contains the styles for the currently applied device
     */
    Object.defineProperty(MediaEmulator.prototype, 'appliedStyleSheet', {
        get: function () {
            var detached = true, pn = this._appliedStyleSheet;

            while (pn && (pn = pn.parentNode)) {
                if (pn === this.document) {
                    detached = false;
                    break;
                }
            }

            if (!this._appliedStyleSheet || detached) {
                this._appliedStyleSheet = createStyleSheet(this.document);
            }

            return this._appliedStyleSheet;
        }
    });

    /**
     * gets the rules from the document
     * @private
     */
    MediaEmulator.prototype._getRules = function () {
        var rules = [], cachedRules = MediaEmulator.parser.getMediaRules(this.document),
            rule, i, j, cssRules;


        for (i=0; i < cachedRules.length; i++) {
            cssRules = [];

            rule = MediaEmulator.parser.parseMediaRule(cachedRules[i].media.mediaText);

            for (j=0; j < cachedRules[i].cssRules.length; j++) {
                cssRules.push(cachedRules[i].cssRules[j].cssText); // workaround: in FF (seen in v32) cssText is empty if the original rule is not in place
            }

            rules.push({
                mediaText: cachedRules[i].media.mediaText,
                cssRules: cssRules,
                parsed: rule,
                mediaRule: cachedRules[i]
            });
        }

        this.rules = rules;
    };

    /**
     * deletes all media bound rules from the document
     * This will remove the responsiveness from the document
     */
    MediaEmulator.prototype.removeMediaRules = function () {
        for (var i=0; i < this.rules.length; i++) {
            while (this.rules[i].mediaRule.cssRules[0]) {
                this.rules[i].mediaRule.deleteRule(0);
            }
        }
    };

    /**
     * deletes set rules for a device
     * This removes the force device configuration
     */
    MediaEmulator.prototype.clear = function () {
        document.head.removeChild(this.appliedStyleSheet);
        this.appliedStyleSheet = null;
    };

    /**
     * Will restore the natural css state of the document
     */
    MediaEmulator.prototype.restore = function () {
        var rule, i, j;

        // delete custom style sheet
        document.head.removeChild(this.appliedStyleSheet);
        this.appliedStyleSheet = null;

        for (i=0; i < this.rules.length; i++) {
            try {
                rule = this.rules[i];

                for (j=0; j < rule.cssRules.length; j++) {
                    rule.mediaRule.insertRule(rule.cssRules[j], rule.mediaRule.cssRules.length);
                }
            } catch (ex) {
                // we ignore errors for external sheets we can't read
            }

        }
    };

    /**
     * forces a specific device configuration
     * which means it will filter the matching media queries and applies them
     * @param device
     */
    MediaEmulator.prototype.applyDevice = function (device) {
        var rule, i, j;

        this.clear();
        this.removeMediaRules();

        // apply width to html and body
        this.appliedStyleSheet.sheet.insertRule('html, body { width: '+ device.width +'px; }', 0);


        for (i=0; i < this.rules.length; i++) {
            try {
                rule = this.rules[i];
                if (MediaEmulator.parser.matchDevice(rule.parsed, device)) {

                    for (j=0; j < rule.cssRules.length; j++) {
                        this.appliedStyleSheet.sheet.insertRule(rule.cssRules[j], this.appliedStyleSheet.sheet.cssRules.length);
                    }
                }
            } catch (ex) {
                // we ignore errors for external sheets we can't read
            }
        }
    };

    /**
     * Calculates all missing properties of a device
     * @param device
     */
    MediaEmulator.prototype.prepareDevice = function (device) {
        var res = {
            'type': device.type || 'screen',
            'device-pixel-ratio': device['device-pixel-ratio'] || 1.0,
            'resolution': device.resolution || 96,
            'scan': device.scan || 'progressive',
            'grid': !!device.grid,

            'color': device.color || 8,
            'color-index': device['color-index'] || 0,
            'monochrome': device.monochrome || 0
        };

        res['width'] = Math.floor(device.width / res['device-pixel-ratio']);
        res['height'] = Math.floor(device.height / res['device-pixel-ratio']);
        res['device-width'] = device['device-width'] || res.width;
        res['device-height'] = device['device-height'] || res.height;

        res['aspect-ratio'] = device['aspect-ratio'] || (device.width / device.height);
        res['orientation'] = device['orientation'] || (device.width > device.height ? 'landscape' : 'portrait');
        res['device-aspect-ratio'] = device['device-aspect-ratio'] || (device['device-width'] / device['device-height']);

        return res;
    };

    window.Granite.author.MediaEmulator = MediaEmulator;

}(this));

/*
 * ADOBE CONFIDENTIAL
 *
 * Copyright 2014 Adobe Systems Incorporated
 * All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of Adobe Systems Incorporated and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to Adobe Systems Incorporated and its
 * suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from Adobe Systems Incorporated.
 */
(function (window, undefined) {

    // inspired by https://github.com/ericf/css-mediaquery
    var REGEX_MEDIA_QUERY     = /^(?:(only|not)?\s*([_a-z][_a-z0-9-]*)|(\([^\)]+\)))(?:\s*and\s*(.*))?$/i,
        REGEX_MQ_EXPRESSION   = /^\(\s*([_a-z-][_a-z0-9-]*)\s*(?:\:\s*([^\)]+))?\s*\)$/,
        REGEX_MQ_FEATURE      = /^(?:(min|max)-)?(.+)/,
        REGEX_LENGTH_UNIT     = /(em|rem|px|cm|mm|in|pt|pc)?\s*$/,
        REGEX_RESOLUTION_UNIT = /(dpi|dpcm|dppx)?\s*$/;

    function toDecimal(ratio) {
        var decimal = Number(ratio),
            numbers;

        if (!decimal) {
            numbers = ratio.match(/^(\d+)\s*\/\s*(\d+)$/);
            decimal = numbers[1] / numbers[2];
        }

        return decimal;
    }

    function toDpi(resolution) {
        var value = parseFloat(resolution),
            units = String(resolution).match(REGEX_RESOLUTION_UNIT)[1];

        switch (units) {
            case 'dpcm': return value / 2.54;
            case 'dppx': return value * 96;
            default    : return value;
        }
    }

    function toPx(length) {
        var value = parseFloat(length),
            units = String(length).match(REGEX_LENGTH_UNIT)[1];

        switch (units) {
            case 'em' : return value * 16;
            case 'rem': return value * 16;
            case 'cm' : return value * 96 / 2.54;
            case 'mm' : return value * 96 / 2.54 / 10;
            case 'in' : return value * 96;
            case 'pt' : return value * 72;
            case 'pc' : return value * 72 / 12;
            default   : return value;
        }
    }

    /**
     * Will search for MediaRules in all stylesheets of the given document
     * @param document
     * @returns {Array.CSSMediaRule} https://developer.mozilla.org/en-US/docs/Web/API/CSSMediaRule
     */
    function getMediaRules(document) {
        var stylesheets, mediaRules, sheet, rules, rule;

        stylesheets = document.styleSheets;
        mediaRules = [];

        for (var i=0; i < stylesheets.length; i++) {
            try {
                sheet = stylesheets[i];
                rules = sheet.cssRules;

                for (var j=0; j < (rules ? rules.length : 0); j++) {
                    rule = rules[j];

                    // https://developer.mozilla.org/en-US/docs/Web/API/CSSRule#Type_constants
                    if (rule.type === CSSRule.MEDIA_RULE) {
                        mediaRules.push(rule);
                    }
                }
            } catch (ex) {
                // external stylesheets cannot be accessed
                // in FF this causes a Security exception
            }

        }

        return mediaRules;
    }

    /**
     * Parses the pieces of the media rules into another object structure
     * @param {Array.CSSMediaRule} mediaRule
     * @returns {Array} parsed Media Rules
     */
    function parseMediaRule(mediaRule) {
        return mediaRule.split(',').map(function (query) {

            var matches = query.trim().match(REGEX_MEDIA_QUERY),
                expressions = ((matches[3] || '') + (matches[4] || '')).trim().match(/\([^\)]+\)/g),
                result = {};

            result.not = !!matches[1] && matches[1].toLowerCase() === 'not';
            result.type    = matches[2] ? matches[2].toLowerCase() : 'all';

            result.expressions = expressions ? expressions.map(function (expression) {
                var matches = expression.match(REGEX_MQ_EXPRESSION),
                    feature = matches[1].toLowerCase().match(REGEX_MQ_FEATURE);

                return {
                    modifier: feature[1],
                    feature : feature[2],
                    value : matches[2]
                };
            }) : [];

            return result;
        });
    }

    /**
     * Checks if a parsed media rule matches a device configuration
     *
     * @param parsedMediaRule
     * @param device
     * @returns {boolean}
     */
    function matchDevice(parsedMediaRule, device) {
        var pmr, typeMatch, expressionsMatch;

        for (var i=0; i < parsedMediaRule.length; i++) {
            pmr = parsedMediaRule[i];

            typeMatch = pmr.type === 'all' || device.type === pmr.type;

            if ((typeMatch && pmr.not) || !(typeMatch || pmr.not)) {
                continue;
            }

            expressionsMatch = pmr.expressions.every(function (expression) {

                var feature  = expression.feature,
                    modifier = expression.modifier,
                    expValue = expression.value,
                    value    = device[feature];

                // Missing or falsy values don't match.
                if (!value) { return false; }

                switch (feature) {
                    case 'orientation':
                    case 'scan':
                        return value.toLowerCase() === expValue.toLowerCase();

                    case 'width':
                    case 'height':
                    case 'device-width':
                    case 'device-height':
                        expValue = toPx(expValue);
                        value    = toPx(value);
                        break;

                    case 'resolution':
                        expValue = toDpi(expValue);
                        value    = toDpi(value);
                        break;

                    case 'aspect-ratio':
                    case 'device-aspect-ratio':
                    case 'device-pixel-ratio':
                        expValue = toDecimal(expValue);
                        value    = toDecimal(value);
                        break;

                    case 'grid':
                    case 'color':
                    case 'color-index':
                    case 'monochrome':
                        expValue = parseInt(expValue, 10) || 1;
                        value    = parseInt(value, 10) || 0;
                        break;
                }

                switch (modifier) {
                    case 'min': return value >= expValue;
                    case 'max': return value <= expValue;
                    default   : return value === expValue;
                }
            });

            if ((expressionsMatch && !pmr.not) || (!expressionsMatch && pmr.not)) {
                return true;
            }
        }
    }

    Granite.author.MediaEmulator.parser = {

        getMediaRules: getMediaRules,

        parseMediaRule: parseMediaRule,

        matchDevice: matchDevice

    };


}(this));

