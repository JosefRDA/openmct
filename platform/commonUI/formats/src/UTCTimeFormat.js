/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2016, United States Government
 * as represented by the Administrator of the National Aeronautics and Space
 * Administration. All rights reserved.
 *
 * Open MCT is licensed under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * Open MCT includes source code licensed under additional open source
 * licenses. See the Open Source Licenses file (LICENSES.md) included with
 * this source code distribution or the Licensing information page available
 * at runtime from the About dialog for additional information.
 *****************************************************************************/

define([
    'moment'
], function (
    moment
) {

    var DATE_FORMAT = "Y-DDDD HH:mm:ss",
        DATE_FORMATS = [
            DATE_FORMAT,
            "Y-DDDD HH:mm",
            "Y-DDDD"
        ];

    /**
     * @typedef Scale
     * @property {number} min the minimum scale value, in ms
     * @property {number} max the maximum scale value, in ms
     */

    /**
     * Formatter for UTC timestamps. Interprets numeric values as
     * milliseconds since the start of 1970.
     *
     * @implements {Format}
     * @constructor
     * @memberof platform/commonUI/formats
     */
    function UTCTimeFormat() {
        this.key = "utc";
    }

    /**
     * Returns an appropriate time format based on the provided value and
     * the threshold required.
     * @private
     */
    function getScaledFormat(d) {
        var momentified = moment.utc(d);
        /**
         * Uses logic from d3 Time-Scales, v3 of the API. See
         * https://github.com/d3/d3-3.x-api-reference/blob/master/Time-Scales.md
         *
         * Licensed
         */
        var format = [
            [".SSS", function (m) {
                return m.milliseconds();
            }],
            [":ss", function (m) {
                return m.seconds();
            }],
            ["HH:mm", function (m) {
                return m.minutes();
            }],
            ["Y-DDDD", function (m) {
                return m.days() &&
                    m.date() !== 1;
            }],
            ["Y-DDDD", function (m) {
                return m.date() !== 1;
            }],
            ["Y-DDDD", function (m) {
                return m.month();
            }],
            ["Y-DDDD", function () {
                return true;
            }]
        ].filter(function (row) {
                return row[1](momentified);
            })[0][0];

        if (format !== undefined) {
            return moment.utc(d).local().format(format);
        }
    }

    /**
     * @param {number} value The value to format.
     * @param {number} [minValue] Contextual information for scaled formatting used in linear scales such as conductor
     * and plot axes. Specifies the smallest number on the scale.
     * @param {number} [maxValue] Contextual information for scaled formatting used in linear scales such as conductor
     * and plot axes. Specifies the largest number on the scale
     * @param {number} [count] Contextual information for scaled formatting used in linear scales such as conductor
     * and plot axes. The number of labels on the scale.
     * @returns {string} the formatted date(s). If multiple values were requested, then an array of
     * formatted values will be returned. Where a value could not be formatted, `undefined` will be returned at its position
     * in the array.
     */
    UTCTimeFormat.prototype.format = function (value) {
        if (window.TIME_SHIFT) {
            value += window.TIME_SHIFT;
        }

        if (arguments.length > 1) {
            var result = getScaledFormat(value)
            // console.error("Why are you calling me?, arguments=", arguments, " result=" + result);
            return  result;
        } else if (value !== undefined) {
            return moment.utc(value).local().format(DATE_FORMAT) + " EST";
        } else {
            return value;
        }
    };

    UTCTimeFormat.prototype.parse = function (text) {
        if (typeof text === 'number') {
            return text;
        }
        return moment.utc(text, DATE_FORMATS).valueOf();
    };

    UTCTimeFormat.prototype.validate = function (text) {
        return moment.utc(text, DATE_FORMATS).isValid();
    };

    return UTCTimeFormat;
});
