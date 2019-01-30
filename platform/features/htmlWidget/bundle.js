/*****************************************************************************
 * Open MCT, Copyright (c) 2014-2018, United States Government
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
    "./src/HtmlWidgetController",
    "text!./res/htmlTemplate.html",
    'legacyRegistry'
], function (
    HtmlWidgetController,
    htmlTemplate,
    legacyRegistry
) {

    legacyRegistry.register("platform/features/htmlWidget", {
        "extensions": {
            "types": [
                {
                    "key": "example.html",
                    "name": "Custom HTML",
                    "cssClass": "icon-gear",
                    "description": "Custom HTML fragment",
                    "priority": 51,
                    "features": [
                        "creation"
                    ],
                    "properties": [
                        {
                            "key": "html",
                            "name": "HTML code",
                            "control": "textfield",
                            "required": true,
                            "cssClass": "l-input-lg"
                        },
                        {
                            "key": "css",
                            "name": "Container CSS styles",
                            "control": "textfield",
                            "required": true,
                            "cssClass": "l-input-lg"
                        },
                        {
                            "key": "valign",
                            "name": "Vertical alignment",
                            "cssClass": "l-input-lg",
                            "control": "select",
                            "required": false,
                            "options": [
                                {
                                    "name": "None",
                                    "value": ""
                                },
                                {
                                    "name": "Top",
                                    "value": "flex-start"
                                },
                                {
                                    "name": "Center",
                                    "value": "center"
                                },
                                {
                                    "name": "Bottom",
                                    "value": "flex-end"
                                },
                            ]
                        }
                    ]
                }
            ],
            "views": [
                {
                    "template": htmlTemplate,
                    "name": "Page",
                    "type": "example.html",
                    "key": "example.html",
                    "editable": false
                }
            ],
            "controllers": [
                {
                    "key": "HtmlWidgetController",
                    "implementation": HtmlWidgetController,
                    "depends": [
                        "$sce"
                    ]
                }
            ]
        }
    });
});
